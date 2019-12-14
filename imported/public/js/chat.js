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

const chat = {
    sendChatMessage() {
        ref = firebase.database().ref('/chat');
        messageField = $('#chat_message').val().trim();

        ref.push().set({
            name: firebase.auth().currentUser.displayName,
            message: messageField
        });
    }
}


ref.on('child_added', function (snapshot) {
    let message = snapshot.val();
    addChatMessage(message.name, message.message);
})