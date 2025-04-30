document.getElementById('questionnaire-form').addEventListener('submit', function(event) {
event.preventDefault();

// Get the answer to Question 4
const vibe = document.querySelector('input[name="q4"]:checked').value;

// Determine the result based on Question 4
let result;
if (vibe === "blue-room") {
    result = "Visit the blue room to meet people compatible with your personality!";
} else if (vibe === "green-room") {
    result = "Visit the green room to meet people compatible with your personality!";
} else if (vibe === "red-room") {
    result = "Visit the red room to meet people compatible with your personality!";
}

// Display the result
const resultDiv = document.getElementById('result');
resultDiv.textContent = result;
resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
