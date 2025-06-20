import { FavoritePetInterface } from "../../db-interface/favorite-pet-interface.js";

// Variáveis globais
let favoritePetInterface;
let currentUserId = null;

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', async () => {
    favoritePetInterface = new FavoritePetInterface();
    await initializePage();
});

// Inicializa a página de favoritos
async function initializePage() {
    try {
        // Busca o usuário da sessão
        currentUserId = await getCurrentUserId();
        
        if (!currentUserId) {
            showLoginRequired();
            return;
        }

        // Carrega informações do usuário na sidebar
        await loadUserInfo();
        
        // Carrega e exibe os favoritos
        await loadAndDisplayFavorites();
        
        // Configura os event listeners
        setupEventListeners();
        
    } catch (error) {
        console.error('Erro ao inicializar página:', error);
        showError('Erro ao carregar a página de favoritos');
    }
}

// Busca o ID do usuário atual da sessão
async function getCurrentUserId() {
    try {
        const response = await fetch(`${window.location.origin}/session`);
        
        if (!response.ok) {
            console.warn('Sessão não encontrada');
            return null;
        }
        
        const sessionData = await response.json();
        
        // Se é um objeto direto com userId
        if (sessionData && sessionData.userId) {
            return sessionData.userId;
        }
        
        // Se é um array, pega a sessão ativa
        if (Array.isArray(sessionData) && sessionData.length > 0) {
            const activeSession = sessionData.find(session => session.isActive) || sessionData[0];
            return activeSession?.userId || null;
        }
        
        return null;
    } catch (error) {
        console.error('Erro ao buscar sessão:', error);
        return null;
    }
}

// Carrega informações do usuário na sidebar
async function loadUserInfo() {
    try {
        // Aqui você pode fazer uma requisição para buscar dados do usuário
        // Por enquanto, vamos manter o que já está no HTML
        console.log('Usuário logado:', currentUserId);
    } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
    }
}

// Carrega e exibe os pets favoritos
async function loadAndDisplayFavorites() {
    try {
        showLoading(true);
        
        const favorites = await favoritePetInterface.fetchFavoritePet({
            userId: currentUserId
        });

        if (favorites.isLeft && favorites.isLeft()) {
            console.error('Erro ao carregar favoritos:', favorites);
            showError('Erro ao carregar seus pets favoritos');
            return;
        }

        const favoritesList = favorites.favoritesPets || favorites || [];
        displayFavorites(favoritesList);
        
    } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        showError('Erro ao carregar seus pets favoritos');
    } finally {
        showLoading(false);
    }
}

// Exibe os pets favoritos na tela
function displayFavorites(favorites) {
    const container = document.getElementById('pets-grid');
    
    if (!container) {
        console.error('Container de favoritos não encontrado');
        return;
    }

    // Se não há favoritos
    if (!favorites || favorites.length === 0) {
        container.innerHTML = `
            <div class="empty-favorites">
                <div class="empty-icon">
                    <i class="fas fa-heart-broken"></i>
                </div>
                <h3>Nenhum favorito ainda</h3>
                <p>Você ainda não favoritou nenhum pet.</p>
                <button class="explore-btn" onclick="window.location.href='explorar.html'">
                    <i class="fas fa-compass"></i>
                    Explorar Pets
                </button>
            </div>
        `;
        return;
    }

    // Gera HTML dos favoritos
    container.innerHTML = favorites.map(favorite => `
        <div class="pet-card" data-pet-id="${favorite.petId}" data-favorite-id="${favorite.id}">
            <div class="pet-image">
                <img src="assets/pet-placeholder.jpg" alt="Pet ${favorite.petId}" onerror="this.src='https://via.placeholder.com/300x200?text=Pet'">
                <div class="favorite-badge">
                    <i class="fas fa-heart"></i>
                </div>
            </div>
            
            <div class="pet-info">
                <h3>Pet #${favorite.petId}</h3>
                <p class="favorite-date">
                    <i class="fas fa-calendar"></i>
                    Favoritado em ${formatDate(favorite.createdAt)}
                </p>
                
                <div class="pet-actions">
                    <button class="btn-view-pet" data-pet-id="${favorite.petId}">
                        <i class="fas fa-eye"></i>
                        Ver Detalhes
                    </button>
                    <button class="btn-remove-favorite" data-pet-id="${favorite.petId}">
                        <i class="fas fa-heart-broken"></i>
                        Remover
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Remove um pet dos favoritos
async function removeFavorite(petId) {
    try {
        const result = await favoritePetInterface.unfavoritePet({
            petId: petId,
            userId: currentUserId
        });

        if (result.isLeft && result.isLeft()) {
            console.error('Erro ao remover favorito:', result);
            showError('Erro ao remover pet dos favoritos');
            return;
        }

        // Remove o card da interface com animação
        const card = document.querySelector(`[data-pet-id="${petId}"]`);
        if (card) {
            card.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                card.remove();
                
                // Verifica se ainda há cards
                const remainingCards = document.querySelectorAll('.pet-card');
                if (remainingCards.length === 0) {
                    displayFavorites([]);
                }
            }, 300);
        }

        showSuccess('Pet removido dos favoritos!');
        
    } catch (error) {
        console.error('Erro ao remover favorito:', error);
        showError('Erro ao remover pet dos favoritos');
    }
}

// Configura os event listeners
function setupEventListeners() {
    // Event delegation para botões dentro dos cards
    document.addEventListener('click', async (e) => {
        // Botão de remover favorito
        if (e.target.matches('.btn-remove-favorite') || e.target.closest('.btn-remove-favorite')) {
            const button = e.target.closest('.btn-remove-favorite');
            const petId = button.dataset.petId;
            
            if (petId && confirm('Tem certeza que deseja remover este pet dos favoritos?')) {
                await removeFavorite(petId);
            }
        }
        
        // Botão de ver pet
        if (e.target.matches('.btn-view-pet') || e.target.closest('.btn-view-pet')) {
            const button = e.target.closest('.btn-view-pet');
            const petId = button.dataset.petId;
            
            if (petId) {
                // Redireciona para a página de detalhes do pet
                window.location.href = `pet-details.html?id=${petId}`;
            }
        }
    });

    // Botão de logout
    const logoutBtn = document.querySelector('.logout-button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (confirm('Tem certeza que deseja sair?')) {
                await logout();
            }
        });
    }

    // Botões do menu lateral
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = link.querySelector('i');
            
            if (icon.classList.contains('fa-home')) {
                window.location.href = 'index.html';
            } else if (icon.classList.contains('fa-compass')) {
                window.location.href = 'explorar.html';
            } else if (icon.classList.contains('fa-list')) {
                window.location.href = 'categorias.html';
            }
            // Favoritos já está na página atual
        });
    });

    // Barra de pesquisa
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Realiza pesquisa nos favoritos
function performSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        // Se não há termo de busca, mostra todos os favoritos
        loadAndDisplayFavorites();
        return;
    }
    
    const petCards = document.querySelectorAll('.pet-card');
    let visibleCount = 0;
    
    petCards.forEach(card => {
        const petInfo = card.textContent.toLowerCase();
        
        if (petInfo.includes(searchTerm)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Se nenhum resultado encontrado
    if (visibleCount === 0) {
        const container = document.getElementById('pets-grid');
        container.innerHTML += `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Nenhum resultado encontrado</h3>
                <p>Não encontramos favoritos com "${searchTerm}"</p>
                <button onclick="document.querySelector('.search-bar input').value=''; loadAndDisplayFavorites()">
                    Limpar Pesquisa
                </button>
            </div>
        `;
    }
}

// Função de logout
async function logout() {
    try {
        // Aqui você pode fazer uma requisição para limpar a sessão no servidor
        // await fetch('/logout', { method: 'POST' });
        
        // Redireciona para a página de login
        window.location.href = 'login.html';
        
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        showError('Erro ao sair da conta');
    }
}

// Mostra tela de login necessário
function showLoginRequired() {
    const container = document.getElementById('pets-grid');
    
    if (container) {
        container.innerHTML = `
            <div class="login-required">
                <div class="login-icon">
                    <i class="fas fa-user-slash"></i>
                </div>
                <h3>Login Necessário</h3>
                <p>Você precisa estar logado para ver seus pets favoritos.</p>
                <button class="login-btn" onclick="window.location.href='login.html'">
                    <i class="fas fa-sign-in-alt"></i>
                    Fazer Login
                </button>
            </div>
        `;
    }
}

// Mostra/esconde loading
function showLoading(show) {
    const container = document.getElementById('pets-grid');
    
    if (show) {
        container.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Carregando seus favoritos...</p>
            </div>
        `;
    }
}

// Formata data para exibição
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Mostra mensagem de sucesso
function showSuccess(message) {
    showNotification(message, 'success');
}

// Mostra mensagem de erro
function showError(message) {
    showNotification(message, 'error');
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remove notificações anteriores
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Adiciona ao body
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove automaticamente após 4 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
    
    // Permite fechar manualmente
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Torna algumas funções globais para uso no HTML
window.loadAndDisplayFavorites = loadAndDisplayFavorites;