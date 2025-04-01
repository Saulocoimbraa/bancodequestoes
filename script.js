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
        
        questao.alternativas.forEach((alt, i) => {
            div.innerHTML += `<button onclick="verificarResposta('${questao.pergunta}', ${i})">${alt}</button> `;
        });

        quizContainer.appendChild(div);
    });
}

function verificarResposta(pergunta, respostaIndex) {
    // Encontra a questão original pelo enunciado (para evitar problemas de índice)
    let questao = todasQuestoes.find(q => q.pergunta === pergunta);

    if (questao && questao.correta === respostaIndex) {
        alert("Resposta correta! ✅");
    } else {
        alert("Resposta errada! ❌");
    }
}

// Chama essa função quando o usuário muda a categoria
function filtrarQuestoes() {
    let categoriaSelecionada = document.getElementById("filtro").value;
    mostrarQuestoes(categoriaSelecionada);
}
