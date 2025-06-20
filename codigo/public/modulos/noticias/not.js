import { SessionInterface } from "../../db-interface/session-interface.js";
import { NewsInterface } from "../../db-interface/news-interface.js";

const session = new SessionInterface();
const newsInterface = new NewsInterface();

document.addEventListener('DOMContentLoaded', async () => {
    await session.checkSession();

    setupSearch();
    loadNews();
});

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
        <div class="news-horizontal">
            <div class="news-image-wrapper">
                ${imagem ? `<img src="${imagem}" alt="${titulo}" class="news-image" />` : ''}
            </div>
            <div class="news-text-wrapper">
                <div class="news-header">
                    <h2 class="news-title">${titulo}</h2>
                    <span class="news-date">${formatDate(data)}</span>
                </div>
            <p class="news-summary">${resumo}</p>
            <div class="news-footer">
                <button class="btn-read-more" data-news-id="${newsId}">Ler mais</button>
                ${categoria ? `<span class="tag">${categoria}</span>` : ''}
            </div>
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
        if (!newsData) return;

        let finalNewsData = newsData.news && Array.isArray(newsData.news)
            ? newsData.news
            : newsData;

        if (!Array.isArray(finalNewsData)) return;
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
        const tag = card.querySelector('.tag')?.textContent.toLowerCase() || '';

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
