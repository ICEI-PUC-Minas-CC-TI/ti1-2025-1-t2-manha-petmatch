let dog = 0,
  reptile = 0,
  fish = 0,
  bird = 0,
  cat = 0;
// size
let large = 0,
  medium = 0,
  small = 0;
//type
let docile = 0,
  hectic = 0,
  calm = 0;

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".pergunta").forEach(pergunta => {
    const botoes = Array.from(pergunta.querySelectorAll("button"));
    if (botoes.length === 0) return;

    const wrapper = document.createElement("div");
    wrapper.classList.add("opcoes");

    botoes.forEach(btn => wrapper.appendChild(btn));
    pergunta.appendChild(wrapper);
  });

  mostrarProximaPergunta(0);
});

function responderLocal(opcao) {
  if (opcao === 'Casa/apartamento grande') {
    dog += 2; cat++; large += 2; medium++; small++;
  } else if (opcao === 'Casa com quintal/fazenda') {
    dog++;
  } else if (opcao === 'Studio/Kitnet') {
    bird++; fish++; reptile++; small += 2; medium++;
  } else if (opcao === 'Apartamento pequeno') {
    bird++; dog++; cat++; reptile++; medium += 2; small++;
  }

  mostrarProximaPergunta(1);
}

function responder(pergunta, resposta) {
  switch (pergunta) {
    case 2: resposta === 'a' ? (docile++, dog++, bird++) : (calm++, cat++); break;
    case 3: resposta === 'a' ? (hectic++, dog++) : (calm++, cat++, reptile++, fish++); break;
    case 4: resposta === 'a' ? (calm++, cat++, reptile++) : (hectic++, dog++, bird++); break;
    case 5: resposta === 'a' ? (docile++, dog++, cat++) : (calm++, fish++, reptile++); break;
    case 6: resposta === 'a' ? (docile++, dog++, bird++) : (calm++, cat++, reptile++); break;
    case 7: resposta === 'a' ? (dog++, hectic++) : (calm++, cat++); break;
    case 8: resposta === 'a' ? (dog++, hectic++) : (calm++, fish++); break;
  }

  mostrarProximaPergunta(pergunta);
}

function mostrarProximaPergunta(atual) {
  const atualDiv = document.getElementById(`pergunta${atual}`);
  if (atualDiv) atualDiv.style.display = "none";

  const proxima = document.getElementById(`pergunta${atual + 1}`);
  if (proxima) {
    proxima.style.display = "flex";
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  const temperamento = traduzir(getMaiorValor({ docile, hectic, calm }));
  const animal = traduzir(getMaiorValor({ dog, cat, bird, fish, reptile }));
  const tamanho = traduzir(getMaiorValor({ small, medium, large }));

  document.getElementById("pet-recomendado").innerText =
    `Um ${animal} de temperamento ${temperamento}, porte ${tamanho}.`;

  document.getElementById("resultado-temperamento").innerText = temperamento;
  document.getElementById("resultado-animal").innerText = animal;
  document.getElementById("resultado-tamanho").innerText = tamanho;

  document.getElementById("resultado").style.display = "block";
}

function getMaiorValor(obj) {
  return Object.entries(obj).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

function traduzir(valor) {
  const mapa = {
    dog: "cachorro", cat: "gato", bird: "pássaro", fish: "peixe", reptile: "réptil",
    docile: "dócil", hectic: "agitado", calm: "calmo",
    small: "pequeno", medium: "médio", large: "grande"
  };
  return mapa[valor] || valor;
}


