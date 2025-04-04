let todasQuestoes = [];
let pontuacao = 0;

// Carrega as questões do JSON
fetch("questoes.json")
    .then(response => response.json())
    .then(data => {
        todasQuestoes = data;
        if (todasQuestoes.length > 0) {
            mostrarQuestoes("Todas");
        } else {
            console.error("Nenhuma questão encontrada.");
        }
    })
    .catch(error => console.error("Erro ao carregar JSON:", error));

// Filtra as questões por categoria
function filtrarQuestoes() {
    const categoria = document.getElementById("filtro").value;
    mostrarQuestoes(categoria);
}

// Verifica a resposta do usuário
function verificarResposta(index, alternativaSelecionada, resultadoId, confirmarBotao) {
    const questao = todasQuestoes[index];
    const correta = questao.correta;

    const resultadoDiv = document.getElementById(resultadoId);
    const botoes = resultadoDiv.parentElement.querySelectorAll(".alternativa-btn");

    // Desabilita todos os botões de alternativa
    botoes.forEach((botao, i) => {
        botao.disabled = true;
        if (i === correta) botao.classList.add("correto");
        if (i === alternativaSelecionada && i !== correta) botao.classList.add("errado");
    });

    // Verifica se acertou
    if (alternativaSelecionada === correta) {
        pontuacao++;
        resultadoDiv.innerText = "✅ Resposta correta!";
        resultadoDiv.style.color = "green";
    } else {
        resultadoDiv.innerText = `❌ Resposta errada! A correta era a alternativa ${correta + 1}.`;
        resultadoDiv.style.color = "red";
    }

    // Atualiza a pontuação exibida
    atualizarPontuacao();

    // Impede múltiplas confirmações
    confirmarBotao.disabled = true;
}

// Atualiza o placar na interface
function atualizarPontuacao() {
    const pontuacaoDiv = document.getElementById("pontuacao");
    pontuacaoDiv.innerText = `Pontuação: ${pontuacao}`;
}

// Exibe as questões
function mostrarQuestoes(categoria) {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    const questoesFiltradas = categoria === "Todas"
        ? todasQuestoes
        : todasQuestoes.filter(q => q.categoria === categoria);

    questoesFiltradas.forEach((questao, index) => {
        const div = document.createElement("div");
        div.className = "question";

        // Enunciado
        if (questao.enunciado) {
            const p = document.createElement("p");
            p.innerHTML = questao.enunciado;
            div.appendChild(p);
        }

        // Suporte (imagem)
        if (questao.suporte) {
            const img = document.createElement("img");
            img.src = questao.suporte;
            img.alt = "Imagem da questão";
            div.appendChild(img);
        }

        // Comando
        if (questao.comando) {
            const comando = document.createElement("p");
            comando.innerHTML = `<strong>${questao.comando}</strong>`;
            div.appendChild(comando);
        }

        // Alternativas
        const tipo = questao.tipo || "texto";
        const alternativasDiv = document.createElement("div");
        alternativasDiv.className = tipo === "imagem" ? "alternativas-imagem" : "alternativas";

        let alternativaSelecionada = null;

        questao.alternativas.forEach((alt, i) => {
            const botao = document.createElement("button");
            botao.className = "alternativa-btn";

            botao.onclick = () => {
                const botoes = alternativasDiv.querySelectorAll(".alternativa-btn");
                botoes.forEach(b => b.classList.remove("selecionado"));
                botao.classList.add("selecionado");
                alternativaSelecionada = i;
            };

            if (tipo === "imagem") {
                const img = document.createElement("img");
                img.src = alt;
                img.alt = `Alternativa ${i + 1}`;
                botao.appendChild(img);
            } else {
                botao.innerText = alt;
            }

            alternativasDiv.appendChild(botao);
        });

        // Div de resultado
        const resultadoDiv = document.createElement("div");
        resultadoDiv.id = `resultado-${index}`;
        resultadoDiv.style.marginTop = "10px";
        resultadoDiv.style.fontWeight = "bold";

        // Botão de confirmar
        const confirmar = document.createElement("button");
        confirmar.className = "confirmar-btn";
        confirmar.innerText = "Confirmar";
        confirmar.onclick = () => {
            if (alternativaSelecionada === null) {
                resultadoDiv.innerText = "⚠️ Selecione uma alternativa!";
                resultadoDiv.style.color = "orange";
                return;
            }
            verificarResposta(index, alternativaSelecionada, resultadoDiv.id, confirmar);
        };

        // Monta a questão
        div.appendChild(alternativasDiv);
        div.appendChild(confirmar);
        div.appendChild(resultadoDiv);

        quizContainer.appendChild(div);
    });

    atualizarPontuacao(); // Atualiza pontuação ao mudar de categoria
}
