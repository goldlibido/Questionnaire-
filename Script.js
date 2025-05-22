document.getElementById('quizForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const answers = {};
  for (let i = 1; i <= 10; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected) {
      answers[`q${i}`] = selected.value;
    }
  }

  if (Object.keys(answers).length < 10) {
    document.getElementById('alert').textContent = "Complete questionnaire to see results!";
    return;
  }

  localStorage.setItem('sugar', answers.q5 === 'yes' || answers.q5 === 'iam');
  const q3 = answers.q3;
  const q7 = answers.q7;

  let result = 'blue'; // default

  if (q3 === 'red') {
    result = 'red';
  } else if (q3 === 'green') {
    result = 'green';
  } else if (q3 === 'blue') {
    result = 'blue';
  }

  localStorage.setItem('resultRoom', result);
  window.location.href = "result.html";
});
