let next_button = document.querySelector("#next_button img").src = "assets/next_button_1.png"
let puzzleMain = "url(\'assets/puzzle.png\')"
let currentLevel = 1
let lastRandom = -1; 
let readyForNextMap = false;

function nextButton() {
    const backgroundDiv = document.getElementById("background_image");
    const currentBackground = backgroundDiv.style.backgroundImage;

    if(currentBackground.includes("intro_1.png")) {
        backgroundDiv.style.backgroundImage = "url('assets/intro_2.png')";
    } else if(currentBackground.includes("assets/intro_2.png")) {
        backgroundDiv.style.backgroundImage = "url('assets/start.gif')";
    } else if(currentBackground.includes("assets/start.gif")) {
        backgroundDiv.style.backgroundImage = "url(\'assets/map_1.gif\')";
        currentLevel = 1
    } else if(currentBackground.includes("assets/map_1.gif")) {
        backgroundDiv.style.backgroundImage = puzzleMain;
        startHangmanGame();
    } else if(currentBackground.includes("assets/map_2.gif")) {
        backgroundDiv.style.backgroundImage = puzzleMain;
        startHangmanGame();
        console.log("Level" + currentLevel)
    } else if(currentBackground.includes("assets/map_3.gif")) {
        backgroundDiv.style.backgroundImage = puzzleMain;
        startHangmanGame();
        console.log("Level" + currentLevel)
    } else if(currentBackground.includes("assets/map_4.gif")) {
        backgroundDiv.style.backgroundImage = puzzleMain;
        startHangmanGame();
        console.log("Level" + currentLevel)
    } else if(currentBackground.includes("assets/map_5.gif")) {
        backgroundDiv.style.backgroundImage = puzzleMain;
        startHangmanGame();
        console.log("Level" + currentLevel)
    } else if(currentBackground.includes("assets/map_6.gif")) {
        backgroundDiv.style.backgroundImage = puzzleMain;
        startHangmanGame();
        console.log("Level" + currentLevel)
    }else if(currentLevel === 6) {
        backgroundDiv.style.backgroundImage = `url('assets/end.gif')`;
    }
}

function startHangmanGame() {
    const backgroundDiv = document.getElementById("background_image");
    let wordLines = document.getElementById("word_lines");
    let hintElement = document.getElementById("hint");
    let box = document.getElementById("box");
    
    // Show game elements
    document.getElementById("game_container").style.display = "flex";
    wordLines.style.display = "flex";
    hintElement.style.display = "block";
    box.style.display = "flex";

    // Lives
    let lives = 3

    // Hangman words
    let hangmanWords = ["doubloons", "museum", "expedition", "treasure", "geography", "adventure", "explorer", "archaeology", "discovery", "cartography", "navigation", "exploration", "voyage", "compass", "island", ];
    let random;
    do {
        random = Math.floor(Math.random() * hangmanWords.length);
    } while (random === lastRandom && hangmanWords.length > 1);

    lastRandom = random;

    // Hints
   const hints = [
        "Gold coins often found in pirate treasure chests.",             // doubloons
        "A place where ancient artifacts and discoveries are displayed.", // museum
        "A journey with a specific purpose, often for exploration.",      // expedition
        "Hidden riches waiting to be found.",                             // treasure
        "The study of the Earth’s features and places.",                  // geography
        "An exciting and risky journey.",                                 // adventure
        "A person who travels to unknown places.",                        // explorer
        "The study of ancient ruins and relics.",                         // archaeology
        "Finding something new and important.",                           // discovery
        "The art of making maps.",                                        // cartography
        "Finding your way across land or sea.",                           // navigation
        "Traveling to learn more about a place.",                         // exploration
        "A long journey, especially by sea.",                             // voyage
        "A tool that helps you find direction.",                          // compass
        "Land surrounded by water."                                       // island
    ];


    // Getting a random word & Hint
    let wordToGuess = hangmanWords[random]

    hintElement.innerText = `Hint: ${hints[random]}`

    // Alphabet
    let html = '';
    let letters;
    for (var i = 97; 122 >= i; i++) {// A-65, Z-90
        letters = String.fromCharCode(i);
        html += '<button onclick="setLetter(\'' + letters + '\', this);">' + letters + '</button>';
    }
    
    box = document.getElementById('box').innerHTML = html;

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
            setTimeout(() => {
                document.getElementById("game_container").style.display = "none";
                backgroundDiv.style.backgroundImage = `url('assets/end_${currentLevel}.png')`;
                document.querySelector("#next_button img").src = "assets/tryagain.png";
                document.querySelector("#next_button").onclick = function() {
                    location.reload();
                }
            }, 1000);
        }
        
        if(lives > 0 && guessLetter.join("") == wordToGuess){
            if( currentLevel === 6) {
                backgroundDiv.style.backgroundImage = `url('assets/end.gif')`;
                document.getElementById("game_container").style.display = "none";
                setTimeout(() => {
                    backgroundDiv.style.backgroundImage = `url('assets/win.png')`;
                    document.querySelector("#next_button img").src = "assets/tryagain.png";
                    document.querySelector("#next_button").onclick = function() {
                        location.reload();
                    }
                }, 1000);
            }else{
                setTimeout(() => {
                    document.getElementById("game_container").style.display = "none";
                    backgroundDiv.style.backgroundImage = `url('assets/success_${currentLevel - 1}.png')`;
                    readyForNextMap = true;
                    document.getElementById("next_button").onclick = function() {
                        showNextMap();
                    }
                }, 1000);
            }
            currentLevel++;
        }

        function showNextMap() {
            if (readyForNextMap) {
                backgroundDiv.style.backgroundImage = `url('assets/map_${currentLevel}.gif')`;
                document.getElementById("game_container").style.display = "none";
                readyForNextMap = false;
                document.getElementById("next_button").onclick = nextButton;
            }
        }

        console.log(guessLetter.join(""))
        console.log(guessLetter.join("") == wordToGuess)
        


    }
}

