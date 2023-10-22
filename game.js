let randomNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 3;

function checkGuess() {
    const userGuess = parseInt(document.getElementById('userGuess').value);
    const feedback = document.getElementById('feedback');

    if (attempts <= 0) {
        feedback.innerHTML = "No more attempts left!";
        return;
    }

    if (userGuess === randomNumber) {
        feedback.innerHTML = "Congratulations! You've won a 30% off ticket!";
        feedback.classList.add('text-success');
        return;
    } else {
        attempts--;
        if (attempts > 0) {
            feedback.innerHTML = "Try again! " + attempts + " attempt(s) left.";
            feedback.classList.add('text-warning');
        } else {
            feedback.innerHTML = "Sorry, no more attempts left! The number was " + randomNumber + ".";
            feedback.classList.add('text-danger');
        }
    }
}x