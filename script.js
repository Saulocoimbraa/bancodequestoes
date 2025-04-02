let todasQuestoes = [];

document.addEventListener("DOMContentLoaded", function () {
    fetch("questoes.json")
        .then(response => response.json())
        .then(data => {
            todasQuestoes = data;
            mostrarQuestoes("Todas");
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
});

function mostrarQuestoes(categoria) {
    let quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    let questoesFiltradas = categoria === "Todas"
        ? todasQuestoes
        : todasQuestoes.filter(q => q.categoria === categoria);

    questoesFiltradas.forEach((questao, index) => {
        let div = document.createElement("div");
        div.className = "question";

        // Enunciado com LaTeX
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
        let alternativasDiv = document.createElement("div");
        alternativasDiv.className = "alternativas";

        let alternativaSelecionada = null;

        questao.alternativas.forEach((alt, i) => {
            let botao = document.createElement("button");
            botao.innerHTML = alt; // Suporta expressões LaTeX
            botao.className = "alternativa-btn";
            botao.onclick = function () {
                let botoes = alternativasDiv.querySelectorAll(".alternativa-btn");
                botoes.forEach(b => b.classList.remove("selecionado"));

                botao.classList.add("selecionado");
                alternativaSelecionada = i;
            };
            alternativasDiv.appendChild(botao);
        });

        // Botão de confirmar
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

        let resultadoDiv = document.createElement("div");
        resultadoDiv.id = `resultado-${index}`;
        resultadoDiv.style.marginTop = "10px";
        resultadoDiv.style.fontWeight = "bold";

        div.appendChild(alternativasDiv);
        div.appendChild(confirmarBotao);
        div.appendChild(resultadoDiv);
        quizContainer.appendChild(div);
    });

    // Atualiza a renderização de LaTeX
    if (window.MathJax) {
        MathJax.typeset();
    }
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
