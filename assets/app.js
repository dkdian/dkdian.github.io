// Monta a página inicial e as páginas de projeto.
// O conteúdo de cada projeto fica em assets/projetos/<slug>.js e a ordem em assets/projetos/ordem.js.
// Não é preciso editar este arquivo para mudar conteúdo.

var PROJETOS_POR_SLUG = {};
function registrarProjeto(p) { PROJETOS_POR_SLUG[p.slug] = p; }

(function () {
  // Esconde os links de currículo enquanto assets/curriculo.pdf não existir.
  fetch("assets/curriculo.pdf", { method: "HEAD" })
    .then(function (r) { if (!r.ok) throw 0; })
    .catch(function () {
      document.querySelectorAll(".cv-link").forEach(function (a) { a.hidden = true; });
    });

  // Carrega o arquivo de cada projeto na ordem definida e depois desenha a página.
  var slugs = window.ORDEM_PROJETOS || [];
  var pendentes = slugs.length;
  if (!pendentes) return render([]);
  slugs.forEach(function (slug) {
    var s = document.createElement("script");
    s.src = "assets/projetos/" + encodeURIComponent(slug) + ".js";
    s.onload = s.onerror = function () {
      if (--pendentes === 0) {
        render(slugs.map(function (k) { return PROJETOS_POR_SLUG[k]; }).filter(Boolean));
      }
    };
    document.body.appendChild(s);
  });
})();

// Trechos entre [[ ]] aparecem destacados em amarelo como pendência.
function fmt(text) {
  var safe = String(text == null ? "" : text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return safe.replace(/\[\[(.+?)\]\]/g, '<mark class="preencher">$1</mark>');
}

function lista(itens, tag) {
  return (itens || []).map(function (i) { return "<" + tag + ">" + fmt(i) + "</" + tag + ">"; }).join("");
}

function render(PROJETOS) {
  function statusTag(p) {
    return p.status ? ' <span class="status">' + fmt(p.status) + "</span>" : "";
  }

  // Página inicial
  var listaEl = document.getElementById("lista");
  if (listaEl) {
    listaEl.innerHTML = PROJETOS.map(function (p) {
      return (
        '<a class="ledger-row" href="projeto.html?p=' + encodeURIComponent(p.slug) + '">' +
          "<span>" +
            '<span class="title">' + fmt(p.titulo) + statusTag(p) + "</span>" +
            '<span class="sum">' + fmt(p.resumo) + "</span>" +
          "</span>" +
          '<span class="area">' + fmt(p.area) + "</span>" +
          '<span class="res">' + fmt(p.resultadoCurto) + "</span>" +
        "</a>"
      );
    }).join("");
    var n = PROJETOS.length;
    document.getElementById("contagem").textContent = n + (n === 1 ? " projeto" : " projetos");
  }

  // Página de projeto
  var alvo = document.getElementById("projeto");
  if (!alvo) return;

  var slug = new URLSearchParams(location.search).get("p");
  var idx = PROJETOS.findIndex(function (p) { return p.slug === slug; });

  if (idx < 0) {
    alvo.innerHTML =
      '<section class="p-head"><h1>Projeto não encontrado</h1>' +
      '<p class="lead">O endereço pode estar incompleto. Volte para a <a href="./">lista de projetos</a>.</p></section>';
    return;
  }

  var p = PROJETOS[idx];
  document.title = p.titulo + " | Dianlucca Belletti";

  var linhas = (p.antesDepois || []).map(function (r) {
    return (
      "<tr><td>" + fmt(r[0]) + '</td><td class="antes">' + fmt(r[1]) +
      '</td><td class="depois">' + fmt(r[2]) + "</td></tr>"
    );
  }).join("");

  var midia = (p.midia || []).map(function (m) {
    var corpo;
    if (!m.arquivo) {
      corpo =
        '<div class="placeholder"><div><strong>' + fmt(m.legenda) + "</strong>" +
        "Imagem a incluir em assets/img</div></div>";
    } else if (/\.(mp4|webm)$/i.test(m.arquivo)) {
      corpo = '<video src="assets/img/' + encodeURI(m.arquivo) + '" autoplay muted loop playsinline controls></video>';
    } else {
      corpo = '<img src="assets/img/' + encodeURI(m.arquivo) + '" alt="' + fmt(m.legenda) + '" loading="lazy">';
    }
    return "<figure>" + corpo + (m.arquivo ? "<figcaption>" + fmt(m.legenda) + "</figcaption>" : "") + "</figure>";
  }).join("");

  var desafios = (p.desafios || []).map(function (d) {
    return '<div class="challenge"><h3>' + fmt(d.titulo) + "</h3><p>" + fmt(d.texto) + "</p></div>";
  }).join("");

  var ant = PROJETOS[idx - 1];
  var prox = PROJETOS[idx + 1];
  function link(q, rotulo) {
    return q
      ? '<a href="projeto.html?p=' + encodeURIComponent(q.slug) + '"><span>' + rotulo + "</span>" + fmt(q.titulo) + "</a>"
      : "";
  }

  function bloco(titulo, html) {
    return html ? '<section class="block"><h2>' + titulo + "</h2>" + html + "</section>" : "";
  }

  alvo.innerHTML =
    '<section class="p-head">' +
      '<p class="meta">' + fmt(p.area) + " para " + fmt(p.cliente) + statusTag(p) + "</p>" +
      "<h1>" + fmt(p.titulo) + "</h1>" +
      '<p class="lead">' + fmt(p.resumo) + "</p>" +
    "</section>" +

    bloco("O problema", p.problema ? "<p>" + fmt(p.problema) + "</p>" : "") +
    bloco("Como funciona", p.passos ? '<ol class="flow">' + lista(p.passos, "li") + "</ol>" : "") +
    bloco("Antes e depois",
      (linhas
        ? '<table class="compare"><thead><tr><th scope="col">Indicador</th><th scope="col">Antes</th><th scope="col">Depois</th></tr></thead><tbody>' + linhas + "</tbody></table>"
        : "") +
      (midia ? '<div class="media">' + midia + "</div>" : "")) +
    bloco("Resultado", p.resultados ? '<ul class="results">' + lista(p.resultados, "li") + "</ul>" : "") +
    bloco("Desafios e decisões", desafios ? '<div class="challenges">' + desafios + "</div>" : "") +
    bloco("Ferramentas", p.ferramentas ? '<ul class="tools">' + lista(p.ferramentas, "li") + "</ul>" : "") +
    (p.tecnico
      ? '<section class="block"><details class="tech"><summary>Detalhes técnicos</summary><p>' + fmt(p.tecnico) + "</p></details></section>"
      : "") +
    '<section class="block"><p class="note">' +
      fmt(p.nota || "Dados, nomes e telas fictícios. A estrutura e a lógica refletem o projeto real.") +
    "</p></section>" +
    '<nav class="pager" aria-label="Outros projetos">' + link(ant, "Anterior") + link(prox, "Próximo") + "</nav>";
}
