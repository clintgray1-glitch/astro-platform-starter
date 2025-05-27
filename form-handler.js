// Form handler for generating custom report
const form = document.querySelector('.report-form');
const previewSection = document.getElementById('preview-section');
const formSuccess = document.querySelector('.form-success');
const formError = document.querySelector('.form-error');

// Function to generate custom report content based on form data
function generateReport(formData) {
    const reportPreview = document.getElementById('report-preview');
    const topics = formData.get('topics') ? formData.get('topics').split(',') : [];
    const industry = formData.get('INDUSTRY');
    
    // Create report content
    const reportContent = `
        <div class="report-header">
            <h2>Custom Cybersecurity Report</h2>
            <p>Generated for ${formData.get('FNAME')} ${formData.get('LNAME')} at ${formData.get('COMPANY')}</p>
        </div>
        
        <div class="report-industry">
            <h3>Industry Focus: ${industry}</h3>
            <p>Based on your industry selection, we've tailored our recommendations to your specific needs.</p>
        </div>
        
        <div class="report-topics">
            <h3>Selected Topics of Interest</h3>
            <ul>
                ${topics.map(topic => `<li>${topic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>`).join('')}
            </ul>
        </div>
        
        <div class="report-recommendations">
            <h3>Custom Recommendations</h3>
            <p>Our team will be in touch to provide detailed insights and solutions tailored to your specific needs.</p>
        </div>
    `;

    // Update the report preview section
    reportPreview.innerHTML = reportContent;
}

// Form submission handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        // Get form data
        const formData = new FormData(form);
        const formObject = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }

        // Submit to Netlify
        const netlifyResponse = await fetch('/', {
            method: 'POST',
            body: formData
        });

        if (!netlifyResponse.ok) {
            throw new Error('Failed to submit form to Netlify');
        }

        // Forward data to Mailchimp via Netlify function
        const mailchimpResponse = await fetch('/.netlify/functions/mailchimp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        if (!mailchimpResponse.ok) {
            throw new Error('Failed to submit form to Mailchimp');
        }

        // Hide form and show success message
        form.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Generate and show report
        generateReport(formData);
        previewSection.style.display = 'block';
    } catch (error) {
        console.error('Error submitting form:', error);
        formError.style.display = 'block';
    }
});
