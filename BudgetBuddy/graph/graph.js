const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));
const myDiv = document.getElementById("one");
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
    sidebar.classList.remove("close");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (sidebar.classList.contains("hoverable")) {
    myDiv.style.marginLeft = "9px"
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


document.addEventListener("DOMContentLoaded", function () {
  // Retrieve transactions from local storage
  const transactions = getTransactions();

  // Extract dates, income, and expense data
  const dates = transactions.map(trx => new Date(trx.date).toLocaleDateString());
  const incomeData = transactions.filter(trx => trx.type === "income").map(trx => trx.amount);
  const expenseData = transactions.filter(trx => trx.type === "expense").map(trx => trx.amount * -1); // Convert expense to negative value

  // Determine font color based on dark mode
  const fontColor = body.classList.contains("dark") ? "#fff" : "#000";

  // Initialize Chart.js chart
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Income',
              data: incomeData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
          }, {
              label: 'Expense',
              data: expenseData,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      fontColor: fontColor // Set font color based on dark mode
                  }
              }],
              xAxes: [{
                  ticks: {
                      fontColor: fontColor // Set font color based on dark mode
                  }
              }]
          }
      }
  });
});



// Function to retrieve transactions from local storage
function getTransactions() {
    return JSON.parse(localStorage.getItem("transactions")) || [];
}
