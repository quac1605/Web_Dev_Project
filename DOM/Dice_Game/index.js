var randomNumber1 = Math.floor(Math.random() * 6) + 1; //1-6
console.log(randomNumber1);

var randomNumber2 = Math.floor(Math.random() * 6) + 1; //1-6
console.log(randomNumber2);

var img1 = document.querySelector(".img1");
var img2 = document.querySelector(".img2");

switch (randomNumber1) {
    case 1:
        img1.setAttribute("src", "images/dice1.png");
        break;
    case 2:
        img1.setAttribute("src", "images/dice2.png");
        break;
    case 3:
        img1.setAttribute("src", "images/dice3.png");
        break;
    case 4:
        img1.setAttribute("src", "images/dice4.png");
        break;
    case 5:
        img1.setAttribute("src", "images/dice5.png");
        break;
    case 6:
        img1.setAttribute("src", "images/dice6.png");
        break;
}

switch (randomNumber2) {
    case 1:
        img2.setAttribute("src", "images/dice1.png");
        break;
    case 2:
        img2.setAttribute("src", "images/dice2.png");
        break;
    case 3:
        img2.setAttribute("src", "images/dice3.png");
        break;
    case 4:
        img2.setAttribute("src", "images/dice4.png");
        break;
    case 5:
        img2.setAttribute("src", "images/dice5.png");
        break;
    case 6:
        img2.setAttribute("src", "images/dice6.png");
        break;
}

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").textContent = "🚩 Player 1 Wins!";
} else if (randomNumber1 < randomNumber2) {
    document.querySelector("h1").textContent = "Player 2 Wins! 🚩";
} else {
    document.querySelector("h1").textContent = "Draw!";
}
