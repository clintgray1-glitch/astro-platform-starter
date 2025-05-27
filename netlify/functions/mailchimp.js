const fetch = require('node-fetch');

// Verify environment variables
if (!process.env.MAILCHIMP_API_KEY) {
    console.error('Missing MAILCHIMP_API_KEY environment variable');
    return {
        statusCode: 500,
        body: JSON.stringify({ 
            error: 'Missing Mailchimp API key',
            settings: {
                audienceId: process.env.MAILCHIMP_AUDIENCE_ID,
                server: process.env.MAILCHIMP_SERVER
            }
        })
    };
}

// Get Mailchimp settings from environment variables
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID || 'b51984c520d5ead02815f4578';
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER || 'us3';

exports.handler = async (event) => {
    try {
        console.log('Mailchimp function triggered with settings:', {
            audienceId: MAILCHIMP_AUDIENCE_ID,
            server: MAILCHIMP_SERVER
        });
        
        // Verify API key format
        const apiKeyParts = MAILCHIMP_API_KEY.split('-');
        if (apiKeyParts.length !== 2) {
            throw new Error('Invalid Mailchimp API key format');
        }
        
        // Verify server matches API key
        const apiServer = apiKeyParts[1];
        if (MAILCHIMP_SERVER !== apiServer) {
            throw new Error(`Server mismatch: API key uses ${apiServer}, but configured to use ${MAILCHIMP_SERVER}`);
        }
        
        const { body } = event;
        console.log('Received form data:', body);
        
        const formData = JSON.parse(body);
        console.log('Parsed form data:', formData);
        
        // Check required fields
        if (!formData.EMAIL) {
            throw new Error('Email is required');
        }
        
        // Prepare Mailchimp API request
        const mailchimpUrl = `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;
        
        const mailchimpData = {
            email_address: formData.EMAIL,
            status: 'subscribed',
            merge_fields: {
                FNAME: formData.FNAME || '',
                LNAME: formData.LNAME || '',
                COMPANY: formData.COMPANY || '',
                JOBTITLE: formData.JOBTITLE || '',
                INDUSTRY: formData.INDUSTRY || '',
                CHALLENGES: formData.CHALLENGES || '',
                INTERESTS: {
                    'e8166047db': formData.topics ? formData.topics.split(',') : []
                }
            }
        };
        
        console.log('Sending to Mailchimp:', mailchimpData);
        
        try {
            const response = await fetch(mailchimpUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`
                },
                body: JSON.stringify(mailchimpData)
            });

            const responseText = await response.text();
            console.log('Mailchimp response:', responseText);

            if (!response.ok) {
                try {
                    const errorData = JSON.parse(responseText);
                    throw new Error(`Mailchimp API error: ${errorData.title} - ${errorData.detail} - ${responseText}`);
                } catch (parseError) {
                    throw new Error(`Mailchimp API error: ${response.status} - ${responseText}`);
                }
            }

            console.log('Successfully added to Mailchimp');
            return {
                statusCode: 200,
                body: JSON.stringify({ 
                    success: true,
                    settings: {
                        audienceId: MAILCHIMP_AUDIENCE_ID,
                        server: MAILCHIMP_SERVER
                    }
                })
            };
        } catch (fetchError) {
            console.error('Fetch error:', fetchError);
            throw new Error(`Failed to connect to Mailchimp: ${fetchError.message} - URL: ${mailchimpUrl}`);
        }
    } catch (error) {
        console.error('Error in Mailchimp function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: error.message,
                details: error.stack,
                settings: {
                    audienceId: MAILCHIMP_AUDIENCE_ID,
                    server: MAILCHIMP_SERVER
                }
            })
        };
    }
};
