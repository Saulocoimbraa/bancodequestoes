let todasQuestoes = [];
let pontuacao = 0;

// Carregar JSON
fetch("questoes.json")
  .then(res => res.json())
  .then(data => {
    todasQuestoes = data;
    mostrarQuestoes("Todas");
  })
  .catch(err => console.error("Erro ao carregar JSON:", err));

// Atualiza a pontuação na tela
function atualizarPontuacao() {
  document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`;
}

// Filtro por categoria
function filtrarQuestoes() {
  const categoria = document.getElementById("filtro").value;
  mostrarQuestoes(categoria);
}

// Mostra as questões
function mostrarQuestoes(categoria) {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = "";

  const questoes = categoria === "Todas"
    ? todasQuestoes
    : todasQuestoes.filter(q => q.categoria === categoria);

  questoes.forEach((questao, index) => {
    const div = document.createElement("div");
    div.className = "question";

    if (questao.enunciado) {
      const p = document.createElement("p");
      p.innerHTML = questao.enunciado;
      div.appendChild(p);
    }

    if (questao.suporte) {
      const img = document.createElement("img");
      img.src = questao.suporte;
      div.appendChild(img);
    }

    if (questao.comando) {
      const cmd = document.createElement("p");
      cmd.innerHTML = `<strong>${questao.comando}</strong>`;
      div.appendChild(cmd);
    }

    const tipo = questao.tipo || "texto";
    const altDiv = document.createElement("div");
    altDiv.className = tipo === "imagem" ? "alternativas-imagem" : "alternativas";

    let alternativaSelecionada = null;

    questao.alternativas.forEach((alt, i) => {
      const btn = document.createElement("button");
      btn.className = "alternativa-btn";
      btn.onclick = () => {
        altDiv.querySelectorAll("button").forEach(b => b.classList.remove("selecionado"));
        btn.classList.add("selecionado");
        alternativaSelecionada = i;
      };

      if (tipo === "imagem") {
        const img = document.createElement("img");
        img.src = alt;
        img.alt = `Alternativa ${i + 1}`;
        btn.appendChild(img);
      } else {
        btn.innerText = alt;
      }

      altDiv.appendChild(btn);
    });

    const resultadoDiv = document.createElement("div");
    resultadoDiv.id = `resultado-${index}`;
    resultadoDiv.style.marginTop = "10px";
    resultadoDiv.style.fontWeight = "bold";

    const confirmar = document.createElement("button");
    confirmar.className = "confirmar-btn";
    confirmar.innerText = "Confirmar";
    confirmar.onclick = () => {
      if (alternativaSelecionada === null) {
        resultadoDiv.innerText = "⚠️ Selecione uma alternativa!";
        resultadoDiv.style.color = "orange";
        return;
      }
      verificarResposta(index, alternativaSelecionada, resultadoDiv.id);
    };

    div.appendChild(altDiv);
    div.appendChild(confirmar);
    div.appendChild(resultadoDiv);

    quiz.appendChild(div);
  });
}

// Verifica resposta
function verificarResposta(index, selecionada, resultadoId) {
  const questao = todasQuestoes[index];
  const correta = questao.correta;

  const resultadoDiv = document.getElementById(resultadoId);
  const botoes = resultadoDiv.parentElement.querySelectorAll(".alternativa-btn");

  botoes.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correta) btn.classList.add("correto");
    if (i === selecionada && i !== correta) btn.classList.add("errado");
  });

  if (selecionada === correta) {
    pontuacao++;
    resultadoDiv.innerText = "✅ Resposta correta!";
    resultadoDiv.style.color = "green";
  } else {
    resultadoDiv.innerText = `❌ Errada! A correta era a ${correta + 1}.`;
    resultadoDiv.style.color = "red";
  }

  atualizarPontuacao();
}
