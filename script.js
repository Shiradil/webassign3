document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var passwordConfirm = document.getElementById('passwordConfirm').value;

    if (username && password && password === passwordConfirm) {
        localStorage.setItem('user_' + username, JSON.stringify({username: username, password: password}));
        localStorage.setItem('currentUser', username);
        document.querySelector('.btn-primary').style.display = 'none';
        document.querySelector('.btn-secondary').style.display = 'none';
        localStorage.setItem(username + '_cart', JSON.stringify([]));
        alert("Вы успешно зарегистрированы и вошли в систему!");
        $('#registerModal').modal('hide');
    } else {
        alert("Проверьте введенные данные и повторите попытку.");
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    var userData = JSON.parse(localStorage.getItem('user_' + username));
    if (userData && userData.password === password) {
        // Симулируем вход пользователя
        localStorage.setItem('currentUser', username);
        // Скрываем кнопки регистрации и входа
        document.querySelector('.btn-primary').style.display = 'none';
        document.querySelector('.btn-secondary').style.display = 'none';
        alert("Вы успешно вошли в систему!");
        $('#loginModal').modal('hide');
    } else {
        alert("Неправильное имя пользователя или пароль.");
    }
});

function loginUser(event) {
    event.preventDefault();

    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    var storedUser = localStorage.getItem('user_' + username);

    if (storedUser) {
        var userData = JSON.parse(storedUser);

        if (userData.password === password) {
            localStorage.setItem('currentUser', username);
            alert("Вы успешно вошли в систему как " + username);
            updateUserInterface();
        } else {
            alert("Неправильный пароль. Пожалуйста, попробуйте снова.");
        }
    } else {
        alert("Пользователь с таким именем не найден.");
    }
}

function updateUserInterface() {
    var currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';

        var registerBtn = document.getElementById('registerBtn');
        if (registerBtn) {
            registerBtn.style.display = 'none';
        }
    }
}


document.addEventListener('DOMContentLoaded', updateUserInterface);

var loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', loginUser);
}

function logoutUser() {
    localStorage.removeItem('currentUser');

    updateUserInterface();

    document.getElementById('loginBtn').style.display = 'block';

    var registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.style.display = 'block';
    }

    alert("Вы вышли из системы.");
}

var logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutUser);
}

function updateCartModal() {
    let cartContents = document.getElementById('cartContents');
    let currentUserCart = getCurrentUserCart(); // Предполагается, что эта функция возвращает объект корзины текущего пользователя
    cartContents.innerHTML = ''; // Очищаем содержимое корзины
    if (currentUserCart && currentUserCart.items.length > 0) {
        currentUserCart.items.forEach(item => {
            let itemElement = document.createElement('p');
            itemElement.textContent = item; // или item.name если у вас объекты в массиве
            cartContents.appendChild(itemElement);
        });
    } else {
        cartContents.innerHTML = '<p>Корзина пуста</p>';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    updateCartModal();
});

// Функция для отображения модального окна корзины
document.getElementById('cartDropdown').addEventListener('click', function() {
    updateCartModal();
});

// Функция для обработки формы оформления заказа
document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Валидация данных карты
    var cardNumber = document.getElementById('cardNumber').value;
    var cardDate = document.getElementById('cardDate').value;
    var cardCVC = document.getElementById('cardCVC').value;

    // Простая проверка валидности (для более строгой валидации использовать регулярные выражения или специальные библиотеки)
    if (cardNumber.length === 16 && cardDate.length === 5 && cardCVC.length === 3) {
        // Здесь может быть вызов функции для обработки платежа
        alert('Оплата прошла успешно!');
        // После успешной оплаты очистить корзину
        let currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            localStorage.setItem(currentUser + '_cart', JSON.stringify({ items: [], sum: 0 }));
        }
        // Закрываем модальное окно
        $('#checkoutModal').modal('hide');
    } else {
        alert('Пожалуйста, введите корректные данные карты.');
    }
});

// Функция для получения корзины текущего пользователя из localStorage
function getCurrentUserCart() {
    let currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        return { items: [], sum: 0 };
    }
    let cart = localStorage.getItem(currentUser + '_cart');
    return cart ? JSON.parse(cart) : { items: [], sum: 0 };
}