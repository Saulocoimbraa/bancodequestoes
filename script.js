document.addEventListener("DOMContentLoaded", function() {
    fetch("questoes.json")
        .then(response => response.json())
        .then(data => {
            let quizContainer = document.getElementById("quiz");
            data.forEach((questao, index) => {
                let div = document.createElement("div");
                div.className = "question";
                div.innerHTML = `<p>${questao.pergunta}</p>`;
                
                questao.alternativas.forEach((alt, i) => {
                    div.innerHTML += `<button onclick="verificarResposta(${index}, ${i})">${alt}</button> `;
                });

                quizContainer.appendChild(div);
            });
        });
});

function verificarResposta(questaoIndex, respostaIndex) {
    fetch("questoes.json")
        .then(response => response.json())
        .then(data => {
            if (data[questaoIndex].correta === respostaIndex) {
                alert("Resposta correta! ✅");
            } else {
                alert("Resposta errada! ❌");
            }
        });
}
