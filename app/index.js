// global variables

// let isManagerAccessDisabled=true;
var  Paid_New_val = "";


const removeBg = (val) => {
    val.forEach(e =>{
        e.style.backgroundColor = "white";  
    })
}
let dep_parent = document.getElementById("depto");
const paidVal = document.querySelectorAll(".paidValue");
paidVal.forEach(e => {
    e.addEventListener("click", () => { 
        removeBg(paidVal);
        Paid_New_val = e.innerHTML;
        e.style.backgroundColor = "#e6bd81"; 
        enable_btn()
    });
});
    let Depto_New_val = "";
    const DeptoVal = document.querySelectorAll(".DeptoValue");
    DeptoVal.forEach(a => {
    a.addEventListener("click", () => {
      removeBg(DeptoVal);
        Depto_New_val = a.innerHTML;
        a.style.backgroundColor = "#e6bd81";
        // console.log(Depto_New_val);
        enable_btn()  
      });
    });
    var loader = "";
    function fetchData_on() {
        loader =  document.getElementById("loader_page").style.visibility = "visible";
    }
    function fetchData_off() {
        loader =  document.getElementById("loader_page").style.visibility = "hidden";
    }
    
     function enable_btn() {
         if(Paid_New_val != "" && Depto_New_val != "" && crc_val!="") {
             document.getElementById("btn_parent_section").style.display = "block";
         }
         else {
             document.getElementById("btn_parent_section").style.display = "none";
         }
     }


//  Aleart box 
// Show popup and change icon when unlock button is clicked
function unlockBtn() {
    const lockButton = document.getElementById('lockButton');
    const lockIcon = document.getElementById('lockIcon');
    const popup = document.getElementById('popup');

    if (lockIcon.classList.contains('fa-lock')) {
        lockIcon.classList.remove('fa-lock');
        lockIcon.classList.add('fa-unlock');
        popup.style.display = 'flex';
    }
}
function SubmitOnEnter(event) {
    if (event.key == "Enter" || event.keyCode == 13) {
        popupsubmit();
      }
}
document.querySelectorAll(".toggle-password").forEach(function (toggleButton) {
    toggleButton.addEventListener("click", function () {
      this.classList.toggle("fa-eye");
      this.classList.toggle("fa-eye-slash");
      
      const input = document.getElementById("passwordInput");
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    });
  })
// Hide popup and reset lock icon when cancel button is clicked
function popupCancel() {
    const popup = document.getElementById('popup');
    const lockIcon = document.getElementById('lockIcon');
    popup.style.display = 'none';
    lockIcon.classList.remove('fa-unlock');
    lockIcon.classList.add('fa-lock');
}


let discount_dropdown1  = document.getElementById("discount_dropdown_val")
let append_final = 0;  // Initialize total amount
let grand_Total = 0;   // Initialize grand total

// Function to apply discount and update the total for each line item
function applyDiscountAndCalculateTotal(itemIndex) {
    // console.log(discount_dropdown1);
    // Get the original price, quantity, and discount type/amount
    let originalPrice = parseFloat(document.getElementById(`orgPrice${itemIndex}`).innerHTML.split(" ")[1]);
    // console.log(originalPrice);
    let quantity = parseInt(document.getElementById(`quantity${itemIndex}`).value);
    let discountValue = parseFloat(document.getElementById(`discountValue${itemIndex}`).value);
    // console.log(discountValue);
    let discountType = document.getElementById(`discountType${itemIndex}`).value;
    // console.log(discountType);
    // Initialize final price
    let finalPrice = originalPrice;
    // Apply discount based on the type (percentage or amount)
    if (!isNaN(discountValue) && discountValue > 0) {
        if (discountType === 'percent') {
            finalPrice = originalPrice - (originalPrice * (discountValue / 100));
        } else if (discountType === 'amount') {
            finalPrice = originalPrice - discountValue;
        }
    }
    // Multiply by quantity
    let totalItemPrice = finalPrice * quantity;

    // Update the line item total price on the UI
    document.getElementById(`total_price`).innerHTML = totalItemPrice.toFixed(2);

    // Recalculate grand total
    recalculateGrandTotal();
}
// Function to recalculate grand total across all line items
function recalculateGrandTotal() {
    grand_Total = 0;  // Reset the grand total before recalculating

    // Loop through each line item to sum up the total prices
    let totalItems = document.querySelectorAll('.inner_order_list').length; // Assuming each line item has a class 'line-item'
    for (let i = 1; i <= totalItems; i++) {
        let itemTotal = parseFloat(document.getElementById(`total_price`).innerHTML);
        grand_Total += itemTotal;
    }
    document.getElementById("total_price").innerHTML = grand_Total.toFixed(2);
}

document.querySelectorAll('.manual_order_count').forEach(input => {
    input.addEventListener('change', (e) => {
        let itemIndex = e.target.dataset.index;  // Assuming data-index is used for each quantity input
        applyDiscountAndCalculateTotal(itemIndex);
    });
})

function openPopup(url) {
    const popupWidth = 800;
    const popupHeight = 600;
    const left = (screen.width - popupWidth) / 2;
    const top = (screen.height - popupHeight) / 2;
    window.open(
        url, 
        'popupWindow', 
        `width=${popupWidth},height=${popupHeight},top=${top},left=${left},scrollbars=yes,resizable=yes`
    );
}


function convertCurrency(fname) {

    let crval=document.getElementById("CashReceived").value;
    if(parseFloat(crval)>0 && fname==="fromfchng")
    {
        document.getElementById("CashReceived").value="";
        document.getElementById("changeAmount").innerText=0;
    }
    const totalPriceAED = document.getElementById('total_price').textContent;
    const selectedCurrency = document.getElementById('currency').value;
    const convertedPrice = parseFloat(totalPriceAED) * conversionRates[selectedCurrency];    
    document.getElementById('converted-price').textContent = `${selectedCurrency} ${convertedPrice.toFixed(2)}`;
    let finalConvetAmnt = document.getElementById("converted-price").textContent; // Final amount to pay
    const splitCurr = finalConvetAmnt.split(" ")[0];    
    const splitAmnt = parseFloat(finalConvetAmnt.split(" ")[1]);
    console.log(splitAmnt,"JS Amnt");
    document.getElementById("Sc_currency").innerText = splitCurr;
    document.getElementById("Sc_currency2").innerText = splitCurr;
  }