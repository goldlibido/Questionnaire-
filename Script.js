document.getElementById("quizForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const q3 = document.querySelector('input[name="q3"]:checked')?.value;
  const q7 = document.querySelector('input[name="q7"]:checked')?.value;
  const q10 = document.querySelector('input[name="q10"]:checked')?.value;

  let room = "";
  if (q3 === "passionate" && (q7 === "no" || q7 === "maybe")) {
    room = "blue";
  } else if (q3 === "wild" && (q7 === "no" || q7 === "maybe" || q7 === "yeah")) {
    room = "green";
  } else if (q3 === "kinky" && ["no", "maybe", "yeah", "hellyeah"].includes(q7)) {
    room = "red";
  }

  if (room) {
    const url = `result.html?room=${room}&show=${q10}`;
    window.location.href = url;
  }
});
