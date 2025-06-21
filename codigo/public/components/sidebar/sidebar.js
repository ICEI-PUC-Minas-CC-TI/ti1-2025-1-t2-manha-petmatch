import { CurrentSession } from '../../utils/current-session.js';
import {SessionInterface} from '../../db-interface/session-interface.js'
// ... importações ...

function createSidebar() {
  const session = new CurrentSession();
  const sessionInterface = new SessionInterface();
  const sessionType = session.type;
  const isDonor = sessionType === 'DONOR';

  const userName = session.sessionData?.session?.props?.name || 'Usuário';
  const userRating = session.sessionData?.session?.props?.rating?.toFixed(1) || 'N/A';

  const basePath = `${window.location.origin}/modulos`;

  const sidebar = document.createElement('aside');
  sidebar.id = 'sidebar-container';

  sidebar.innerHTML = `
    <div id="sidebar-logo"><img src="../../application-assets/logo.png" alt="Logo" /></div>
    <div>
      <div id="sidebar-user">
        <div>
          <img src="../../Images/someone.jpg" alt="User Avatar" id="user-avatar" />
          <div id="user-info">
            <h3>${userName}</h3>
          </div>
        </div>
        <button class="sidebar-btn" id="btn-profile">Perfil</button>
      </div>
      <nav id="sidebar-menu">
        <button class="sidebar-menu-btn" data-href="/homepage/homepage.html"><i class="material-icons">home</i> Home</button>
        <button class="sidebar-menu-btn" data-href="/explore/index.html"><i class="material-icons">explore</i> Explorar</button>
        <button class="sidebar-menu-btn" data-href="/PaginaCategoria/Categorias.html"><i class="material-icons">category</i> Categorias</button>
        <button class="sidebar-menu-btn" data-href="/favoritos/pets/index.html"><i class="material-icons">favorite</i> Favoritos</button>
        <button class="sidebar-menu-btn" data-href="/historico/historico.html"><i class="material-icons">history</i> Histórico</button>
        ${isDonor ? `<button class="sidebar-menu-btn" data-href="/meus-pets/index.html"><i class="material-icons">pets</i> Meus Pets</button>` : ''}
        <button class="sidebar-menu-btn" data-href="/pet-map/index.html"><i class="material-icons">map</i> Petmap</button>
        <button class="sidebar-menu-btn" data-href="/tips/tips.html"><i class="material-icons">lightbulb</i> Pet Tips</button>
      </nav>
    </div>
    <div id="sidebar-footer">
      ${isDonor ? `<button class="sidebar-btn sidebar-menu-btn" data-href="/cadastro-pets/cadastro-pets.html" style="color: black;">Colocar para Adoção</button>` : ''}
      <button class="sidebar-logout sidebar-btn">Sair</button>
    </div>
  `;

  document.body.prepend(sidebar);

  document.getElementById('btn-profile').addEventListener('click', () => {
    window.location.href = `${basePath}/perfil/perfil.html`;
  });

  document.querySelectorAll('.sidebar-menu-btn').forEach(btn => {
    const path = btn.dataset.href;
    const fullHref = `${basePath}${path}`;
    if (window.location.href.includes(path)) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
      if (path && path !== '#') {
        window.location.href = fullHref;
      }
    });
  });

  document.querySelector('.sidebar-logout').addEventListener('click', () => {
    sessionInterface.logOut();
  });
}

document.addEventListener('DOMContentLoaded', createSidebar);
