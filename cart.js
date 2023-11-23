let sum = 0
function addToCart(event) {
	let cart=document.getElementById("cart")
	let a = document.createElement('a');
	a.className = "dropdown-item";
	if(event==1) {
		sum += 2000
		a.innerHTML = "Шамши";
	} else if(event==2) {
		sum += 3000
		a.innerHTML = "Кеш"
	} else if(event==3) {
		sum += 2500
		a.innerHTML = "Гаухартас"
	} else if(event==4) {
		sum += 2300
		a.innerHTML = "Гашык"
	}
	cart.append(a);
}

function confirmOrder() {
	let cart=document.getElementById("cart")
	if(cart.innerHTML==""){
		alert("Cart is empty")
	} else {
		alert("Order has been made successfully. Sum is " + sum)
	}
}
