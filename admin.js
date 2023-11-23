window.addEventListener('load', () => {
	let phone1 = document.getElementById("phone1").innerHTML
	let phone2 = document.getElementById("phone2").innerHTML
	document.getElementById("inputPhone1").value= phone1
	document.getElementById("inputPhone2").value= phone2
});

function login() {
	let email=document.getElementById("email").value;
	let password=document.getElementById("password").value;
	if(email=="arsen@mail.ru") {
		if(password=="arsen") {
			alert("Login succesfull")
			window.location.href = 'admin_panel.html';
		}
		else {
			alert("Password incorrect")
		}
	}
	else {
		alert("Login is incorrect")
	}
}

function changePhone() {
	let phone1 = document.getElementById("inputPhone1").value
	let phone2 = document.getElementById("inputPhone2").value
	document.getElementById("phone1").innerHTML = phone1
	document.getElementById("phone2").innerHTML = phone2
}