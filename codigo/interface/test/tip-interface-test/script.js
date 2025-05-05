import { TipInterface } from "../../tip-interface.js";

const tipManager = new TipInterface();
const fetchTipButton = document.getElementById("fetchTipButton");
const result = document.getElementById("result");

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