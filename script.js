let todasQuestoes = []; // Armazena todas as questões carregadas
let pontuacao = 0; // Pontuação inicial

// Carrega o JSON com as questões
fetch("questoes.json") // Certifique-se de que o caminho está correto
    .then(response => response.json())
    .then(data => {
        todasQuestoes = data; // Preenche a variável global
        console.log("Questões carregadas:", todasQuestoes);

        if (todasQuestoes.length > 0) {
            mostrarQuestoes("Todas"); // Chama a função apenas se houver questões
        } else {
            console.error("Nenhuma questão encontrada no JSON!");
        }
    })
    .catch(error => console.error("Erro ao carregar JSON:", error));

// Função para filtrar e exibir as questões com base na categoria
function filtrarQuestoes() {
    let categoriaSelecionada = document.getElementById("filtro").value;
    console.log("Categoria selecionada:", categoriaSelecionada);
    mostrarQuestoes(categoriaSelecionada);
}

// ✅ Função para verificar a resposta correta
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
    // Exibe o feedback abaixo da questão
    if (alternativaSelecionada === alternativaCorreta) {
        resultadoDiv.innerHTML = "✅ Resposta correta!";
        resultadoDiv.style.color = "green";
    } else {
        resultadoDiv.innerHTML = `❌ Resposta errada! A correta era a alternativa ${alternativaCorreta + 1}.`;
        resultadoDiv.style.color = "red";
    }
}

// ✅ Função para exibir as questões
function mostrarQuestoes(categoria) {
    console.log("Função mostrarQuestoes() chamada para categoria:", categoria);
    console.log("Questões carregadas:", todasQuestoes);

    let quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = ""; // Limpa a área de questões

    let questoesFiltradas = categoria === "Todas"
        ? todasQuestoes
        : todasQuestoes.filter(q => q.categoria === categoria);

    console.log("Questões filtradas:", questoesFiltradas);

    // Loop para exibir cada questão
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

        // Criar div de alternativas
        let tipoQuestao = questao.tipo || "texto"; // Se "tipo" não existir, assume "texto"
        let alternativasDiv = document.createElement("div");
        alternativasDiv.className = tipoQuestao === "imagem" ? "alternativas-imagem" : "alternativas";

        let alternativaSelecionada = null;

        questao.alternativas.forEach((alt, i) => {
            let botao = document.createElement("button");
            botao.className = "alternativa-btn";
            botao.onclick = function () {
                let botoes = alternativasDiv.querySelectorAll(".alternativa-btn");
                botoes.forEach(b => b.classList.remove("selecionado"));
                botao.classList.add("selecionado");
                alternativaSelecionada = i;
            };

            // Verifica se a alternativa é uma imagem
            if (tipoQuestao === "imagem") {
                let img = document.createElement("img");
                img.src = alt;
                img.alt = `Alternativa ${i + 1}`;
                botao.appendChild(img);
            } else {
                botao.innerHTML = alt;
            }

            alternativasDiv.appendChild(botao);
        });

        // Botão de confirmar resposta
        let resultadoDiv = document.createElement("div");
        resultadoDiv.id = `resultado-${index}`;
        resultadoDiv.style.marginTop = "10px";
        resultadoDiv.style.fontWeight = "bold";

        let confirmarBotao = document.createElement("button");
        confirmarBotao.innerText = "Confirmar";
        confirmarBotao.className = "confirmar-btn";
        confirmarBotao.onclick = function () {
            if (alternativaSelecionada === null) {
                resultadoDiv.innerHTML = "⚠️ Selecione uma alternativa antes de confirmar!";
                resultadoDiv.style.color = "orange";
                return;
            }
            verificarResposta(index, alternativaSelecionada, resultadoDiv.id);
        };

        div.appendChild(alternativasDiv);
        div.appendChild(confirmarBotao);
        div.appendChild(resultadoDiv);

        quizContainer.appendChild(div);
    });
    function atualizarPontuacao() {
    document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`;
}

}
