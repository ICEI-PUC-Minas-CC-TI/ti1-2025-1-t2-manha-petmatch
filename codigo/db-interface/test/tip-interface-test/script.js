import { TipInterface } from "../../tip-interface.js";

const tipManager = new TipInterface();
const fetchTipButton = document.getElementById("fetchTipButton");
const result = document.getElementById("result");
const getTipButton = document.getElementById("getTipButton");
const tipId = document.getElementById("tipId");

async function getTip() {
    try {
        const response = await tipManager.getTip({ id: tipId.value });
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.error("Erro ao buscar dica:", error);
        result.innerHTML = "Erro ao buscar dica.";
    }
}

async function fetchTip() {
    try {
        const response = await tipManager.fetchTip();
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.error("Erro ao buscar dicas:", error);
        result.innerHTML = "Erro ao buscar dicas.";
    }
}

fetchTipButton.addEventListener("click", fetchTip);
getTipButton.addEventListener("click", getTip);
