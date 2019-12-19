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
            score: '',
            joined: false
        },
        player2: {
            email: '',
            uid: '',
            score: '',
            joined: false
        }
    },
    messages: [
        {
            message: 'message',
            time: 'time',
            player: 'player'
        },
    ]
}

const updateDB = (x) => {
    // sends the game object to the firestore db
    db.collection('newGame').doc(x).update({
        gameObject
    })
        .then((res) => {
            console.log('update success');
            console.log(res)
        }).catch(error => {
            console.log(error);
        })
};

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

const createGame = (docID, userID, userEmail) => {
    gameObject.players.player1.uid = `${userID}`;
    gameObject.players.player1.email = `${userEmail}`;
    gameObject.players.player1.joined = true;

    // sends the gameObject to the firestore db
    updateDB(docID)
};

const renderBody = (data) => {

    console.log(data)

    dataObject = data;

    if (data.length) {
        let html = '';
        html = `
            <div class="container textAlign">
                <div>
                    <button class="btn newGameButton">New Game</button>
                </div>
            </div>
            `;
        newGame.innerHTML = html;
    } else {
        newGame.innerHTML = `<h5 class="center-align">Login to view available games</h5>`;
    }

    $('.newGameButton').on('click', e => {
        newGameClick();
    })
};

const renderGameList = (data) => {
    console.log(data)
    let gameData = '';
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            gameData = doc.data();
            console.log('gameData: ');
            console.log(gameData);
            console.log('doc: ');
            console.log(doc);
            const li = `
                <li>
                    <div class="collapsible-header grey lighten-4">
                        <h6>${gameData.gameObject.players.player1.email}'s Game</h6>
                        <button class="btn joinButton">Join</button>
                    </div>
                    <div class="collapsible-body white gameArea">

                    </div>
                </li>
            `;
            html += li;
        });

        gameList.innerHTML = html;
    } else {
        gameList.innerHTML = `<h5 class="center-align">Login to view guides</h5>`;
    }

    $('.rpsButton').on('click', e => {
        // rpsButtonClick();
        console.log('you clicked an rpsButton');
    })

    // need to send current game object. (from firestore)
    renderGame(gameData);
}

const renderGame = (data) => {
    console.log('renderGame');
    joined = ""
    userEmail = firebase.auth().currentUser.email;

    // console.log(firebase.auth().currentUser.email)
    if (data.gameObject.players.player1.email == userEmail || data.gameObject.players.player2.email == userEmail) {
        // render game screen.
        document.querySelector('.gameArea').innerHTML = 'hello you joined.';
        console.log('you have joined the game');
    } else {
        // render join button
        console.log('you have not joined the game');
    }

}

const newGameClick = () => {
    let docID = '';
    const userID = firebase.auth().currentUser.uid;
    const userEmail = firebase.auth().currentUser.email;

    db.collection('newGame').add({
        createdBy: userID,
    }).then((res) => {
        console.log('Database successfully updated.')

        docID = res.id

        createGame(docID, userID, userEmail);

        db.collection('newGame').onSnapshot(snapshot => {
            console.log(snapshot.docs)
            renderGameList(snapshot.docs)
            renderGame(snapshot.docs, userID);
        })

    }).catch(error => {
        console.log(error);
    })

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    let items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});


// test

const baseball = "taco";


$('.gameChoice').on('click', e => {
    console.log('you clicked it');
    console.log(this);
    console.log(e);
})