let todasQuestoes = [];

document.addEventListener("DOMContentLoaded", function() {
    fetch("questoes.json")
        .then(response => response.json())
        .then(data => {
            todasQuestoes = data; // Armazena todas as questões
            mostrarQuestoes("Todas"); // Exibe todas por padrão
        });
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
        div.innerHTML = `<p>${questao.pergunta}</p>`;

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
let todasQuestoes = [];

document.addEventListener("DOMContentLoaded", function() {
    fetch("questoes.json")
        .then(response => response.json())
        .then(data => {
            todasQuestoes = data; // Armazena todas as questões
            mostrarQuestoes("Todas"); // Exibe todas por padrão
        });
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
        div.innerHTML = `<p>${questao.pergunta}</p>`;

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
