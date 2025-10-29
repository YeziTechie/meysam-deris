document.addEventListener('DOMContentLoaded', () => {
    
    // --- Variable Definitions ---
    const toggleBtn = document.getElementById('chat-toggle-btn');
    const chatBox = document.getElementById('chat-box');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const messageContainer = document.getElementById('chat-messages');

    // 1. 🎯 NEW: Array to store conversation history for context
    const conversationHistory = [];

    // --- Toggle Button Logic ---
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.add('hidden');
        chatBox.classList.remove('hidden');
    });

    // --- Send Button/Enter Key Logic ---
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    /**
     * Renders a message bubble to the chat container.
     * @param {string} text - The message content.
     * @param {string} sender - 'user' or 'ai'.
     * @param {object} whatsappData - Contains number and message for the button (optional).
     */
    function renderMessage(text, sender, whatsappData = null) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        const p = document.createElement('p');
        p.innerHTML = text.replace(/\n/g, '<br>'); 
        
        messageDiv.appendChild(p);
        
        // 2. 🎯 UPDATED: Check for and use dynamic WhatsApp data
        if (whatsappData) {
            const { whatsapp_number, whatsapp_message } = whatsappData;
            
            // Build the wa.me link using the dynamic number and pre-filled message
            const waLink = `https://wa.me/${whatsapp_number}?text=${encodeURIComponent(whatsapp_message)}`;
            
            const waButton = document.createElement('a');
            waButton.href = waLink;
            waButton.target = "_blank";
            waButton.textContent = "➡️ Contact Me on WhatsApp";
            waButton.className = "whatsapp-redirect-btn"; 
            
            const buttonWrapper = document.createElement('div');
            buttonWrapper.classList.add('whatsapp-btn-wrapper');
            buttonWrapper.appendChild(waButton);
            messageDiv.appendChild(buttonWrapper);
        }

        messageContainer.appendChild(messageDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    /**
     * Handles the user message, updates history, and calls the AI.
     */
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        renderMessage(message, 'user');
        
        // 1. 🎯 NEW: Add user message to history
        conversationHistory.push({ role: 'user', content: message });
        
        userInput.value = '';
        getAiResponse(); // Call without arguments, as data is pulled from history
    }

    /**
     * Connects to the Django backend using the conversation history.
     */
    async function getAiResponse() {
        renderMessage("...", 'ai'); 

        try {
            const response = await fetch('/ai-endpoint/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Note: CSRF token logic for security should be added here
                },
                // 1. 🎯 NEW: Send the entire conversation history instead of just the last prompt
                body: JSON.stringify({ 
                    history: conversationHistory, // Send the full history
                    prompt: conversationHistory[conversationHistory.length - 1].content // Still send the latest prompt for simplified Django processing
                })
            });

            messageContainer.lastChild.remove(); 

            if (!response.ok) {
                throw new Error('Server returned an error.');
            }

            const data = await response.json();
            const aiText = data.ai_response;
            
            // 3. 🎯 UPDATED: Check for the new redirect flag from Django
            const needsWhatsapp = data.whatsapp_redirect === true;
            
            let whatsappData = null;
            if (needsWhatsapp) {
                 whatsappData = {
                    whatsapp_number: data.whatsapp_number,
                    whatsapp_message: data.whatsapp_message
                 };
            }

            // 1. 🎯 NEW: Add AI message to history
            conversationHistory.push({ role: 'ai', content: aiText });
            
            // Display AI response and conditionally add the button
            renderMessage(aiText, 'ai', whatsappData);

        } catch (error) {
            console.error('Error fetching AI response:', error);
            // If the chat fails, add a fallback error message to history to maintain flow
            conversationHistory.push({ role: 'ai', content: 'Sorry, I am currently unavailable.' }); 
            renderMessage('Sorry, I am currently unavailable.', 'ai');
        }
    }
});