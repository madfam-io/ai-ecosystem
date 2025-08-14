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

console.log('🎉 AI Ecosystem Report - All systems ready!');