// Get elements
const goalExpenseInput = document.getElementById("goalExpense");
const monthlyIncomeInput = document.getElementById("monthlyIncome");
const monthlyExpensesInput = document.getElementById("monthlyExpenses");
const desiredTimeInput = document.getElementById("desiredTime");
const feasibilityOutput = document.getElementById("feasibility");
const monthlySavingsOutput = document.getElementById("monthlySavings");
const tipsOutput = document.getElementById("tips");
const rangeInputs = document.querySelectorAll(".range-input input");

// Function to update other inputs (Feasibility, Monthly Savings Required, and Tips)
function updateOtherInputs() {
  // Update input fields from range inputs
  goalExpenseInput.value = rangeInputs[0].value;
  monthlyIncomeInput.value = rangeInputs[1].value;
  monthlyExpensesInput.value = rangeInputs[2].value;
  desiredTimeInput.value = rangeInputs[3].value;

  const goalExpense = parseFloat(goalExpenseInput.value);
  const monthlyIncome = parseFloat(monthlyIncomeInput.value);
  const monthlyExpenses = parseFloat(monthlyExpensesInput.value);
  const desiredTime = parseFloat(desiredTimeInput.value);

  // Calculate total monthly savings (income - expenses)
  const totalMonthlySavings = monthlyIncome - monthlyExpenses;

  // Check if inputs are valid and goal is achievable
  if (monthlyIncome && monthlyExpenses && desiredTime && totalMonthlySavings >= 0) {
    // Check if goal is achievable
    if (totalMonthlySavings >= goalExpense / (desiredTime * 12)) {
      // Calculate monthly savings required
      console.log(desiredTime *12)
      const monthlySavingsRequired = ((goalExpense ) / (desiredTime * 12)).toFixed(2);

      // Display feasibility and monthly savings required
      feasibilityOutput.textContent = "Possible";
      monthlySavingsOutput.textContent = monthlySavingsRequired;

      // Generate and display tips
      generateTips(goalExpense, totalMonthlySavings, desiredTime);
    } else {
      // Clear feasibility and monthly savings required
      feasibilityOutput.textContent = "";
      monthlySavingsOutput.textContent = "";

      // Clear tips
      tipsOutput.innerHTML = "";
    }
  } else {
    // Clear feasibility and monthly savings required
    feasibilityOutput.textContent = "";
    monthlySavingsOutput.textContent = "";

    // Clear tips
    tipsOutput.innerHTML = "";
  }
}

// Function to generate tips based on user inputs
function generateTips(goalExpense, totalMonthlySavings, desiredTime) {
  let tips = [];

  // Tip 1: Increase Total Monthly Savings
  if (totalMonthlySavings < goalExpense / (desiredTime * 12)) {
    tips.push("Consider finding ways to increase your total monthly savings (income - expenses).");
  }

  // Tip 2: Extend Timeframe
  if (desiredTime < 5 && goalExpense > totalMonthlySavings) {
    tips.push("Extending your timeframe may make it more feasible to achieve your goal.");
  }

  // Display tips
  tipsOutput.innerHTML = tips.length ? "<strong>Here are some tips to help you:</strong><br>" + tips.join("<br>") : "";
}

// Attach event listeners to input fields
goalExpenseInput.addEventListener("input", updateOtherInputs);
monthlyIncomeInput.addEventListener("input", updateOtherInputs);
monthlyExpensesInput.addEventListener("input", updateOtherInputs);
desiredTimeInput.addEventListener("input", updateOtherInputs);

// Attach event listeners to range inputs
rangeInputs.forEach(input => {
  input.addEventListener("input", (e) => {
    updateOtherInputs();
  });
});
// Initialize calculations and tips
updateOtherInputs();
