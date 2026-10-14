# Portfolio site

Live at https://dkdian.github.io

Static site on GitHub Pages. No build step, no installs.

## Edit content

- Each project lives in its own file in `assets/projetos/<slug>.js`. The order on the home page is in `assets/projetos/ordem.js`.
- `CLAUDE.md` has the field guide and confidentiality rules. Claude Code reads it automatically when working in this repository.
- Images, GIFs and videos go in `assets/img`.
- Text inside `[[ ]]` shows up highlighted in yellow as a pending item.

## CV download

Upload your CV as `assets/curriculo.pdf`. The "Currículo" links stay hidden until that file exists.

## Preview locally

Run `python -m http.server` in this folder and open `http://localhost:8000`.
