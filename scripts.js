// AI Ecosystem Interactive Report - JavaScript Implementation
// Author: Claude Code
// Description: Comprehensive JavaScript for the interactive AI ecosystem report

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AI Ecosystem Interactive Report - Initializing...');
    
    // Initialize all modules
    initializeNavigation();
    initializeMarketDashboard();
    initializeHardwareSimulator();
    initializeFrameworkComparison();
    initializeAttentionVisualizer();
    initializeModelUniverse();
    initializePricingCalculator();
    initializeModelComparison();
    initializeDecisionFramework();
    initializeAgentEvolution();
    initializeToolWorkflow();
    initializeMCPArchitecture();
    initializePlatformEcosystem();
    initializePracticalApplications();
    initializeFutureOutlook();
    initializeGlossary();
    initializeScrollFeatures();
    initializeSearchFunctionality();
    initializeAnimations();
    
    console.log('✅ All modules initialized successfully');
});

// ================================
// Navigation & Core UI
// ================================

function initializeNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const navLinks = document.querySelectorAll('.nav-link, .nav-sublink');

    // Mobile menu toggle
    if (menuToggle && sidebarNav) {
        menuToggle.addEventListener('click', () => {
            sidebarNav.classList.toggle('open');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active states
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                if (sidebarNav.classList.contains('open')) {
                    sidebarNav.classList.remove('open');
                }
            }
        });
    });

    // Scroll spy for active navigation highlighting
    setupScrollSpy();
}

function setupScrollSpy() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { 
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0.1 
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ================================
// Market Dynamics Dashboard
// ================================

function initializeMarketDashboard() {
    animateMetricCards();
    animateEcosystemItems();
}

function animateMetricCards() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach((card, index) => {
        const metricValue = card.querySelector('.metric-value');
        const target = parseFloat(metricValue.getAttribute('data-target'));
        
        // Delayed animation for staggered effect
        setTimeout(() => {
            animateCounter(metricValue, 0, target, 2000);
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
    });
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const prefix = element.textContent.includes('$') ? '$' : '';
    const suffix = element.textContent.includes('B') ? 'B' : '';
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;
        
        element.textContent = `${prefix}${current.toFixed(current < 10 ? 2 : 0)}${suffix}`;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function animateEcosystemItems() {
    const ecosystemItems = document.querySelectorAll('.ecosystem-item');
    
    ecosystemItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Add click interaction with ripple effect
        item.addEventListener('click', createRippleEffect);
    });
}

function createRippleEffect(e) {
    const item = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = item.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple CSS if not already present
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    item.style.position = 'relative';
    item.style.overflow = 'hidden';
    item.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ================================
// Hardware Performance Simulator
// ================================

function initializeHardwareSimulator() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active states
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active states
            btn.classList.add('active');
            const targetTab = document.getElementById(`${tabId}-tab`);
            if (targetTab) {
                targetTab.classList.add('active');
            }
            
            // Update performance chart
            updateHardwareChart(tabId);
        });
    });
    
    // Initialize with CPU tab
    updateHardwareChart('cpu');
}

function updateHardwareChart(hardwareType) {
    const ctx = document.getElementById('hardwarePerformanceChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.hardwareChart) {
        window.hardwareChart.destroy();
    }
    
    const performanceData = {
        cpu: {
            label: 'CPU Performance',
            data: [1, 2, 3, 5, 8, 15, 30],
            backgroundColor: 'rgba(74, 144, 226, 0.2)',
            borderColor: 'rgba(74, 144, 226, 1)',
            description: 'Sequential processing power'
        },
        gpu: {
            label: 'GPU Performance', 
            data: [50, 100, 200, 400, 800, 1500, 3000],
            backgroundColor: 'rgba(81, 207, 102, 0.2)',
            borderColor: 'rgba(81, 207, 102, 1)',
            description: 'Parallel processing power'
        },
        tpu: {
            label: 'TPU Performance',
            data: [100, 250, 500, 1000, 2000, 4000, 8000],
            backgroundColor: 'rgba(255, 107, 107, 0.2)',
            borderColor: 'rgba(255, 107, 107, 1)',
            description: 'AI-optimized processing power'
        }
    };
    
    const data = performanceData[hardwareType];
    
    window.hardwareChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1B', '5B', '10B', '50B', '100B', '500B', '1T'],
            datasets: [{
                label: data.label,
                data: data.data,
                backgroundColor: data.backgroundColor,
                borderColor: data.borderColor,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: data.borderColor,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `${data.label} vs Model Parameters`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                subtitle: {
                    display: true,
                    text: data.description,
                    font: {
                        size: 12
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Training Speed (relative)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Model Parameters'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// ================================
// Framework Comparison
// ================================

function initializeFrameworkComparison() {
    const frameworkCards = document.querySelectorAll('.framework-card');
    
    frameworkCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Pause other animations
            frameworkCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            frameworkCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
        
        // Add interactive popularity bars
        const popularityBar = card.querySelector('.popularity-bar');
        if (popularityBar) {
            card.addEventListener('click', () => {
                popularityBar.style.animation = 'none';
                setTimeout(() => {
                    popularityBar.style.animation = 'pulse 1s ease-in-out';
                }, 10);
            });
        }
    });
}

// ================================
// Attention Mechanism Visualizer
// ================================

function initializeAttentionVisualizer() {
    const visualizeBtn = document.getElementById('visualizeAttention');
    const sentenceInput = document.getElementById('attentionSentence');
    const attentionMatrix = document.getElementById('attentionMatrix');
    
    if (visualizeBtn && sentenceInput && attentionMatrix) {
        visualizeBtn.addEventListener('click', () => {
            const sentence = sentenceInput.value.trim();
            if (sentence) {
                visualizeAttention(sentence, attentionMatrix);
            }
        });
        
        // Allow Enter key to trigger visualization
        sentenceInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                visualizeBtn.click();
            }
        });
    }
}

function visualizeAttention(sentence, container) {
    const words = sentence.split(' ');
    container.innerHTML = '';
    
    if (words.length === 0) return;
    
    // Create attention matrix visualization
    const matrixContainer = document.createElement('div');
    matrixContainer.style.cssText = `
        display: grid;
        grid-template-columns: repeat(${words.length}, 1fr);
        gap: 2px;
        padding: 20px;
        background: white;
        border-radius: 8px;
    `;
    
    // Add word labels
    const wordsContainer = document.createElement('div');
    wordsContainer.style.cssText = `
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-weight: 600;
        color: #002349;
    `;
    
    words.forEach(word => {
        const wordLabel = document.createElement('span');
        wordLabel.textContent = word;
        wordLabel.style.cssText = `
            padding: 4px 8px;
            background: #f1f5f9;
            border-radius: 4px;
            font-size: 12px;
        `;
        wordsContainer.appendChild(wordLabel);
    });
    
    // Generate attention scores (simplified simulation)
    const attentionScores = generateAttentionScores(words);
    
    // Create attention cells
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words.length; j++) {
            const cell = document.createElement('div');
            const score = attentionScores[i][j];
            const intensity = Math.round(score * 255);
            
            cell.style.cssText = `
                width: 40px;
                height: 40px;
                background: rgba(74, 144, 226, ${score});
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                font-weight: bold;
                color: ${score > 0.5 ? 'white' : '#002349'};
                cursor: pointer;
                transition: transform 0.2s ease;
            `;
            
            cell.textContent = score.toFixed(2);
            cell.title = `Attention from "${words[i]}" to "${words[j]}": ${score.toFixed(3)}`;
            
            cell.addEventListener('mouseenter', () => {
                cell.style.transform = 'scale(1.2)';
                cell.style.zIndex = '10';
            });
            
            cell.addEventListener('mouseleave', () => {
                cell.style.transform = 'scale(1)';
                cell.style.zIndex = '1';
            });
            
            matrixContainer.appendChild(cell);
        }
    }
    
    container.appendChild(wordsContainer);
    container.appendChild(matrixContainer);
    
    // Add explanation
    const explanation = document.createElement('div');
    explanation.style.cssText = `
        margin-top: 15px;
        padding: 15px;
        background: #f8fafc;
        border-radius: 8px;
        font-size: 14px;
        color: #64748b;
    `;
    explanation.innerHTML = `
        <strong>How to read this:</strong> Each cell shows how much attention word <em>i</em> pays to word <em>j</em>. 
        Darker blue means stronger attention. Hover over cells to see exact values. This is a simplified 
        simulation - real attention mechanisms are much more complex!
    `;
    container.appendChild(explanation);
}

function generateAttentionScores(words) {
    const n = words.length;
    const scores = Array(n).fill().map(() => Array(n).fill(0));
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i === j) {
                // Self-attention is usually strong
                scores[i][j] = 0.7 + Math.random() * 0.3;
            } else {
                // Distance-based attention with some randomness
                const distance = Math.abs(i - j);
                const baseScore = Math.max(0.1, 1.0 / (1 + distance * 0.5));
                scores[i][j] = baseScore * (0.5 + Math.random() * 0.5);
            }
        }
        
        // Normalize scores for each query word
        const sum = scores[i].reduce((a, b) => a + b, 0);
        for (let j = 0; j < n; j++) {
            scores[i][j] /= sum;
        }
    }
    
    return scores;
}

// ================================
// Model Universe Explorer
// ================================

function initializeModelUniverse() {
    const typeFilter = document.getElementById('modelTypeFilter');
    const sortBy = document.getElementById('modelSortBy');
    
    if (typeFilter && sortBy) {
        typeFilter.addEventListener('change', updateModelChart);
        sortBy.addEventListener('change', updateModelChart);
    }
    
    // Initialize the chart
    updateModelChart();
}

const modelData = [
    {
        name: 'GPT-5',
        developer: 'OpenAI',
        type: 'proprietary',
        performance: 95,
        contextWindow: 400000,
        price: 1.25,
        modalities: ['text', 'code', 'image']
    },
    {
        name: 'Claude 4 Opus',
        developer: 'Anthropic',
        type: 'proprietary',
        performance: 92,
        contextWindow: 200000,
        price: 15.00,
        modalities: ['text', 'image', 'code']
    },
    {
        name: 'Gemini 2.5 Pro',
        developer: 'Google',
        type: 'proprietary',
        performance: 90,
        contextWindow: 1000000,
        price: 1.25,
        modalities: ['text', 'image', 'audio', 'video', 'code']
    },
    {
        name: 'Llama 4 Scout',
        developer: 'Meta',
        type: 'open-source',
        performance: 85,
        contextWindow: 10000000,
        price: 0,
        modalities: ['text', 'code']
    },
    {
        name: 'Claude 4 Sonnet',
        developer: 'Anthropic',
        type: 'proprietary',
        performance: 88,
        contextWindow: 200000,
        price: 3.00,
        modalities: ['text', 'image', 'code']
    },
    {
        name: 'Llama 3.1 405B',
        developer: 'Meta',
        type: 'open-source',
        performance: 82,
        contextWindow: 128000,
        price: 0,
        modalities: ['text', 'code']
    },
    {
        name: 'Mistral Large 2',
        developer: 'Mistral AI',
        type: 'proprietary',
        performance: 86,
        contextWindow: 128000,
        price: 2.00,
        modalities: ['text', 'code']
    },
    {
        name: 'DeepSeek R1',
        developer: 'DeepSeek',
        type: 'open-source',
        performance: 84,
        contextWindow: 128000,
        price: 0,
        modalities: ['text', 'code']
    }
];

function updateModelChart() {
    const typeFilter = document.getElementById('modelTypeFilter');
    const sortBy = document.getElementById('modelSortBy');
    const ctx = document.getElementById('modelUniverseChart');
    
    if (!ctx) return;
    
    const filterType = typeFilter ? typeFilter.value : 'all';
    const sortCriteria = sortBy ? sortBy.value : 'performance';
    
    // Filter data
    let filteredData = modelData;
    if (filterType !== 'all') {
        if (filterType === 'multimodal') {
            filteredData = modelData.filter(model => model.modalities.length > 2);
        } else {
            filteredData = modelData.filter(model => model.type === filterType);
        }
    }
    
    // Destroy existing chart
    if (window.modelChart) {
        window.modelChart.destroy();
    }
    
    // Create scatter plot
    const datasets = [{
        label: 'Proprietary Models',
        data: filteredData.filter(m => m.type === 'proprietary').map(model => ({
            x: model.contextWindow / 1000, // Convert to thousands
            y: model.performance,
            label: model.name,
            price: model.price,
            developer: model.developer
        })),
        backgroundColor: 'rgba(74, 144, 226, 0.7)',
        borderColor: 'rgba(74, 144, 226, 1)',
        pointRadius: 8,
        pointHoverRadius: 12
    }, {
        label: 'Open Source Models',
        data: filteredData.filter(m => m.type === 'open-source').map(model => ({
            x: model.contextWindow / 1000,
            y: model.performance,
            label: model.name,
            price: model.price,
            developer: model.developer
        })),
        backgroundColor: 'rgba(81, 207, 102, 0.7)',
        borderColor: 'rgba(81, 207, 102, 1)',
        pointRadius: 8,
        pointHoverRadius: 12
    }];
    
    window.modelChart = new Chart(ctx, {
        type: 'scatter',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'AI Model Universe: Performance vs Context Window',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].raw.label;
                        },
                        label: function(context) {
                            const data = context.raw;
                            return [
                                `Developer: ${data.developer}`,
                                `Performance: ${data.y}/100`,
                                `Context: ${(data.x * 1000).toLocaleString()} tokens`,
                                `Price: ${data.price === 0 ? 'Free (open-source)' : '$' + data.price + '/1M tokens'}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Context Window (thousands of tokens)'
                    },
                    min: 100,
                    max: 10000
                },
                y: {
                    title: {
                        display: true,
                        text: 'Performance Score'
                    },
                    min: 70,
                    max: 100
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// ================================
// Pricing Calculator
// ================================

function initializePricingCalculator() {
    const inputTokens = document.getElementById('inputTokens');
    const outputTokens = document.getElementById('outputTokens');
    const usageFrequency = document.getElementById('usageFrequency');
    
    if (inputTokens && outputTokens && usageFrequency) {
        [inputTokens, outputTokens, usageFrequency].forEach(input => {
            input.addEventListener('input', updatePricingCalculation);
        });
        
        // Initial calculation
        updatePricingCalculation();
    }
}

const pricingData = {
    'gpt5': { input: 1.25, output: 10.00, name: 'GPT-5' },
    'claude': { input: 3.00, output: 15.00, name: 'Claude 4 Sonnet' },
    'gemini': { input: 1.25, output: 10.00, name: 'Gemini 2.5 Pro' }
};

function updatePricingCalculation() {
    const inputTokens = parseFloat(document.getElementById('inputTokens')?.value || 1);
    const outputTokens = parseFloat(document.getElementById('outputTokens')?.value || 1);
    const frequency = document.getElementById('usageFrequency')?.value || 'medium';
    
    const multipliers = {
        low: 10,
        medium: 1000,
        high: 10000
    };
    
    const multiplier = multipliers[frequency];
    
    Object.keys(pricingData).forEach(modelKey => {
        const costElement = document.getElementById(`${modelKey}Cost`);
        if (costElement) {
            const model = pricingData[modelKey];
            const totalCost = (inputTokens * model.input + outputTokens * model.output) * multiplier;
            
            costElement.textContent = `$${totalCost.toFixed(2)}`;
            
            // Add visual feedback for cost comparison
            const costItem = costElement.closest('.cost-item');
            if (costItem) {
                costItem.style.background = `linear-gradient(135deg, white 0%, ${getCostColor(totalCost)} 100%)`;
            }
        }
    });
}

function getCostColor(cost) {
    if (cost < 50) return '#f0fdf4';      // Light green
    if (cost < 200) return '#fefce8';     // Light yellow
    if (cost < 500) return '#fef2f2';     // Light red
    return '#fdf2f8';                     // Light pink
}

// ================================
// Model Comparison Table
// ================================

function initializeModelComparison() {
    populateModelTable();
    initializeTableSearch();
    initializeTableSort();
    initializeTableExport();
}

function populateModelTable() {
    const tableBody = document.getElementById('modelsTableBody');
    if (!tableBody) return;
    
    const tableData = [
        {
            name: 'GPT-5',
            developer: 'OpenAI',
            license: 'Proprietary',
            modalities: 'Text, Code, Image',
            context: '400,000',
            strengths: 'State-of-the-art coding and agentic tasks',
            pricing: '$1.25 / $10.00'
        },
        {
            name: 'GPT-4o',
            developer: 'OpenAI',
            license: 'Proprietary',
            modalities: 'Text, Image, Audio',
            context: '128,000',
            strengths: 'Versatile, high-intelligence flagship model',
            pricing: '$2.50 / $10.00'
        },
        {
            name: 'Claude 4 Opus',
            developer: 'Anthropic',
            license: 'Proprietary',
            modalities: 'Text, Image, Code',
            context: '200,000',
            strengths: 'Advanced reasoning, coding, safety alignment',
            pricing: '$15.00 / $75.00'
        },
        {
            name: 'Claude 4 Sonnet',
            developer: 'Anthropic',
            license: 'Proprietary',
            modalities: 'Text, Image, Code',
            context: '200,000',
            strengths: 'Balance of performance and efficiency',
            pricing: '$3.00 / $15.00'
        },
        {
            name: 'Gemini 2.5 Pro',
            developer: 'Google',
            license: 'Proprietary',
            modalities: 'Text, Image, Audio, Video, Code',
            context: '1,000,000',
            strengths: 'Native multimodality, long context, deep reasoning',
            pricing: '$1.25 / $10.00'
        },
        {
            name: 'Llama 4 Scout',
            developer: 'Meta AI',
            license: 'Open Source',
            modalities: 'Text, Code',
            context: '10,000,000',
            strengths: 'Massive context window, strong open-source performance',
            pricing: 'Free (self-hosted)'
        },
        {
            name: 'Llama 3.1 405B',
            developer: 'Meta AI',
            license: 'Open Source',
            modalities: 'Text, Code',
            context: '128,000',
            strengths: 'Flagship open-source model, strong multilingual support',
            pricing: 'Free (self-hosted)'
        },
        {
            name: 'Mistral Large 2',
            developer: 'Mistral AI',
            license: 'Proprietary',
            modalities: 'Text, Code',
            context: '128,000',
            strengths: 'High efficiency (MoE), strong European competitor',
            pricing: 'Varies by provider'
        },
        {
            name: 'DeepSeek R1',
            developer: 'DeepSeek',
            license: 'Open Source',
            modalities: 'Text, Code',
            context: '128,000',
            strengths: 'State-of-the-art open-source reasoning model',
            pricing: 'Free (self-hosted)'
        }
    ];
    
    tableBody.innerHTML = tableData.map(row => `
        <tr>
            <td><strong>${row.name}</strong></td>
            <td>${row.developer}</td>
            <td><span class="license-badge ${row.license.toLowerCase().replace(' ', '-')}">${row.license}</span></td>
            <td>${row.modalities}</td>
            <td>${row.context}</td>
            <td>${row.strengths}</td>
            <td>${row.pricing}</td>
        </tr>
    `).join('');
    
    // Add license badge styles
    if (!document.querySelector('#license-styles')) {
        const style = document.createElement('style');
        style.id = 'license-styles';
        style.textContent = `
            .license-badge {
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
                white-space: nowrap;
            }
            .license-badge.proprietary {
                background: #fee2e2;
                color: #dc2626;
            }
            .license-badge.open-source {
                background: #dcfce7;
                color: #16a34a;
            }
        `;
        document.head.appendChild(style);
    }
}

function initializeTableSearch() {
    const searchInput = document.getElementById('modelSearch');
    const tableBody = document.getElementById('modelsTableBody');
    
    if (searchInput && tableBody) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = tableBody.querySelectorAll('tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
}

function initializeTableSort() {
    const table = document.getElementById('modelsTable');
    if (!table) return;
    
    const headers = table.querySelectorAll('th[data-sort]');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const sortKey = header.getAttribute('data-sort');
            sortTable(table, sortKey);
        });
    });
}

function sortTable(table, sortKey) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    const sortedRows = rows.sort((a, b) => {
        const aValue = getCellValue(a, sortKey);
        const bValue = getCellValue(b, sortKey);
        
        // Handle numeric sorting for context windows
        if (sortKey === 'context') {
            const aNum = parseInt(aValue.replace(/,/g, ''));
            const bNum = parseInt(bValue.replace(/,/g, ''));
            return bNum - aNum;
        }
        
        return aValue.localeCompare(bValue);
    });
    
    // Clear and re-append sorted rows
    tbody.innerHTML = '';
    sortedRows.forEach(row => tbody.appendChild(row));
}

function getCellValue(row, sortKey) {
    const cellIndex = {
        'name': 0,
        'developer': 1,
        'license': 2,
        'modalities': 3,
        'context': 4,
        'strengths': 5,
        'pricing': 6
    };
    
    const cell = row.cells[cellIndex[sortKey]];
    return cell ? cell.textContent.trim() : '';
}

function initializeTableExport() {
    const exportBtn = document.getElementById('exportTable');
    const table = document.getElementById('modelsTable');
    
    if (exportBtn && table) {
        exportBtn.addEventListener('click', () => {
            exportTableToCSV(table, 'ai-models-comparison.csv');
        });
    }
}

function exportTableToCSV(table, filename) {
    const rows = Array.from(table.querySelectorAll('tr'));
    const csv = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(cell => {
            const text = cell.textContent.trim();
            return `"${text.replace(/"/g, '""')}"`;
        }).join(',');
    }).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
}

// ================================
// Decision Framework
// ================================

function initializeDecisionFramework() {
    const getRecommendationBtn = document.getElementById('getRecommendation');
    const resultDiv = document.getElementById('recommendationResult');
    
    if (getRecommendationBtn && resultDiv) {
        getRecommendationBtn.addEventListener('click', () => {
            const answers = getQuestionnaireAnswers();
            const recommendation = generateRecommendation(answers);
            displayRecommendation(recommendation, resultDiv);
        });
    }
}

function getQuestionnaireAnswers() {
    const questions = ['useCase', 'dataSensitivity', 'expertise', 'budget'];
    const answers = {};
    
    questions.forEach(question => {
        const selected = document.querySelector(`input[name="${question}"]:checked`);
        answers[question] = selected ? selected.value : null;
    });
    
    return answers;
}

function generateRecommendation(answers) {
    const { useCase, dataSensitivity, expertise, budget } = answers;
    
    // Decision logic
    let recommendation = {
        type: '',
        models: [],
        reasoning: [],
        confidence: 0
    };
    
    // High-level decision tree
    if (dataSensitivity === 'regulated' || dataSensitivity === 'confidential') {
        recommendation.type = 'Open Source';
        recommendation.models = ['Llama 4 Scout', 'DeepSeek R1', 'Llama 3.1 405B'];
        recommendation.reasoning.push('Data privacy and compliance requirements favor self-hosted open-source models');
        recommendation.confidence = 90;
    } else if (budget === 'minimal') {
        recommendation.type = 'Open Source';
        recommendation.models = ['Llama 3.1 405B', 'DeepSeek R1', 'Mistral Large 2'];
        recommendation.reasoning.push('Budget constraints make open-source models the practical choice');
        recommendation.confidence = 85;
    } else if (useCase === 'research' && expertise === 'expert') {
        recommendation.type = 'Mixed Strategy';
        recommendation.models = ['GPT-5', 'Claude 4 Opus', 'Llama 4 Scout'];
        recommendation.reasoning.push('Research benefits from access to both cutting-edge proprietary and customizable open-source models');
        recommendation.confidence = 80;
    } else if (useCase === 'enterprise' && budget !== 'minimal') {
        recommendation.type = 'Proprietary';
        recommendation.models = ['Claude 4 Sonnet', 'GPT-5', 'Gemini 2.5 Pro'];
        recommendation.reasoning.push('Enterprise use cases benefit from reliability, support, and performance of proprietary models');
        recommendation.confidence = 85;
    } else {
        recommendation.type = 'Proprietary';
        recommendation.models = ['Claude 4 Sonnet', 'GPT-4o', 'Gemini 2.5 Pro'];
        recommendation.reasoning.push('General use cases are well-served by accessible proprietary models');
        recommendation.confidence = 75;
    }
    
    // Add expertise-based reasoning
    if (expertise === 'beginner') {
        recommendation.reasoning.push('Limited technical expertise favors managed API solutions');
    } else if (expertise === 'expert') {
        recommendation.reasoning.push('Advanced technical skills enable self-hosting and fine-tuning');
    }
    
    return recommendation;
}

function displayRecommendation(recommendation, container) {
    const { type, models, reasoning, confidence } = recommendation;
    
    container.innerHTML = `
        <div class="recommendation-content">
            <div class="recommendation-header">
                <h4>Recommended Approach: ${type}</h4>
                <div class="confidence-indicator">
                    <span>Confidence: ${confidence}%</span>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${confidence}%"></div>
                    </div>
                </div>
            </div>
            
            <div class="recommended-models">
                <h5>Suggested Models:</h5>
                <div class="model-chips">
                    ${models.map(model => `<span class="model-chip">${model}</span>`).join('')}
                </div>
            </div>
            
            <div class="reasoning-section">
                <h5>Why this recommendation:</h5>
                <ul>
                    ${reasoning.map(reason => `<li>${reason}</li>`).join('')}
                </ul>
            </div>
            
            <div class="next-steps">
                <h5>Next Steps:</h5>
                <p>Consider starting with a pilot project using the recommended models. 
                   Evaluate performance, cost, and integration complexity before full deployment.</p>
            </div>
        </div>
    `;
    
    // Add styles for recommendation display
    if (!document.querySelector('#recommendation-styles')) {
        const style = document.createElement('style');
        style.id = 'recommendation-styles';
        style.textContent = `
            .recommendation-content {
                text-align: left;
                padding: 20px;
            }
            .recommendation-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 2px solid #e2e8f0;
            }
            .confidence-indicator {
                text-align: right;
            }
            .confidence-bar {
                width: 100px;
                height: 8px;
                background: #e2e8f0;
                border-radius: 4px;
                overflow: hidden;
                margin-top: 5px;
            }
            .confidence-fill {
                height: 100%;
                background: linear-gradient(90deg, #51CF66, #4A90E2);
                transition: width 1s ease-out;
            }
            .model-chips {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 10px;
            }
            .model-chip {
                background: #4A90E2;
                color: white;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
            }
            .reasoning-section, .next-steps {
                margin-top: 20px;
            }
            .reasoning-section ul {
                margin-left: 20px;
            }
            .reasoning-section li {
                margin-bottom: 8px;
                color: #64748b;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Animate the confidence bar
    setTimeout(() => {
        const fill = container.querySelector('.confidence-fill');
        if (fill) {
            fill.style.width = `${confidence}%`;
        }
    }, 100);
}

// ================================
// Agent Evolution & Workflows
// ================================

function initializeAgentEvolution() {
    const evolutionStages = document.querySelectorAll('.evolution-stage');
    
    evolutionStages.forEach((stage, index) => {
        stage.addEventListener('mouseenter', () => {
            // Highlight connections
            evolutionStages.forEach((s, i) => {
                if (i !== index) {
                    s.style.opacity = '0.6';
                }
            });
        });
        
        stage.addEventListener('mouseleave', () => {
            evolutionStages.forEach(s => {
                s.style.opacity = '1';
            });
        });
    });
}

function initializeToolWorkflow() {
    const workflowSteps = document.querySelectorAll('.workflow-step');
    
    workflowSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            // Animate workflow sequence
            workflowSteps.forEach((s, i) => {
                setTimeout(() => {
                    s.style.transform = 'scale(1.05)';
                    s.style.borderColor = '#4A90E2';
                    setTimeout(() => {
                        s.style.transform = 'scale(1)';
                        s.style.borderColor = '#e2e8f0';
                    }, 300);
                }, i * 200);
            });
        });
    });
}

function initializeMCPArchitecture() {
    const mcpLayers = document.querySelectorAll('.mcp-layer');
    
    mcpLayers.forEach(layer => {
        layer.addEventListener('mouseenter', () => {
            layer.style.transform = 'translateX(8px) scale(1.02)';
        });
        
        layer.addEventListener('mouseleave', () => {
            layer.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// ================================
// Scroll Features & Search
// ================================

function initializeScrollFeatures() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initializeSearchFunctionality() {
    const searchInput = document.getElementById('globalSearch');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('globalSearch');
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) return;
    
    // Find all text content in sections
    const sections = document.querySelectorAll('.content-section');
    let found = false;
    
    sections.forEach(section => {
        const textContent = section.textContent.toLowerCase();
        if (textContent.includes(query)) {
            if (!found) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                found = true;
            }
            highlightText(section, query);
        }
    });
    
    if (!found) {
        showSearchNotification('No results found for: ' + query);
    } else {
        showSearchNotification(`Found results for: ${query}`);
    }
}

function highlightText(container, query) {
    // Simple text highlighting - in a real implementation, you'd want more sophisticated text search
    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        if (node.textContent.toLowerCase().includes(query)) {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        const text = textNode.textContent;
        const regex = new RegExp(query, 'gi');
        const highlightedText = text.replace(regex, `<mark>$&</mark>`);
        
        if (highlightedText !== text) {
            const wrapper = document.createElement('span');
            wrapper.innerHTML = highlightedText;
            parent.replaceChild(wrapper, textNode);
        }
    });
}

function showSearchNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.search-notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'search-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4A90E2;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Add animation styles if not present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ================================
// Animation & Visual Enhancements
// ================================

function initializeAnimations() {
    // Intersection Observer for scroll animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.metric-card, .framework-card, .workflow-step, .evolution-stage, .mcp-layer'
    );
    
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
    
    // Add CSS animations
    if (!document.querySelector('#animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .animate-in {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ================================
// Utility Functions
// ================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`🚀 Page loaded in ${loadTime.toFixed(2)}ms`);
});

// ================================
// Platform Ecosystem Functions
// ================================

function initializePlatformEcosystem() {
    initializePlatformComparison();
    initializeDeploymentCalculator();
    initializeHubExplorer();
    initializeModelDiscovery();
    initializeInterfaceQuiz();
}

function initializePlatformComparison() {
    const platformFilter = document.getElementById('platformFilter');
    const providerFilter = document.getElementById('providerFilter');
    
    if (platformFilter && providerFilter) {
        platformFilter.addEventListener('change', updatePlatformGrid);
        providerFilter.addEventListener('change', updatePlatformGrid);
    }
    
    updatePlatformGrid();
}

const platformData = [
    {
        name: 'AWS Bedrock',
        type: 'major-cloud',
        focus: 'enterprise',
        models: 'Anthropic, Meta, Amazon, Cohere',
        pricing: 'Pay-per-token',
        features: 'Fully managed, integrated with AWS ecosystem, enterprise-grade security'
    },
    {
        name: 'Google Vertex AI',
        type: 'major-cloud',
        focus: 'enterprise',
        models: 'Google (Gemini), Anthropic, 150+ open-source models',
        pricing: 'Pay-per-token / Pay-per-hour',
        features: 'Model Garden, integrated MLOps tools, optimized for TPUs'
    },
    {
        name: 'Azure AI Foundry',
        type: 'major-cloud',
        focus: 'enterprise',
        models: 'OpenAI, Meta, Mistral',
        pricing: 'Pay-per-token',
        features: 'Deep integration with Microsoft services, access to latest OpenAI models'
    },
    {
        name: 'Runpod',
        type: 'specialized',
        focus: 'cost-effective',
        models: 'NVIDIA, AMD GPUs (various models)',
        pricing: 'Pay-per-hour / Pay-per-second',
        features: 'Very competitive pricing, wide variety of GPU options, serverless & dedicated instances'
    },
    {
        name: 'Replicate',
        type: 'specialized',
        focus: 'developer',
        models: 'Large library of open-source models',
        pricing: 'Pay-per-second',
        features: 'Extensive model library, easy deployment for pre-trained models via "Cog"'
    },
    {
        name: 'Fireworks AI',
        type: 'specialized',
        focus: 'developer',
        models: 'Llama, Mistral, DeepSeek, Qwen',
        pricing: 'Pay-per-token',
        features: 'Optimized for high-speed, low-latency inference; advanced fine-tuning options'
    }
];

function updatePlatformGrid() {
    const platformFilter = document.getElementById('platformFilter');
    const providerFilter = document.getElementById('providerFilter');
    const platformGrid = document.getElementById('platformGrid');
    
    if (!platformGrid) return;
    
    const focusFilter = platformFilter ? platformFilter.value : 'all';
    const typeFilter = providerFilter ? providerFilter.value : 'all';
    
    let filteredData = platformData;
    if (focusFilter !== 'all') {
        filteredData = filteredData.filter(platform => platform.focus === focusFilter);
    }
    if (typeFilter !== 'all') {
        filteredData = filteredData.filter(platform => platform.type === typeFilter);
    }
    
    platformGrid.innerHTML = filteredData.map(platform => `
        <div class="platform-card ${platform.type}">
            <div class="platform-header">
                <h5>${platform.name}</h5>
                <span class="platform-badge ${platform.focus}">${platform.focus}</span>
            </div>
            <div class="platform-content">
                <div class="platform-models">
                    <h6>Available Models:</h6>
                    <p>${platform.models}</p>
                </div>
                <div class="platform-pricing">
                    <h6>Pricing Model:</h6>
                    <p>${platform.pricing}</p>
                </div>
                <div class="platform-features">
                    <h6>Key Features:</h6>
                    <p>${platform.features}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function initializeDeploymentCalculator() {
    const inputs = ['deploymentType', 'requestsPerMonth', 'avgTokensPerRequest', 'modelSize'];
    inputs.forEach(inputId => {
        const element = document.getElementById(inputId);
        if (element) {
            element.addEventListener('change', calculateDeploymentCosts);
            element.addEventListener('input', calculateDeploymentCosts);
        }
    });
    
    calculateDeploymentCosts();
}

function calculateDeploymentCosts() {
    const deploymentType = document.getElementById('deploymentType')?.value;
    const requestsPerMonth = parseInt(document.getElementById('requestsPerMonth')?.value) || 100000;
    const avgTokens = parseInt(document.getElementById('avgTokensPerRequest')?.value) || 1000;
    const modelSize = document.getElementById('modelSize')?.value;
    
    const costBreakdown = document.getElementById('costBreakdown');
    if (!costBreakdown) return;
    
    // Calculate costs based on deployment type and usage
    let serverlessCost, dedicatedCost, selfHostedCost;
    
    const totalTokensPerMonth = requestsPerMonth * avgTokens;
    const sizeMultiplier = modelSize === 'small' ? 1 : modelSize === 'medium' ? 2.5 : 5;
    
    if (deploymentType === 'serverless') {
        serverlessCost = (totalTokensPerMonth / 1000000) * sizeMultiplier * 2; // $2 per million tokens
        dedicatedCost = 'N/A';
        selfHostedCost = 'N/A';
    } else if (deploymentType === 'dedicated') {
        serverlessCost = 'N/A';
        dedicatedCost = sizeMultiplier * 1000; // $1000+ per month
        selfHostedCost = 'N/A';
    } else {
        serverlessCost = 'N/A';
        dedicatedCost = 'N/A';
        selfHostedCost = sizeMultiplier * 2000; // $2000+ infrastructure cost
    }
    
    costBreakdown.innerHTML = `
        <div class="cost-summary">
            <h5>Monthly Cost Estimate</h5>
            <div class="cost-items">
                <div class="cost-item">
                    <span class="cost-label">Serverless API:</span>
                    <span class="cost-value">${typeof serverlessCost === 'number' ? '$' + serverlessCost.toFixed(2) : serverlessCost}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Dedicated Instance:</span>
                    <span class="cost-value">${typeof dedicatedCost === 'number' ? '$' + dedicatedCost.toFixed(2) : dedicatedCost}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Self-Hosted:</span>
                    <span class="cost-value">${typeof selfHostedCost === 'number' ? '$' + selfHostedCost.toFixed(2) : selfHostedCost}</span>
                </div>
            </div>
            <div class="cost-note">
                <small>*Estimates based on ${requestsPerMonth.toLocaleString()} requests/month with ${avgTokens} tokens each</small>
            </div>
        </div>
    `;
}

function initializeHubExplorer() {
    const hubTabs = document.querySelectorAll('.hub-tab-btn');
    const hubContents = document.querySelectorAll('.hub-tab-content');
    
    hubTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const hubId = tab.getAttribute('data-hub');
            
            // Remove active states
            hubTabs.forEach(t => t.classList.remove('active'));
            hubContents.forEach(c => c.classList.remove('active'));
            
            // Add active states
            tab.classList.add('active');
            const targetContent = document.getElementById(`${hubId}-hub`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function initializeModelDiscovery() {
    const findModelsBtn = document.getElementById('findModels');
    if (findModelsBtn) {
        findModelsBtn.addEventListener('click', generateModelRecommendations);
    }
}

function generateModelRecommendations() {
    const taskType = document.getElementById('taskType')?.value;
    const performanceNeeds = document.getElementById('performanceNeeds')?.value;
    const licensePreference = document.getElementById('licensePreference')?.value;
    const resultsDiv = document.getElementById('discoveryResults');
    
    if (!taskType || !performanceNeeds || !resultsDiv) return;
    
    // Mock recommendation logic
    const recommendations = {
        'text-generation': {
            sota: ['GPT-5', 'Claude 4 Opus', 'Gemini 2.5 Pro'],
            production: ['Claude 4 Sonnet', 'GPT-4o', 'Llama 4 Scout'],
            basic: ['Llama 3.1 405B', 'Mistral Large 2']
        },
        'code-generation': {
            sota: ['GPT-5', 'Claude 4 Sonnet', 'DeepSeek Coder V2'],
            production: ['Claude 4 Sonnet', 'GPT-4o', 'Codestral'],
            basic: ['Llama 3.1 405B', 'DeepSeek Coder']
        },
        'image-generation': {
            sota: ['Midjourney v7', 'DALL-E 3', 'Stable Diffusion 3.5'],
            production: ['DALL-E 3', 'Stable Diffusion 3.5'],
            basic: ['Stable Diffusion XL']
        }
    };
    
    const taskRecommendations = recommendations[taskType] || recommendations['text-generation'];
    const modelList = taskRecommendations[performanceNeeds] || taskRecommendations.production;
    
    resultsDiv.innerHTML = `
        <div class="discovery-recommendations">
            <h5>Recommended Models for ${taskType.replace('-', ' ')} (${performanceNeeds} quality)</h5>
            <div class="recommended-models">
                ${modelList.map(model => `
                    <div class="recommended-model">
                        <h6>${model}</h6>
                        <div class="model-tags">
                            <span class="tag ${performanceNeeds}">${performanceNeeds}</span>
                            ${licensePreference === 'open-source' && model.includes('Llama') ? '<span class="tag open-source">Open Source</span>' : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function initializeInterfaceQuiz() {
    const quizBtn = document.getElementById('getInterfaceRecommendation');
    if (quizBtn) {
        quizBtn.addEventListener('click', generateInterfaceRecommendation);
    }
}

function generateInterfaceRecommendation() {
    const technical = document.querySelector('input[name="technical"]:checked')?.value;
    const tasks = document.querySelector('input[name="tasks"]:checked')?.value;
    const speed = document.querySelector('input[name="speed"]:checked')?.value;
    const resultDiv = document.getElementById('interfaceQuizResult');
    
    if (!technical || !tasks || !speed || !resultDiv) return;
    
    let recommendation = '';
    let reasoning = '';
    
    if (technical === 'expert' && speed === 'efficiency') {
        recommendation = 'Command Line Interface (CLI)';
        reasoning = 'Your technical expertise and need for efficiency make CLI the perfect choice for maximum productivity.';
    } else if (tasks === 'workflow' && technical !== 'beginner') {
        recommendation = 'Node-Based Workflows';
        reasoning = 'For automating business processes, visual workflow tools offer the best balance of power and usability.';
    } else {
        recommendation = 'Chat Interface';
        reasoning = 'Chat interfaces provide the most intuitive and accessible way to interact with AI for your needs.';
    }
    
    resultDiv.innerHTML = `
        <div class="quiz-recommendation">
            <h5>Recommended Interface: ${recommendation}</h5>
            <p>${reasoning}</p>
            <div class="next-steps">
                <h6>Suggested next steps:</h6>
                <ul>
                    <li>Try the recommended interface with a simple task</li>
                    <li>Explore integration options for your workflow</li>
                    <li>Consider gradual adoption with training for your team</li>
                </ul>
            </div>
        </div>
    `;
}

// ================================
// Practical Applications Functions
// ================================

function initializePracticalApplications() {
    initializeROICalculator();
    initializeCreativeWorkflow();
    initializeDevWorkflowOptimizer();
    initializeDecisionMatrix();
}

function initializeROICalculator() {
    const calculateBtn = document.getElementById('calculateROI');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBusinessROI);
    }
}

function calculateBusinessROI() {
    const businessFunction = document.getElementById('businessFunction')?.value;
    const teamSize = parseInt(document.getElementById('teamSize')?.value) || 10;
    const avgSalary = parseInt(document.getElementById('avgSalary')?.value) || 75000;
    const hoursPerWeek = parseInt(document.getElementById('hoursPerWeek')?.value) || 20;
    const toolCost = parseInt(document.getElementById('toolCost')?.value) || 10000;
    const resultsDiv = document.getElementById('roiResults');
    
    if (!businessFunction || !resultsDiv) return;
    
    // Calculate potential savings
    const hoursPerYear = hoursPerWeek * 52;
    const hourlyRate = avgSalary / (40 * 52);
    const currentCost = teamSize * hoursPerYear * hourlyRate;
    
    // Efficiency gains by function
    const efficiencyGains = {
        'customer-support': 0.6,
        'project-management': 0.4,
        'marketing-sales': 0.35,
        'finance-accounting': 0.3,
        'hr-recruiting': 0.45
    };
    
    const efficiency = efficiencyGains[businessFunction] || 0.3;
    const annualSavings = currentCost * efficiency;
    const netSavings = annualSavings - toolCost;
    const roi = ((netSavings / toolCost) * 100);
    const paybackMonths = toolCost / (annualSavings / 12);
    
    resultsDiv.innerHTML = `
        <div class="roi-calculation">
            <h5>ROI Analysis Results</h5>
            <div class="roi-metrics">
                <div class="roi-metric">
                    <span class="metric-label">Annual Labor Cost:</span>
                    <span class="metric-value">$${currentCost.toLocaleString()}</span>
                </div>
                <div class="roi-metric">
                    <span class="metric-label">Projected Annual Savings:</span>
                    <span class="metric-value">$${annualSavings.toLocaleString()}</span>
                </div>
                <div class="roi-metric">
                    <span class="metric-label">AI Tool Cost:</span>
                    <span class="metric-value">$${toolCost.toLocaleString()}</span>
                </div>
                <div class="roi-metric highlight">
                    <span class="metric-label">Net Annual Savings:</span>
                    <span class="metric-value">$${netSavings.toLocaleString()}</span>
                </div>
                <div class="roi-metric highlight">
                    <span class="metric-label">ROI:</span>
                    <span class="metric-value">${roi.toFixed(1)}%</span>
                </div>
                <div class="roi-metric">
                    <span class="metric-label">Payback Period:</span>
                    <span class="metric-value">${paybackMonths.toFixed(1)} months</span>
                </div>
            </div>
            <div class="roi-recommendation">
                <p><strong>Recommendation:</strong> ${roi > 100 ? 'Strong business case for AI implementation' : roi > 50 ? 'Positive ROI, consider implementation' : 'Evaluate alternative approaches or tools'}</p>
            </div>
        </div>
    `;
}

function initializeCreativeWorkflow() {
    const generateBtn = document.getElementById('generateWorkflow');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateCreativeWorkflow);
    }
}

function generateCreativeWorkflow() {
    const projectType = document.getElementById('projectType')?.value;
    const timeline = document.getElementById('timelineNeeds')?.value;
    const quality = document.getElementById('qualityLevel')?.value;
    const outputDiv = document.getElementById('workflowOutput');
    
    if (!projectType || !timeline || !quality || !outputDiv) return;
    
    const workflows = {
        'social-media-campaign': {
            steps: ['Strategy & Planning', 'Content Creation', 'Visual Design', 'Copy Writing', 'Approval & Scheduling'],
            tools: ['ChatGPT for strategy', 'Midjourney for visuals', 'Canva for layouts', 'Buffer for scheduling']
        },
        'product-launch': {
            steps: ['Market Research', 'Messaging Framework', 'Content Production', 'Multi-channel Assets', 'Launch Coordination'],
            tools: ['Claude for research', 'Jasper for messaging', 'Adobe Creative Suite', 'Project management tools']
        },
        'training-materials': {
            steps: ['Learning Objectives', 'Content Outline', 'Video Scripts', 'Visual Assets', 'Interactive Elements'],
            tools: ['GPT-5 for scripting', 'Synthesia for videos', 'Canva for graphics', 'Articulate for interactivity']
        }
    };
    
    const workflow = workflows[projectType] || workflows['social-media-campaign'];
    
    outputDiv.innerHTML = `
        <div class="generated-workflow">
            <h5>AI-Powered Workflow for ${projectType.replace('-', ' ')}</h5>
            <div class="workflow-timeline">
                <div class="timeline-header">
                    <span>Timeline: ${timeline}</span>
                    <span>Quality: ${quality}</span>
                </div>
                <div class="workflow-steps">
                    ${workflow.steps.map((step, index) => `
                        <div class="workflow-step-item">
                            <div class="step-number">${index + 1}</div>
                            <div class="step-content">${step}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="recommended-tools">
                <h6>Recommended AI Tools:</h6>
                <div class="tool-list">
                    ${workflow.tools.map(tool => `<span class="tool-item">${tool}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

function initializeDevWorkflowOptimizer() {
    const optimizeBtn = document.getElementById('optimizeWorkflow');
    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', generateDevOptimization);
    }
}

function generateDevOptimization() {
    const teamSize = document.getElementById('devTeamSize')?.value;
    const languages = Array.from(document.getElementById('primaryLanguages')?.selectedOptions || []).map(opt => opt.value);
    const style = document.getElementById('developmentStyle')?.value;
    const painPoints = Array.from(document.getElementById('painPoints')?.selectedOptions || []).map(opt => opt.value);
    const resultsDiv = document.getElementById('optimizationResults');
    
    if (!resultsDiv) return;
    
    const recommendations = {
        'code-quality': 'Implement GitHub Copilot + Claude 4 for code review',
        'development-speed': 'Use Cursor IDE with GPT-5 integration',
        'bug-detection': 'Deploy automated testing with AI-generated test cases',
        'documentation': 'Auto-generate docs with Claude 4 Sonnet',
        'testing': 'AI-powered test case generation and coverage analysis',
        'code-review': 'Automated PR analysis with Claude 4'
    };
    
    resultsDiv.innerHTML = `
        <div class="optimization-recommendations">
            <h5>Optimization Recommendations for ${teamSize}-person team</h5>
            <div class="recommendations-list">
                ${painPoints.map(pain => `
                    <div class="recommendation-item">
                        <h6>${pain.replace('-', ' ')}</h6>
                        <p>${recommendations[pain] || 'Consider AI-powered solutions for this area'}</p>
                    </div>
                `).join('')}
            </div>
            <div class="implementation-plan">
                <h6>Suggested Implementation Order:</h6>
                <ol>
                    <li>Start with AI coding assistants (Cursor, Copilot)</li>
                    <li>Implement automated code review</li>
                    <li>Add AI-powered testing and documentation</li>
                    <li>Gradually expand to full workflow automation</li>
                </ol>
            </div>
        </div>
    `;
}

function initializeDecisionMatrix() {
    const sliders = document.querySelectorAll('.factor-slider input[type="range"]');
    const generateBtn = document.getElementById('generateRecommendations');
    
    sliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const valueSpan = this.nextElementSibling;
            if (valueSpan) {
                valueSpan.textContent = this.value;
            }
        });
    });
    
    if (generateBtn) {
        generateBtn.addEventListener('click', generatePersonalizedRecommendations);
    }
}

function generatePersonalizedRecommendations() {
    const factors = {
        businessGoals: document.getElementById('businessGoals')?.value || 3,
        userAdoption: document.getElementById('userAdoption')?.value || 3,
        integration: document.getElementById('integration')?.value || 3,
        scalability: document.getElementById('scalability')?.value || 3,
        dataSecurity: document.getElementById('dataSecurity')?.value || 3,
        compliance: document.getElementById('compliance')?.value || 3,
        costSensitivity: document.getElementById('costSensitivity')?.value || 3,
        roiTimeline: document.getElementById('roiTimeline')?.value || 3
    };
    
    const outputDiv = document.getElementById('recommendationsOutput');
    if (!outputDiv) return;
    
    // Generate recommendations based on factor scores
    let approach = 'hybrid';
    let tools = [];
    let reasoning = [];
    
    if (factors.dataSecurity >= 4 || factors.compliance >= 4) {
        approach = 'self-hosted open source';
        tools = ['Llama 4 Scout', 'DeepSeek R1', 'Self-hosted infrastructure'];
        reasoning.push('High security/compliance requirements favor self-hosted solutions');
    } else if (factors.costSensitivity >= 4) {
        approach = 'cost-optimized';
        tools = ['Open source models', 'Replicate', 'Fireworks AI'];
        reasoning.push('Cost sensitivity suggests open source and efficient platforms');
    } else if (factors.userAdoption >= 4 && factors.integration <= 2) {
        approach = 'user-friendly proprietary';
        tools = ['ChatGPT Enterprise', 'Claude for Teams', 'Managed platforms'];
        reasoning.push('Focus on user adoption with minimal integration complexity');
    } else {
        approach = 'balanced hybrid';
        tools = ['Mix of proprietary and open source', 'Multi-platform strategy', 'Gradual implementation'];
        reasoning.push('Balanced requirements suggest a hybrid approach');
    }
    
    outputDiv.innerHTML = `
        <div class="personalized-recommendations">
            <h5>Recommended Approach: ${approach}</h5>
            <div class="recommendation-tools">
                <h6>Suggested Tools & Platforms:</h6>
                <div class="tool-recommendations">
                    ${tools.map(tool => `<span class="recommended-tool">${tool}</span>`).join('')}
                </div>
            </div>
            <div class="recommendation-reasoning">
                <h6>Key Reasoning:</h6>
                <ul>
                    ${reasoning.map(reason => `<li>${reason}</li>`).join('')}
                </ul>
            </div>
            <div class="next-actions">
                <h6>Recommended Next Steps:</h6>
                <ol>
                    <li>Pilot with a small team on low-risk use case</li>
                    <li>Measure impact and gather user feedback</li>
                    <li>Gradually expand based on results</li>
                    <li>Establish governance and best practices</li>
                </ol>
            </div>
        </div>
    `;
}

// ================================
// Future Outlook Functions
// ================================

function initializeFutureOutlook() {
    initializeTrendsTimeline();
    initializeMaturityRadar();
    initializeScenarioPlanning();
    initializeChecklistProgress();
}

function initializeTrendsTimeline() {
    const timelineBtns = document.querySelectorAll('.timeline-btn');
    const timelineYears = document.querySelectorAll('.timeline-year');
    
    timelineBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const year = btn.getAttribute('data-year');
            
            timelineBtns.forEach(b => b.classList.remove('active'));
            timelineYears.forEach(y => y.classList.remove('active'));
            
            btn.classList.add('active');
            const targetYear = document.getElementById(`timeline-${year}`);
            if (targetYear) {
                targetYear.classList.add('active');
            }
        });
    });
}

function initializeMaturityRadar() {
    const ctx = document.getElementById('maturityRadarChart');
    if (!ctx) return;
    
    const data = {
        labels: ['LLM Capabilities', 'Multimodal AI', 'Agentic Systems', 'Edge Deployment', 'Safety Measures', 'Regulation', 'Open Source', 'Enterprise Adoption'],
        datasets: [{
            label: 'Current State (2025)',
            data: [85, 70, 60, 40, 50, 30, 75, 65],
            backgroundColor: 'rgba(74, 144, 226, 0.2)',
            borderColor: 'rgba(74, 144, 226, 1)',
            borderWidth: 2
        }, {
            label: 'Projected 2027',
            data: [95, 85, 80, 70, 70, 60, 85, 80],
            backgroundColor: 'rgba(81, 207, 102, 0.2)',
            borderColor: 'rgba(81, 207, 102, 1)',
            borderWidth: 2
        }, {
            label: 'Aspirational 2030',
            data: [98, 95, 90, 85, 85, 80, 90, 90],
            backgroundColor: 'rgba(255, 107, 107, 0.2)',
            borderColor: 'rgba(255, 107, 107, 1)',
            borderWidth: 2
        }]
    };
    
    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'AI Technology Maturity Assessment'
                }
            }
        }
    });
}

function initializeScenarioPlanning() {
    const generateBtn = document.getElementById('generateScenario');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateFutureScenario);
    }
}

function generateFutureScenario() {
    const agiSpeed = document.getElementById('agiBridgeTimeline')?.value || 3;
    const regulation = document.getElementById('regulationIntensity')?.value || 3;
    const openSource = document.getElementById('openSourceGrowth')?.value || 3;
    const geopolitics = document.getElementById('geopoliticalTension')?.value || 3;
    const outputDiv = document.getElementById('scenarioOutput');
    
    if (!outputDiv) return;
    
    // Generate scenario based on factor combinations
    let scenarioTitle = '';
    let scenarioDescription = '';
    let keyCharacteristics = [];
    let probability = 50;
    
    if (agiSpeed >= 4 && regulation <= 2 && geopolitics >= 4) {
        scenarioTitle = 'Accelerated AI Convergence';
        scenarioDescription = 'Rapid AGI development in a cooperative, lightly regulated environment leads to breakthrough innovations.';
        keyCharacteristics = ['AGI achieved by 2027', 'Global AI cooperation', 'Minimal regulatory barriers', 'Rapid innovation cycles'];
        probability = 25;
    } else if (regulation >= 4 && geopolitics <= 2) {
        scenarioTitle = 'Fragmented AI Landscape';
        scenarioDescription = 'Heavy regulation and geopolitical tensions create distinct regional AI ecosystems with limited interoperability.';
        keyCharacteristics = ['Regional AI blocs', 'Heavy compliance burden', 'Limited global collaboration', 'Slower but safer development'];
        probability = 40;
    } else if (openSource >= 4 && agiSpeed <= 2) {
        scenarioTitle = 'Open Source AI Dominance';
        scenarioDescription = 'Open source models achieve dominance while AGI development proceeds cautiously with broad participation.';
        keyCharacteristics = ['Open source model superiority', 'Democratized AI access', 'Collaborative development', 'Gradual capability growth'];
        probability = 35;
    } else {
        scenarioTitle = 'Balanced Evolution';
        scenarioDescription = 'A measured progression with balanced regulation, competitive open source, and steady international cooperation.';
        keyCharacteristics = ['Steady progress toward AGI', 'Balanced regulation', 'Healthy competition', 'Gradual societal adaptation'];
        probability = 60;
    }
    
    outputDiv.innerHTML = `
        <div class="future-scenario">
            <div class="scenario-header">
                <h5>${scenarioTitle}</h5>
                <span class="scenario-probability">Probability: ${probability}%</span>
            </div>
            <div class="scenario-content">
                <p class="scenario-description">${scenarioDescription}</p>
                <div class="scenario-characteristics">
                    <h6>Key Characteristics:</h6>
                    <ul>
                        ${keyCharacteristics.map(char => `<li>${char}</li>`).join('')}
                    </ul>
                </div>
                <div class="scenario-implications">
                    <h6>Strategic Implications:</h6>
                    <p>Organizations should prepare for ${scenarioTitle.toLowerCase()} by focusing on adaptability, continuous learning, and strategic partnerships.</p>
                </div>
            </div>
        </div>
    `;
}

function initializeChecklistProgress() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const progressSpan = document.getElementById('checklistProgress');
    const progressFill = document.getElementById('progressFill');
    const progressMessage = document.getElementById('progressMessage');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateChecklistProgress);
    });
    
    function updateChecklistProgress() {
        const totalItems = checkboxes.length;
        const checkedItems = document.querySelectorAll('.checklist-checkbox:checked').length;
        const percentage = Math.round((checkedItems / totalItems) * 100);
        
        if (progressSpan) progressSpan.textContent = `${percentage}%`;
        if (progressFill) progressFill.style.width = `${percentage}%`;
        
        if (progressMessage) {
            if (percentage === 0) {
                progressMessage.textContent = 'Get started by checking off completed items to track your AI readiness!';
            } else if (percentage < 25) {
                progressMessage.textContent = 'Good start! Keep building your AI foundation.';
            } else if (percentage < 50) {
                progressMessage.textContent = 'Making progress! You\'re on your way to AI readiness.';
            } else if (percentage < 75) {
                progressMessage.textContent = 'Great progress! You\'re well-prepared for AI implementation.';
            } else if (percentage < 100) {
                progressMessage.textContent = 'Almost there! You\'re nearly fully prepared for AI transformation.';
            } else {
                progressMessage.textContent = 'Congratulations! You\'re fully prepared for AI implementation.';
            }
        }
    }
}

// ================================
// Glossary Functions
// ================================

function initializeGlossary() {
    initializeGlossarySearch();
    initializeGlossaryFilters();
    initializeGlossaryData();
    initializeConceptMap();
    initializeLearningPaths();
}

const glossaryData = [
    {
        term: 'Artificial Intelligence (AI)',
        category: 'core-concepts',
        difficulty: 'beginner',
        definition: 'The simulation of human intelligence processes by machines, especially computer systems.',
        example: 'AI includes everything from a chess-playing computer to a self-driving car to a generative chatbot like ChatGPT.',
        relatedTerms: ['Machine Learning', 'Deep Learning', 'Neural Networks'],
        whyItMatters: 'AI is a transformative technology that is automating tasks, enhancing decision-making, and creating new capabilities across virtually every industry.'
    },
    {
        term: 'Large Language Model (LLM)',
        category: 'architectures',
        difficulty: 'intermediate',
        definition: 'A type of AI model trained on vast amounts of text data to understand and generate human-like language.',
        example: 'GPT-5, Claude 4, and Gemini 2.5 are all examples of large language models.',
        relatedTerms: ['Transformer', 'Neural Network', 'Training Data'],
        whyItMatters: 'LLMs are the foundation of most modern AI applications, from chatbots to code generation to content creation.'
    },
    {
        term: 'AI Agent',
        category: 'core-concepts',
        difficulty: 'intermediate',
        definition: 'A computer system that can perceive its environment and take autonomous actions to achieve specific goals.',
        example: 'A smart thermostat that senses temperature and automatically adjusts heating/cooling is a simple agent.',
        relatedTerms: ['Agentic AI', 'Tool Use', 'Autonomous Systems'],
        whyItMatters: 'Agents represent the shift from passive AI that just responds to prompts to active AI that can accomplish complex tasks independently.'
    },
    {
        term: 'Transformer',
        category: 'architectures',
        difficulty: 'advanced',
        definition: 'A neural network architecture that uses self-attention mechanisms to process sequences of data, revolutionizing natural language processing.',
        example: 'The "Attention Is All You Need" paper from 2017 introduced the Transformer architecture that powers GPT, BERT, and most modern LLMs.',
        relatedTerms: ['Attention Mechanism', 'Neural Network', 'Self-Attention'],
        whyItMatters: 'Transformers are the foundational architecture for virtually all state-of-the-art language models and many other AI systems.'
    },
    {
        term: 'Fine-tuning',
        category: 'training',
        difficulty: 'intermediate',
        definition: 'The process of taking a pre-trained AI model and further training it on a smaller, specific dataset to adapt it for a particular task.',
        example: 'Taking a general language model and fine-tuning it on medical texts to create a specialized medical AI assistant.',
        relatedTerms: ['Transfer Learning', 'Training Data', 'Model Adaptation'],
        whyItMatters: 'Fine-tuning allows organizations to customize powerful pre-trained models for their specific needs without training from scratch.'
    },
    {
        term: 'Embedding',
        category: 'core-concepts',
        difficulty: 'intermediate',
        definition: 'A numerical representation of a piece of data (like a word or image) in the form of a vector that captures its semantic meaning.',
        example: 'Words with similar meanings like "Paris," "London," and "Rome" would have embeddings close to each other in vector space.',
        relatedTerms: ['Vector', 'Semantic Search', 'RAG'],
        whyItMatters: 'Embeddings enable AI models to understand the meaning and relationships between different pieces of data, crucial for search and recommendation systems.'
    },
    {
        term: 'Retrieval-Augmented Generation (RAG)',
        category: 'applications',
        difficulty: 'advanced',
        definition: 'A technique that combines information retrieval with text generation, allowing AI models to access and use external knowledge.',
        example: 'A customer service chatbot that can look up specific product information from a database before generating its response.',
        relatedTerms: ['Knowledge Base', 'Vector Database', 'Information Retrieval'],
        whyItMatters: 'RAG enables AI systems to access up-to-date, specific information beyond their training data, making them more accurate and useful.'
    },
    {
        term: 'Multi-Agent Control Plane (MCP)',
        category: 'architectures',
        difficulty: 'advanced',
        definition: 'A control layer that standardizes how multiple AI agents interact with each other and with external tools and data sources.',
        example: 'An enterprise system that coordinates research agents, writing agents, and analysis agents to complete complex business tasks.',
        relatedTerms: ['AI Agent', 'Agentic AI', 'Orchestration'],
        whyItMatters: 'MCPs provide the infrastructure needed to build and manage complex, multi-agent AI applications at enterprise scale.'
    },
    {
        term: 'Token',
        category: 'core-concepts',
        difficulty: 'beginner',
        definition: 'The basic unit of text that language models process, roughly equivalent to a word or part of a word.',
        example: 'The sentence "Hello world" contains 2 tokens, while "Hello, wonderful world!" contains 4 tokens.',
        relatedTerms: ['Tokenization', 'Context Window', 'Language Model'],
        whyItMatters: 'Understanding tokens is crucial for managing AI costs and working within model limitations, as most AI services charge per token.'
    },
    {
        term: 'Context Window',
        category: 'architectures',
        difficulty: 'intermediate',
        definition: 'The maximum amount of text (measured in tokens) that a language model can process or "remember" at one time.',
        example: 'A model with a 100,000 token context window can process about 75,000 words in a single conversation or document.',
        relatedTerms: ['Token', 'Memory', 'Long Context'],
        whyItMatters: 'Context window size determines how much information a model can consider when generating responses, affecting its ability to handle long documents or conversations.'
    }
];

function initializeGlossaryData() {
    populateGlossaryTerms();
}

function populateGlossaryTerms() {
    const termsContainer = document.getElementById('glossaryTerms');
    if (!termsContainer) return;
    
    termsContainer.innerHTML = glossaryData.map(term => `
        <div class="glossary-term-card" data-category="${term.category}" data-difficulty="${term.difficulty}">
            <div class="term-header">
                <h4 class="term-name">${term.term}</h4>
                <div class="term-badges">
                    <span class="category-badge ${term.category}">${term.category.replace('-', ' ')}</span>
                    <span class="difficulty-badge ${term.difficulty}">${term.difficulty}</span>
                </div>
            </div>
            <div class="term-content">
                <div class="term-definition">
                    <h5>Definition:</h5>
                    <p>${term.definition}</p>
                </div>
                <div class="term-example">
                    <h5>Example:</h5>
                    <p>${term.example}</p>
                </div>
                <div class="term-importance">
                    <h5>Why It Matters:</h5>
                    <p>${term.whyItMatters}</p>
                </div>
                <div class="related-terms">
                    <h5>Related Terms:</h5>
                    <div class="related-term-tags">
                        ${term.relatedTerms.map(related => `<span class="related-term-tag">${related}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function initializeGlossarySearch() {
    const searchInput = document.getElementById('glossarySearch');
    const searchBtn = document.getElementById('glossarySearchBtn');
    
    if (searchInput && searchBtn) {
        searchInput.addEventListener('input', filterGlossaryTerms);
        searchBtn.addEventListener('click', () => searchInput.focus());
    }
}

function initializeGlossaryFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const difficultyFilter = document.getElementById('difficultyFilter');
    const cardViewBtn = document.getElementById('cardView');
    const listViewBtn = document.getElementById('listView');
    
    if (categoryFilter) categoryFilter.addEventListener('change', filterGlossaryTerms);
    if (difficultyFilter) difficultyFilter.addEventListener('change', filterGlossaryTerms);
    
    if (cardViewBtn && listViewBtn) {
        cardViewBtn.addEventListener('click', () => switchGlossaryView('card'));
        listViewBtn.addEventListener('click', () => switchGlossaryView('list'));
    }
    
    // Letter navigation
    const letterBtns = document.querySelectorAll('.letter-btn');
    letterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const letter = btn.getAttribute('data-letter');
            jumpToLetter(letter);
        });
    });
}

function filterGlossaryTerms() {
    const searchTerm = document.getElementById('glossarySearch')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
    const difficultyFilter = document.getElementById('difficultyFilter')?.value || 'all';
    const termCards = document.querySelectorAll('.glossary-term-card');
    
    let visibleCount = 0;
    termCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const difficulty = card.getAttribute('data-difficulty');
        const text = card.textContent.toLowerCase();
        
        const matchesSearch = searchTerm === '' || text.includes(searchTerm);
        const matchesCategory = categoryFilter === 'all' || category === categoryFilter;
        const matchesDifficulty = difficultyFilter === 'all' || difficulty === difficultyFilter;
        
        if (matchesSearch && matchesCategory && matchesDifficulty) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update term count
    const termCountSpan = document.getElementById('termCount');
    if (termCountSpan) {
        termCountSpan.textContent = `${visibleCount} terms`;
    }
}

function switchGlossaryView(view) {
    const cardViewBtn = document.getElementById('cardView');
    const listViewBtn = document.getElementById('listView');
    const termsContainer = document.getElementById('glossaryTerms');
    
    if (view === 'card') {
        cardViewBtn?.classList.add('active');
        listViewBtn?.classList.remove('active');
        termsContainer?.classList.remove('list-view');
    } else {
        listViewBtn?.classList.add('active');
        cardViewBtn?.classList.remove('active');
        termsContainer?.classList.add('list-view');
    }
}

function jumpToLetter(letter) {
    const termCards = document.querySelectorAll('.glossary-term-card');
    for (let card of termCards) {
        const termName = card.querySelector('.term-name')?.textContent;
        if (termName && termName.charAt(0).toUpperCase() === letter) {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            card.style.backgroundColor = '#f0f8ff';
            setTimeout(() => {
                card.style.backgroundColor = '';
            }, 2000);
            break;
        }
    }
}

function initializeConceptMap() {
    const conceptMap = document.getElementById('conceptMap');
    if (!conceptMap) return;
    
    // Simple concept relationship visualization
    conceptMap.innerHTML = `
        <div class="concept-network">
            <div class="concept-node core" data-concept="ai">
                <span>Artificial Intelligence</span>
            </div>
            <div class="concept-node" data-concept="ml">
                <span>Machine Learning</span>
            </div>
            <div class="concept-node" data-concept="dl">
                <span>Deep Learning</span>
            </div>
            <div class="concept-node" data-concept="llm">
                <span>Large Language Models</span>
            </div>
            <div class="concept-node" data-concept="agents">
                <span>AI Agents</span>
            </div>
            <div class="concept-connection" data-from="ai" data-to="ml"></div>
            <div class="concept-connection" data-from="ml" data-to="dl"></div>
            <div class="concept-connection" data-from="dl" data-to="llm"></div>
            <div class="concept-connection" data-from="ai" data-to="agents"></div>
        </div>
    `;
}

function initializeLearningPaths() {
    const pathBtns = document.querySelectorAll('.start-path-btn');
    pathBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const path = btn.getAttribute('data-path');
            startLearningPath(path);
        });
    });
}

function startLearningPath(path) {
    // In a real implementation, this would guide users through the learning path
    showNotification(`Starting ${path} learning path! This would guide you through the recommended sequence of terms.`);
}

// ================================
// Performance Optimizations & Lazy Loading
// ================================

// Chart lazy loading system
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chartContainer = entry.target;
            const chartType = chartContainer.dataset.chartType;
            
            // Only load chart if not already loaded
            if (!chartContainer.dataset.loaded) {
                loadChart(chartContainer, chartType);
                chartContainer.dataset.loaded = 'true';
            }
        }
    });
}, {
    rootMargin: '50px',
    threshold: 0.1
});

function loadChart(container, chartType) {
    // Show loading placeholder
    container.innerHTML = '<div class="chart-placeholder"></div>';
    
    // Simulate loading delay and then create the chart
    setTimeout(() => {
        container.innerHTML = '<canvas></canvas>';
        const canvas = container.querySelector('canvas');
        
        switch(chartType) {
            case 'hardware-performance':
                createHardwarePerformanceChart(canvas);
                break;
            case 'model-universe':
                createModelUniverseChart(canvas);
                break;
            case 'maturity-radar':
                createMaturityRadarChart(canvas);
                break;
            default:
                console.warn(`Unknown chart type: ${chartType}`);
        }
    }, 300);
}

// Initialize lazy loading for all charts
function initializeLazyLoading() {
    const chartContainers = document.querySelectorAll('[data-chart-type]');
    chartContainers.forEach(container => {
        chartObserver.observe(container);
    });
}

// Performance monitoring
const performanceMonitor = {
    startTime: performance.now(),
    
    markLoadComplete() {
        const loadTime = performance.now() - this.startTime;
        console.log(`📊 Page load completed in ${loadTime.toFixed(2)}ms`);
        
        // Send to analytics in real implementation
        if (window.gtag) {
            gtag('event', 'page_load_time', {
                'custom_parameter': loadTime
            });
        }
    },
    
    measureFunction(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`⏱️ ${name} took ${(end - start).toFixed(2)}ms`);
        return result;
    }
};

// Memory management for large datasets
class DataCache {
    constructor(maxSize = 50) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }
    
    set(key, value) {
        if (this.cache.size >= this.maxSize) {
            // Remove oldest entry
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
    
    get(key) {
        return this.cache.get(key);
    }
    
    has(key) {
        return this.cache.has(key);
    }
    
    clear() {
        this.cache.clear();
    }
}

// Global data cache instance
const dataCache = new DataCache();

// Debounced search optimization
const debouncedSearch = debounce((query) => {
    performGlobalSearch(query);
}, 300);

// Optimize DOM queries with caching
const domCache = new Map();

function getCachedElement(selector) {
    if (!domCache.has(selector)) {
        domCache.set(selector, document.querySelector(selector));
    }
    return domCache.get(selector);
}

// ================================
// Accessibility Enhancements
// ================================

// Enhanced keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Skip navigation with 's' key
        if (e.key === 's' && e.altKey) {
            e.preventDefault();
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView();
            }
        }
        
        // Quick search with '/' key
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            const activeElement = document.activeElement;
            if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                const searchInput = getCachedElement('#globalSearch');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
        }
        
        // Escape to close modals/overlays
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.open, .dropdown.open');
            openModals.forEach(modal => modal.classList.remove('open'));
        }
    });
}

// Screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ARIA label management
function updateAriaLabel(element, label) {
    if (element) {
        element.setAttribute('aria-label', label);
    }
}

// ================================
// Error Handling & Resilience
// ================================

// Global error handler
window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error);
    
    // Show user-friendly message
    showNotification('An error occurred. Please refresh the page if issues persist.', 'error');
    
    // Log to analytics in real implementation
    if (window.gtag) {
        gtag('event', 'exception', {
            'description': event.error?.message || 'Unknown error',
            'fatal': false
        });
    }
});

// Chart.js error handling
function safeChartCreation(canvasElement, config) {
    try {
        return new Chart(canvasElement, config);
    } catch (error) {
        console.error('Chart creation failed:', error);
        canvasElement.parentElement.innerHTML = `
            <div class="chart-error">
                <p>Unable to load chart. Please try refreshing the page.</p>
            </div>
        `;
        return null;
    }
}

// ================================
// Service Worker Registration (Progressive Enhancement)
// ================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed');
            });
    });
}

// ================================
// Final Initialization
// ================================

// Enhanced initialization with performance monitoring
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AI Ecosystem Interactive Report - Enhanced Initialization...');
    
    // Initialize performance-optimized features
    performanceMonitor.measureFunction('Lazy Loading Setup', initializeLazyLoading);
    performanceMonitor.measureFunction('Keyboard Navigation', initializeKeyboardNavigation);
    
    // Mark load complete
    window.addEventListener('load', () => {
        performanceMonitor.markLoadComplete();
        announceToScreenReader('AI Ecosystem Report loaded successfully');
    });
});

console.log('🎉 AI Ecosystem Report - All systems optimized and ready!');