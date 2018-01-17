const dice = document.querySelectorAll('.dice img');
const hold = document.querySelectorAll('.dice h3');
const diceBtn = document.querySelector('.game .dice-btn');
const btnContent = document.querySelector('.game p');
const diceCount = document.querySelector('.game span');
const resultTable = document.querySelector('.result-table');
const gameWindow = document.querySelector('.game');
const newGameWindow = document.querySelector('.new-game-window');
const winGame = document.querySelector('.win-win');
const add = document.querySelector('.add');
const play = document.querySelector('.play');
const playAgain = document.querySelector('.play-again');
const yourScore = document.querySelector('.win-win h5');
const highScore = document.querySelector('.win-win h4');
const playerName = document.querySelector('input');
const player = document.querySelectorAll('.player');
const line = document.querySelectorAll('.player .line');
const name = document.querySelector('.player .name');
const aces = document.querySelector('.player .aces');
const twos = document.querySelector('.player .twos');
const threes = document.querySelector('.player .threes');
const fours = document.querySelector('.player .fours');
const fives = document.querySelector('.player .fives');
const sixes = document.querySelector('.player .sixes');
const total = document.querySelector('.player .total');
const bonus = document.querySelector('.player .bonus');
const onePair = document.querySelector('.player .one-pair');
const twoPairs = document.querySelector('.player .two-pairs');
const kind3 = document.querySelector('.player .kind3');
const kind4 = document.querySelector('.player .kind4');
const small = document.querySelector('.player .small');
const large = document.querySelector('.player .large');
const house = document.querySelector('.player .house');
const chance = document.querySelector('.player .chance');
const yatzy = document.querySelector('.player .yatzy');
const grand = document.querySelector('.player .grand');

const newGame = document.querySelector('.new-game');

var audio = new Audio('pop.mp3');

var max = 0;
var count = 3;
var playerNr = 1;
var scores = 0;
var totalSum = 0;
var finish = 0;

player[0].style.display = "none";
gameWindow.style.display = "none";
//navigation menu
$('nav li').hover(
    function() {
        $('ul', this).stop().slideDown(200);
    },
    function() {
        $('ul', this).stop().slideUp(200);
    }
);

//new game window control
newGame.addEventListener('click', function() {
    gameWindow.style.display = "none";
    newGameWindow.style.display = "block";
    newGameSet();
    player[0].style.display = "none";
    name.textContent = "Player1";
    winGame.style.display = "none";

})
add.addEventListener('click', function() {
    // if (playerNr >= 5) return;
    name.innerHTML = playerName.value;
    player[0].style.display = "";
    // ++playerNr;
    // playerName.value = "";
})

//Play button, goes to gameplay mode
play.addEventListener('click', function() {
    gameWindow.style.display = "";
    newGameWindow.style.display = "";
    newGameSet();
})
playAgain.addEventListener('click', function() {
    gameWindow.style.display = "";
    newGameWindow.style.display = "";
    newGameSet();
})



//some functions
function newGameSet() {
    count = 3;
    playerNr = 1;
    scores = 0;
    totalSum = 0;
    finish = 0;
    line.forEach(element => {
        element.dataset.score = 0;
        element.dataset.hold = 0;
        element.textContent = ".";
    });

}

function reset() {
    dice.forEach(element => {
        element.dataset.hold = 0;
        element.dataset.score = 0;
        count = 3;
    });
    hold.forEach(element => {
        element.style.display = "none";
    });
    btnContent.textContent = "Roll dices";
    diceCount.textContent = `3 rolls left`;
}

function win() {
    if (finish == 15) {
        gameWindow.style.display = "none";
        winGame.style.display = "block";
        yourScore.textContent = `Your Score is ${grand.textContent}`;
    }
    playAgain.addEventListener('click', function() {
        newGameSet();
        gameWindow.style.display = "";
        winGame.style.display = "";
    })

}

function clearDice(show) {
    dice.forEach(element => {
        element.style.display = `${show}`;
    });

}

function checkBonus() {
    if (scores >= 63) {
        bonus.textContent = 50;
        bonus.dataset.score = 50;
        totalSum += 50;
        grand.textContent = totalSum;
    }
}
clearDice("none");

//Hold dice button
for (let x = 0; x < dice.length; x++) {
    dice[x].addEventListener('click', function() {
        if (dice[x].dataset.hold == 0) {
            hold[x].style.display = "block";
            dice[x].dataset.hold = 1;
        } else if (dice[x].dataset.hold == 1) {
            hold[x].style.display = "none";
            dice[x].dataset.hold = 0;
        }
    })
}

//Roll dice 3 times, hold function
diceBtn.addEventListener('click', function() {
    clearDice("inline-block");
    if (count <= 0) {
        diceBtn.removeEventListener('click', function() {})
        btnContent.textContent = "Take points";
        diceCount.textContent = `0 rolls left`;
        return;
    }
    audio.play();
    if (count == 1) {
        btnContent.textContent = "Take points";
    } else { btnContent.textContent = "Roll dices"; }
    --count;
    diceCount.textContent = `${count} rolls left`;
    dice.forEach(dice => {
        if (dice.dataset.hold == 1) {
            dice.src = `img/${dice.dataset.score}.png`;
        } else {
            var rand = Math.ceil(Math.random() * 6)
            dice.src = `img/${rand}.png`;
            dice.dataset.score = rand;
        }
    });

})

aces.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    dice.forEach(element => {
        if (element.dataset.score == 1) {
            sum = sum + 1;
        }
    });
    this.dataset.score = sum;
    scores += sum;
    totalSum += sum;
    grand.textContent = totalSum;
    total.textContent = scores;
    checkBonus();
    clearDice("none");
    reset();
    this.textContent = sum;
    win();
})
twos.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    dice.forEach(element => {
        if (element.dataset.score == 2) {
            sum = sum + 2;
        }
    });
    this.dataset.score = sum;
    scores += sum;
    totalSum += sum;
    grand.textContent = totalSum;
    total.textContent = scores;
    checkBonus();
    clearDice("none");
    reset();
    this.textContent = sum;
    win();
})
threes.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    dice.forEach(element => {
        if (element.dataset.score == 3) {
            sum = sum + 3;
        }
    });
    this.dataset.score = sum;
    scores += sum;
    totalSum += sum;
    grand.textContent = totalSum;
    total.textContent = scores;
    checkBonus();
    clearDice("none");
    reset();
    this.textContent = sum;
    win();
})
fours.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    dice.forEach(element => {
        if (element.dataset.score == 4) {
            sum = sum + 4;
        }
    });
    this.dataset.score = sum;
    scores += sum;
    totalSum += sum;
    grand.textContent = totalSum;
    total.textContent = scores;
    checkBonus();

    clearDice("none");
    reset();
    this.textContent = sum;
    win();
})
fives.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    dice.forEach(element => {
        if (element.dataset.score == 5) {
            sum = sum + 5;
        }
    });
    this.dataset.score = sum;
    scores += sum;
    totalSum += sum;
    grand.textContent = totalSum;
    total.textContent = scores;
    checkBonus();

    clearDice("none");
    reset();
    this.textContent = sum;
    win();
})
sixes.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    dice.forEach(element => {
        if (element.dataset.score == 6) {
            sum = sum + 6;
        }
    });
    this.dataset.score = sum;
    scores += sum;
    totalSum += sum;
    grand.textContent = totalSum;
    total.textContent = scores;
    checkBonus();

    clearDice("none");
    reset();
    this.textContent = sum;
    win();
})

onePair.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    var numbers = [
        dice[0].dataset.score,
        dice[1].dataset.score,
        dice[2].dataset.score,
        dice[3].dataset.score,
        dice[4].dataset.score
    ];
    numbers.sort();
    clearDice("none");
    reset();
    for (let x = 5; x >= 0; x--) {
        if (numbers[x] == numbers[x - 1]) {
            sum = numbers[x] * 2;
            onePair.dataset.score = sum;
            totalSum += sum;
            grand.textContent = totalSum;
            onePair.textContent = sum;
            win();
            x = 0;
        }
    }

})
twoPairs.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    var numbers = [
        dice[0].dataset.score,
        dice[1].dataset.score,
        dice[2].dataset.score,
        dice[3].dataset.score,
        dice[4].dataset.score
    ];
    numbers.sort();
    clearDice("none");
    reset();
    var count = 0;
    for (let x = 5; x >= 0; x--) {
        if (numbers[x] == numbers[x - 1]) {
            sum += numbers[x] * 2;
            numbers.splice(x, 1);
            numbers.splice(x - 1, 1);
            count++;
        }
    }
    if (count <= 1) sum = 0;
    console.log(numbers);

    twoPairs.dataset.score = sum;
    totalSum += sum;
    grand.textContent = totalSum;
    twoPairs.textContent = sum;
    win();
})
kind3.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    var numbers = [
        dice[0].dataset.score,
        dice[1].dataset.score,
        dice[2].dataset.score,
        dice[3].dataset.score,
        dice[4].dataset.score
    ];
    numbers.sort();
    clearDice("none");
    reset();
    for (let x = 5; x >= 0; x--) {
        if ((numbers[x] == numbers[x - 1]) && (numbers[x] == numbers[x - 2])) {
            sum = numbers[x] * 3;
        }
    }

    this.dataset.score = sum;
    totalSum += sum;
    grand.textContent = totalSum;
    this.textContent = sum;
    win();
})
kind4.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    var numbers = [
        dice[0].dataset.score,
        dice[1].dataset.score,
        dice[2].dataset.score,
        dice[3].dataset.score,
        dice[4].dataset.score
    ];
    numbers.sort();
    clearDice("none");
    reset();
    for (let x = 5; x >= 0; x--) {
        if (numbers[x] == numbers[x - 1] && numbers[x] == numbers[x - 2] && numbers[x] == numbers[x - 3]) {
            sum = numbers[x] * 4;
        }
    }

    this.dataset.score = sum;
    totalSum += sum;
    grand.textContent = totalSum;
    this.textContent = sum;
    win();
})
small.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    var numbers = [
        dice[0].dataset.score,
        dice[1].dataset.score,
        dice[2].dataset.score,
        dice[3].dataset.score,
        dice[4].dataset.score
    ];
    numbers.sort();
    clearDice("none");
    reset();
    if (numbers[0] == 1 && numbers[1] == 2 && numbers[2] == 3 && numbers[3] == 4 && numbers[4] == 5) {
        sum = 15;
    }
    this.dataset.score = sum;
    totalSum += sum;
    grand.textContent = totalSum;
    this.textContent = sum;
    win();
})
large.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    var numbers = [
        dice[0].dataset.score,
        dice[1].dataset.score,
        dice[2].dataset.score,
        dice[3].dataset.score,
        dice[4].dataset.score
    ];
    numbers.sort();
    clearDice("none");
    reset();
    if (numbers[0] == 2 && numbers[1] == 3 && numbers[2] == 4 && numbers[3] == 5 && numbers[4] == 6) {
        sum = 20;
    }
    this.dataset.score = sum;
    totalSum += sum;
    grand.textContent = totalSum;
    this.textContent = sum;
    win();
})

house.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    var numbers = [
        dice[0].dataset.score,
        dice[1].dataset.score,
        dice[2].dataset.score,
        dice[3].dataset.score,
        dice[4].dataset.score
    ];
    numbers.sort();
    console.log(numbers)
    clearDice("none");
    reset();
    if ((numbers[0] == numbers[1] && numbers[0] == numbers[2]) && numbers[3] == numbers[4]) {
        sum = numbers[0] * 3 + numbers[3] * 2;
    }
    if ((numbers[0] == numbers[1]) && (numbers[2] == numbers[3] && numbers[2] == numbers[4])) {
        sum = numbers[0] * 2 + numbers[2] * 3;
    }

    house.dataset.score = sum;
    totalSum += sum;
    grand.textContent = totalSum;
    house.textContent = sum;
    win();
})
chance.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    var numbers = [
        dice[0].dataset.score,
        dice[1].dataset.score,
        dice[2].dataset.score,
        dice[3].dataset.score,
        dice[4].dataset.score
    ];
    for (let x = 0; x < numbers.length; x++) {
        sum = sum + parseInt(numbers[x]);

    }
    clearDice("none");
    reset();
    console.log(numbers)
    this.dataset.score = sum;
    totalSum += sum;
    grand.textContent = totalSum;
    this.textContent = sum;
    win();
})
yatzy.addEventListener('click', function() {
    if (this.dataset.hold == 1) return;
    finish++;
    this.dataset.hold = 1;
    sum = 0;
    var numbers = [
        dice[0].dataset.score,
        dice[1].dataset.score,
        dice[2].dataset.score,
        dice[3].dataset.score,
        dice[4].dataset.score
    ];
    numbers.sort();
    console.log(numbers)
    clearDice("none");
    reset();
    if ((numbers[0] !== "0" && numbers[0] == numbers[1] && numbers[0] == numbers[1]) && numbers[0] == numbers[2] && numbers[0] == numbers[3] && numbers[0] == numbers[4]) {
        sum = 50;
    }
    yatzy.dataset.score = sum;
    totalSum += sum;
    grand.textContent = totalSum;
    yatzy.textContent = sum;
    win();
})