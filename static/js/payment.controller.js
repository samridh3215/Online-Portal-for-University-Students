// Function to handle the button click event
document.getElementById('addPaymentBtn').addEventListener('click', function() {
    document.getElementById('addPaymentBtn').style.display = 'none';
    document.getElementById('paymentForm').style.display = 'block';
  });
  
  // Function to handle form submission
  document.getElementById('paymentFormFields').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get form values
    const paymentTitle = document.getElementById('paymentTitle').value;
    const paymentAmount = document.getElementById('paymentAmount').value;
  
    // Display form values in a table
    const tableBody = document.getElementById('paymentBody');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `<td>${paymentTitle}</td><td>${paymentAmount}</td>`;
  
    // Hide form and show add payment button
    document.getElementById('paymentForm').style.display = 'none';
    document.getElementById('paymentTable').style.display = 'block';
    document.getElementById('addPaymentBtn').style.display = 'block';
  });
  