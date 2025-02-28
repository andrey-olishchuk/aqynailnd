// Initialize Lucide icons
lucide.createIcons();

// FAQ Data
const FAQ_ITEMS = [
    {
        question: "What is RAG and how does it work?",
        answer: "RAG (Retrieval Augmented Generation) enhances LLM responses by retrieving relevant context from your knowledge base. While LLMs excel at general knowledge, they lack understanding of your company's specific context, internal documentation, and proprietary information. RAG bridges this gap by automatically retrieving and injecting relevant internal context into the LLM's prompt, enabling accurate responses about your specific use cases, products, and documentation."
    },
    {
        question: "Which data could be used as a knowledge base?",
        answer: "Aqyn supports a wide range of knowledge sources including technical documentation, code repositories, API specs, architectural diagrams, and internal wikis. Our document processors handle PDF, Markdown, HTML, JSON, YAML, and various programming language files with proper syntax parsing."
    },
    // Add other FAQ items here
];

// Initialize FAQ accordion
function initializeFAQ() {
    const accordion = document.getElementById('faqAccordion');
    
    FAQ_ITEMS.forEach((item, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        
        accordionItem.innerHTML = `
            <div class="accordion-header" onclick="toggleAccordion(${index})">
                ${item.question}
                <i data-lucide="chevron-down"></i>
            </div>
            <div class="accordion-content" id="accordion-content-${index}">
                <p>${item.answer}</p>
                ${item.code ? `<pre class="code-block"><code>${item.code}</code></pre>` : ''}
            </div>
        `;
        
        accordion.appendChild(accordionItem);
    });
    
    // Re-initialize Lucide icons for the newly added elements
    lucide.createIcons();
}

// Toggle accordion items
function toggleAccordion(index) {
    const content = document.getElementById(`accordion-content-${index}`);
    const allContents = document.querySelectorAll('.accordion-content');
    
    allContents.forEach((item, i) => {
        if (i !== index) {
            item.classList.remove('active');
        }
    });
    
    content.classList.toggle('active');
}

// Chat functionality
function initializeChat() {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const message = messageInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage('user', message);
        
        // Simulate AI response
        setTimeout(() => {
            addMessage('assistant', 'This is a simulated response. In the actual implementation, this would be replaced with real AI responses based on the documentation.');
        }, 1000);
        
        messageInput.value = '';
    });
}

function addMessage(role, content) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Focus chat input
function focusChat() {
    const messageInput = document.getElementById('messageInput');
    messageInput.focus();
    messageInput.scrollIntoView({ behavior: 'smooth' });
}

// Wave background animation
function initializeWaveBackground() {
    const background = document.querySelector('.wave-background');
    background.innerHTML = `
        <svg class="waves" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
            <path class="wave wave1" d="M-100,200 C 200,100 400,300 600,200 S 800,100 1000,200 S 1200,300 1540,200" />
            <path class="wave wave2" d="M-100,400 C 200,300 400,500 600,400 S 800,300 1000,400 S 1200,500 1540,400" />
            <path class="wave wave3" d="M-100,600 C 200,500 400,700 600,600 S 800,500 1000,600 S 1200,700 1540,600" />
        </svg>
    `;
    
    // Add CSS animations for waves
    const style = document.createElement('style');
    style.textContent = `
        .waves {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        .wave {
            fill: none;
            stroke: var(--primary);
            stroke-width: 2;
            opacity: 0.2;
        }
        .wave1 { animation: wave 8s infinite linear; }
        .wave2 { animation: wave 10s infinite linear; opacity: 0.1; }
        .wave3 { animation: wave 12s infinite linear; opacity: 0.05; }
        @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeFAQ();
    initializeChat();
    initializeWaveBackground();
});
