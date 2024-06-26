
//Permet d'ouvrir la modale avec son menu Gallery
const openModal = function(e){
    e.preventDefault();
    console.log("clik");
    GetProjectDataModal();

    const modal=document.querySelector(".modal");
    modal.style.display="";

    const galleryMenu = document.querySelector(".modal-gallery-photo");
    galleryMenu.style.display="";
    const uploadMenu = document.querySelector(".modal-ajouter-photo");
    uploadMenu.style.display="none";
}


//permet de fermer la modale
const closeModal = function(e){
    e.preventDefault();
    const modal=document.querySelector(".modal");
    modal.style.display="none";
    
}


//permet d'ouvrir l'uploadMenu dans la modale pour ajouter des projets
const openUploadMenu = function(e) {
    e.preventDefault();
    
    // Cacher le menu de la galerie
    const galleryMenu = document.querySelector(".modal-gallery-photo");
    galleryMenu.style.display = "none";

    const errorMessage = document.querySelector('.error-message');
    errorMessage.innerText = "";
    
    // Vérifier et supprimer l'image chargée si une est déjà chargée
    const uploadedImage = document.getElementById('uploadedImage');
    const imageUploadForm = document.getElementById('image-upload-form');
    const imageInput = document.getElementById('imageUpload');

    if (uploadedImage.src) {
        uploadedImage.src = '';
        uploadedImage.style.display = 'none';
        imageUploadForm.style.display = '';
    }

    // Réinitialiser le champ de téléchargement de fichier
    imageInput.value = '';

    // Afficher le menu d'upload
    const uploadMenu = document.querySelector(".modal-ajouter-photo");
    uploadMenu.style.display = "";
}


//ouverture de la gallery dans la modale
const openGalleryMenu = function(e){
    e.preventDefault();
    const galleryMenu = document.querySelector(".modal-gallery-photo");
    galleryMenu.style.display="";
    const uploadMenu = document.querySelector(".modal-ajouter-photo");
    uploadMenu.style.display="none";
}


//permet de supprimer un projet depuis la gallery
const deleteProject = async function(e) {
    e.preventDefault();
    const projectId = e.currentTarget.dataset.projectId; 
    const token = sessionStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
          
        });

        await response.text();

        if (response.ok || response.status === 204) {
            // Mettre à jour les données des projets après la suppression réussie
            await GetProjectDataModal();
            await GetProjectData();
        } else {
            console.error('Failed to delete project.');
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}


//Ajout des eventListener sur les différents boutons et appels de leur fonctions
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.querySelector(".modal");
    const modalWrapper = document.querySelector(".modal-wrapper");
    const button = document.querySelector(".edit-button");
    const xmarkButtons = document.querySelectorAll(".xmark");
    const ajouterImageButton = document.querySelector(".button-ajouter-modal");
    const comeBackToGalleryButton = document.querySelector("#comeBackToGalleryButton");
    const submitButton = document.getElementById('modal-valider-bouton');
    const imageInput = document.getElementById('imageUpload');
    const titleInput = document.getElementById('title');
    const categoryInput = document.getElementById('choices');
    const errorMessage = document.querySelector('.error-message');

    // Fonction de validation des entrées pour créer un projet
    function validateInputs() {
        errorMessage.innerText = "";

        if (!imageInput.files.length) {
            return false;
        }

        const file = imageInput.files[0];
        const validImageTypes = ['image/jpeg', 'image/png'];
        const maxFileSize = 4 * 1024 * 1024; // 4 MB in bytes

        if (!validImageTypes.includes(file.type)) {
            return false;
        }

        if (file.size > maxFileSize) {
            return false;
        }

        if (!titleInput.value.trim()) {
            return false;
        }

        if (!categoryInput.value.trim()) {
            return false;
        }

        return true;
    }

    // Fonction de mise à jour de l'état du bouton pour créer un projet
    function updateButtonState() {
        if (validateInputs()) {
            submitButton.classList.add('active');
        } else {
            submitButton.classList.remove('active');
        }
    }

    // Écouteurs d'événements sur les champs d'entrée pour créer un projet
    imageInput.addEventListener('change', updateButtonState);
    titleInput.addEventListener('input', updateButtonState);
    categoryInput.addEventListener('input', updateButtonState);

    // Ajout des écouteurs d'événements sur les différents boutons et appels de leurs fonctions
    if (button) {
        button.addEventListener("click", openModal); 
    } else {
        console.log("Le bouton avec la classe 'edit-button' n'a pas été trouvé dans le DOM.");
    }

    xmarkButtons.forEach(xmarkButton => {
        if(xmarkButton){
            xmarkButton.addEventListener("click", closeModal);
        } else {
            console.log("le bouton xmark n'est pas dans le DOM");
        }
    });

    if(ajouterImageButton){
        ajouterImageButton.addEventListener("click", openUploadMenu);
    } else {
        console.log("pas de bouton Ajouter Image");
    }

    if(comeBackToGalleryButton){
        comeBackToGalleryButton.addEventListener("click", openGalleryMenu);
    }

    if(modal){
        modal.addEventListener("click", function(e) {
            if (e.target === modal) { 
                closeModal(e);
            }
        });
    }

    modalWrapper.addEventListener("click", function(e) {
        e.stopPropagation();
    });

    document.getElementById('imageUpload').addEventListener('change', function(event) {
        const input = event.target;
        const file = input.files[0];
    
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                const uploadedImage = document.getElementById('uploadedImage');
                uploadedImage.src = imageUrl;
                uploadedImage.style.display = 'block';
                document.getElementById('image-upload-form').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });


    //création d'un nouveau projet si toutes les conditions sont validées
    document.getElementById('modal-valider-bouton').addEventListener('click', async function(e) {
        e.preventDefault();

        if (!validateInputs()) {
            errorMessage.innerText = "Veuillez remplir tous les champs correctement";
            return;
        }

        const file = imageInput.files[0];
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', titleInput.value.trim());
        formData.append('category', categoryInput.value.trim());

        const token = sessionStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const responseData = await response.text();
            console.log('Response Data:', responseData);

            if (response.ok) {
                const successMessage = document.querySelector('.error-message');
                successMessage.innerText = "Projet créé avec succès";
                await GetProjectDataModal();
                await GetProjectData();
            } else {
                errorMessage.innerText = "Échec de la création du projet";
            }
        } catch (error) {
            errorMessage.innerText = `Erreur: ${error}`;
        }
    });
});







//Affichage des projets existants dans la modale
async function GetProjectDataModal() {

    
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();

    displayProjectsModal(data);

}

function displayProjectsModal(projects) {


    const gallery = document.querySelector(".galerie-photo-modal");

    // Supprimer tous les enfants de la galerie existante
    gallery.innerHTML = '';

    // Ajouter les nouveaux projets à la galerie de la modale
    projects.forEach(project => {
        // Créer un conteneur pour l'image et le bouton
        const container = document.createElement("div");
        container.classList.add("modal-image-container");

        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;

        //Ajout du deleteButton
        const deleteButton = document.createElement("button");
        deleteButton.type = 'button';
        deleteButton.dataset.projectId = project.id;
        deleteButton.classList.add("delete-button");

        const iconElement = document.createElement("i");
        iconElement.classList.add("fa-regular", "fa-trash-can");

        deleteButton.appendChild(iconElement);
        deleteButton.addEventListener('click', deleteProject);

        container.appendChild(imageElement);
        container.appendChild(deleteButton);

        gallery.appendChild(container);
    });
}


