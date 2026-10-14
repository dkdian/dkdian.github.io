# Portfolio site

Static site for GitHub Pages. No build step, no installs.

## Publish

1. Create a public repository on GitHub named `<your-username>.github.io`.
2. Upload every file in this folder to it (Add file, then Upload files), keeping the `assets` folder structure.
3. In the repository, open Settings, then Pages, and pick the `main` branch as the source.
4. The site goes live at `https://dkdian.github.io/dianlucca.github.io/` within a few minutes.

## Edit content

All project text lives in `assets/projetos.js`. You never need to touch the HTML to change a project.

- Text inside `[[ ]]` shows up highlighted in yellow on the site. Replace it with the real value and delete the brackets.
- To add a project, copy a whole `{ ... }` block, paste it after the last one and edit it. The `slug` must be unique and have no spaces.
- Images, GIFs and videos go in `assets/img`. In the project's `midia` list, change `arquivo: null` to the file name, for example `arquivo: "conciliacao.gif"`. `.mp4` files play automatically on loop.
- The email placeholder on the home page is in `index.html`, under Contato.

## Before publishing

- Get approval from the consultancy for the client projects.
- Use only screenshots and GIFs made from the synthetic data versions.
- Check every image for file paths, user names, channel names, emails and URLs.

## Preview locally

Open a terminal in this folder and run `python -m http.server`, then go to `http://localhost:8000`.
