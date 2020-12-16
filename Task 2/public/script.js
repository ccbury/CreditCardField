document.getElementById("payNow").addEventListener("click", function(){
	var passed = 1;
	var saved;
	saved = passed;
	passed = luhnCheck();
	if(passed == null){
		passed = saved;
	}
	saved = passed;
	passed = cvvCheck();
	if(passed == null){
		passed = saved;
	}
	saved = passed;
	passed = nameCheck();
	if(passed == null){
		passed = saved;
	}
	saved = passed;
	passed = expiryDateCheck();
	if(passed == null){
		passed = saved;
	}

	if(passed === 1){
		console.log("Credit Card Number: " + document.getElementById("cc").value);
		document.getElementById("cc").value = "";
		console.log("Name on Card: " + document.getElementById("cname").value);
		document.getElementById("cname").value = "";
		console.log("CVV number: " + document.getElementById("cvv").value);
		document.getElementById("cvv").value  = "";
		console.log("Expiry Month: " + document.getElementById("month").value);
		document.getElementById("month").value  = "01";
		console.log("Expiry year: " + document.getElementById("year").value);
		document.getElementById("year").value  = "20";
	}
});


document.querySelector("#cc").addEventListener("keypress", event => {
	var value = document.getElementById("cc").value;
	value = value.replace(/\D/g, '');
	if(!/[ 0-9\/]+/.test(event.key) || value.length>15){
		event.preventDefault();
	}
});


function nameCheck(){
	var name = document.getElementById("cname").value;
	var value = name.replace(/\D/g, '');
	if(/^[a-zA-Z]+$/.test(name)){
		document.getElementById("cname").style.borderColor = "green";
		return;
	} else {
		document.getElementById("cname").style.borderColor = "red";
		var passed = 0;
		return passed;
	}
}

function cvvCheck(){
	var cvv = document.getElementById("cvv").value;
	
	if((/\d{3}(-\W[a-zA-Z])*$/g.test(cvv))){
		document.getElementById("cvv").style.borderColor = "green";
		return;
	} else{
		document.getElementById("cvv").style.borderColor = "red";
		var passed = 0;
		return passed;
	}
}

function expiryDateCheck(){
	var currentYearStr = new Date().getFullYear();
	var currentYear = parseInt(currentYearStr);
	var currentMonthStr = new Date().getMonth();
	var currentMonth = parseInt(currentMonthStr);
	var cardYearStr = document.getElementById("year").value;
	var cardYear = parseInt(cardYearStr);
	cardYear = cardYear + 2000;
	var cardMonthStr = document.getElementById("month").value;
	var cardMonth = parseInt(cardMonthStr);
	cardMonth = cardMonth -1;
	if(cardYear == currentYear && cardMonth >= currentMonth){
		document.getElementById("year").style.borderColor = "green";
		document.getElementById("month").style.borderColor = "green";
		return;
	}else if(cardYear>currentYear){
		document.getElementById("year").style.borderColor = "green";
		document.getElementById("month").style.borderColor = "green";
		return;
	}else {
		document.getElementById("year").style.borderColor = "red";
		document.getElementById("month").style.borderColor = "red";
		var passed = 0;
		return passed;
	}
}

function getUserInput(){
	return document.getElementById("cc").value;
}

function luhnCheck(){
	var cardNumber = getUserInput();
	var cardNumber = cardNumber.replace(/\s/g, '');
	var cardSplit = cardNumber.split("");
	var sum = 0;
	var doubleValue = false;
	if((!/\d{16}(-\W[a-zA-Z])*$/g.test(cardNumber)) || (cardNumber.length > 16)){
		document.getElementById("cc").style.borderColor = "red";
		var passed = 0;
		return passed;
	} else {
		for(var i = cardNumber.length-1; i>=0; i--){
			var digit = parseInt(cardSplit[i]);
			if(doubleValue){
				digit = digit * 2;
				if(digit>9){
				digit = digit-9;
				}
			}	
			sum = sum + digit;
			doubleValue = !doubleValue
		}
		if(sum % 10 == 0){
			document.getElementById("cc").style.borderColor = "green";
			return;
		} else {
			document.getElementById("cc").style.borderColor = "red";
			var passed = 0;
			return passed;
		}
	}
}