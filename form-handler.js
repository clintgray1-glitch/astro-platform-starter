// Form handler for generating custom report
function initializeForm() {
    var form = document.querySelector('.report-form');
    var previewSection = document.getElementById('preview-section');
    var formSuccess = document.querySelector('.form-success');
    var formError = document.querySelector('.form-error');
    var backButton = document.getElementById('back-to-home');

    if (!form) {
        console.error('Form element not found');
        return;
    }

    if (!previewSection) {
        console.error('Preview section element not found');
        return;
    }

    // Function to generate custom report content based on form data
    function generateReport(formData) {
        var reportPreview = document.getElementById('report-preview');
        var industry = formData.get('INDUSTRY');
        var challenges = formData.get('CHALLENGES') || 'Not specified';
        
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
            
            '<div class="report-challenges">' +
            '<h3>Your Cybersecurity Challenges</h3>' +
            '<p>' + challenges + '</p>' +
            '</div>' +
            
            '<div class="report-recommendations">' +
            '<h3>Custom Recommendations</h3>' +
            '<p>Our team will be in touch to provide detailed insights and solutions tailored to your specific needs.</p>' +
            '</div>';

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

            console.log('Form submitted:', formObject);

            // Hide error message if present
            formError.style.display = 'none';

            // Submit to Netlify
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: new URLSearchParams(formData)
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Failed to submit form to Netlify');
                }
                // Don't try to parse JSON, just check if response is ok
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
