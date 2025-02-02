document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("donation-form");
    const tableBody = document.querySelector("#donation-table tbody");
    
    // Load saved donations from localStorage
    let donations = JSON.parse(localStorage.getItem("donations")) || [];

    function updateTable() {
        tableBody.innerHTML = ""; // Clear table
        donations.forEach((donation, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${donation.organization}</td>
                <td>$${donation.amount}</td>
                <td>${donation.date}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                donations.splice(index, 1);
                localStorage.setItem("donations", JSON.stringify(donations));
                updateTable();
            });
        });
    }

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const organization = document.getElementById("organization").value;
        const amount = document.getElementById("amount").value;
        const date = document.getElementById("date").value;

        if (!organization || !amount || !date) {
            alert("Please fill in all fields.");
            return;
        }

        // Add donation to the list
        donations.push({ organization, amount, date });
        localStorage.setItem("donations", JSON.stringify(donations));
        updateTable();
        form.reset(); // Clear form
    });

    updateTable(); // Initialize table with saved data
});
