let input = document.querySelector('input'),
    btn = document.querySelector('.btn'),
    timeOut = document.querySelector('.time'),
    box = document.querySelector('.game__box'),
    time = 0,
    score = 0,
    interval = 0;




btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value > 4) {
        time = input.value;
        input.value = '';
        clearInterval(interval)
        start();
        score = 0;
        let result = document.querySelector('.result');
        if (result) {
            result.style.display = 'none'
        }
    }
    // console.log(btn.getBoundingClientRect());
})

// setTimeout(() => {
// 1 раз отработает
// }, 1000);

// clearInterval()

// setInterval(() => {
// Работает бесконечно пока мы его не остановим
// }, 1000);

function start() {
    interval = setInterval(() => logic(), 1000);
    createBall()
    btn.style.visibility = 'hidden';
}

function logic() {
    if (time) {
        let currentTime = --time;
        currentTime = currentTime < 10 ? '0' + currentTime : currentTime;
        timeOut.innerHTML = `00: ${currentTime}`
        // currentTime < 10 ? timeOut.style.color = 'red' : ''
    } else {
        endGame()
    }
}

function endGame() {
    box.innerHTML = `<h2 class="result">Вы набрали: ${score} очков</h2>`
    btn.style.visibility = 'visible';
}

function createBall() {
    let ball = document.createElement('div'),
        size = 50;
    let coor = box.getBoundingClientRect();

    let x = random(0, coor.width - size)
    let y = random(0, coor.height - size)

    ball.classList.add('ball');
    ball.style.width = size + 'px';
    ball.style.height = size + 'px';
    ball.style.top = y + 'px';
    ball.style.left = x + 'px';
    ball.style.background = 'red';
    box.append(ball)

}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

box.addEventListener('click', (e) => {
    if (e.target.classList.contains('ball')) {
        score++;
        e.target.remove();
        createBall();
    }
})