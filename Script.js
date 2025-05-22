// ----------------------  UTILITY  ----------------------
const getValue = (name) => {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : null;
};

// ----------------------  FORM HANDLER  -----------------
document.getElementById("questionnaire").addEventListener("submit", (e) => {
  e.preventDefault();

  const q4  = getValue("q4");
  const q7  = getValue("q7");
  const q10 = getValue("q10");

  // ---------  DETERMINE RESULT COLOR  ---------
  let result = "blue"; // default
  if (q4 === "passion"   && (q7 === "no" || q7 === "maybe"))        result = "blue";
  else if (q4 === "kinky-fun" && ["no","maybe","fun"].includes(q7)) result = "green";
  else if (q4 === "bdsm"   && ["no","maybe","fun","more"].includes(q7)) result = "red";

  // store + move
  localStorage.setItem("resultColor", result);
  localStorage.setItem("showExtra", q10 === "yes");
  window.location.href = "result.html";
});
