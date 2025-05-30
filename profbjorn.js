// Default hangman Image
let wordLines = document.querySelector("#word_lines").innerHTML
let next_button = document.querySelector("#next_button img").src = "assets/next_button_1.png"
let puzzleMain = "url(\'assets/puzzle.png\')"
let mountainImage = "url(\'assets/map_2.gif\')"

function nextButton() {
    const backgroundDiv = document.getElementById("background_image");
    const currentBackground = backgroundDiv.style.backgroundImage;

    if(currentBackground.includes("intro_1.png")) {
        backgroundDiv.style.backgroundImage = "url('assets/intro_2.png')";
    }
    else if(currentBackground.includes("assets/intro_2.png")) {
        backgroundDiv.style.backgroundImage = "url('assets/map_1.gif')";
    }
    else if(currentBackground.includes("assets/map_1.gif")) {
        backgroundDiv.style.backgroundImage = mountainImage;
    }
    else{
        backgroundDiv.style.backgroundImage = puzzleMain;
        startHangmanGame();
    }
    return false
}

function startHangmanGame() {
    const backgroundDiv = document.getElementById("background_image");
    const currentBackground = backgroundDiv.style.backgroundImage;

    // Lives
    let lives = 3
    wordLines = document.getElementById("word_lines").style.display = "flex"

    // Hangman words
    let hangmanWords = ["godzilla", "toothless", "batman", "fireplace", "avatar", "spiderman", "avengers"]
    let random = Math.floor(Math.random() * hangmanWords.length)

    // Hints
    let hints = ["monster", "dragon", "dark knight", "keeps you warm", "master of all elements", "friendly neighborhood superhero", "earth's mightiest heroes"]

    // Getting a random word & Hint
    let wordToGuess = hangmanWords[random]

    let hintElement = document.getElementById("hint")
    hintElement.innerText = `Hint: ${hints[random]}`

    // Alphabet
    let html = '';
    let letters;
    for (var i = 97; 122 >= i; i++) {// A-65, Z-90
        letters = String.fromCharCode(i);
        html += '<button onclick="setLetter(\'' + letters + '\', this);">' + letters + '</button>';
    }
    let box = document.getElementById('box').innerHTML = html;

    // Checking the length of the hangman words
    for (i = 0; i < hangmanWords.length; i++) {
        console.log(`${hangmanWords[i]} - ${hangmanWords[i].length}`)
    }

    console.log(`The word to guess is: ${wordToGuess}`)

    // Getting the word lines to print on the webpage
    let guessLetter = []

    for (let i = 0; i < wordToGuess.length; i++) {
        guessLetter[i] = "_"
    }

    document.getElementById("word_lines").innerHTML = guessLetter.join(" ")

    // Game Loop
    window.setLetter = function(letter, button) {
        let letterFound = false
        button.disabled = true
        console.log(button)
        for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === letter) {
                guessLetter[i] = letter
                letterFound = true
            }
        }
        if (letterFound) {
            document.getElementById("word_lines").innerHTML = guessLetter.join(" ")
        } else {
            lives--
            // document.getElementById("hangman_lives").innerHTML = `You have ${lives} lives left`
        }
        if (lives == 2) {
            backgroundDiv.style.backgroundImage = "url('assets/puzzle_1.png')";
        } else if (lives == 1) {
            backgroundDiv.style.backgroundImage = "url('assets/puzzle_2.png')";
        } else if (lives == 0) {
            backgroundDiv.style.backgroundImage = "url('assets/puzzle_3.png')";
            if (currentBackground === mountainImage) {
            setTimeout(() => {
                backgroundDiv.style.backgroundImage = "url('assets/end_1.png')";
            }, 900); // 900 milliseconds delay
}
        } 
            // else if(currentBackground.includes("assets/intro_2.png")) {
            //     backgroundDiv.style.backgroundImage = "url('assets/map_1.gif')";
            // }
                        
            // backgroundDiv.style.backgroundImage = "url('assets/puzzle_1.png')";
            // setTimeout(() => {
            //     alert("Game Over. Try Again!")
            //     location.reload()
            // }, 900)
        
        
        if(lives > 0 && guessLetter.join("") == wordToGuess){
            setTimeout(() => {
                alert("Congrats, You Won!")
                location.reload()
            }, 900)
        }

        console.log(guessLetter.join(""))
        console.log(guessLetter.join("") == wordToGuess)
        

    }
}

