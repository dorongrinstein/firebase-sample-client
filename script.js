
const firebase = require('firebase');
const css = require('./spin.css');
import { getConfig } from './config';
import { Spinner } from 'spin.js';
import { spinOptions } from './spin-options';
const emailLogin = require('./emailLogin')(firebase);

const config = getConfig();
console.log(config);
firebase.initializeApp(config);
let target = document.querySelector('#main');
let spinner;

if (window.location.href.indexOf('loggingIn') > -1)
    spinner = new Spinner(spinOptions).spin(target);

firebase.auth().getRedirectResult().then(function (result) {
    getRidOfLoggingIn();
    spinner.stop();
}, function (err) {
    spinner.stop();
    window.alert(`error: ${err}`);
});



function getRidOfLoggingIn() {
    let url = window.location.href;
    let newLoc = url.replace('?loggingIn', '');
    window.history.pushState('', '', newLoc);
}

function displayRefreshToken() {
    let x = firebase.auth().currentUser.refreshToken;
    console.log(x)
    document.querySelector('#refresh').value = x;
}


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        display(user.email + ' -- ' + user.uid);
    } else {
        display("No user");
    };

})


function logOut() {
    spinner.stop();
    firebase.auth().signOut();
}

const loginWithGoogle = function () {
    let provider = new firebase.auth.GoogleAuthProvider();
    window.history.pushState('', '', '?loggingIn');
    firebase.auth().signInWithRedirect(provider);
}


function display(text) {
    document.querySelector('#user').innerHTML = text;
}

function displayJwt() {
    firebase.auth().currentUser.getIdToken().then(function(idToken) {
        document.querySelector("#jwt").value = idToken;
        
      }).catch(function(error) {
        window.alert(error)
      });
}

document.querySelector('#btnLogin').onclick = emailLogin.login;
document.querySelector('#btnRegister').onclick = emailLogin.registerUser;
document.querySelector('#btnLogout').onclick = logOut;
document.querySelector('#btnGoogle').onclick = loginWithGoogle;
document.querySelector('#btnJwt').onclick = displayJwt;
document.querySelector('#btnRefresh').onclick = displayRefreshToken;

