let errorMessageDisplayed = false;

async function ajoutListenerLogin() {
    console.log("ajout");
    const formLogin = document.querySelector(".login-form");
    formLogin.addEventListener("submit", async function (event) {
    // Désactivation du comportement par défaut du navigateur
    event.preventDefault();
    const loginInfo = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=motdepasse]").value,
     };


     const chargeUtile = JSON.stringify(loginInfo);
     // Appel de la fonction fetch avec toutes les informations nécessaires
     const reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });

        if(reponse.ok) {
            const loginResponse = await reponse.json();
            const token = loginResponse.token;
            console.log(token);
            window.sessionStorage.setItem("token", token);
            window.location.href = "index.html";
        } else {
            if(!errorMessageDisplayed){
                const loginDiv = document.querySelector(".login");

                const errorMessage = document.createElement("h3");
                errorMessage.innerText = "Email ou mot de passe incorrect.";
    
                loginDiv.appendChild(errorMessage);
                errorMessageDisplayed = true;
            }
            

        }
    });
 }

 function checkLoginStatus() {
    const token = window.sessionStorage.getItem("token");
    const loginButton = document.querySelector(".login-button");
    const editButton = document.querySelector(".edit-button");
    const editBlackBar = document.querySelector(".login-black-bar")

    if (token) {
        // Si un token est présent, changer le texte du bouton en "Logout"
        loginButton.innerText = "Logout";

        // Ajouter un écouteur d'événement pour gérer la déconnexion
        loginButton.addEventListener("click", function() {
            // Supprimer le token du sessionStorage
            window.sessionStorage.removeItem("token");
            // Recharger la page pour refléter les changements
            window.location.reload();
        });

        editButton.style.display = "";
        editBlackBar.style.display = "";
    } else {
        // Si pas de token, s'assurer que le bouton affiche "Login"
        loginButton.innerText = "Login";

        
        editButton.style.display = "none";
        editBlackBar.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    if (window.location.pathname.endsWith("login.html")) {
        ajoutListenerLogin(); // Appel de la fonction uniquement sur la page login.html
    }else{
        checkLoginStatus();
    }
});