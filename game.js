copyRight();

const gameTextOne = document.getElementById('scoreInfo');
const gameTextTwo = document.getElementById('gameInfo');

const playerScoreboard = document.getElementById('playerScore');
const pcScoreboard = document.getElementById('pcScore');
const selectors = document.querySelectorAll('.selector');

gameTextOne.textContent = "Enter your nickname in the field (optional)...";
gameTextTwo.textContent = "...and press 'Play Now' to begin the game.";

const windowSize = () => {
    var win = window;
    var doc = document;
    var docElem = doc.documentElement;
    var body = doc.getElementById('body');
    var x = win.innerWidth || docElem.clientWidth || doc.body.clientWidth;
    var y = win.innerHeight|| docElem.clientHeight|| doc.body.clientHeight;

    console.log(x + " , " + y);
    body.style.width = `${x}px`;
    body.style.height = `${y}px`;
}

window.onload = (windowSize());

document.getElementById('startButton').addEventListener('click', startGame);
//document.getElementById('restartButton').addEventListener('click', newGame);


function startGame() {

    let nameInput = document.getElementById("playerInput").value;
    let playerName = document.getElementById('playerName');
    playerName.innerHTML = '';

    if (nameInput == "") {
        playerName.textContent = "You";
        playerName.style.width = '70px';
    } else {
        playerName.textContent = nameInput;
    }
    gameTextTwo.innerHTML = '<span>☚</span> ← ← <span>☚</span> ← ← <span>☚</span> ' +
                                '&nbsp;&nbsp;or&nbsp;&nbsp; <span>☛</span> → → <span>☛</span> → → <span>☛</span>';
    gameTextTwo.style.marginTop = "-10px";

    let playerNumber = 0;
    let pcNumber = 0;
    let playerPoints = 0;
    let pcPoints = 0;
    let equal = 0;
    const choices = ['Rock', 'Paper', 'Scissors'];

    gameTextOne.textContent = 'Make your choice: Rock, Paper or Scissors';
    playerScoreboard.textContent = '0';
    pcScoreboard.textContent = '0';

    selectors.forEach(button => button.addEventListener('click', game));

    function game() {

        if (pcPoints < 6 && playerPoints < 6) {

            this.classList.add('selected');

            playerNumber = +this.value;
            pcNumber = pcSelect();

            let removeClass = () => this.classList.remove('selected');
            let activateRemove = () => setTimeout(removeClass, 1000);
            activateRemove();

            if (playerNumber === pcNumber) {
                equal += 1;
                if (equal > 2) {
                    (pcNumber === 0 ? pcNumber = 2 : pcNumber -= 1);
                    gameTextTwo.textContent = choices[playerNumber] + ' - ' + choices[pcNumber];
                    gameTextTwo.style.marginTop = "0";
                    backgrounds();
                    points();   }
                else {
                    gameTextOne.textContent = "No win! " + choices[playerNumber] + ' = ' + choices[pcNumber] + '.';
                    gameTextTwo.textContent = choices[playerNumber] + ' - ' + choices[pcNumber];
                    gameTextTwo.style.marginTop = "0";
                    backgrounds(); }
            } else {
                backgrounds();
                points();
                gameTextTwo.textContent = choices[playerNumber] + ' - ' + choices[pcNumber];
                gameTextTwo.style.marginTop = "0"; }}
        if (pcPoints === 6 || playerPoints === 6) {
            endGame();}
    }

    function pcSelect() {
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max)); }
        return getRandomInt(3);
    }

    function backgrounds() {
        const leftPlay = document.querySelector('.leftPlay');
        const rightPlay = document.querySelector('.rightPlay');

        if (playerNumber === 0) {
            leftPlay.style.backgroundImage = 'url("./assets/img/rock-S-01.jpg")';}
        else if (playerNumber === 1) {
            leftPlay.style.backgroundImage = 'url("./assets/img/paper-S-01.jpg")';}
        else {
            leftPlay.style.backgroundImage =  'url("./assets/img/scissors-S-2-01.jpg")';}
        if (pcNumber === 0) {
            rightPlay.style.backgroundImage = 'url("./assets/img/rock-S-02.jpg")';}
        else if (pcNumber === 1) {
            rightPlay.style.backgroundImage = 'url("./assets/img/paper-S-02.jpg")';}
        else {
            rightPlay.style.backgroundImage = 'url("./assets/img/scissors-S-2-02.jpg")';}
    }

    function points() {
        playerPoints = ifPlayerWins();
        pcPoints = ifPcWins();
        playerScoreboard.textContent = playerPoints;
        pcScoreboard.textContent = pcPoints; }

    function ifPlayerWins() {
        if (playerNumber === 0 && pcNumber === 2) {
            playerPoints += 1;
            gameTextOne.textContent = "You Win! Rock beats Scissors.";  }
        else if (playerNumber === 1 && pcNumber === 0) {
            playerPoints += 1;
            gameTextOne.textContent = "You Win! Paper beats Rock."; }
        else if (playerNumber === 2 && pcNumber === 1) {
            playerPoints += 1;
            gameTextOne.textContent = "You Win! Scissors beats Paper."; }
        return playerPoints; }

    function ifPcWins() {
        if (playerNumber === 0 && pcNumber === 1) {
            pcPoints += 1;
            gameTextOne.textContent = "You Lose! Paper beats Rock"; }
        else if (playerNumber === 1 && pcNumber === 2) {
            pcPoints += 1;
            gameTextOne.textContent = "You Lose! Scissors beats Paper."; }
        else if (playerNumber === 2 && pcNumber === 0) {
            pcPoints += 1;
            gameTextOne.textContent = "You Lose! Rock beats Scissors."; }
        return pcPoints; }

    function endGame() {
        let showWinner = () => setTimeout(winner, 1500);
        showWinner();
        function winner() {
            gameTextTwo.textContent = "Press 'New Game' to restart the game.";
            gameTextTwo.style.marginTop = "0";
            if (pcPoints > playerPoints) {
                gameTextOne.innerHTML = "<span>Too bad,</span> your PC won this game.";
                gameTextOne.style.color = '#CF1B0A'; }
            else {
                if (nameInput == "you") {
                    gameTextOne.innerHTML = `<span>Congratulations,</span> you won this game!`;
                } else {
                    gameTextOne.innerHTML = `<span>Congratulations</span> ${nameInput}, you won this game!`;
                }
                gameTextOne.style.color = '#089C36'; }}
        document.getElementById('restartButton').addEventListener('click', newGame); }
}

function newGame() {
    location.reload();
    startGame(); }

function copyRight() {
    let now = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

    let time = `●&nbsp;${now.getHours() < 10 ? '0' : ''}${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
    let day  = `●&nbsp;${days[now.getDay()]}, ${now.getDate()}`;
    let fullDay = `&nbsp;${now.toLocaleString('en', { month: 'long' })}, ${now.getFullYear()}&nbsp;●`;
    let developer = `&nbsp;Jeroen De Vos, Antwerp 2000, Bel&nbsp;●`;
    let timaAndDev = `${time} ${day} ${fullDay} ${developer}`;
    document.getElementById("rights").innerHTML = timaAndDev;
}