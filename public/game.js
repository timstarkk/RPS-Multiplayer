// Creates an array that lists out all of the options (Rock, Paper, or Scissors).
const computerChoices = ["r", "p", "s"];

// Creating variables to hold the number of wins, losses, and ties. They start at 0.
let wins = 0;
let losses = 0;
let ties = 0;

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

    playGame: function (player1Choice, player2Choice, docID, p1wins, p1ties, p1losses, p2wins, p2ties, p2losses) {
        console.log('playing game')
        // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number

        if ((player1Choice === "rock" && player2Choice === "scissors") ||
            (player1Choice === "scissors" && player2Choice === "paper") ||
            (player1Choice === "paper" && player2Choice === "rock")) {

            // player 1 wins
            console.log('player 1 wins');
            p1wins += 1;
            p2losses += 1;
            console.log(p2losses);
            db.collection('newGame').doc(docID).update({
                "gameObject.players.player1.score.wins": p1wins,
                "gameObject.players.player2.score.losses": p2losses,
            }).then(res => {
                console.log('update success')
            })

        } else if (player1Choice === player2Choice) {
            console.log('its a tie');
            p1ties += 1;
            p2ties += 1;
            console.log(typeof (p2ties));
            db.collection('newGame').doc(docID).update({
                "gameObject.players.player1.score.ties": p1ties,
                "gameObject.players.player2.score.ties": p2ties,
            }).then(res => {
                console.log('update success')
            })
        } else {
            // player 2 wins
            console.log('player 2 wins');
            p1losses += 1;
            p2wins += 1;
            db.collection('newGame').doc(docID).update({
                "gameObject.players.player1.score.losses": p1losses,
                "gameObject.players.player2.score.wins": p2wins,
            }).then(res => {
                console.log('update success')
            })
        }


        db.collection('newGame').doc(docID).update({
            "gameObject.player1Choice": "",
            "gameObject.player2Choice": ""
        })
    },

    // when someone clicks Rock, Paper, or Scissors
    newGameClick: function (userClicked, data) {
        console.log(data);

        const userId = firebase.auth().currentUser.uid;

        db.collection('newGame').add({
            userId,
            userClicked
        }).then(() => {
            // close modal and reset form
            console.log('Database successfully updated.')
        }).catch(error => {
            console.log(error);
        })
    }
}