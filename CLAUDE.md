# Portfólio de projetos (dkdian.github.io)

Site estático publicado pelo GitHub Pages em https://dkdian.github.io. Sem build, sem dependências. Qualquer push na branch `main` publica em poucos minutos.

## Público

Gestores e profissionais de finanças, não programadores. Escreva em português, em linguagem de negócio. Fale do problema, do que mudou na rotina e do resultado. Código e termos técnicos ficam só no campo `tecnico`.

## Onde editar

- Cada projeto tem um arquivo próprio em `assets/projetos/<slug>.js`. **Edite apenas o arquivo do projeto que você está documentando.** Outras sessões podem estar editando os outros ao mesmo tempo.
- A ordem dos projetos na página inicial fica em `assets/projetos/ordem.js`. Só mexa nele para incluir um projeto novo.
- Imagens, GIFs e vídeos vão em `assets/img/`, com nome começando pelo slug, por exemplo `fluxo-caixa-teams-teams.gif`.
- Não altere `index.html`, `projeto.html`, `assets/app.js` nem `assets/style.css` sem o dono pedir.

## Identidade visual

A página inicial mostra um cabeçalho fixo (monograma, nome e os botões de LinkedIn e currículo), um painel de resumo em largura total, calculado a partir dos próprios projetos (quantidade, tipos de solução e ferramentas), e a lista de projetos, um cartão embaixo do outro: ícone e tipo de solução (a cor vem da `area`), título, `resumo`, `resultadoCurto` em destaque e as quatro primeiras `ferramentas`. A página de projeto mostra o resultado, o cliente e as ferramentas no alto, e depois cada seção em blocos. Cores, espaçamentos e modo escuro ficam nas variáveis do início de `assets/style.css`.

## Campos de cada projeto

Todos são texto em português. Campos opcionais que ficarem vazios simplesmente não aparecem.

| Campo | Obrigatório | O que vai |
|---|---|---|
| `slug` | sim | Igual ao nome do arquivo, sem espaços |
| `titulo` | sim | O que o projeto faz, em até 8 palavras |
| `area` | sim | Tipo do projeto, por exemplo "Automação em Excel" ou "Power BI" |
| `cliente` | sim | Setor genérico, por exemplo "uma distribuidora". Nunca o nome real |
| `status` | não | Use só para "Em construção" |
| `resumo` | sim | Uma ou duas frases sobre o que acontece hoje graças ao projeto |
| `resultadoCurto` | sim | O principal ganho em até 6 palavras, aparece na lista inicial |
| `problema` | sim | Como era a rotina antes e por que era um problema. 3 a 5 frases |
| `passos` | sim | Lista de 3 a 6 etapas do fluxo, cada uma com até 12 palavras |
| `antesDepois` | sim | Lista de linhas `["Indicador", "Antes", "Depois"]`, de 3 a 6 linhas |
| `midia` | não | Lista de `{ "arquivo": "nome.mp4", "legenda": "...", "poster": "capa.png" }`. Aceita imagem, GIF ou vídeo (mp4/webm, sem som, com controles, sem reprodução automática; `poster` é a imagem de capa do vídeo, opcional). `arquivo: null` mostra um espaço reservado |
| `links` | não | Lista de `{ "rotulo": "Ver o código no GitHub", "url": "https://..." }`. Aparece como botões no alto da página do projeto |
| `resultados` | sim | Lista de 2 a 5 ganhos concretos, com números sempre que existirem |
| `desafios` | não | Lista de `{ "titulo": "...", "texto": "..." }` com obstáculos reais e como foram resolvidos. 2 a 4 itens |
| `ferramentas` | sim | Lista de nomes de ferramentas |
| `tecnico` | não | Um parágrafo técnico para recrutadores da área de dados |
| `nota` | não | Substitui o aviso padrão de dados fictícios |

Texto entre `[[ ]]` aparece destacado em amarelo no site como pendência. Ao preencher, remova os colchetes. Se um número não puder ser confirmado, deixe entre `[[ ]]` em vez de inventar.

## Regras de confidencialidade

O repositório é público. Antes de cada commit, confira:

- Nenhum nome de cliente, empresa, pessoa, banco com número de conta, CNPJ, CPF, e-mail ou telefone.
- Nenhum caminho de arquivo, nome de pasta compartilhada, canal do Teams, URL interna ou nome de sistema que identifique o cliente.
- Nenhum valor financeiro real. Use dados sintéticos ou percentuais.
- Imagens apenas de versões com dados fictícios. Confira barras de título, abas, nomes de usuário e metadados.
- Códigos de cliente (por exemplo números de cadastro) também não entram.

Na dúvida, deixe de fora e avise o dono do repositório.

## Como publicar

```
git pull --rebase origin main
git add assets/projetos/<slug>.js assets/img/<slug>-*
git commit -m "Atualiza projeto <slug>"
git push origin main
```

Para conferir antes de publicar, rode `python -m http.server` na raiz e abra `http://localhost:8000/projeto.html?p=<slug>`.
