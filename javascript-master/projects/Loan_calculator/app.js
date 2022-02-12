// Listen and Submit
document.getElementById('loan-form').addEventListener('submit', function(e){
   //Hide Results
   document.getElementById('results').style.display = 'none';

   //Show Loader
   document.getElementById('loading').style.display = 'block';

   setTimeout(calculateResults, 2000);

   e.preventDefault();
});

//calculate Results
function calculateResults() {
   console.log('calculating...');

   const amount = document.getElementById('amount');
   const interest = document.getElementById('interest');
   const years = document.getElementById('years');
   
   const monthlyPayment = document.getElementById('monthly-payment');
   const totalPayment = document.getElementById('total-payment');
   const totalInterest = document.getElementById('total-interest');

   const principal = parseFloat(amount.value);
   const calculatedInterset = parseFloat(interest.value)/100/12;
   const calculatedPayments = parseFloat(years.value) * 12;

   //Compute Monthly Payments
   const x = Math.pow(1 + calculatedInterset, calculatedPayments);
   const monthly = (principal * x * calculatedInterset) / (x-1);

   if(isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

      //Show Results
      document.getElementById('results').style.display = 'block';

      //Hide Loader

      document.getElementById('loading').style.display = 'none';

   } else {
      showError('Please check your numbers');
   }

}

// Show Error
function showError(error) {
   //Hide Results
   document.getElementById('results').style.display = 'none';

   //Hide Loader
   document.getElementById('loading').style.display = 'none';

   //Create a div
   const errorDiv = document.createElement('div');

   // Get Elements
   const card = document.querySelector('.card');
   const heading = document.querySelector('.heading');

   //Add Class
   errorDiv.className = 'alert alert-danger';

   // Create TextNode and append it to div
   errorDiv.appendChild(document.createTextNode(error));

   // Insert erorr above heading
   card.insertBefore(errorDiv, heading);

   //clear error after 3 seconds
   setTimeout(clearError, 3000);

}

// Clear Error
function clearError() {
   document.querySelector('.alert').remove();
}