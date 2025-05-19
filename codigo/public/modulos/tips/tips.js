import { TipInterface } from "../../db-interface/tip-interface.js";

const tipinterface = new TipInterface();

const animalId = {
    "Cachorro": "b68e3c70-a4e2-4c4d-8b47-376a5f8f2c01",
    "Gato": "4fbcfd2d-768a-42ad-b82c-1e5f2a176b75",
    "Coelho": "95dc1d2e-8a7a-423b-9d19-f4378bd00d3f",
    "Pássaro": "c23a7de5-1093-45b9-951d-d3b9e9a62c7a"
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.container').forEach(container => {
        container.addEventListener('click', async (event) => {
            const animal = event.currentTarget.dataset.animal;
            const id = animalId[animal];
            if (!id) {
                console.warn("ID não encontrado para o animal:", animal);
                return;
            }

            const existingTips = container.nextElementSibling;
            if (existingTips && existingTips.classList.contains('container-dicas')) {
                existingTips.remove();
                return;
            }

            const result = await tipinterface.getTip({ id });
            console.log("Resultado da API:", result);

            const dicas = result.tip?.tip?.props?.tips;

            if (!Array.isArray(dicas)) {
                console.warn("Nenhuma dica foi retornada.");
                return;
            }

            const tipsContainer = document.createElement('div');
            tipsContainer.classList.add('container-dicas');
            let cont = 1;
            dicas.forEach(dica => {
                const card = document.createElement('div');
                card.classList.add('card-dica');
                card.innerHTML = `
                <h3>${cont}. ${dica.title}</h3>
                <p>${dica.content}</p>
                `;
                cont++;
                tipsContainer.appendChild(card);
            });

            container.insertAdjacentElement('afterend', tipsContainer);


        });
    });
});
