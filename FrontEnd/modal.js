const openModal = function(e){
    e.preventDefault();
    GetProjectDataModal();

    const modal=document.querySelector(".modal");
    modal.style.display="";

    const galleryMenu = document.querySelector(".modal-gallery-photo");
    galleryMenu.style.display="";
    const uploadMenu = document.querySelector(".modal-ajouter-photo");
    uploadMenu.style.display="none";
}

const closeModal = function(e){
    e.preventDefault();
    const modal=document.querySelector(".modal");
    modal.style.display="none";
    
}

const openUploadMenu = function(e){
    e.preventDefault();
    const galleryMenu = document.querySelector(".modal-gallery-photo");
    galleryMenu.style.display="none";
    const uploadMenu = document.querySelector(".modal-ajouter-photo");
    uploadMenu.style.display="";
}

const openGalleryMenu = function(e){
    e.preventDefault();
    const galleryMenu = document.querySelector(".modal-gallery-photo");
    galleryMenu.style.display="";
    const uploadMenu = document.querySelector(".modal-ajouter-photo");
    uploadMenu.style.display="none";
}

document.addEventListener("DOMContentLoaded", function()  {
    const modal = document.querySelector(".modal");
    const modalWrapper = document.querySelector(".modal-wrapper");
    const button = document.querySelector(".edit-button");
    const xmarkButtons = document.querySelectorAll(".xmark");
    const ajouterImageButton = document.querySelector(".button-ajouter-modal");
    const comeBackToGalleryButton = document.querySelector("#comeBackToGalleryButton");

    if (button) {
        button.addEventListener("click", openModal); // Passez la référence à la fonction
    } else {
        console.log("Le bouton avec la classe 'edit-button' n'a pas été trouvé dans le DOM.");
    }

    xmarkButtons.forEach(xmarkButton => {
        if(xmarkButton){
            xmarkButton.addEventListener("click", closeModal);
        }else {
            console.log("le bouton xmark n'est pas dans le DOM");
        }
    });

    if(ajouterImageButton){
        ajouterImageButton.addEventListener("click", openUploadMenu);
    }else{
        console.log("pas de bouton Ajouter Image");
    }

    if(comeBackToGalleryButton){
        comeBackToGalleryButton.addEventListener("click", openGalleryMenu);
    }

    modal.addEventListener("click", function(e) {
        if (e.target === modal) { // Assurez-vous que le clic est sur le modal, pas sur son contenu
            closeModal(e);
        }
    });

    modalWrapper.addEventListener("click", function(e) {
        e.stopPropagation();
    });
   
    
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


