let todasQuestoes = []; // Armazena todas as questões carregadas
let pontuacao = 0; // Pontuação inicial

// Carrega o JSON com as questões
fetch("questoes.json")
    .then(response => response.json())
    .then(data => {
        todasQuestoes = data;
        console.log("Questões carregadas:", todasQuestoes);

        if (todasQuestoes.length > 0) {
            mostrarQuestoes("Todas");
        } else {
            console.error("Nenhuma questão encontrada no JSON!");
        }
    })
    .catch(error => console.error("Erro ao carregar JSON:", error));

// Filtra questões pela categoria
function filtrarQuestoes() {
    let categoriaSelecionada = document.getElementById("filtro").value;
    console.log("Categoria selecionada:", categoriaSelecionada);
    mostrarQuestoes(categoriaSelecionada);
}

// Verifica a resposta do usuário
function verificarResposta(index, alternativaSelecionada, resultadoId) {
    let questao = todasQuestoes[index];
    let alternativaCorreta = questao.correta;

    let resultadoDiv = document.getElementById(resultadoId);
    let botoes = resultadoDiv.parentElement.querySelectorAll(".alternativa-btn");

    botoes.forEach((botao, i) => {
        botao.disabled = true;

        if (i === alternativaCorreta) {
            botao.classList.add("correto");
        }
        if (i === alternativaSelecionada && i !== alternativaCorreta) {
            botao.classList.add("errado");
        }
    });

    if (alternativaSelecionada === alternativaCorreta) {
        pontuacao += 1;
        resultadoDiv.innerHTML = "✅ Resposta correta!";
        resultadoDiv.style.color = "green";
    } else {
        resultadoDiv.innerHTML = `❌ Resposta errada! A correta era a alternativa ${alternativaCorreta + 1}.`;
        resultadoDiv.style.color = "red";
    }

    atualizarPontuacao();
}

// Atualiza o placar de pontuação
function atualizarPontuacao() {
    document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`;
}

// Mostra as questões filtradas
function mostrarQuestoes(categoria) {
    console.log("Função mostrarQuestoes() chamada para categoria:", categoria);
    console.log("Questões carregadas:", todasQuestoes);

    let quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    let questoesFiltradas = categoria === "Todas"
        ? todasQuestoes
        : todasQuestoes.filter(q => q.categoria === categoria);

    console.log("Questões filtradas:", questoesFiltradas);

    questoesFiltradas.forEach((questao, index) => {
        let div = document.createElement("div");
        div.className = "question";

        // Enunciado
        if (questao.enunciado) {
            let enunciado = document.createElement("p");
            enunciado.innerHTML = questao.enunciado;
            div.appendChild(enunciado);
        }

        // Suporte (imagem)
        if (questao.suporte) {
            let img = document.createElement("img");
            img.src = questao.suporte;
            img.alt = "Imagem da questão";
            div.appendChild(img);
        }

        // Comando
        if (questao.comando) {
            let comando = document.createElement("p");
            comando.innerHTML = `<strong>${questao.comando}</strong>`;
            div.appendChild(comando);
        }

        // Alternativas
        let tipoQuestao = questao.tipo || "texto";
        let alternativasDiv = document.createElement("div");
        alternativasDiv.className = tipoQuestao === "imagem" ? "alternativas-imagem" : "alternativas";

        let alternativaSelecionada = null;

        questao.alternativas.for
