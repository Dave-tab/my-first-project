/* ==============================
   GET ELEMENTS FROM THE HTML
   ============================== */
// Get the form element by its ID
const transactionForm = document.getElementById("transactionForm");

// Get the list where transactions will be displayed
const transactionList = document.getElementById("transactionList");

// Get balance elements
const totalBalance = document.getElementById("totalBalance");
const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");

// Store all transactions in an array
let transactions = [];
// Listen when the form is submitted
transactionForm.addEventListener("submit", function (event) {
    // Stop the page from refreshing
    event.preventDefault();
console.log("Form Submitted");
    // Get values entered by the user
    const type = transactionForm.type.value;       // Income or Expense
    const amount = transactionForm.amount.value;   // Amount
    const date = transactionForm.date.value;       // Date
    const category = transactionForm.category.value; // Category
    // Create a list item (li)
    const listItem = document.createElement("li");
    listItem.classList.add("transaction-item");

    // Create icon container
    const icon = document.createElement("div");
    icon.classList.add("transaction-icon");
    icon.innerText = type === "income" ? "IN" : "OUT";

    // Create details container
    const details = document.createElement("div");
    details.classList.add("transaction-details");

    // Create category name
    const name = document.createElement("div");
    name.classList.add("transaction-name");
    name.innerText = category;

    // Create date
    const dateText = document.createElement("div");
    dateText.classList.add("transaction-date");
    dateText.innerText = new Date(date).toDateString();

    // Create amount
    const amountText = document.createElement("div");
    amountText.classList.add("transaction-amount");

    // Add color based on income or expense
    if (type === "income") {
        amountText.classList.add("income");
        amountText.innerText = "+$" + amount;
    } else {
        amountText.classList.add("expense");
        amountText.innerText = "-$" + amount;
    }

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("transaction-delete");
    deleteBtn.innerText = "x";
    // Add name and date inside details
    details.appendChild(name);
    details.appendChild(dateText);

    // Add all elements into list item
    listItem.appendChild(icon);
    listItem.appendChild(details);
    listItem.appendChild(amountText);
    listItem.appendChild(deleteBtn);

    // Add list item to the top of the list
    transactionList.prepend(listItem);
    // Save transaction to array
    transactions.push({ type, amount });

    // Update totals
    updateBalance();

    // Clear form after submission
    transactionForm.reset();
});
function updateBalance() {

    let income = 0;
    let expense = 0;

    // Loop through all transactions
    transactions.forEach(function (item) {

        if (item.type === "income") {
            income += Number(item.amount);
        } else {
            expense += Number(item.amount);
        }
    });

    // Update UI
    totalIncome.innerText = "$" + income;
    totalExpense.innerText = "$" + expense;
    totalBalance.innerText = "$" + (income - expense);
}
transactionList.addEventListener("click", function (event) {

    // Check if delete button was clicked
    if (event.target.classList.contains("transaction-delete")) {

        // Remove the transaction item from UI
        const item = event.target.parentElement;
        item.remove();
    }
});