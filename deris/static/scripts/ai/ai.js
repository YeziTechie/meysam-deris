document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('chat-toggle-btn');
    const chatBox = document.getElementById('chat-box');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const messageContainer = document.getElementById('chat-messages');

    // Toggle Button Logic
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.add('hidden');
        chatBox.classList.remove('hidden');
    });

    // Send Button/Enter Key Logic
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
     */
    function renderMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        const p = document.createElement('p');
        p.textContent = text;
        
        messageDiv.appendChild(p);
        messageContainer.appendChild(messageDiv);
        
        // Auto-scroll to the bottom
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    /**
     * Handles the user message and sends it to the server.
     */
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // 1. Display user message immediately (on the right)
        renderMessage(message, 'user');
        
        // 2. Clear input
        userInput.value = '';
        
        // 3. Placeholder for AI response/Server call
        getAiResponse(message);
    }

    /**
     * Placeholder function for calling the Django View.
     * This is the function you will connect to your Django endpoint.
     */
    async function getAiResponse(userPrompt) {
        // Show a loading indicator (optional)
        renderMessage("...", 'ai'); // Simple loading message

        try {
            // REPLACE THIS FETCH URL with your actual Django endpoint
            const response = await fetch('/ai-endpoint/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // **NOTE:** You must include the CSRF token here for Django security
                    // 'X-CSRFToken': getCookie('csrftoken'), 
                },
                body: JSON.stringify({ prompt: userPrompt })
            });

            // Remove the loading message 
            messageContainer.lastChild.remove(); 

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const aiText = data.ai_response; // Assumes your Django view returns a key called 'ai_response'
            
            // 4. Display AI response (on the left)
            renderMessage(aiText, 'ai');

        } catch (error) {
            console.error('Error fetching AI response:', error);
            renderMessage('Sorry, I am currently unavailable.', 'ai');
        }
    }
});