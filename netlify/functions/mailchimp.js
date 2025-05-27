const fetch = require('node-fetch');

const MAILCHIMP_AUDIENCE_ID = 'b51984c520d5ead02815f4578'; // Your Mailchimp audience ID
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY; // Set this in Netlify environment variables
const MAILCHIMP_SERVER = 'us3'; // Your Mailchimp server prefix

exports.handler = async (event) => {
    try {
        const { body } = event;
        const formData = JSON.parse(body);
        
        // Prepare Mailchimp API request
        const mailchimpUrl = `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;
        
        const mailchimpData = {
            email_address: formData.EMAIL,
            status: 'subscribed',
            merge_fields: {
                FNAME: formData.FNAME,
                LNAME: formData.LNAME,
                COMPANY: formData.COMPANY,
                JOBTITLE: formData.JOBTITLE,
                INDUSTRY: formData.INDUSTRY,
                CHALLENGES: formData.CHALLENGES,
                INTERESTS: {
                    'e8166047db': formData.topics ? formData.topics.split(',') : []
                }
            }
        };

        const response = await fetch(mailchimpUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`
            },
            body: JSON.stringify(mailchimpData)
        });

        if (!response.ok) {
            throw new Error(`Mailchimp API error: ${response.statusText}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
