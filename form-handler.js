// Simple report generation handler
function generateReport() {
    // Get form data
    const form = document.querySelector('.report-form');
    const formData = new FormData(form);
    
    // Get values
    const industry = formData.get('INDUSTRY');
    const challenges = formData.get('CHALLENGES') || 'Not specified';
    const topics = Array.from(formData.getAll('topics')).join(', ');
    
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
            <p>${topics}</p>
        </div>
        
        <div class="report-challenges">
            <h3>Your Cybersecurity Challenges</h3>
            <p>${challenges}</p>
        </div>
        
        <div class="report-recommendations">
            <h3>Custom Recommendations</h3>
            <p>Our team will be in touch to provide detailed insights and solutions tailored to your specific needs.</p>
        </div>
    `;

    // Update the report preview
    const reportPreview = document.getElementById('report-preview');
    if (reportPreview) {
        reportPreview.innerHTML = reportContent;
    }
}

// Generate report when form is submitted
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.report-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            generateReport();
        });
    }
});

        // Update the report preview section
        reportPreview.innerHTML = reportContent;
    }

    // Back to home button handler
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '#';
        });
    }

    // Function to format data for Mailchimp
    function formatForMailchimp(formData) {
        return {
            'FNAME': formData.get('FNAME'),
            'LNAME': formData.get('LNAME'),
            'EMAIL': formData.get('EMAIL'),
            'COMPANY': formData.get('COMPANY'),
            'JOBTITLE': formData.get('JOBTITLE'),
            'INDUSTRY': formData.get('INDUSTRY'),
            'CHALLENGES': formData.get('CHALLENGES'),
            'gdpr[e8166047db]': formData.get('gdpr[e8166047db]'),
            'topics': Array.from(formData.getAll('topics')).join(',')
        };
    }

    // Function to format data for Mailchimp
    function formatForMailchimp(formData) {
        return {
            'FNAME': formData.get('FNAME'),
            'LNAME': formData.get('LNAME'),
            'EMAIL': formData.get('EMAIL'),
            'COMPANY': formData.get('COMPANY'),
            'JOBTITLE': formData.get('JOBTITLE'),
            'INDUSTRY': formData.get('INDUSTRY'),
            'CHALLENGES': formData.get('CHALLENGES'),
            'gdpr[e8166047db]': formData.get('gdpr[e8166047db]'),
            'topics': Array.from(formData.getAll('topics')).join(',')
        };
    }

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            // Get form data
            const formData = new FormData(form);
            const formObject = formatForMailchimp(formData);
            
            console.log('Form submitted:', formObject);

            // Hide error message if present
            formError.style.display = 'none';

            // Submit to Netlify
            const response = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: new URLSearchParams(formObject)
            });

            if (!response.ok) {
                throw new Error('Failed to submit form to Netlify');
            }

            const data = await response.json();
            console.log('Netlify response:', data);

            // Hide form and show success message
            form.style.display = 'none';
            formSuccess.style.display = 'block';

            // Generate and show report
            generateReport(formData);
            previewSection.style.display = 'block';

        } catch (error) {
            console.error('Error submitting form:', error);
            formError.textContent = 'There was an error submitting the form. Please try again.';
            formError.style.display = 'block';
        }
    });
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Failed to submit form to Netlify');
                }
                return response.text();
            })
            .then(function(data) {
                console.log('Form submission successful:', data);
                
                // Hide form and show success message
                form.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Generate and show report
                generateReport(formData);
                previewSection.style.display = 'block';
            })
            .catch(function(error) {
                console.error('Error submitting form:', error);
                formError.textContent = 'There was an error submitting the form. Please try again.';
                formError.style.display = 'block';
            });
        } catch (error) {
            console.error('Error processing form:', error);
            formError.textContent = 'There was an error processing the form. Please try again.';
            formError.style.display = 'block';
        }
    });
}
    console.log('Form handler initialized successfully');
}

// Initialize when the script loads
initializeForm();

// Also initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeForm);
} else {
    initializeForm();
}

// Function to generate custom report content based on form data
function generateReport(formData) {
    var reportPreview = document.getElementById('report-preview');
    var topics = formData.get('topics') ? formData.get('topics').split(',') : [];
    var industry = formData.get('INDUSTRY');
    
    // Create report content
    var reportContent = 
        '<div class="report-header">' +
        '<h2>Custom Cybersecurity Report</h2>' +
        '<p>Generated for ' + formData.get('FNAME') + ' ' + formData.get('LNAME') + ' at ' + formData.get('COMPANY') + '</p>' +
        '</div>' +
        
        '<div class="report-industry">' +
        '<h3>Industry Focus: ' + industry + '</h3>' +
        '<p>Based on your industry selection, we\'ve tailored our recommendations to your specific needs.</p>' +
        '</div>' +
        
        '<div class="report-topics">' +
        '<h3>Selected Topics of Interest</h3>' +
        '<ul>' +
        topics.map(function(topic) {
            return '<li>' + topic.replace(/-/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); }) + '</li>';
        }).join('') +
        '</ul>' +
        '</div>' +
        
        '<div class="report-recommendations">' +
        '<h3>Custom Recommendations</h3>' +
        '<p>Our team will be in touch to provide detailed insights and solutions tailored to your specific needs.</p>' +
        '</div>';

    // Update the report preview section
    reportPreview.innerHTML = reportContent;
}

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    try {
        // Get form data
        var formData = new FormData(form);
        var formObject = {};
        
        // Convert FormData to object
        for (var pair of formData.entries()) {
            formObject[pair[0]] = pair[1];
        }

        // Submit to Netlify
        fetch('/', {
            method: 'POST',
            body: formData
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Failed to submit form to Netlify');
            }

            // Forward data to Mailchimp via Netlify function
            return fetch('/.netlify/functions/mailchimp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            });
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Failed to submit form to Mailchimp');
            }

            // Hide form and show success message
            form.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Generate and show report
            generateReport(formData);
            previewSection.style.display = 'block';
        })
        .catch(function(error) {
            console.error('Error submitting form:', error);
            formError.style.display = 'block';
        });
    } catch (error) {
        console.error('Error submitting form:', error);
        formError.style.display = 'block';
    }
});
