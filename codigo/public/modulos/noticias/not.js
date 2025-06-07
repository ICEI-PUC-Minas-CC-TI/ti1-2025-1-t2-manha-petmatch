import { NewsInterface } from "../../db-interface/news-interface.js";

const newsInterface = new NewsInterface();

function createNewsCard(news) {
    const titulo = news.props?.titulo || '';
    const resumo = news.props?.resumo || '';
    const data = news.props?.data;
    const categoria = news.props?.categoria;
    const imagem = news.props?.imagem;
    const newsId = news.id || news.props?.id || news._id || news.props?._id;



    const article = document.createElement('article');
    article.className = 'news-card';

    article.innerHTML = `
        <div class="news-header">
            <h2 class="news-title">${titulo}</h2>
            <span class="news-date">${formatDate(data)}</span>
        </div>
        <div class="news-content">
            <p class="news-summary">${resumo}</p>
            ${imagem ? `<img src="${imagem}" alt="${titulo}" class="news-image" />` : ''}
        </div>
        <div class="news-footer">
            <button class="btn-read-more" data-news-id="${newsId}">Ler mais</button>
            <div class="news-tags">
                ${categoria ? `<span class="tag">${categoria}</span>` : ''}
            </div>
        </div>
    `;

    const container = getOrCreateNewsContainer();
    container.appendChild(article);

    const readMoreButton = article.querySelector('.btn-read-more');
    readMoreButton.addEventListener('click', (e) => {
        const newsId = e.currentTarget.getAttribute('data-news-id');
        
        if (newsId && newsId !== 'undefined' && newsId !== 'null') {
            window.location.href = `detalhes.html?id=${newsId}`;
        } else {
            alert('ID da notícia não encontrado');
        }
    });
}

function formatDate(dateString) {
    if (!dateString) return 'Data não disponível';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch {
        return 'Data inválida';
    }
}

async function loadNews() {
    try {
        const newsData = await newsInterface.fetchNews();



        if (!newsData) {
            console.log('Nenhuma notícia encontrada');
            return;
        }

        let finalNewsData = newsData;
        if (newsData.news && Array.isArray(newsData.news)) {
            finalNewsData = newsData.news;
        }

        if (!Array.isArray(finalNewsData)) {
            console.log('Formato de dados inválido');
            return;
        }



        renderNews(finalNewsData);

    } catch (error) {
        alert('Erro ao carregar notícias. Tente novamente mais tarde.');
    }
}

function renderNews(newsArray) {
    const container = getOrCreateNewsContainer();
    container.innerHTML = ''; 

    newsArray.forEach(news => {
        createNewsCard(news); 
    });
}

function getOrCreateNewsContainer() {
    let container = document.getElementById('news-container');

    if (!container) {
        container = document.createElement('main');
        container.id = 'news-container';
        container.className = 'news-container';
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.insertAdjacentElement('afterend', container);
        } else {
            document.body.appendChild(container);
        }
    }

    return container;
}



function filterNews(searchTerm) {
    const newsCards = document.querySelectorAll('.news-card');
    const searchLower = searchTerm.toLowerCase();

    newsCards.forEach(card => {
        const title = card.querySelector('.news-title').textContent.toLowerCase();
        const summary = card.querySelector('.news-summary').textContent.toLowerCase();
        const tag = card.querySelector('.tag').textContent.toLowerCase();

        if (title.includes(searchLower) || summary.includes(searchLower) || tag.includes(searchLower)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function setupSearch() {
    const searchInput = document.querySelector('.search input');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            filterNews(searchTerm);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    loadNews();
});