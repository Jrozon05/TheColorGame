var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    //Mode buttons event listeners
    setupModeButtons();

    setupSquares();

    reset();
}

function setupModeButtons() {
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
    
            this.textContent === "Easy" ?  numSquares = 3 : numSquares = 6;
    
            reset();
        });
    }
}

function setupSquares() {
    for(var i = 0; i < squares.length; i++) {
        //Add click listeners to squares
        squares[i].addEventListener("click", function() {
            //Grab color of clicked square
            var clickedcolor = this.style.backgroundColor;
            //Compare color to pickedColor
            if  (clickedcolor === pickedColor) {
                messageDisplay.textContent = "Correct";
                resetButton.textContent = "Play Again?";
                changeColor(clickedcolor);
                h1.style.backgroundColor = pickedColor;
            } else {
                this.style.backgroundColor = "#232323"; //Removes tiles or matches with the body background color
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function reset() {
    //Generate all new colors
    colors = generateRandomeColors(numSquares);
   
    //Pick new random color from array
    pickedColor = pickColor();

    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";

    for(var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }

    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
   reset();
});

colorDisplay.textContent = pickedColor;

function changeColor(color) {
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
   var random = Math.floor(Math.random() * colors.length);
   return colors[random];
}

function generateRandomeColors(num) {
    //Make an array
    var arr = [];
    //Add num random color to array
    for(var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return that array  
    return arr;
}

function randomColor() {
    //Pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);

    //Pick a "green" from 0 -255
    var g = Math.floor(Math.random() * 256);

    //Pick a "blue" from 0 - 255
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}