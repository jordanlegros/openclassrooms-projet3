async function GetProjectData() {

    //permet de récupérer les données des projets et de filtrer les données reçues grâce aux boutons filtres


    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();

    displayProjects(data);

    const filterButtons = document.querySelectorAll('.filter-button');
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

function displayProjects(projects) {

    // permet d'afficher les données des projets filtrés

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

GetProjectData();