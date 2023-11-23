function getCurrentUserCart() {
	let currentUser = localStorage.getItem('currentUser');
	if (!currentUser) {
		alert("Пожалуйста, войдите в систему.");
		return null;
	}
	let userCart = localStorage.getItem(currentUser + '_cart');
	return userCart ? JSON.parse(userCart) : { items: [], sum: 0 };
}

function saveCurrentUserCart(cart) {
	let currentUser = localStorage.getItem('currentUser');
	if (currentUser) {
		localStorage.setItem(currentUser + '_cart', JSON.stringify(cart));
	}
}

function addToCart(event) {
	let cart = getCurrentUserCart();
	if (!cart) return;

	let itemDetails = {
		1: { name: "Шамши", price: 2000 },
		2: { name: "Кеш", price: 3000 },
		3: { name: "Гаухартас", price: 2500 },
		4: { name: "Гашык", price: 2300 }
	};

	let item = itemDetails[event];
	if (item) {
		cart.items.push(item.name);
		cart.sum += item.price;

		let cartElement = document.getElementById("cart");
		let a = document.createElement('a');
		a.className = "dropdown-item";
		a.innerHTML = item.name;
		cartElement.appendChild(a);

		saveCurrentUserCart(cart);
	}
}

function confirmOrder() {
	let cart = getCurrentUserCart();
	if (!cart || cart.items.length === 0) {
		alert("Cart is empty");
	} else {
		alert("Order has been made successfully. Sum is " + cart.sum);
		// Здесь можно добавить логику для очистки корзины после подтверждения заказа
		cart.items = []; // Очистка списка покупок
		cart.sum = 0; // Обнуление суммы
		saveCurrentUserCart(cart); // Сохранение изменений
		document.getElementById("cart").innerHTML = ""; // Очистка отображения корзины
	}
}
