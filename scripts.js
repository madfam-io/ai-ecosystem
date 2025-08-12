document.addEventListener('DOMContentLoaded', function() {

    const glossaryData = {
        "A": {
            "Affective Computing": {
                "Quick Definition": "A field of AI that focuses on enabling computers to recognize, interpret, process, and simulate human emotions.",
                "Detailed Explanation": "Affective computing, also known as emotion AI, is an interdisciplinary field that combines computer science, psychology, and cognitive science. It aims to develop systems that can understand human affects—the experience of feeling or emotion.",
                "Analogy/Example": "A customer service chatbot that can detect frustration in a user's typed messages and adjust its tone to be more empathetic or escalate the issue to a human agent.",
                "Why It Matters": "It allows for more natural and empathetic human-computer interaction, improving applications in areas like mental health support, customer service, and personalized learning."
            },
            "Agent (AI Agent)": {
                "Quick Definition": "A computer system that can perceive its environment and take autonomous actions to achieve specific goals.",
                "Detailed Explanation": "An AI agent is a program designed to operate without direct human control. It uses sensors (virtual or physical) to perceive its surroundings, a decision-making component (often an LLM) to process that information, and actuators to take actions.",
                "Analogy/Example": "A smart thermostat is a simple agent. It senses the room's temperature (perception), decides if it's too hot or cold based on its settings (decision-making), and turns the heating or cooling on or off (action).",
                "Why It Matters": "Agents are the fundamental building block of modern AI applications, enabling the shift from passive content generation to active, goal-oriented task automation."
            },
            // ... Add all other terms from the research document here
        },
        // Add other letters B, C, D... as needed
    };

    /**
     * Injects the glossary content into the DOM.
     * This is a simplified representation. A full implementation would parse
     * all terms from the RESEARCH.md file. For this example, we'll manually
     * add a few terms to demonstrate the functionality.
     */
    function buildGlossary() {
        const glossaryContainer = document.querySelector('.glossary-container');
        if (!glossaryContainer) return;

        // Manually adding a subset of terms for demonstration
        const terms = {
            'Affective Computing': glossaryData.A['Affective Computing'],
            'Agent (AI Agent)': glossaryData.A['Agent (AI Agent)'],
            'Agentic AI': {
                "Quick Definition": "An advanced AI paradigm where multiple, specialized agents collaborate to solve complex, high-level problems.",
                "Detailed Explanation": "Agentic AI represents a system architecture composed of multiple, distinct AI agents that communicate, coordinate, and dynamically divide tasks to achieve a shared objective.",
                "Analogy/Example": "A project team where a project manager (planning agent) breaks down a large project and assigns tasks to specialized agents.",
                "Why It Matters": "This multi-agent approach allows AI to tackle problems of much greater complexity and scale."
            },
            'Transformer': {
                "Quick Definition": "A groundbreaking neural network architecture that uses a self-attention mechanism to process sequential data, forming the basis for most modern large language models.",
                "Detailed Explanation": "Introduced in the 2017 paper 'Attention Is All You Need', the Transformer architecture revolutionized NLP. Its self-attention mechanism allows it to weigh the importance of every word in the sequence relative to every other word.",
                "Analogy/Example": "When reading a sentence, a Transformer can understand that 'it' refers to 'the ball' even if they are far apart by calculating a high attention score between them.",
                "Why It Matters": "The Transformer architecture is the key technological breakthrough that enabled the creation of powerful and coherent large language models like GPT and Claude."
            },
            'Retrieval-Augmented Generation (RAG)': {
                "Quick Definition": "A technique that enhances a generative AI model's response by first retrieving relevant information from an external knowledge base.",
                "Detailed Explanation": "RAG combines a retrieval system (like a search engine) with a generative model (an LLM). It searches a knowledge source for relevant information, adds it to the user's prompt, and then the LLM uses this augmented context to generate a more accurate, factually grounded response.",
                "Analogy/Example": "An 'open-book' exam. Instead of relying solely on memory, you can look up facts in a textbook before writing your answer.",
                "Why It Matters": "RAG is a powerful method to reduce hallucinations, provide current information without retraining, and allow source verification."
            }
        };

        let html = '';
        for (const term in terms) {
            const definition = terms[term];
            html += `
                <div class="glossary-item">
                    <h4 class="glossary-term">${term}</h4>
                    <div class="glossary-definition">
                        <p><strong>Quick Definition:</strong> ${definition['Quick Definition']}</p>
                        <p>${definition['Detailed Explanation']}</p>
                        <p><strong>Analogy/Example:</strong> ${definition['Analogy/Example']}</p>
                        <p><strong>Why It Matters:</strong> ${definition['Why It Matters']}</p>
                    </div>
                </div>
            `;
        }
        glossaryContainer.innerHTML = html;
        
        // Add event listeners after building the glossary
        addGlossaryEventListeners();
    }

    /**
     * Adds click event listeners to glossary terms for accordion functionality.
     */
    function addGlossaryEventListeners() {
        const glossaryTerms = document.querySelectorAll('.glossary-term');
        glossaryTerms.forEach(term => {
            term.addEventListener('click', () => {
                term.classList.toggle('active');
                const definition = term.nextElementSibling;
                definition.classList.toggle('show');
            });
        });
    }

    /**
     * Handles smooth scrolling for navigation links.
     */
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Manages the visibility of the scroll-to-top button.
     */
    function setupScrollToTopButton() {
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (!scrollTopBtn) return;

        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    /**
     * Sets up the active state for sidebar navigation based on scroll position.
     */
    function setupScrollSpy() {
        const sections = document.querySelectorAll('main section');
        const navLinks = document.querySelectorAll('.sidebar-nav li a');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').substring(1) === entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: "-30% 0px -70% 0px" }); // Adjust rootMargin to trigger when section is in the middle of the viewport

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Toggles the mobile navigation menu.
     */
    function setupMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidebarNav = document.querySelector('.sidebar-nav');
        if(menuToggle && sidebarNav) {
            menuToggle.addEventListener('click', () => {
                sidebarNav.classList.toggle('open');
            });
        }
    }

    // Initialize all functionalities
    buildGlossary();
    setupSmoothScrolling();
    setupScrollToTopButton();
    setupScrollSpy();
    setupMobileMenu();
});
