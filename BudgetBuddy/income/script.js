const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));
const myDiv = document.getElementById("three");
// const myDiv2 = document.getElementById("two");

sidebarClose.addEventListener("click", () => {
  
  sidebar.classList.add("close", "hoverable");
});
sidebarExpand.addEventListener("click", () => {
  
  sidebar.classList.remove("close", "hoverable");
});

sidebar.addEventListener("mouseenter", () => {
  if (sidebar.classList.contains("hoverable")) {
    myDiv.style.marginLeft = "280px"
    // myDiv2.style.marginLeft = "730px"
    // myDiv2.style.width = 30%
    sidebar.classList.remove("close");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (sidebar.classList.contains("hoverable")) {
    myDiv.style.marginLeft = "100px"
    // myDiv2.style.marginLeft = "550px"
    sidebar.classList.add("close");
  }
});

darkLight.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    document.setI
    darkLight.classList.replace("bx-sun", "bx-moon");
  } else {
    darkLight.classList.replace("bx-moon", "bx-sun");
  }
});

submenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("show_submenu");
    submenuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show_submenu");
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const incomeTransactionList = document.getElementById("incomeTransactionList");
  const incomeStatus = document.getElementById("incomeStatus");
  // Fetch transactions from localStorage
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  console.log("transactions");

  // Render positive income transactions
  renderPositiveIncomeTransactions(transactions);

  function renderPositiveIncomeTransactions(transactions) {
      incomeTransactionList.innerHTML = "";

      const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "INR",
          signDisplay: "always",
      });

      // Filter transactions to include only positive income
      const positiveIncomeTransactions = transactions.filter(({ type, amount }) => type === "income" && amount > 0);

      // Check if there are any positive income transactions
      if (positiveIncomeTransactions.length === 0) {
          incomeStatus.innerHTML = "No income transactions";
      } else {
          // Render each positive income transaction
          positiveIncomeTransactions.forEach(({ name, amount, date }) => {
              const li = document.createElement("li");
              const formattedAmount = formatter.format(amount);
              li.innerHTML = `
                <div class= "Archit">
                  <div class="name">
                      <h4>${name}</h4>
                      <p>${new Date(date).toLocaleDateString()}</p>
                  </div>
                  <div class="amount income">
                      <span>${formattedAmount}</span>
                  </div>
                </div>
              `;
              incomeTransactionList.appendChild(li);
          });
      }
  }
});
