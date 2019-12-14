
// import firebase from 'firebase/app';
// import * from 'firebase/auth';
// var firebase = firebase;
// require('firebase/database');

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

var database = firebase.database();


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

    submitCreateAccount() {
        console.log("submitCreateAccount running...")
        let displayName = $('#display_name').val().trim();
        let email = $('#email').val().trim();
        let password = $('#password').val().trim();

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                user.updateProfile({ displayName: displayName });
            });
    },

    signInWithEmailAndPassword() {
        console.log("signInWithEmailAndPassword running...")
        let email = $('#email').val().trim();
        let password = $('#password').val().trim();

        firebase.auth().signInWithEmailAndPassword(email, password);
    },

    googleSignIn(googleUser) {
        console.log("googleSignIn running...")
        let credential = firebase.auth.GoogleAuthProvider.credential({
            'idToken': googleUser.getAuthRespone().id_token
        });

        firebase.auth().signInWithCredential(credential);
    },

    AuthStateChangeListener(user) {
        console.log("authStateChangeListener running...")
        console.log("Console log of 'user' from inside AuthStateChangeListener: " + user)
        if (user) {
            // do login operations...
            Chat.onlogin();
            Game.onlogin();
        } else {
            window.location.reload();
        }
    },

    login(email, password) {
        console.log(email, password)

        redirect = (email, password) => {
            window.location.replace(window.location.href + "login")

        }

    },

}

$('document').ready(function () {
    $('.playerButton').on("click", function (e) {
        console.log(this.id);
    });

    $('#playGame').click(function () {
        application.captureKey();
    });

    $('#create_account').click(function () {
        application.submitCreateAccount();
    });

    $('#signIn').click(function () {
        // application.signInWithEmailAndPassword();
        console.log('you clicked signIn')

        let email = $('#email').val().trim();
        let password = $('#password').val().trim();

        // application.login(email, password);



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