$('document').ready(function () {

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
        .catch(function (error) {
            // handle errors
            let errorCode = error.code;
            let errorMessage = error.message;
            console.warn('Can you see me?');
            window.alert("Error: " + errorMessage);
        })

    res.sendFile(path.join(__dirname, "../public/welcome.html"))
})