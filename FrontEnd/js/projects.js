async function GetProjectData() {

    //permet de récupérer les données des projets et de filtrer les données reçues grâce aux boutons filtres
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();

    displayProjects(data);
    CreateFilters(data);

    const filterButtons = document.querySelectorAll('.filter-button');
    const allButton = document.querySelector('.filter-button[data-filter="all"]');

    // Définit le bouton 'all' comme actif par défaut
    allButton.classList.add('active');

    //application des filtres au clic sur le bouton
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            if (filter === 'all') {
                displayProjects(data);
            } else {
                const filteredProjects = data.filter(project => project.category.name.includes(filter));
                displayProjects(filteredProjects);
            }
            

            //permet de mettre à jour le style css des boutons en fonction du bouton cliqué ou non
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
    });
}


// permet d'afficher les données des projets filtrés
function displayProjects(projects) {


    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';

    projects.forEach(project => {
        const projectElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const titleElement = document.createElement("figcaption");

        imageElement.src = project.imageUrl;
        titleElement.innerText = project.title;

        projectElement.appendChild(imageElement);
        projectElement.appendChild(titleElement);
        gallery.appendChild(projectElement);
    });
}


//au chargement de la page, on charge les projets
document.addEventListener("DOMContentLoaded", () => {
    GetProjectData();
});


//création des filtres dynamiquement
function CreateFilters(projects){
    const filters = projects.map(project => project.category.name);
    const filtersUniques = [...new Set(filters)];
    filtersUniques.unshift("all");
    

    const container = document.querySelector(".filters");

    filtersUniques.forEach(filter => {

        if(filter === "all"){
            const bouton = document.createElement('button');
            bouton.classList.add('filter-button');
            bouton.textContent = "Tout";
            bouton.setAttribute('data-filter', filter);
            container.appendChild(bouton);
        }else {
            const bouton = document.createElement('button');
            bouton.classList.add('filter-button');
            bouton.textContent = filter;
            bouton.setAttribute('data-filter', filter);
            container.appendChild(bouton);
        }
        
    })
}
