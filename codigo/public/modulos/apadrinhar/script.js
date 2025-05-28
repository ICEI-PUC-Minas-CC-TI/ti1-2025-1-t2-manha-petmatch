document.addEventListener('DOMContentLoaded', function() {
    const perfilButton = document.getElementById('btnPerfil');
    const sairButton = document.getElementById('btnSair');
    const sponsorButtons = document.querySelectorAll('.sponsor-btn');

    if (perfilButton) {
        perfilButton.addEventListener('click', function() {
            alert('Botão "Perfil" clicado!');
        });
    }

    if (sairButton) {
        sairButton.addEventListener('click', function() {
            alert('Botão "Sair" clicado!');
        });
    }

    sponsorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const petName = this.dataset.petname;
            alert('Botão "Apadrinhar pet" clicado para o pet: ' + petName);
        });
    });

    const searchButton = document.querySelector('.search-bar button');
    if (searchButton) {
        searchButton.addEventListener('click', function(event) {
            event.preventDefault();
            const searchTerm = document.querySelector('.search-bar input').value;
            if (searchTerm.trim() !== '') {
                alert('Pesquisando por: ' + searchTerm);
            } else {
                alert('Digite algo para pesquisar.');
            }
        });
    }
});