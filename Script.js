document.getElementById("quizForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const totalQuestions = 10;
  for (let i = 1; i <= totalQuestions; i++) {
    if (!document.querySelector(`input[name="q${i}"]:checked`)) {
      alert("Complete questionnaire to see results!");
      return;
    }
  }

  const q3 = document.querySelector('input[name="q3"]:checked').value;
  const q5 = document.querySelector('input[name="q5"]:checked').value;

  let room = "";
  if (q3 === "whipped") {
    room = "blue";
  } else if (q3 === "toys") {
    room = "green";
  } else if (q3 === "bdsm") {
    room = "red";
  }

  const sugar = (q5 === "yes" || q5 === "iam") ? "true" : "false";
  window.location.href = `result.html?room=${room}&sugar=${sugar}`;
});
