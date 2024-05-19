const openModal = function(e){
    e.preventDefault
    GetProjectDataModal();

    const modal=document.querySelector(".modal");
    modal.style.display="";
}

document.addEventListener("DOMContentLoaded", function()  {
    const button = document.querySelector(".edit-button");
    
    if (button) {
        console.log("Le bouton a été trouvé, ajout de l'écouteur d'événement.");
        button.addEventListener("click", openModal); // Passez la référence à la fonction
    } else {
        console.error("Le bouton avec la classe 'edit-button' n'a pas été trouvé dans le DOM.");
    }
    
});



async function GetProjectDataModal() {

    //permet de récupérer les données des projets et de filtrer les données reçues grâce aux boutons filtres
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();

    displayProjectsModal(data);

}

function displayProjectsModal(projects) {

    // permet d'afficher les données des projets filtrés

    const gallery = document.querySelector(".galerie-photo-modal");
    gallery.innerHTML = '';

    projects.forEach(project => {
        // Créer un conteneur pour l'image et le bouton
        const container = document.createElement("div");
        container.classList.add("modal-image-container");
    

        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
    

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
    
  
        const iconElement = document.createElement("i");
        iconElement.classList.add("fa-regular", "fa-trash-can");
 
        deleteButton.appendChild(iconElement);
    
        container.appendChild(imageElement);
        container.appendChild(deleteButton);

        gallery.appendChild(container);
    });
}


