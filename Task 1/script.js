document.getElementById("payNow").addEventListener("click", function(){
	console.log("Button Pressed");
	luhnCheck();
	cvvCheck();
	nameCheck();
	expiryDateCheck();
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
	} else {
		console.log("No numbers in names, characters only");
		document.getElementById("cname").style.borderColor = "red";
	}
}

function cvvCheck(){
	var cvv = document.getElementById("cvv").value;
	
	if((/\d{3}(-\W[a-zA-Z])*$/g.test(cvv))){
		document.getElementById("cvv").style.borderColor = "green";
	} else{
		document.getElementById("cvv").style.borderColor = "red";
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
	console.log(currentYear);
	console.log(currentMonth);
	console.log(cardYear);
	console.log(cardMonth);
	if(cardYear == currentYear && cardMonth >= currentMonth){
		document.getElementById("year").style.borderColor = "green";
		document.getElementById("month").style.borderColor = "green";
	}else if(cardYear>currentYear){
		document.getElementById("year").style.borderColor = "green";
		document.getElementById("month").style.borderColor = "green";
	}else {
		document.getElementById("year").style.borderColor = "red";
		document.getElementById("month").style.borderColor = "red";
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
		console.log("Failed. didnt get in");
		document.getElementById("cc").style.borderColor = "red";
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
			console.log("success")
			document.getElementById("cc").style.borderColor = "green";
		} else {
			document.getElementById("cc").style.borderColor = "red";
		}
	}
}