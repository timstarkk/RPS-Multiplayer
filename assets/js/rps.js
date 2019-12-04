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


// FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE 
// FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE 

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyANkd_rQW7K3cZStL4w-2dTO1P-N31yMyc",
    authDomain: "rps-multiplayer-88fef.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-88fef.firebaseio.com",
    projectId: "rps-multiplayer-88fef",
    storageBucket: "rps-multiplayer-88fef.appspot.com",
    messagingSenderId: "160130271572",
    appId: "1:160130271572:web:70ec1ae08edcbf2d2020c1",
    measurementId: "G-9R6780S2NW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE 
// FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE FIREBASE 

const application = {
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
            application.playGame();
        };
    },

    playGame: function () {

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
    }
}

$('document').ready(function () {
    $('.playerButton').on("click", function (e) {
        console.log(this.id);
    });

    $('#playGame').click(function () {
        application.captureKey();
    });

})