import { getEvents } from '../../db/db.js';

document.addEventListener('DOMContentLoaded', async () => {
    const eventsGrid = document.getElementById('events-grid');
    const events = await getEvents();

    if (events && events.length > 0) {
        events.forEach(event => {
            const eventCard = createEventCard(event);
            eventsGrid.appendChild(eventCard);
        });
    } else {
        eventsGrid.innerHTML = '<p>Nenhum evento encontrado.</p>';
    }
});

function createEventCard(eventData) {
    const card = document.createElement('div');
    card.classList.add('event-card');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('event-card-image-container');
    const image = document.createElement('img');
    image.src = eventData.image || '../../assets/img/default-event.jpg';
    image.alt = eventData.title;
    image.classList.add('event-card-image');
    imageContainer.appendChild(image);
    card.appendChild(imageContainer);

    const details = document.createElement('div');
    details.classList.add('event-card-details');

    const title = document.createElement('h3');
    title.classList.add('event-card-title');
    title.textContent = eventData.title;
    details.appendChild(title);

    const date = document.createElement('p');
    date.classList.add('event-card-date');
    const formattedDate = new Date(eventData.date).toLocaleDateString();
    date.textContent = formattedDate;
    details.appendChild(date);

    const location = document.createElement('p');
    location.classList.add('event-card-location');
    location.textContent = eventData.location;
    details.appendChild(location);

    const description = document.createElement('p');
    description.classList.add('event-card-description');
    description.textContent = eventData.description;
    details.appendChild(description);

    card.appendChild(details);

    const actions = document.createElement('div');
    actions.classList.add('event-card-actions');
    const viewButton = document.createElement('button');
    viewButton.textContent = 'Ver Evento';
    actions.appendChild(viewButton);
    card.appendChild(actions);

    return card;
}