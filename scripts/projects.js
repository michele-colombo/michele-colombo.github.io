async function loadProjects() {
    const container = document.querySelector('.projects-grid');
    container.innerHTML = '';

    const projects = await fetch('projects/projects.json').then(res => res.json());

    for (const project of projects) {
        const description = await fetch(project.descriptionPath).then(res => res.text());

        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        const linksHTML = project.links.map(link => `
            <a href="${link.url}" target="_blank" class="btn btn-primary" ${link.url.endsWith('.pdf') ? 'download' : ''}>
                ${link.icon ? `<i class="${link.icon}"></i>` : ''} ${link.text}
            </a>
        `).join('');

        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.thumbnailPath}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/400x250'">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <h4 class="project-subtitle">${project.subtitle}</h4>
                <p class="project-description">${description}</p>
                <div class="project-tech">
                    ${project.tags.map(tag => `<span class='tech-tag'>${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${linksHTML}
                </div>
            </div>
        `;

        container.appendChild(projectCard);
    }
}

function filterProjects(tag) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const tags = Array.from(card.querySelectorAll('.tech-tag')).map(el => el.textContent);
        if (tags.includes(tag) || tag === 'All') {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();

    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <button onclick="filterProjects('All')">All</button>
        <button onclick="filterProjects('MATLAB')">MATLAB</button>
        <button onclick="filterProjects('Java')">Java</button>
        <button onclick="filterProjects('ESP32')">ESP32</button>
    `;
    
    // Insert the filter container after the section title
    const projectsSection = document.querySelector('#projects .section-title');
    projectsSection.insertAdjacentElement('afterend', filterContainer);
});