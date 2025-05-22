document.getElementById('questionnaire').addEventListener('submit', function (e) {
  e.preventDefault();

  function getAnswer(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
  }

  const q4 = getAnswer('q4')[0];
  const q7 = getAnswer('q7')[0];
  const q10 = getAnswer('q10')[0];

  let result = 'blue'; // default fallback

  if (q4 === 'passion' && (q7 === 'no' || q7 === 'maybe')) {
    result = 'blue';
  } else if (q4 === 'kinky-fun' && ['no', 'maybe', 'fun'].includes(q7)) {
    result = 'green';
  } else if (q4 === 'bdsm' && ['no', 'maybe', 'fun', 'more'].includes(q7)) {
    result = 'red';
  }

  localStorage.setItem('resultColor', result);
  localStorage.setItem('showExtra', q10 === 'yes');
  window.location.href = 'result.html';
});
