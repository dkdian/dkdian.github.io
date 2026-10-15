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

// Ícones simples (traço) escolhidos pela área do projeto.
var ICONES = {
  tabela: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/>',
  codigo: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  grafico: '<path d="M4 20V11M10 20V4M16 20v-7M22 20H2"/>',
  faisca: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  documento: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'
};
function svg(nome) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONES[nome] + "</svg>";
}
function tipoArea(area) {
  var a = String(area || "").toLowerCase();
  if (/power bi|\bbi\b|painel/.test(a)) return { icone: "grafico", cls: "t-bi" };
  if (/python|código|codigo/.test(a)) return { icone: "codigo", cls: "t-python" };
  if (/\bia\b|inteligência|ia /.test(a)) return { icone: "faisca", cls: "t-ia" };
  if (/excel|planilha/.test(a)) return { icone: "tabela", cls: "" };
  return { icone: "documento", cls: "" };
}

// Quantas colunas usar nos passos para não sobrar um passo sozinho na última linha.
function colunas(n) {
  if (n <= 5) return Math.max(n, 1);
  return n % 3 === 0 ? 3 : 4;
}

function render(PROJETOS) {
  function statusTag(p) {
    return p.status ? '<span class="status">' + fmt(p.status) + "</span>" : "";
  }

  // ---------------------------------------------------------- página inicial ---
  var listaEl = document.getElementById("lista");
  if (listaEl) {
    listaEl.innerHTML = PROJETOS.map(function (p) {
      var t = tipoArea(p.area);
      var ferr = (p.ferramentas || []).slice(0, 4).map(function (f) { return "<li>" + fmt(f) + "</li>"; }).join("");
      return (
        '<article class="card">' +
          '<div class="card-top"><span class="ico ' + t.cls + '">' + svg(t.icone) + "</span>" +
            '<span class="chip">' + fmt(p.area) + "</span>" + statusTag(p) + "</div>" +
          '<h3><a href="projeto.html?p=' + encodeURIComponent(p.slug) + '">' + fmt(p.titulo) + "</a></h3>" +
          '<p class="sum">' + fmt(p.resumo) + "</p>" +
          '<div class="gain"><span>Resultado</span><strong>' + fmt(p.resultadoCurto) + "</strong></div>" +
          '<div class="card-foot"><ul class="mini-tools">' + ferr + "</ul>" +
            '<span class="card-cta">Ver projeto ' + svg("seta") + "</span></div>" +
        "</article>"
      );
    }).join("");
    var n = PROJETOS.length;
    document.getElementById("contagem").textContent = n + (n === 1 ? " projeto" : " projetos");

    // Painel de resumo, calculado a partir dos próprios projetos
    var painel = document.getElementById("painel");
    if (painel && n) {
      var uso = {}, areas = {};
      PROJETOS.forEach(function (p) {
        areas[String(p.area || "").trim()] = 1;
        (p.ferramentas || []).forEach(function (f) { uso[f] = (uso[f] || 0) + 1; });
      });
      var nomes = Object.keys(uso).sort(function (a, b) { return uso[b] - uso[a] || a.localeCompare(b); });
      painel.innerHTML =
        '<p class="panel-title">Em resumo</p>' +
        '<div class="stats">' +
          '<div class="stat"><strong>' + n + "</strong><span>projetos</span></div>" +
          '<div class="stat"><strong>' + Object.keys(areas).length + "</strong><span>tipos de solução</span></div>" +
          '<div class="stat"><strong>' + nomes.length + "</strong><span>ferramentas</span></div>" +
        "</div>" +
        '<p class="panel-title">Ferramentas mais usadas</p>' +
        '<div class="panel-tools">' + nomes.slice(0, 9).map(function (f) { return "<span>" + fmt(f) + "</span>"; }).join("") + "</div>";
    }
  }

  // ------------------------------------------------------- página de projeto ---
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
  var tipo = tipoArea(p.area);

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
        '<div class="shot"><div class="placeholder"><div><strong>' + fmt(m.legenda) + "</strong>" +
        "Imagem a incluir em assets/img</div></div></div>";
    } else if (/\.(mp4|webm)$/i.test(m.arquivo)) {
      corpo = '<div class="shot"><video src="assets/img/' + encodeURI(m.arquivo) + '"' +
        (m.poster ? ' poster="assets/img/' + encodeURI(m.poster) + '"' : "") +
        ' controls preload="metadata" playsinline></video></div>';
    } else {
      corpo = '<div class="shot"><img src="assets/img/' + encodeURI(m.arquivo) + '" alt="' + fmt(m.legenda) + '" loading="lazy"></div>';
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

  var ferr = (p.ferramentas || []).slice(0, 5).map(function (f) { return "<li>" + fmt(f) + "</li>"; }).join("");

  alvo.innerHTML =
    '<nav class="crumbs" aria-label="Você está em"><a href="./">Projetos</a><span aria-hidden="true">›</span><span>' + fmt(p.titulo) + "</span></nav>" +

    '<section class="p-head">' +
      '<div class="p-tags"><span class="ico ' + tipo.cls + '">' + svg(tipo.icone) + "</span>" +
        '<span class="chip">' + fmt(p.area) + "</span>" + statusTag(p) + "</div>" +
      "<h1>" + fmt(p.titulo) + "</h1>" +
      '<p class="lead">' + fmt(p.resumo) + "</p>" +
      '<div class="kpis">' +
        '<div class="kpi hot"><span>Resultado</span><strong>' + fmt(p.resultadoCurto) + "</strong></div>" +
        '<div class="kpi"><span>Cliente</span><strong>' + fmt(p.cliente) + "</strong></div>" +
        '<div class="kpi"><span>Ferramentas</span><ul class="mini-tools">' + ferr + "</ul></div>" +
      "</div>" +
    "</section>" +

    bloco("O problema", p.problema ? '<div class="prose"><p>' + fmt(p.problema) + "</p></div>" : "") +
    bloco("Como funciona", p.passos ? '<ol class="steps' + (colunas(p.passos.length) === p.passos.length ? " ln" : "") + '" style="--cols:' + colunas(p.passos.length) + '">' + lista(p.passos, "li") + "</ol>" : "") +
    bloco("Antes e depois",
      (linhas
        ? '<table class="compare"><thead><tr><th scope="col">Indicador</th><th scope="col">Antes</th><th scope="col">Depois</th></tr></thead><tbody>' + linhas + "</tbody></table>"
        : "") +
      (midia ? '<div class="media">' + midia + "</div>" : "")) +
    bloco("Resultado", p.resultados ? '<ul class="wins">' + lista(p.resultados, "li") + "</ul>" : "") +
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
