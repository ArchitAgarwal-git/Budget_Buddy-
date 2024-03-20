// JavaScript file

document.addEventListener("DOMContentLoaded", function() {
    const allTransactionList = document.getElementById("allTransactionList");

    // Fetch transactions from localStorage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    console.log("transactions");

    // Render all transactions
    renderAllTransactions(transactions);

    function renderAllTransactions(transactions) {
        allTransactionList.innerHTML = "";

        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "INR",
            signDisplay: "always",
        });

        transactions.forEach(({ id, name, amount, date, type }) => {
            const sign = "income" === type ? 1 : -1;

            const li = document.createElement("li");
            li.classList.add("transaction-item"); // Add a class for styling

            li.innerHTML = `
                <div class="name">
        <h4>${name}</h4>
        <p>${new Date(date).toLocaleDateString()}</p>
      </div>

      <div class="amount ${type}">
        <span>${formatter.format(amount * sign)}</span>
      </div>
            `;

            allTransactionList.appendChild(li);
        });
    }
});
