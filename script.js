let todasQuestoes = [];

document.addEventListener("DOMContentLoaded", function() {
    fetch("questoes.json")
        .then(response => response.json())
        .then(data => {
            console.log('Dados carregados:', data); // Adicionando log para ver os dados carregados
            todasQuestoes = data; // Armazena todas as questões
            mostrarQuestoes("Todas"); // Exibe todas por padrão
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error)); // Captura qualquer erro
});

function mostrarQuestoes(categoria) {
    let quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = ""; // Limpa a área de questões

    let questoesFiltradas = categoria === "Todas" 
        ? todasQuestoes 
        : todasQuestoes.filter(q => q.categoria === categoria);

    console.log('Questões filtradas:', questoesFiltradas); // Adicionando log para ver as questões filtradas

    questoesFiltradas.forEach((questao, index) => {
        let div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `<p>${questao.pergunta}</p>`;

        // Verifica se há uma imagem para mostrar
        if (questao.imagem) {
            div.innerHTML += `<img src="${questao.imagem}" alt="Imagem da questão" style="max-width: 100%; height: auto; margin-top: 10px;">`;
       }
       //comando
        div.className = "question";
        div.innerHTML = `<p>${questao.comando}</p>`;
    

        // Criamos uma div para exibir o resultado da resposta
        let resultadoDiv = document.createElement("div");
        resultadoDiv.id = `resultado-${index}`;
        resultadoDiv.style.marginTop = "10px";
        resultadoDiv.style.fontWeight = "bold";

        questao.alternativas.forEach((alt, i) => {
            div.innerHTML += `<button onclick="verificarResposta(${index}, ${i}, '${resultadoDiv.id}')">${alt}</button> `;
        });

        div.appendChild(resultadoDiv);
        quizContainer.appendChild(div);
    });
}

function verificarResposta(questaoIndex, respostaIndex, resultadoId) {
    let questao = todasQuestoes[questaoIndex];
    let resultadoDiv = document.getElementById(resultadoId);

    // Atualiza o feedback sem pop-up
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
