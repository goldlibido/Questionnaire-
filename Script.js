document.getElementById('questionnaire-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get the selected answers
    const formData = new FormData(this);
    const answers = {};
    for (let [name, value] of formData) {
        answers[name] = value;
    }

    // Determine the result based on Question 4 (vibe preference)
    let resultMessage = '';
    switch (answers['q4']) {
        case 'blue-room':
            resultMessage = 'You belong in the Blue Room! You’re all about passion, intimacy, and connection.';
            break;
        case 'green-room':
            resultMessage = 'You belong in the Green Room! You’re into adventurous, playful, and experimental vibes.';
            break;
        case 'red-room':
            resultMessage = 'You belong in the Red Room! You crave intensity, power dynamics, and bold experiences.';
            break;
        default:
            resultMessage = 'Please answer all questions to see your result.';
    }

    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = resultMessage;
});
