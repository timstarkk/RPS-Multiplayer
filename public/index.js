const newGame = document.querySelector('.newGame');
const gameList = document.querySelector('.games');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

let dataObject = '';

const gameObject = {
    players: {
        player1: {
            email: '',
            uid: '',
            score: {
                wins: 0,
                ties: 0,
                losses: 0,
            },
            joined: false
        },
        player2: {
            email: '',
            uid: '',
            score: {
                wins: 0,
                ties: 0,
                losses: 0,
            },
            joined: false
        }
    },
    messages: [
        {
            message: 'message',
            time: 'time',
            player: 'player'
        },
    ],
    player1Choice: '',
    player2Choice: ''
}

const setupUi = (user) => {
    if (user) {
        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
                <div>Logged in as ${user.email}</div>
                <div>${doc.data().bio}</div>
            `;
            accountDetails.innerHTML = html;
        })

        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // hide account info
        accountDetails.innerHTML = '';
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
};

const newGameClick = () => {
    console.log('you clicked new game');
    let docID = '';
    const userID = firebase.auth().currentUser.uid;
    const userEmail = firebase.auth().currentUser.email;

    db.collection('newGame').add({
        createdBy: userID,
    }).then((res) => {
        // console.log('Database successfully updated.')

        docID = res.id

        // create game saves user's info as player 1.
        createGame(docID, userID, userEmail);

        // save game info as "current game" in db.
        setCurrentGame(docID);

        // render
        renderGame()

    }).catch(error => {
        console.log(error);
    })

}

const createGame = (docID, userID, userEmail) => {
    gameObject.players.player1.uid = `${userID}`;
    gameObject.players.player1.email = `${userEmail}`;
    gameObject.players.player1.joined = true;

    // sends the gameObject to the firestore db
    updateDB(docID)
};

const updateDB = (x) => {
    // sends the game object to the firestore db
    db.collection('newGame').doc(x).update({
        gameObject
    })
        .then((res) => {
            // console.log('update success');
            // console.log(res)
        }).catch(error => {
            console.log(error);
        })
};

const setCurrentGame = (docID) => {
    db.collection('currentGame').doc('current').set({
        docID: docID
    })
};

// const renderGameList = (data) => {
//     console.log(data)
//     let gameData = '';
//     if (data.length) {
//         let html = '';
//         data.forEach(doc => {
//             gameData = doc.data();
//             console.log('gameData: ');
//             console.log(gameData);
//             console.log('doc: ');
//             console.log(doc);
//             const li = `
//                 <li>
//                     <div class="collapsible-header grey lighten-4">
//                         <h6>${gameData.gameObject.players.player1.email}'s Game</h6>
//                         <button class="btn joinButton">Join</button>
//                     </div>
//                     <div class="collapsible-body white gameArea">

//                     </div>
//                 </li>
//             `;
//             html += li;
//         });

//         gameList.innerHTML = html;
//     } else {
//         gameList.innerHTML = `<h5 class="center-align">Login to view guides</h5>`;
//     }



//     // need to send current game object. (from firestore)
//     renderGame(gameData);
// }

const renderGame = (data) => {
    joined = ""
    let docID = '';

    if (firebase.auth().currentUser) {

        const userID = firebase.auth().currentUser.uid;
        const userEmail = firebase.auth().currentUser.email;
        db.collection('currentGame').doc('current')
            .onSnapshot(doc => {
                docID = doc.data().docID;
                console.log(docID);
                db.collection('newGame').doc(docID).get()
                    .then(doc => {

                        let player1 = doc.data().gameObject.players.player1.email;
                        let player2 = doc.data().gameObject.players.player2.email;
                        console.log(player1, player2);


                        let html = '';
                        html = `
                    <div class="container textAlign">
                        <div>
                            <button class="btn newGameButton">New Game</button>
                        </div>
                        <br><br><br>
                        <div>
                            <button class="btn joinButton" style="display: none">Join</button>
                        </div>
                        <div class="row" id="gameBoard"> 
                            <div class="col s12 scoreboard">
                                <h6>player 1: ${player1}</h6>
                                <h6>player 2: ${player2}</h6>
                            </div>
                            <div class="col s6">
                                <div class="row rpsRow">
                                    <div class="col s12">
                                        <h6>Your Answer:</h6>
                                        <p class="yourAnswer"></p><br>
                                    </div>
                                    <div class="col s12 rpsButtonCol">
                                        <button class="btn rpsButton">rock</button>
                                    </div>
                                    <div class="col s12 rpsButtonCol">
                                        <button class="btn rpsButton">paper</button>
                                    </div>
                                    <div class="col s12 rpsButtonCol">
                                        <button class="btn rpsButton">scissors</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col s6 chatCol">
                                <div class="chatArea">
                                </div>
                                <input class="chatInput" placeholder="Chat..."></input>
                            </div>
                            <div class="col s12 scoreboard">
                                <h6 id="winScore">win:</h6>
                                <h6 id="lossScore">loss:</h6>
                                <h6 id="tieScore">tie:</h6>
                            </div>
                        </div>
                    </div>
                    `;
                        newGame.innerHTML = html;

                        const joinButton = document.querySelector('.joinButton')


                        if (firebase.auth().currentUser.email == doc.data().gameObject.players.player1.email ||
                            firebase.auth().currentUser.email == doc.data().gameObject.players.player2.email) {
                            joinButton.style.display = "none";
                        } else if (firebase.auth().currentUser.email != doc.data().gameObject.players.player1.email &&
                            firebase.auth().currentUser.email != doc.data().gameObject.players.player2.email) {
                            joinButton.style.display = "block";
                        };





                        $('.joinButton').on('click', e => {
                            // console.log('you clicked on the join button');
                            joinButtonClick(e, docID);
                        })

                        $('.newGameButton').on('click', e => {
                            newGameClick();
                        })

                        $('.rpsButton').on('click', e => {
                            console.log('you clicked an RPS button')
                            // console.log(e);
                            let choice = e.target.innerHTML;
                            db.collection('newGame').doc(docID).get()
                                .then(doc => {
                                    let p1wins = doc.data().gameObject.players.player1.score.wins;
                                    let p1ties = doc.data().gameObject.players.player1.score.ties;
                                    let p1losses = doc.data().gameObject.players.player1.score.losses;
                                    let p2wins = doc.data().gameObject.players.player2.score.wins;
                                    let p2ties = doc.data().gameObject.players.player2.score.ties;
                                    let p2losses = doc.data().gameObject.players.player2.score.losses;
                                    rpsButtonClick(choice, docID, doc, p1wins, p1ties, p1losses, p2wins, p2ties, p2losses);
                                })
                        })
                    })

            })

    } else {
        newGame.innerHTML = `<h5 class="center-align">Login to view available games</h5>`;
    }

}

const joinButtonClick = (e, docID) => {
    console.log(docID);
    // userEmail = firebase.auth().currentUser.email;
    // userID = firebase.auth().currentUser.uid;

    // this is fucked:
    // this is fucked:
    // this is fucked:
    // this is fucked:
    // db.collection(`newGame`).doc(docID).update({ email: `${firebase.auth().currentUser.email}` });

    db.collection("newGame").doc(docID).update({
        "gameObject.players.player2.email": firebase.auth().currentUser.email,
        "gameObject.players.player2.userID": firebase.auth().currentUser.uid,
    }).then(function () {
        console.log("player 2 updated");
    }).catch(err => console.log(err.message));

}

const rpsButtonClick = (choice, docID, doc, p1wins, p1ties, p1losses, p2wins, p2ties, p2losses) => {
    $('.yourAnswer').html(choice);
    // console.log(choice);
    // console.log(docID);

    let userEmail = firebase.auth().currentUser.email;
    let userID = firebase.auth().currentUser.uid;

    loadScores();

    if (firebase.auth().currentUser.email == doc.data().gameObject.players.player1.email) {
        console.log('playing as player 1');
        db.collection('newGame').doc(docID).update({
            'gameObject.player1Choice': choice
        })
    } else if (firebase.auth().currentUser.email == doc.data().gameObject.players.player2.email) {
        console.log('playing as player 2');
        db.collection('newGame').doc(docID).update({
            'gameObject.player2Choice': choice
        })
    };

    db.collection('newGame').doc(docID).onSnapshot(doc => {
        const data = doc.data()
        console.log('hello2');

        if (data.gameObject.player1Choice && data.gameObject.player2Choice) {
            let player1Choice = data.gameObject.player1Choice;
            let player2Choice = data.gameObject.player2Choice;

            console.log('hello');
            console.log(p2losses);
            game.playGame(player1Choice, player2Choice, docID, p1wins, p1ties, p1losses, p2wins, p2ties, p2losses);
        }

    })
}

const loadScores = () => {
    db.collection('currentGame').doc('current').get()
        .then(doc => {
            console.log(doc.data().docID);
            db.collection('newGame').doc(doc.data().docID).get()
                .then(doc => {
                    let p1wins = doc.data().gameObject.players.player1.score.wins;
                    let p1ties = doc.data().gameObject.players.player1.score.ties;
                    let p1losses = doc.data().gameObject.players.player1.score.losses;
                    let p2wins = doc.data().gameObject.players.player2.score.wins;
                    let p2ties = doc.data().gameObject.players.player2.score.ties;
                    let p2losses = doc.data().gameObject.players.player2.score.losses;

                    if (firebase.auth().currentUser.email == doc.data().gameObject.players.player1.email) {
                        $('#winScore').html('Win: ' + p1wins);
                        $('#lossScore').html('Loss: ' + p1losses);
                        $('#tieScore').html('Tie: ' + p1ties);
                    } else if (firebase.auth().currentUser.email == doc.data().gameObject.players.player2.email) {
                        $('#winScore').html('Win: ' + p2wins);
                        $('#lossScore').html('Loss: ' + p2losses);
                        $('#tieScore').html('Tie: ' + p2ties);
                    };
                })
        })
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    let items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});
