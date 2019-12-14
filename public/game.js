// Creates an array that lists out all of the options (Rock, Paper, or Scissors).
const computerChoices = ["r", "p", "s"];

// Creating variables to hold the number of wins, losses, and ties. They start at 0.
var wins = 0;
var losses = 0;
var ties = 0;

// Create variables that will be populated with user guesses each round
let userGuess = "";
let computerGuess = "";

// Create a variable that will hold a boolean to signal whether or not the game is currently being "played"
let beingPlayed = false;

const game = {
    captureKey: function () {
        console.log("capturing key")
        // This function is run whenever the user presses a key.
        document.onkeyup = function (event) {
            // Determines which key was pressed.
            userGuess = event.key;

            // Randomly chooses a choice from the options array. This is the Computer's guess.
            computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];


            console.log(userGuess);
            console.log(computerGuess);
            database.ref().set({
                userGuess: userGuess,
                computerGuess: computerGuess,
            });
            game.playGame();
        };
    },

    playGame: function () {
        console.log("playGame function running...")
        database.ref().on("value", function (snapshot) {
            console.log(snapshot)

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        console.log('playing game')
        // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
        if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

            if ((userGuess === "r" && computerGuess === "s") ||
                (userGuess === "s" && computerGuess === "p") ||
                (userGuess === "p" && computerGuess === "r")) {
                wins++;
            } else if (userGuess === computerGuess) {
                ties++;
            } else {
                losses++;
            }

            // Hide the directions
            $('#directions-text').text("");

            // Display the user and computer guesses, and wins/losses/ties.
            $("#userchoice-text").text("You chose: " + userGuess);
            $("#computerchoice-text").text("The computer chose: " + computerGuess);
            $("#wins-text").text("wins: " + wins);
            $("#losses-text").text("losses: " + losses);
            $("#ties-text").text("ties: " + ties);
        }
    },

}

$('document').ready(function () {
    $('.playerButton').on("click", function (e) {
        console.log(this.id);
    });

    $('#playGame').click(function () {
        game.captureKey();
    });

    $('#create_account').click(function () {
        game.submitCreateAccount();
    });

    $('#signIn').click(function () {
        // game.signInWithEmailAndPassword();
        console.log('you clicked signIn')

        let email = $('#email').val().trim();
        let password = $('#password').val().trim();

        // game.login(email, password);



        // POST method route
        app.post('/login', function (req, res) {
            res.send('post request')
        })

        // app.get('/login')
        // let Url = window.location.href + "/login"

        // window.location.href(Url);
    });

    $('#logout').click(function () {
        console.log('you clicked logout');
    })

});