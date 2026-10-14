// Monta a página inicial e as páginas de projeto a partir de assets/projetos.js.
// Para editar conteúdo, mexa só em projetos.js.

(function () {
  // Trechos entre [[ ]] aparecem destacados em amarelo como pendência.
  function fmt(text) {
    var safe = String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return safe.replace(/\[\[(.+?)\]\]/g, '<mark class="preencher">$1</mark>');
  }

  function statusTag(p) {
    return p.status ? ' <span class="status">' + fmt(p.status) + "</span>" : "";
  }

  // Página inicial
  var lista = document.getElementById("lista");
  if (lista) {
    lista.innerHTML = PROJETOS.map(function (p) {
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
    document.getElementById("contagem").textContent =
      n + (n === 1 ? " projeto" : " projetos");
  }

  // Página de projeto
  var alvo = document.getElementById("projeto");
  if (!alvo) return;

  var slug = new URLSearchParams(location.search).get("p");
  var idx = PROJETOS.findIndex(function (p) { return p.slug === slug; });

  if (idx < 0) {
    alvo.innerHTML =
      '<section class="p-head"><h1>Projeto não encontrado</h1>' +
      '<p class="lead">O endereço pode estar incompleto. Volte para a <a href="./#projetos">lista de projetos</a>.</p></section>';
    return;
  }

  var p = PROJETOS[idx];
  document.title = p.titulo + " | Dianlucca Belletti";

  var passos = p.passos.map(function (s) { return "<li>" + fmt(s) + "</li>"; }).join("");

  var linhas = p.antesDepois.map(function (r) {
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
        "Salve o arquivo em assets/img e informe o nome em projetos.js</div></div>";
    } else if (/\.(mp4|webm)$/i.test(m.arquivo)) {
      corpo =
        '<video src="assets/img/' + encodeURI(m.arquivo) + '" autoplay muted loop playsinline controls></video>';
    } else {
      corpo =
        '<img src="assets/img/' + encodeURI(m.arquivo) + '" alt="' + fmt(m.legenda) + '" loading="lazy">';
    }
    return "<figure>" + corpo + (m.arquivo ? "<figcaption>" + fmt(m.legenda) + "</figcaption>" : "") + "</figure>";
  }).join("");

  var resultados = p.resultados.map(function (r) { return "<li>" + fmt(r) + "</li>"; }).join("");
  var ferramentas = p.ferramentas.map(function (f) { return "<li>" + fmt(f) + "</li>"; }).join("");

  var ant = PROJETOS[idx - 1];
  var prox = PROJETOS[idx + 1];
  function link(q, rotulo) {
    return q
      ? '<a href="projeto.html?p=' + encodeURIComponent(q.slug) + '"><span>' + rotulo + "</span>" + fmt(q.titulo) + "</a>"
      : "";
  }

  alvo.innerHTML =
    '<section class="p-head">' +
      '<p class="meta">' + fmt(p.area) + " para " + fmt(p.cliente) + statusTag(p) + "</p>" +
      "<h1>" + fmt(p.titulo) + "</h1>" +
      '<p class="lead">' + fmt(p.resumo) + "</p>" +
    "</section>" +

    '<section class="block"><h2>O problema</h2><p>' + fmt(p.problema) + "</p></section>" +

    '<section class="block"><h2>Como funciona</h2><ol class="flow">' + passos + "</ol></section>" +

    '<section class="block"><h2>Antes e depois</h2>' +
      '<table class="compare"><thead><tr><th scope="col">Indicador</th><th scope="col">Antes</th><th scope="col">Depois</th></tr></thead>' +
      "<tbody>" + linhas + "</tbody></table>" +
      (midia ? '<div class="media">' + midia + "</div>" : "") +
    "</section>" +

    '<section class="block"><h2>Resultado</h2><ul class="results">' + resultados + "</ul></section>" +

    '<section class="block"><h2>Ferramentas</h2><ul class="tools">' + ferramentas + "</ul></section>" +

    '<section class="block">' +
      '<details class="tech"><summary>Detalhes técnicos</summary><p>' + fmt(p.tecnico) + "</p></details>" +
    "</section>" +

    '<section class="block"><p class="note">' + fmt(p.nota || "Dados, nomes e telas fictícios. A estrutura e a lógica refletem o projeto real.") + "</p></section>" +

    '<nav class="pager" aria-label="Outros projetos">' + link(ant, "Anterior") + link(prox, "Próximo") + "</nav>";
})();
