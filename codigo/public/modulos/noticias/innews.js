import { NewsInterface } from "../../db-interface/news-interface.js";

const newsInterface = new NewsInterface();

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function showNewsDetails() {
    const newsId = getUrlParameter('id');

    try {
        const response = await newsInterface.getNews({ id: newsId });

        const newsData = response?.news;

        if (newsData && newsData.news && newsData.news.props) {
            const titulo = newsData.news.props.titulo;
            const resumo = newsData.news.props.resumo;
            const data = newsData.news.props.data;
            const categoria = newsData.news.props.categoria;
            const imagem = newsData.news.props.imagem;
            const conteudo = newsData.news.props.conteudo || 'Sem conteúdo';

            const mainContent = document.querySelector('main');
            mainContent.innerHTML = `
                    <div class="detail-container">
                        <h1 class="detail-title">${titulo}</h1>
                        <div class="detail-info">
                            <div class="detail-meta">
                                <p><strong>Data:</strong> ${data}</p>
                            </div>
                            <div class="detail-tag">
                                <p><strong>Categoria:</strong> ${categoria}</p>
                            </div>
                        </div>
                        <div class="detail-summary">
                            <p>${resumo}</p>
                        </div>
                        ${imagem ? `<img src="${imagem}" alt="Imagem da notícia" class="detail-image">` : ''}
                        <div class="detail-content">
                            <p>${conteudo}</p>
                        </div>
                        <div class="button-wrapper">
                            <button onclick="location.href='./noticias.html'" class="back-button">Voltar</button>
                        </div>
                    </div>
            `;

        } else {
            const mainContent = document.querySelector('main');
            mainContent.innerHTML = `
                    <div class="no-news-wrapper">
                        <h1>Notícia não encontrada</h1>
                    </div>
                    <div class="button-nn-wrapper">
                        <button onclick="location.href='./noticias.html'" class="back-button">Voltar</button>
                    </div>
                `;
        }
    } catch (error) {
        console.error('Erro:', error);
        const mainContent = document.querySelector('main');
        mainContent.innerHTML = `
                <div class="centered-message">
                <h1>Notícia não encontrada</h1>
                <p>Debug: newsData structure: ${JSON.stringify(newsData, null, 2)}</p>
                <button onclick="history.back()" class="back-button">Voltar</button>
                </div>
                `;

    }
}

document.addEventListener('DOMContentLoaded', showNewsDetails);