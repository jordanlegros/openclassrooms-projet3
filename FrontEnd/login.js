let errorMessageDisplayed = false;

async function ajoutListenerLogin() {
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

            window.localStorage.setItem("token", token);
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

document.addEventListener("DOMContentLoaded", () => {
    ajoutListenerLogin(); // Appel de votre fonction une fois que le DOM est chargé
});
 
 