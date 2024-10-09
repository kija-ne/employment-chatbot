document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const inputText = document.getElementById('inputText');
    const sendButton = document.getElementById('sendButton');

    // Create the attach button and file input element
    const attachButton = document.createElement('button');
    attachButton.innerHTML = '📎';
    attachButton.className = 'icon-button';
    attachButton.id = 'attachButton';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none'; // Hide the file input element initially

    // Insert the attach button before the send button
    sendButton.parentNode.insertBefore(attachButton, sendButton);
    sendButton.parentNode.appendChild(fileInput);

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        messageElement.innerText = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendButton.addEventListener('click', () => {
        const userMessage = inputText.value.trim();
        if (userMessage !== '') {
            addMessage(userMessage, 'user');
            inputText.value = '';

            setTimeout(() => {
                let botResponse;
                if (userMessage.includes('이력서 작성 가이드')) {
                    botResponse = '이력서를 작성하는 가이드에 대해 궁금하신가요? 네, 아니오로 답변해주세요.';
                } else {
                    botResponse = '"이력서 작성 가이드", "직업 선택", "채용 공고 제공", "학습 자료 제공" 중 하나를 입력해주세요.';
                }
                addMessage(botResponse, 'bot');
            }, 1000);
        }
    });

    inputText.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    // Event listener for the attach button
    attachButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent any default behavior
        fileInput.click();  // This triggers the file input dialog
    });

    // Event listener for file input change
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            addMessage(`선택된 파일: ${file.name}`, 'user');
            // Here you can add code to handle the file upload if needed
        } else {
            addMessage('파일을 선택하지 않았습니다.', 'bot');
        }
    });

    // Initial message
    addMessage('"이력서 작성 가이드", "직업 선택", "채용 공고 제공", "학습 자료 제공" 중 하나를 입력해주세요.', 'bot');
});