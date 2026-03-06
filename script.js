// script.js
document.addEventListener('DOMContentLoaded', function() {
   
    let expenses = [];
    const MAX_EXPENSE = 10000; 
    
   
    const expenseForm = document.getElementById('expense-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const categorySelect = document.querySelector('.form-select');
    const dateInput = document.getElementById('date');
    const expenseTableBody = document.getElementById('expense-table-body');
    const totalAmountElement = document.getElementById('total-amount');
    
    
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    
   
    function addExpense(event) {
        event.preventDefault(); 
        
      
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const category = categorySelect.options[categorySelect.selectedIndex].text;
        const date = dateInput.value;
        
        if (description === '') {
            alert('Please enter an expense name');
            return;
        }
        
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount (greater than 0)');
            return;
        }
        
    
        if (amount > MAX_EXPENSE) {
            alert(`Individual expense cannot exceed $${MAX_EXPENSE.toFixed(2)}`);
            return;
        }
        
   
        const expense = {
            id: Date.now(), 
            description: description,
            amount: amount,
            category: category,
            date: date
        };
        
 
        expenses.push(expense);
    
        displayExpenses();
        calculateTotal();     
        clearInputs();
    }
    
 
    function deleteExpense(id) {

        expenses = expenses.filter(expense => expense.id !== id);
        displayExpenses();
        calculateTotal();
    }
    
    
    function displayExpenses() {
        expenseTableBody.innerHTML = '';
        
       
        for (let i = 0; i < expenses.length; i++) {
            const expense = expenses[i];
            
            const row = document.createElement('tr');        
      const descriptionCell = document.createElement('td');
            descriptionCell.textContent = expense.description;
            
            const amountCell = document.createElement('td');
            amountCell.textContent = '$' + expense.amount.toFixed(2);
            
            const categoryCell = document.createElement('td');
            categoryCell.textContent = expense.category;
            
            const dateCell = document.createElement('td');
            dateCell.textContent = expense.date;
            
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'btn btn-danger btn-sm';
               deleteButton.onclick = function() {
                deleteExpense(expense.id);
            };
            
            deleteCell.appendChild(deleteButton);
                row.appendChild(descriptionCell);
            row.appendChild(amountCell);
            row.appendChild(categoryCell);
            row.appendChild(dateCell);
            row.appendChild(deleteCell);
            
            expenseTableBody.appendChild(row);
        }
    }
     function calculateTotal() {
        let total = 0;
        
        for (let i = 0; i < expenses.length; i++) {
            total += expenses[i].amount;
        }
        
        totalAmountElement.textContent = total.toFixed(2);
        
        const totalElement = totalAmountElement.parentElement;
        if (total > MAX_EXPENSE) {
            totalElement.style.color = 'red';
            totalElement.style.fontWeight = 'bold';
        } else {
            totalElement.style.color = ''; 
            totalElement.style.fontWeight = '';
        }
    }
    
    function clearInputs() {
        descriptionInput.value = '';
        amountInput.value = '';
        dateInput.value = today;
        categorySelect.selectedIndex = 0;
        descriptionInput.focus();
    }
    
  
    expenseForm.addEventListener('submit', addExpense);
      displayExpenses();
    calculateTotal();
});