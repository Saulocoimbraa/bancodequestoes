let todasQuestoes = []; // Declara a variável globalmente
fetch("questoes.json") // Substitua pelo caminho correto do JSON
    .then(response => response.json())
    .then(data => {
        todasQuestoes = data; // Preenche o array global
        console.log("Questões carregadas:", todasQuestoes);
        mostrarQuestoes("Todas"); // Agora chamamos a função com os dados prontos
    })
    .catch(error => console.error("Erro ao carregar JSON:", error));
function filtrarQuestoes() {
    let categoriaSelecionada = document.getElementById("filtro").value;
    console.log("Categoria selecionada:", categoriaSelecionada);
    mostrarQuestoes(categoriaSelecionada);
}

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
            } else {
                verificarResposta(index, alternativaSelecionada, resultadoDiv.id);
            }
        };

        div.appendChild(alternativasDiv);
        div.appendChild(confirmarBotao);
        div.appendChild(resultadoDiv);
        quizContainer.appendChild(div);
    });

    // Atualiza MathJax para LaTeX (se estiver ativado)
    if (window.MathJax) {
        MathJax.typeset();
    }
} 
