document.getElementById('questionnaire').addEventListener('submit', function (e) {
  e.preventDefault();

  function getAnswer(name) {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : null;
  }

  const q4 = getAnswer('q4');
  const q7 = getAnswer('q7');
  const q10 = getAnswer('q10');

  let result = 'blue';
  if (q4 === 'passion' && ['no', 'maybe'].includes(q7)) result = 'blue';
  else if (q4 === 'kinky-fun' && ['no', 'maybe', 'fun'].includes(q7)) result = 'green';
  else if (q4 === 'bdsm' && ['no', 'maybe', 'fun', 'more'].includes(q7)) result = 'red';

  localStorage.setItem('resultColor', result);
  localStorage.setItem('showExtra', q10 === 'yes');
  window.location.href = 'result.html';
});
