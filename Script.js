document.getElementById("quiz-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const q4 = document.querySelector('input[name="q4"]:checked')?.value;
  const q8 = document.querySelector('input[name="q8"]:checked')?.value;
  const q11 = document.querySelector('input[name="q11"]:checked')?.value;

  let result = '';
  if (q4 === "1" && (q8 === "1" || q8 === "2")) {
    result = "blue";
  } else if (q4 === "2" && ["1", "2", "3"].includes(q8)) {
    result = "green";
  } else if (q4 === "3" && ["1", "2", "3", "4"].includes(q8)) {
    result = "red";
  }

  const audition = q11 === "1" ? "&audition=true" : "";

  window.location.href = `result.html?type=${result}${audition}`;
});
