let todasQuestoes = [];

document.addEventListener("DOMContentLoaded", function () {
    fetch("questoes.json")
        .then(response => response.json())
        .then(data => {
            console.log('Dados carregados:', data);
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
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            img.style.marginTop = "10px";
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
        questao.alternativas.forEach((alt, i) => {
            let botao = document.createElement("button");
            botao.innerText = alt;
            botao.onclick = function () {
                verificarResposta(index, i, resultadoDiv.id);
            };
            alternativasDiv.appendChild(botao);
        });

        // Adiciona tudo na questão
        div.appendChild(alternativasDiv);
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
