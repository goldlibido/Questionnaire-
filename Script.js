document.getElementById("questionnaire").addEventListener("submit", function (e) {
  e.preventDefault();

  const q3 = document.querySelector("input[name='q3']:checked")?.value;
  const q7 = document.querySelector("input[name='q7']:checked")?.value;
  const q10 = document.querySelector("input[name='q10']:checked")?.value;

  let result = "blue";

  if (q3 === "kinky" && ["no", "maybe", "yeah", "more"].includes(q7)) {
    result = "red";
  } else if (q3 === "casual" && ["no", "maybe", "yeah"].includes(q7)) {
    result = "green";
  } else if (q3 === "passionate" && ["no", "maybe"].includes(q7)) {
    result = "blue";
  }

  window.location.href = `result.html?color=${result}&audition=${q10 === "yes"}`;
});
