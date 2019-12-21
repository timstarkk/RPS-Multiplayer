// listen for auth state changes
auth.onAuthStateChanged(user => {
    if (user) {
        setupUi(user);
        // console.log('auth state changed');
        // render screen
        renderGame();
        loadScores();
    } else {
        setupUi();
        renderGame();
        // renderGameList();
    }


});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        })
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
})

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
    e.preventDefault();

    auth.signOut();
    gameList.innerHTML = '';
});

// log in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', e => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // close the login modal and reset the form
        console.log(cred);
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
})