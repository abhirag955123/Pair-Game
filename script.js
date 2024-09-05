
alert("Chalo Game Khelte Hain " );

const colors = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown',
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown'
];

let firstBox = null;
let secondBox = null;
let lockBoard = false; 
let boxes = document.querySelectorAll('.box');


(function shuffle() {
    const shuffledColors = colors.sort(() => 0.5 - Math.random());
    boxes.forEach((box, index) => {
        box.dataset.color = shuffledColors[index];
    });
})();


boxes.forEach(box => box.addEventListener('click', flipBox));

function flipBox() {
    if (lockBoard) return;
    if (this === firstBox) return;

    this.style.backgroundColor = this.dataset.color;
    this.classList.add('flipped');

    if (!firstBox) {
       
        firstBox = this;
    } else {
        
        secondBox = this;
        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = firstBox.dataset.color === secondBox.dataset.color;

    if (isMatch) {
        
        firstBox.classList.add('matched');
        secondBox.classList.add('matched');
        resetBoard();
    } else {
       
        lockBoard = true;
        setTimeout(() => {
            firstBox.style.backgroundColor = '#3498db';
            secondBox.style.backgroundColor = '#3498db';
            resetBoard();
        }, 2000);
    }
}

function resetBoard() {
    [firstBox, secondBox, lockBoard] = [null, null, false];
}


function restartGame() {
    boxes.forEach(box => {
        box.classList.remove('flipped', 'matched');
        box.style.backgroundColor = '#3498db';
    });
    shuffle();
}
