document.querySelector(".loan-form").addEventListener("submit", function (e) {
  // Hide Result
  document.querySelector(".result").style.display = "none";

  //Show Loader
  document.querySelector(".loading").style.display = "block";

  setTimeout(calculateResult, 2000);
  e.preventDefault();
});

//   Calculate Result
function calculateResult() {
  console.log("Calculating....");
  // UI Variables
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // Show Result
    document.querySelector(".result").style.display = "block";
    // Hide Loader
    document.querySelector(".loading").style.display = "none";
  } else {
    showError("Please Check your numbers");
  }
  amount.value = "";
  interest.value = "";
  years.value = "";
}

function showError(text) {
  // Hide Result
  document.querySelector(".result").style.display = "none";

  //Hide Loader
  document.querySelector(".loading").style.display = "none";
  const error = document.querySelector(".error");
  error.classList.add("active");
  error.innerText = text;
  setTimeout(() => {
    error.classList.remove("active");
  }, 3000);
}
