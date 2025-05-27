document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    try {
        initializeCharts();
    } catch (error) {
        console.error("Error initializing charts:", error);
    }
    
    // Function to initialize and populate all charts
    function initializeCharts() {
        console.log("initializeCharts function called");
        
        // Check if charts exist on the page
        const attackTypesEl = document.getElementById('attackTypesChart');
        const monthlyThreatEl = document.getElementById('monthlyThreatChart');
        const costByIndustryEl = document.getElementById('costByIndustryChart');
        const timeToRespondEl = document.getElementById('timeToRespondChart');
        
        // If any chart element is missing, don't try to initialize charts
        if (!attackTypesEl || !monthlyThreatEl || !costByIndustryEl || !timeToRespondEl) {
            console.log("Some chart elements not found, skipping chart initialization");
            return;
        }
        
        console.log("All chart elements found, continuing with chart initialization");
        
        // Set Chart.js defaults
        Chart.defaults.color = '#d1d5db';
        Chart.defaults.font.family = "'Raleway', sans-serif";
        Chart.defaults.font.weight = '400'; // Regular per brand guidelines
        
        // Create Attack Types Distribution chart (Pie chart)
        const attackTypesCtx = attackTypesEl.getContext('2d');
        const attackTypesChart = new Chart(attackTypesCtx, {
            type: 'pie',
            data: {
                labels: ['DDoS', 'Ransomware', 'Phishing', 'Supply Chain', 'API Entries', 'Zero-Day Exploits', 'Insider Threats'],
                datasets: [{
                    data: [25.0, 21.4, 17.9, 14.3, 10.7, 7.1, 3.6],
                    backgroundColor: [
                        '#F07057', // Burnt Sienna - Primary brand color
                        '#2E363F', // Outer Space - Secondary brand color
                        'rgba(240, 112, 87, 0.8)', // Burnt Sienna (80%)
                        'rgba(46, 54, 63, 0.8)', // Outer Space (80%)
                        'rgba(240, 112, 87, 0.6)', // Burnt Sienna (60%)
                        'rgba(46, 54, 63, 0.6)', // Outer Space (60%)
                        'rgba(240, 112, 87, 0.4)'  // Burnt Sienna (40%)
                    ],
                    borderWidth: 1,
                    borderColor: '#000000' // Black per brand guidelines
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.2,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 10,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            boxWidth: 8
                        }
                    },
                    title: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });

        // Create Monthly Threat Detection chart (Line chart)
        const monthlyThreatCtx = monthlyThreatEl.getContext('2d');
        const monthlyThreatChart = new Chart(monthlyThreatCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Ransomware',
                        data: [100, 120, 140, 150, 170, 180, 200, 220, 240, 260, 280, 300],
                        borderColor: '#F07057', // Burnt Sienna
                        backgroundColor: 'rgba(240, 112, 87, 0.1)',
                        tension: 0.3,
                        fill: false
                    },
                    {
                        label: 'Phishing',
                        data: [80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190],
                        borderColor: '#2E363F', // Outer Space
                        backgroundColor: 'rgba(46, 54, 63, 0.1)',
                        tension: 0.3,
                        fill: false
                    },
                    {
                        label: 'Supply Chain',
                        data: [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170],
                        borderColor: 'rgba(240, 112, 87, 0.7)', // Burnt Sienna (70%)
                        backgroundColor: 'rgba(240, 112, 87, 0.05)',
                        tension: 0.3,
                        fill: false
                    },
                    {
                        label: 'Zero-Day Exploits',
                        data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
                        borderColor: 'rgba(46, 54, 63, 0.7)', // Outer Space (70%)
                        backgroundColor: 'rgba(46, 54, 63, 0.05)',
                        tension: 0.3,
                        fill: false
                    },
                    {
                        label: 'DDoS',
                        data: [120, 130, 140, 155, 170, 185, 200, 215, 230, 250, 270, 290],
                        borderColor: 'rgba(240, 112, 87, 0.5)', // Burnt Sienna (50%)
                        backgroundColor: 'rgba(240, 112, 87, 0.05)',
                        tension: 0.3,
                        fill: false
                    },
                    {
                        label: 'Insider Threats',
                        data: [15, 17, 18, 20, 22, 24, 25, 27, 29, 31, 33, 35],
                        borderColor: 'rgba(46, 54, 63, 0.5)', // Outer Space (50%)
                        backgroundColor: 'rgba(46, 54, 63, 0.05)',
                        tension: 0.3,
                        fill: false
                    },
                    {
                        label: 'API Entries',
                        data: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],
                        borderColor: 'rgba(240, 112, 87, 0.3)', // Burnt Sienna (30%)
                        backgroundColor: 'rgba(240, 112, 87, 0.05)',
                        tension: 0.3,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.2,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Detected Threats'
                        },
                        grid: {
                            color: 'rgba(75, 85, 99, 0.2)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(75, 85, 99, 0.2)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });

        // Create Cost By Industry chart (Bar chart)
        const costByIndustryCtx = costByIndustryEl.getContext('2d');
        const costByIndustryChart = new Chart(costByIndustryCtx, {
            type: 'bar',
            data: {
                labels: ['Healthcare', 'Finance', 'Technology', 'Energy', 'Retail', 'Education', 'Manufacturing'],
                datasets: [{
                    label: 'Average Cost (in millions USD)',
                    data: [9.2, 8.5, 7.8, 6.9, 5.4, 4.8, 4.3],
                    backgroundColor: [
                        '#F07057', // Burnt Sienna
                        '#2E363F', // Outer Space
                        'rgba(240, 112, 87, 0.8)',
                        'rgba(46, 54, 63, 0.8)',
                        'rgba(240, 112, 87, 0.6)',
                        'rgba(46, 54, 63, 0.6)',
                        'rgba(240, 112, 87, 0.4)'
                    ],
                    borderColor: '#000000',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.2,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cost in Millions USD'
                        },
                        grid: {
                            color: 'rgba(75, 85, 99, 0.2)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(75, 85, 99, 0.2)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Create Time to Detect vs. Time to Contain chart (Horizontal bar chart)
        const timeToRespondCtx = timeToRespondEl.getContext('2d');
        const timeToRespondChart = new Chart(timeToRespondCtx, {
            type: 'bar',
            data: {
                labels: ['Healthcare', 'Finance', 'Technology', 'Energy', 'Retail', 'Education', 'Manufacturing'],
                datasets: [
                    {
                        label: 'Time to Detect (days)',
                        data: [212, 185, 172, 196, 168, 201, 189],
                        backgroundColor: '#F07057', // Burnt Sienna
                        borderColor: '#000000',
                        borderWidth: 1
                    },
                    {
                        label: 'Time to Contain (days)',
                        data: [75, 62, 58, 71, 65, 79, 68],
                        backgroundColor: '#2E363F', // Outer Space
                        borderColor: '#000000',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.2,
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Days'
                        },
                        grid: {
                            color: 'rgba(75, 85, 99, 0.2)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(75, 85, 99, 0.2)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    // Function to generate custom report based on selected topics
    function generateCustomReport(formData) {
        const reportPreview = document.getElementById('report-preview');
        const selectedTopics = formData.get('TOPICS').split(',');
        const firstName = formData.get('FNAME') || 'User';
        const company = formData.get('COMPANY') || 'your company';
        const currentDate = new Date().toLocaleDateString('en-NZ');
        
        if (!reportPreview) {
            console.error("Report preview element not found!");
            return;
        }
        
        console.log("Generating report for topics:", selectedTopics);
        
        // Create the report header and introduction
        let reportContent = `
            <div class="report-header">
                <h2>Cybersecurity Trends Analysis</h2>
                <p class="accent-text">PERSONALIZED INSIGHTS</p>
                <p>Based on your selections, here's a personalized analysis of cybersecurity trends powered by Admin By Request.</p>
            </div>
            
            <div class="report-subheader">
                <p class="accent-text">ADMIN BY REQUEST</p>
                <p>Prepared exclusively for ${firstName} at ${company}</p>
                <p>Generated on ${currentDate}</p>
            </div>
            
            <hr class="report-divider">
            
            <div class="report-intro">
                <p>This analysis provides insights and actionable recommendations for the cybersecurity trends you selected.</p>
            </div>
            
            <div class="selected-topics">
                <h4>Selected Topics:</h4>
                <ul>
        `;
        
        // Add selected topics to the list
        if (selectedTopics.includes('ransomware')) {
            reportContent += `<li>Ransomware Evolution (Critical)</li>`;
        }
        if (selectedTopics.includes('supply-chain')) {
            reportContent += `<li>Supply Chain Vulnerabilities (High)</li>`;
        }
        if (selectedTopics.includes('zero-day')) {
            reportContent += `<li>Zero-Day Exploits (High)</li>`;
        }
        if (selectedTopics.includes('ai-defense')) {
            reportContent += `<li>AI-Powered Defense Systems (Emerging)</li>`;
        }
        if (selectedTopics.includes('authentication')) {
            reportContent += `<li>Authentication Bypasses (Medium)</li>`;
        }
        if (selectedTopics.includes('compliance')) {
            reportContent += `<li>Compliance Framework Updates (Informational)</li>`;
        }
        
        reportContent += `
                </ul>
            </div>
        `;
        
        // Add detailed content for each selected topic
        if (selectedTopics.includes('ransomware')) {
            reportContent += `
                <div class="report-topic-card ransomware">
                    <h2>Ransomware Evolution</h2>
                    <div class="topic-category">CRITICAL</div>
                    <p class="topic-description">New strains with advanced evasion techniques targeting critical infrastructure.</p>
                    
                    <h3>Key Findings</h3>
                    <ul class="findings-list">
                        <li>Ransomware attacks increased by 150% in the past year, with critical infrastructure being the primary target.</li>
                        <li>New ransomware variants are employing advanced techniques to evade traditional security measures.</li>
                        <li>Double and triple extortion tactics are becoming standard practice among ransomware groups.</li>
                    </ul>
                    
                    <h3>Recommendations</h3>
                    <ul class="recommendations-list">
                        <li>Implement a comprehensive backup strategy with offline copies.</li>
                        <li>Deploy Admin By Request's Application Control to prevent unauthorized executables from running.</li>
                        <li>Utilize Just-In-Time admin rights to minimize the attack surface available to ransomware.</li>
                    </ul>
                </div>
            `;
        }
        
        if (selectedTopics.includes('supply-chain')) {
            reportContent += `
                <div class="report-topic-card supply-chain">
                    <h2>Supply Chain Vulnerabilities</h2>
                    <div class="topic-category">HIGH</div>
                    <p class="topic-description">Increasing attacks targeting software dependencies and update systems.</p>
                    
                    <h3>Key Findings</h3>
                    <ul class="findings-list">
                        <li>Supply chain attacks increased by 42% in the past year, affecting organizations across all sectors.</li>
                        <li>Attackers are increasingly targeting trusted software providers to distribute malware.</li>
                        <li>The average time to detect a supply chain compromise is 287 days.</li>
                    </ul>
                    
                    <h3>Recommendations</h3>
                    <ul class="recommendations-list">
                        <li>Implement strict vendor security assessments and continuous monitoring.</li>
                        <li>Deploy Admin By Request's Just-In-Time approach to ensure that even if a trusted supplier is compromised, the attacker cannot leverage elevated privileges.</li>
                        <li>Establish a software bill of materials (SBOM) for all critical applications.</li>
                    </ul>
                </div>
            `;
        }
        
        if (selectedTopics.includes('zero-day')) {
            reportContent += `
                <div class="report-topic-card zero-day">
                    <h2>Zero-Day Exploits</h2>
                    <div class="topic-category">HIGH</div>
                    <p class="topic-description">Rise in previously unknown vulnerabilities being exploited in the wild.</p>
                    
                    <h3>Key Findings</h3>
                    <ul class="findings-list">
                        <li>Zero-day exploits increased by 35% in the last 12 months.</li>
                        <li>Browser and operating system vulnerabilities remain the most commonly exploited zero-days.</li>
                        <li>The average time to patch after discovery has decreased to 15 days, but exploitation often occurs within hours.</li>
                    </ul>
                    
                    <h3>Recommendations</h3>
                    <ul class="recommendations-list">
                        <li>Implement a defense-in-depth strategy that doesn't rely solely on patching.</li>
                        <li>Deploy Admin By Request's privilege management to ensure that even if a zero-day exploit is successful, the attacker remains contained without admin rights.</li>
                        <li>Utilize application allowlisting to prevent unknown executables from running.</li>
                    </ul>
                </div>
            `;
        }
        
        if (selectedTopics.includes('ai-defense')) {
            reportContent += `
                <div class="report-topic-card ai-defense">
                    <h2>AI-Powered Defense Systems</h2>
                    <div class="topic-category">EMERGING</div>
                    <p class="topic-description">Machine learning solutions for predictive threat detection and response.</p>
                    
                    <h3>Key Findings</h3>
                    <ul class="findings-list">
                        <li>Organizations using AI-powered security tools detect threats 63% faster than those using traditional methods.</li>
                        <li>Machine learning algorithms can now predict potential attack vectors with 78% accuracy.</li>
                        <li>AI systems are increasingly being used to automate response to common attack patterns.</li>
                    </ul>
                    
                    <h3>Recommendations</h3>
                    <ul class="recommendations-list">
                        <li>Integrate AI-powered threat detection tools with existing security infrastructure.</li>
                        <li>Use Admin By Request's analytics to provide insights into admin usage patterns that can be integrated with AI systems to identify anomalous behavior.</li>
                        <li>Implement continuous learning models that adapt to evolving threat landscapes.</li>
                    </ul>
                </div>
            `;
        }
        
        if (selectedTopics.includes('authentication')) {
            reportContent += `
                <div class="report-topic-card authentication">
                    <h2>Authentication Bypasses</h2>
                    <div class="topic-category">MEDIUM</div>
                    <p class="topic-description">Sophisticated methods to circumvent multi-factor authentication systems.</p>
                    
                    <h3>Key Findings</h3>
                    <ul class="findings-list">
                        <li>MFA bypass attacks have increased by 29% in the past year.</li>
                        <li>Social engineering remains the primary vector for authentication bypasses.</li>
                        <li>Session hijacking and token theft are becoming more sophisticated.</li>
                    </ul>
                    
                    <h3>Recommendations</h3>
                    <ul class="recommendations-list">
                        <li>Implement phishing-resistant authentication methods.</li>
                        <li>Deploy Admin By Request's multi-factor authentication for privilege elevation to add an essential security layer against these attacks.</li>
                        <li>Regularly audit authentication logs for suspicious patterns.</li>
                    </ul>
                </div>
            `;
        }
        
        if (selectedTopics.includes('compliance')) {
            reportContent += `
                <div class="report-topic-card compliance">
                    <h2>Compliance Framework Updates</h2>
                    <div class="topic-category">INFO</div>
                    <p class="topic-description">New regulatory requirements affecting security implementation standards.</p>
                    
                    <h3>Key Findings</h3>
                    <ul class="findings-list">
                        <li>Recent regulatory updates emphasize the principle of least privilege across all major frameworks.</li>
                        <li>Audit requirements have become more stringent, requiring detailed logs of all privileged access.</li>
                        <li>Non-compliance penalties have increased by an average of 35% across major regulations.</li>
                    </ul>
                    
                    <h3>Recommendations</h3>
                    <ul class="recommendations-list">
                        <li>Conduct a gap analysis against updated compliance requirements.</li>
                        <li>Utilize Admin By Request's comprehensive audit logs and reporting to help demonstrate compliance with these requirements.</li>
                        <li>Implement automated compliance monitoring and alerting.</li>
                    </ul>
                </div>
            `;
        }
        
        // Add footer with call to action
        reportContent += `
            <div class="report-footer">
                <p>Powered by Admin By Request</p>
                
                <div class="abr-logo">
                    <img src="ABR-Zero-Trust-On-Black-27.png" alt="Admin By Request" class="logo-img">
                    <span class="logo-tagline">ZERO TRUST PLATFORM</span>
                </div>
                
                <div class="report-cta">
                    <h3>Ready to enhance your cybersecurity?</h3>
                    <p>Take the next step with Admin By Request</p>
                    <div class="report-cta-buttons">
                        <a href="https://www.adminbyrequest.com/en/freeplandownload" target="_blank" class="cta-button free-plan">FREE PLAN</a>
                        <a href="https://www.adminbyrequest.com/en/contact?requestademo" target="_blank" class="cta-button book-demo">BOOK DEMO</a>
                        <a href="https://www.adminbyrequest.com/en/contact?contactsales" target="_blank" class="cta-button contact-sales">CONTACT SALES</a>
                    </div>
                </div>
            </div>
        `;
        
        reportPreview.innerHTML = reportContent;
    }
    
    // Form submission code for MailChimp form
    const mcForm = document.getElementById('mc-embedded-subscribe-form');

    if (mcForm) {
      mcForm.addEventListener('submit', function(event) {
        // Always prevent default form submission
        event.preventDefault();
        
        // Check if form is valid
        if (!mcForm.checkValidity()) {
          console.error('Form validation failed');
          mcForm.reportValidity(); // Show validation messages
          return;
        }

        // Push form submission event to Google Tag Manager dataLayer
        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'formSubmission',
            'formName': 'cybersecurityTrendsForm',
            'formAction': 'submit'
          });
        }

        // Change button text to show processing
        const submitButton = document.getElementById('mc-embedded-subscribe');
        if(submitButton){
          const originalValue = submitButton.value;
          submitButton.value = "Processing...";
          submitButton.disabled = true;
        }

        // Collect selected topics
        const topicsCheckboxes = document.querySelectorAll('input[name="topics"]:checked');
        const selectedTopics = Array.from(topicsCheckboxes).map(checkbox => checkbox.value);
        
        if (selectedTopics.length === 0) {
          alert("Please select at least one topic of interest.");
          if(submitButton) {
            submitButton.value = "EXPLORE CYBERSECURITY TRENDS";
            submitButton.disabled = false;
          }
          return;
        }
        
        // Get form data for report generation
        const firstName = document.getElementById('mce-FNAME').value || 'User';
        const companyName = document.getElementById('mce-COMPANY').value || 'your company';
        
        try {
          // Create FormData object for report
          const formData = new FormData();
          formData.append('TOPICS', selectedTopics.join(','));
          formData.append('FNAME', firstName);
          formData.append('COMPANY', companyName);
          
          // Generate and show the custom report
          generateCustomReport(formData);
          
          // Hide the form and show the report
          const reportBuilder = document.querySelector('.report-builder');
          const previewSection = document.getElementById('preview-section');
          
          if (reportBuilder && previewSection) {
            reportBuilder.style.display = 'none';
            previewSection.style.display = 'block';
            console.log("Form hidden, report shown");
            
            // Push report generation event to Google Tag Manager dataLayer
            if (window.dataLayer) {
              window.dataLayer.push({
                'event': 'reportGenerated',
                'reportType': 'cybersecurityTrends',
                'selectedTopics': selectedTopics.join(',')
              });
            }
          }
          
          // Add hidden fields for topics to the form
          // Create a hidden field for all topics as a single comma-separated string
          let allTopicsField = document.querySelector('input[name="ALLTOPICS"]');
          if (!allTopicsField) {
            allTopicsField = document.createElement('input');
            allTopicsField.type = 'hidden';
            allTopicsField.name = 'ALLTOPICS';
            mcForm.appendChild(allTopicsField);
          }
          allTopicsField.value = selectedTopics.join(',');
          
          // Add each topic as a separate field
          document.querySelectorAll('input[name="MMERGE7"]').forEach(el => el.remove());
          selectedTopics.forEach(topic => {
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'MMERGE7';
            hiddenInput.value = topic;
            mcForm.appendChild(hiddenInput);
          });
          
          // Try JSONP approach first
          try {
            // Set a timeout to detect if JSONP fails
            let jsonpTimeout = setTimeout(function() {
              // If we reach this point, JSONP failed or timed out
              console.log('JSONP request timed out, falling back to new tab submission');
              
              // Change form target to open in new tab
              mcForm.target = '_blank';
              
              // Change form action back to regular post URL
              mcForm.action = mcForm.action.replace('/post-json?', '/post?').replace('&c=mailchimpCallback', '');
              
              // Submit the form in a new tab
              mcForm.submit();
              
              // Reset button state
              if(submitButton) {
                submitButton.value = originalValue;
                submitButton.disabled = false;
              }
              
              // Push successful submission event to Google Tag Manager dataLayer
              if (window.dataLayer) {
                window.dataLayer.push({
                  'event': 'formSubmissionSuccess',
                  'formName': 'cybersecurityTrendsForm',
                  'formAction': 'success'
                });
              }
            }, 5000); // 5 second timeout
            
            // Submit the form data to MailChimp via JSONP
            const url = mcForm.action;
            const formData2 = new FormData(mcForm);
            const queryString = new URLSearchParams(formData2).toString();
            
            // Create a script element to handle the JSONP request
            const script = document.createElement('script');
            script.src = url + '&' + queryString;
            document.body.appendChild(script);
            
            // Define the callback function
            window.mailchimpCallback = function(response) {
              // Clear the timeout since we got a response
              clearTimeout(jsonpTimeout);
              
              // Remove the script element
              document.body.removeChild(script);
              
              if (response.result === 'success') {
                console.log('MailChimp form submission successful via JSONP');
              } else {
                console.log('MailChimp form submission error:', response.msg);
                
                // If there's an error with the JSONP submission, fall back to new tab
                if (response.result !== 'success') {
                  // Change form target to open in new tab
                  mcForm.target = '_blank';
                  
                  // Change form action back to regular post URL
                  mcForm.action = mcForm.action.replace('/post-json?', '/post?').replace('&c=mailchimpCallback', '');
                  
                  // Submit the form in a new tab
                  mcForm.submit();
                }
              }
              
              // Reset button state
              if(submitButton) {
                submitButton.value = originalValue;
                submitButton.disabled = false;
              }
              
              // Push successful submission event to Google Tag Manager dataLayer
              if (window.dataLayer) {
                window.dataLayer.push({
                  'event': 'formSubmissionSuccess',
                  'formName': 'cybersecurityTrendsForm',
                  'formAction': 'success'
                });
              }
            };
          } catch (error) {
            console.error('Error with JSONP submission:', error);
            
            // Fall back to new tab submission
            mcForm.target = '_blank';
            mcForm.action = mcForm.action.replace('/post-json?', '/post?').replace('&c=mailchimpCallback', '');
            mcForm.submit();
            
            // Reset button state
            if(submitButton) {
              submitButton.value = originalValue;
              submitButton.disabled = false;
            }
          }
          
        } catch (error) {
          console.error("Error generating report:", error);
          alert("There was an error generating your report. Please try again.");
          if(submitButton) {
            submitButton.value = "EXPLORE CYBERSECURITY TRENDS";
            submitButton.disabled = false;
          }
        }
      });
    }
    
    // Add event listener for "BACK HOME" button
    const backHomeBtn = document.getElementById('back-to-home');
    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            console.log("Back Home button clicked");
            
            // Scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            console.log("Scrolled to top of page");
        });
    } else {
        console.error("Back Home button not found!");
    }
});
