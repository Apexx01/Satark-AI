// Application data
const appData = {
  "market_stats": {
    "market_size_2025": 2.74,
    "market_size_2033": 6.25,
    "cagr": 12.5,
    "manual_cost_avg": 25000,
    "time_reduction": 50
  },
  "demo_vulnerabilities": [
    {
      "id": "CVE-2023-4567",
      "title": "SQL Injection in User Authentication",
      "severity": "Critical",
      "cvss_score": 9.1,
      "description": "SQL injection vulnerability allows attackers to bypass authentication",
      "affected_component": "Login Portal",
      "ai_recommendation": "Implement parameterized queries and input validation. Upgrade to latest framework version.",
      "remediation_effort": "2-4 hours",
      "business_impact": "Complete system compromise possible"
    },
    {
      "id": "CVE-2023-3456", 
      "title": "Cross-Site Scripting (XSS)",
      "severity": "High",
      "cvss_score": 7.4,
      "description": "Reflected XSS in search functionality allows code execution",
      "affected_component": "Search Module",
      "ai_recommendation": "Sanitize user inputs and implement Content Security Policy headers",
      "remediation_effort": "1-2 hours",
      "business_impact": "User session hijacking possible"
    },
    {
      "id": "CVE-2023-2345",
      "title": "Outdated OpenSSL Version",
      "severity": "Medium", 
      "cvss_score": 5.3,
      "description": "Server running vulnerable OpenSSL version susceptible to known exploits",
      "affected_component": "Web Server",
      "ai_recommendation": "Update OpenSSL to version 3.0.8 or later. Test thoroughly before deployment.",
      "remediation_effort": "30 minutes",
      "business_impact": "Potential data interception"
    },
    {
      "id": "INFO-2023-001",
      "title": "Missing Security Headers",
      "severity": "Low",
      "cvss_score": 2.1,
      "description": "Web application missing security headers like HSTS and X-Frame-Options",
      "affected_component": "Web Server Configuration", 
      "ai_recommendation": "Configure security headers: HSTS, X-Frame-Options, X-Content-Type-Options",
      "remediation_effort": "15 minutes",
      "business_impact": "Improved security posture"
    }
  ],
  "scan_history": [
    {
      "date": "2025-08-20",
      "status": "Completed",
      "target": "webapp.example.com",
      "duration": "45 minutes",
      "vulnerabilities_found": 12,
      "critical": 1,
      "high": 3,
      "medium": 5,
      "low": 3
    },
    {
      "date": "2025-08-15", 
      "status": "Completed",
      "target": "api.example.com",
      "duration": "32 minutes", 
      "vulnerabilities_found": 8,
      "critical": 0,
      "high": 2,
      "medium": 4,
      "low": 2
    },
    {
      "date": "2025-08-10",
      "status": "Completed",
      "target": "192.168.1.0/24",
      "duration": "78 minutes",
      "vulnerabilities_found": 15,
      "critical": 2,
      "high": 4, 
      "medium": 6,
      "low": 3
    }
  ],
  "pricing_tiers": [
    {
      "name": "Starter",
      "price": 29,
      "target": "Solo Developers & Freelancers",
      "features": ["5 scans per month", "Basic vulnerability reports", "Email support", "Standard scan types"],
      "savings": "Save $24,971 vs manual testing"
    },
    {
      "name": "Professional", 
      "price": 99,
      "target": "Small Teams (5-20 users)",
      "features": ["25 scans per month", "Advanced AI recommendations", "API access", "Priority support", "Custom integrations"],
      "savings": "Save $24,901 vs manual testing"
    },
    {
      "name": "Enterprise",
      "price": 299,
      "target": "Mid-size Companies (20-100 users)", 
      "features": ["Unlimited scans", "White-label reports", "SIEM integration", "24/7 support", "Custom scan profiles"],
      "savings": "Save $24,701 vs manual testing"
    }
  ]
};

// Global variables
let completionChart = null;
let trendsChart = null;
let currentSection = 'home';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  initializeNavigation();
  loadScanHistory();
  loadVulnerabilities();
  loadPricing();
  setupEventHandlers();
  
  // Initialize charts after a short delay to ensure DOM is ready
  setTimeout(() => {
    if (currentSection === 'dashboard') {
      initializeCharts();
    }
  }, 100);
});

// Setup all event handlers
function setupEventHandlers() {
  // Hero buttons
  const viewDemoBtn = document.querySelector('.hero-actions .btn--primary');
  const seePricingBtn = document.querySelector('.hero-actions .btn--outline');
  const getStartedBtn = document.querySelector('.navbar .btn--primary');
  
  if (viewDemoBtn) {
    viewDemoBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('View Demo clicked');
      showDashboard();
    });
  }
  
  if (seePricingBtn) {
    seePricingBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('See Pricing clicked');
      showPricing();
    });
  }

  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Get Started clicked');
      showDashboard();
    });
  }

  // Dashboard buttons
  const newScanBtn = document.querySelector('.dashboard-header .btn--primary');
  if (newScanBtn) {
    newScanBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('New Scan clicked');
      showScanConfig();
    });
  }

  // Dashboard action buttons
  const viewResultsBtn = document.querySelector('.dashboard-actions .btn--secondary');
  const askAIBtn = document.querySelector('.dashboard-actions .btn--outline');
  
  if (viewResultsBtn) {
    viewResultsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('View Latest Results clicked');
      showResults();
    });
  }

  if (askAIBtn) {
    askAIBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Ask AI Assistant clicked');
      showAIAssistant();
    });
  }

  // Scan config buttons
  const startScanBtn = document.querySelector('.scan-actions .btn--primary');
  const cancelScanBtn = document.querySelector('.scan-actions .btn--outline');
  
  if (startScanBtn) {
    startScanBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Start Scan clicked');
      startScan();
    });
  }

  if (cancelScanBtn) {
    cancelScanBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Cancel Scan clicked');
      showDashboard();
    });
  }

  // Results buttons
  const exportBtn = document.querySelector('.results-actions .btn--primary');
  const aiRecommendBtn = document.querySelector('.results-actions .btn--secondary');
  const backToDashBtn = document.querySelector('.results-actions .btn--outline');
  
  if (exportBtn) {
    exportBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Export PDF clicked');
      exportReport('PDF');
    });
  }

  if (aiRecommendBtn) {
    aiRecommendBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Get AI Recommendations clicked');
      showAIAssistant();
    });
  }

  if (backToDashBtn) {
    backToDashBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Back to Dashboard clicked');
      showDashboard();
    });
  }

  // AI Assistant buttons
  const chatSendBtn = document.querySelector('.chat-input-container .btn--primary');
  const aiBackBtn = document.querySelector('.ai-actions .btn--outline');
  
  if (chatSendBtn) {
    chatSendBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Send message clicked');
      sendMessage();
    });
  }

  if (aiBackBtn) {
    aiBackBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Back to Results clicked');
      showResults();
    });
  }

  // Chat input handler
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }

  // Suggestion buttons
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');
  suggestionBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const question = this.textContent;
      console.log('Suggestion clicked:', question);
      askQuestion(question);
    });
  });
}

// Navigation functions
function initializeNavigation() {
  console.log('Initializing navigation...');
  const navLinks = document.querySelectorAll('.nav-link');
  console.log('Found nav links:', navLinks.length);
  
  navLinks.forEach((link, index) => {
    console.log(`Setting up nav link ${index}:`, link.getAttribute('href'));
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('href').substring(1);
      console.log('Navigating to:', targetSection);
      showSection(targetSection);
      updateActiveNavLink(this);
    });
  });
}

function showSection(sectionId) {
  console.log('Showing section:', sectionId);
  
  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('section--active');
  });
  
  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('section--active');
    currentSection = sectionId;
    console.log('Successfully switched to section:', sectionId);
    
    // Initialize charts if dashboard is shown
    if (sectionId === 'dashboard') {
      setTimeout(initializeCharts, 200);
    }
  } else {
    console.error('Section not found:', sectionId);
  }
}

function updateActiveNavLink(activeLink) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

// Quick navigation functions
function showDashboard() {
  console.log('showDashboard called');
  showSection('dashboard');
  const dashboardLink = document.querySelector('.nav-link[href="#dashboard"]');
  updateActiveNavLink(dashboardLink);
}

function showPricing() {
  console.log('showPricing called');
  showSection('pricing');
  const pricingLink = document.querySelector('.nav-link[href="#pricing"]');
  updateActiveNavLink(pricingLink);
}

function showScanConfig() {
  console.log('showScanConfig called');
  showSection('scan-config');
}

function showResults() {
  console.log('showResults called');
  showSection('results');
}

function showAIAssistant() {
  console.log('showAIAssistant called');
  showSection('ai-assistant');
}

// Load scan history
function loadScanHistory() {
  const scanList = document.getElementById('scanList');
  if (!scanList) {
    console.log('Scan list element not found');
    return;
  }
  
  console.log('Loading scan history...');
  scanList.innerHTML = '';
  
  appData.scan_history.forEach((scan, index) => {
    const scanItem = document.createElement('div');
    scanItem.className = 'scan-item';
    scanItem.style.cursor = 'pointer';
    scanItem.addEventListener('click', function() {
      console.log('Scan item clicked:', index);
      showResults();
    });
    
    scanItem.innerHTML = `
      <div class="scan-info">
        <h4>${scan.target}</h4>
        <div class="scan-meta">${scan.date} • ${scan.duration} • ${scan.vulnerabilities_found} vulnerabilities</div>
      </div>
      <span class="status status--success">${scan.status}</span>
    `;
    
    scanList.appendChild(scanItem);
  });
  console.log('Scan history loaded successfully');
}

// Load vulnerabilities
function loadVulnerabilities() {
  const vulnerabilitiesList = document.getElementById('vulnerabilitiesList');
  if (!vulnerabilitiesList) {
    console.log('Vulnerabilities list element not found');
    return;
  }
  
  console.log('Loading vulnerabilities...');
  vulnerabilitiesList.innerHTML = '';
  
  appData.demo_vulnerabilities.forEach(vuln => {
    const vulnItem = document.createElement('div');
    vulnItem.className = 'vulnerability-item';
    
    const severityClass = vuln.severity.toLowerCase();
    const statusClass = severityClass === 'critical' ? 'error' : 
                       severityClass === 'high' ? 'warning' : 
                       severityClass === 'medium' ? 'warning' : 'info';
    
    vulnItem.innerHTML = `
      <div class="vuln-header">
        <div class="vuln-title">
          <h3>${vuln.title}</h3>
          <div class="vuln-id">${vuln.id}</div>
        </div>
        <div class="cvss-score">${vuln.cvss_score}</div>
      </div>
      <div class="vuln-description">${vuln.description}</div>
      <div class="vuln-details">
        <div class="detail-item">
          <span class="detail-label">Severity</span>
          <span class="detail-value">
            <span class="status status--${statusClass}">
              ${vuln.severity}
            </span>
          </span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Affected Component</span>
          <span class="detail-value">${vuln.affected_component}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Remediation Effort</span>
          <span class="detail-value">${vuln.remediation_effort}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Business Impact</span>
          <span class="detail-value">${vuln.business_impact}</span>
        </div>
      </div>
      <div class="ai-recommendation">
        <h4>🤖 AI Recommendation</h4>
        <p>${vuln.ai_recommendation}</p>
      </div>
    `;
    
    vulnerabilitiesList.appendChild(vulnItem);
  });
  console.log('Vulnerabilities loaded successfully');
}

// Load pricing
function loadPricing() {
  const pricingGrid = document.getElementById('pricingGrid');
  if (!pricingGrid) {
    console.log('Pricing grid element not found');
    return;
  }
  
  console.log('Loading pricing...');
  pricingGrid.innerHTML = '';
  
  appData.pricing_tiers.forEach((tier, index) => {
    const pricingCard = document.createElement('div');
    pricingCard.className = `pricing-card ${index === 1 ? 'featured' : ''}`;
    
    const choosePlanBtn = document.createElement('button');
    choosePlanBtn.className = 'btn btn--primary btn--full-width';
    choosePlanBtn.textContent = 'Choose Plan';
    choosePlanBtn.addEventListener('click', function(e) {
      e.preventDefault();
      choosePlan(tier.name);
    });
    
    pricingCard.innerHTML = `
      <div class="pricing-header">
        <h3>${tier.name}</h3>
        <div class="pricing-price">$${tier.price}<span>/month</span></div>
        <div class="pricing-target">${tier.target}</div>
      </div>
      <ul class="pricing-features">
        ${tier.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      <div class="pricing-savings">${tier.savings}</div>
    `;
    
    pricingCard.appendChild(choosePlanBtn);
    pricingGrid.appendChild(pricingCard);
  });
  console.log('Pricing loaded successfully');
}

// Plan selection
function choosePlan(planName) {
  console.log('Plan chosen:', planName);
  alert(`Thanks for choosing the ${planName} plan! In a real application, this would redirect to payment processing.`);
}

// Initialize charts
function initializeCharts() {
  console.log('Initializing charts...');
  initializeCompletionChart();
  initializeTrendsChart();
}

function initializeCompletionChart() {
  const ctx = document.getElementById('completionChart');
  if (!ctx) {
    console.log('Completion chart canvas not found');
    return;
  }
  
  console.log('Creating completion chart...');
  
  if (completionChart) {
    completionChart.destroy();
  }
  
  completionChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'In Progress', 'Scheduled'],
      datasets: [{
        data: [85, 10, 5],
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true
          }
        }
      }
    }
  });
}

function initializeTrendsChart() {
  const ctx = document.getElementById('trendsChart');
  if (!ctx) {
    console.log('Trends chart canvas not found');
    return;
  }
  
  console.log('Creating trends chart...');
  
  if (trendsChart) {
    trendsChart.destroy();
  }
  
  trendsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Aug 10', 'Aug 15', 'Aug 20'],
      datasets: [{
        label: 'Critical',
        data: [2, 0, 1],
        borderColor: '#B4413C',
        backgroundColor: 'rgba(180, 65, 60, 0.1)',
        tension: 0.4
      }, {
        label: 'High',
        data: [4, 2, 3],
        borderColor: '#FFC185',
        backgroundColor: 'rgba(255, 193, 133, 0.1)',
        tension: 0.4
      }, {
        label: 'Medium',
        data: [6, 4, 5],
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0,0,0,0.1)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// Scan configuration
function startScan() {
  console.log('Starting scan...');
  
  // Show loading state
  const button = event.target;
  const originalText = button.textContent;
  button.innerHTML = '<span class="loading"></span> Starting Scan...';
  button.disabled = true;
  
  // Simulate scan process
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    showResults();
    
    // Add a success message
    const alertDiv = document.createElement('div');
    alertDiv.className = 'status status--success';
    alertDiv.textContent = 'Scan completed successfully! View results below.';
    alertDiv.style.marginBottom = '20px';
    
    const resultsContainer = document.querySelector('#results .container');
    if (resultsContainer) {
      resultsContainer.insertBefore(alertDiv, resultsContainer.firstChild);
      
      // Remove alert after 3 seconds
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.remove();
        }
      }, 3000);
    }
  }, 3000);
}

// AI Assistant functionality
function sendMessage() {
  const input = document.getElementById('chatInput');
  const messagesContainer = document.getElementById('chatMessages');
  
  if (!input || !messagesContainer || !input.value.trim()) {
    console.log('Chat input validation failed');
    return;
  }
  
  console.log('Sending message:', input.value);
  
  // Add user message
  const userMessage = document.createElement('div');
  userMessage.className = 'chat-message chat-user';
  userMessage.innerHTML = `<div class="message-content">${input.value}</div>`;
  messagesContainer.appendChild(userMessage);
  
  const userQuestion = input.value;
  input.value = '';
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Simulate AI response
  setTimeout(() => {
    const aiResponse = getAIResponse(userQuestion);
    const aiMessage = document.createElement('div');
    aiMessage.className = 'chat-message chat-ai';
    aiMessage.innerHTML = `<div class="message-content"><strong>SecureAI Assistant:</strong> ${aiResponse}</div>`;
    messagesContainer.appendChild(aiMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 1500);
}

function askQuestion(question) {
  console.log('Asking question:', question);
  const input = document.getElementById('chatInput');
  if (input) {
    input.value = question;
    sendMessage();
  }
}

function getAIResponse(question) {
  const responses = {
    'fix': 'To fix the SQL injection vulnerability, you should: 1) Use parameterized queries instead of string concatenation, 2) Implement input validation and sanitization, 3) Apply the principle of least privilege to database accounts, 4) Update your framework to the latest version. This should take approximately 2-4 hours to implement properly.',
    'prioritize': 'Based on the CVSS scores and business impact, I recommend prioritizing in this order: 1) SQL Injection (Critical - 9.1 CVSS) - immediate risk of system compromise, 2) XSS (High - 7.4 CVSS) - user session hijacking risk, 3) OpenSSL update (Medium - 5.3 CVSS) - potential data interception, 4) Security headers (Low - 2.1 CVSS) - general security improvement.',
    'impact': 'The SQL injection vulnerability has severe business impact: complete system compromise is possible, allowing attackers to access sensitive data, modify records, or gain administrative privileges. This could lead to data breaches, compliance violations, financial losses, and reputation damage. Immediate remediation is critical.',
    'default': 'I can help you understand vulnerabilities, prioritize fixes, explain remediation steps, and assess business impact. What specific aspect would you like me to explain in more detail?'
  };
  
  const lowerQuestion = question.toLowerCase();
  
  for (const [key, response] of Object.entries(responses)) {
    if (lowerQuestion.includes(key)) {
      return response;
    }
  }
  
  return responses.default;
}

// Export functionality (simulated)
function exportReport(format) {
  console.log('Exporting report:', format);
  const button = event.target;
  const originalText = button.textContent;
  button.innerHTML = '<span class="loading"></span> Generating...';
  button.disabled = true;
  
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    
    // Simulate download
    const alertDiv = document.createElement('div');
    alertDiv.className = 'status status--success';
    alertDiv.textContent = `${format} report generated successfully!`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '100px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 3000);
  }, 2000);
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function getSeverityColor(severity) {
  const colors = {
    'Critical': '#B4413C',
    'High': '#FFC185', 
    'Medium': '#D2BA4C',
    'Low': '#1FB8CD'
  };
  return colors[severity] || '#1FB8CD';
}

// Add click tracking to major buttons
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn')) {
    console.log('Button clicked:', e.target.textContent.trim(), 'in section:', currentSection);
  }
});