
module.exports = function(firebase) {
    return {
        
        registerUser: function() {
            let email = document.querySelector("#email").value;
            let password = document.querySelector("#password").value;
        
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function (user) {
                    document.querySelector('#user').innerHTML = user.user.uid;
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorCode + ' -- ' + errorMessage);
                });
        },
        login: function () {
            let email = document.querySelector("#email").value;
            let password = document.querySelector("#password").value;
            firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
                document.querySelector('#user').innerHTML = result.user.uid;
            });
        }
    }
}
