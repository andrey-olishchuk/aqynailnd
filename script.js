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
    }
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

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeFAQ();
    initializeChat();
});