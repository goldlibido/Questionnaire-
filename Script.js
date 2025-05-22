document.getElementById("quizForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const required = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];
  let unanswered = required.filter(name => !document.querySelector(`input[name="${name}"]:checked`));

  if (unanswered.length > 0) {
    alert("Complete questionnaire to see results!");
    return;
  }

  const q3 = document.querySelector('input[name="q3"]:checked').value;

  let room = "";

  if (q3 === "whipped cream") {
    room = "blue";
  } else if (q3 === "sex toys") {
    room = "green";
  } else if (q3 === "BDSM") {
    room = "red";
  }

  window.location.href = `result.html?room=${room}`;
});
