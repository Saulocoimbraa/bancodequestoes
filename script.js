let todasQuestoes = [];

document.addEventListener("DOMContentLoaded", function () {
    fetch("questoes.json")
        .then(response => response.json())
        .then(data => {
            todasQuestoes = data;
            mostrarQuestoes("Todas"); // Exibe todas por padrão
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
});

function mostrarQuestoes(categoria) {
    let quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = ""; // Limpa a área de questões

    let questoesFiltradas = categoria === "Todas"
        ? todasQuestoes
        : todasQuestoes.filter(q => q.categoria === categoria);

    questoesFiltradas.forEach((questao, index) => {
        let div = document.createElement("div");
        div.className = "question";

        // Adiciona o enunciado
        let enunciado = document.createElement("p");
        enunciado.innerText = questao.enunciado;
        div.appendChild(enunciado);

        // Verifica se há imagem (suporte)
        if (questao.suporte) {
            let img = document.createElement("img");
            img.src = questao.suporte;
            img.alt = "Imagem da questão";
            div.appendChild(img);
        }

        // Adiciona o comando
        let comando = document.createElement("p");
        comando.innerText = questao.comando;
        comando.style.fontWeight = "bold";
        div.appendChild(comando);

        // Criar container para alternativas
        let alternativasDiv = document.createElement("div");
        alternativasDiv.className = "alternativas";

        // Criamos uma div para exibir o resultado da resposta
        let resultadoDiv = document.createElement("div");
        resultadoDiv.id = `resultado-${index}`;
        resultadoDiv.style.marginTop = "10px";
        resultadoDiv.style.fontWeight = "bold";

        // Criar botões de alternativas dinamicamente
        let alternativaSelecionada = null; // Guarda a alternativa escolhida

        questao.alternativas.forEach((alt, i) => {
            let botao = document.createElement("button");
            botao.innerText = alt;
            botao.className = "alternativa-btn";
            botao.onclick = function () {
                // Remove seleção de outros botões
                let botoes = alternativasDiv.querySelectorAll(".alternativa-btn");
                botoes.forEach(b => b.classList.remove("selecionado"));

                // Marca o botão clicado
                botao.classList.add("selecionado");
                alternativaSelecionada = i; // Armazena o índice da alternativa escolhida
            };
            alternativasDiv.appendChild(botao);
        });

        // Criar botão de confirmar resposta
        let confirmarBotao = document.createElement("button");
        confirmarBotao.innerText = "Confirmar";
        confirmarBotao.className = "confirmar-btn";
        confirmarBotao.onclick = function () {
            if (alternativaSelecionada === null) {
                resultadoDiv.innerHTML = "⚠️ Selecione uma alternativa antes de confirmar!";
                resultadoDiv.style.color = "orange";
            } else {
                verificarResposta(index, alternativaSelecionada, resultadoDiv.id);
            }
        };

        div.appendChild(alternativasDiv);
        div.appendChild(confirmarBotao);
        div.appendChild(resultadoDiv);
        quizContainer.appendChild(div);
    });
}

function verificarResposta(questaoIndex, respostaIndex, resultadoId) {
    let questao = todasQuestoes[questaoIndex];
    let resultadoDiv = document.getElementById(resultadoId);

    if (questao.correta === respostaIndex) {
        resultadoDiv.innerHTML = "✅ Resposta correta!";
        resultadoDiv.style.color = "green";
    } else {
        resultadoDiv.innerHTML = "❌ Resposta errada!";
        resultadoDiv.style.color = "red";
    }
}

function filtrarQuestoes() {
    let categoriaSelecionada = document.getElementById("filtro").value;
    mostrarQuestoes(categoriaSelecionada);
}
