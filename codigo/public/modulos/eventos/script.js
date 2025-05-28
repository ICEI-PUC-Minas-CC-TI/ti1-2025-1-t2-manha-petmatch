document.addEventListener('DOMContentLoaded', () => {
    const profileButton = document.querySelector('.profile-btn');
    if (profileButton) {
        profileButton.addEventListener('click', () => {
            alert('Botão Perfil clicado!');
        });
    }

    const sairButton = document.querySelector('.sair-btn');
    if (sairButton) {
        sairButton.addEventListener('click', () => {
            alert('Botão SAIR clicado!');
        });
    }

    const viewEventButtons = document.querySelectorAll('.view-event-btn, .view-event-btn-small');
    viewEventButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const eventTitle = e.target.closest('.featured-event, .event-card').querySelector('h2, h3').textContent;
            alert(`Ver evento: ${eventTitle}`);
        });
    });

    const menuItems = document.querySelectorAll('.menu li a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            menuItems.forEach(i => i.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });

    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            console.log(`Pesquisando por: ${searchInput.value}`);
        });
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log(`Pesquisando por: ${searchInput.value}`);
            }
        });
    }
});