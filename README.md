# Portfólio — Davi Milhome

Descrição
-------
Site portfólio simples e visualmente elegante para apresentar projetos e trabalhos relacionados a dados (analytics, BI, engenharia de dados).

Estrutura de arquivos
---------------------
Exemplo de árvore e explicação das principais pastas/arquivos:

```
portfolio/
├─ _config.yml          # Configurações do Jekyll (title, tema, baseurl)
├─ index.html            # Página inicial (apresentação)
├─ projects.html         # Página com lista de projetos
├─ assets/
│  ├─ css/               # CSS compilado/estático (deliver para GitHub Pages)
│  ├─ js/                # JavaScript customizado (ex: custom.js)
│  └─ images/            # Imagens do site (perfil, thumbnails de projetos)
├─ _sass/                # Arquivos Sass/SCSS personalizados (compilados pelo tema)
│  └─ custom/            # Estilos do projeto (custom.scss)
├─ _site/                # Pasta gerada pelo Jekyll (build output) — não versionar
├─ Gemfile               # Gemas Ruby necessárias para build (jekyll, plugins)
└─ README.md             # Este arquivo
```

Explicação resumida:
- `index.html`: landing page / apresentação.
- `projects.html`: página dedicada aos projetos; cada projeto pode ter links para GitHub ou páginas de detalhe.
- `assets/`: onde colocar imagens e os arquivos finais de CSS/JS usados pelo GitHub Pages.
- `_sass/custom/`: lugar para o SCSS usado pelo tema (recomendado quando usar temas Jekyll).

Dependências
------------
- Ruby (testado com Ruby 3.x)
- Bundler
- Jekyll e plugins listados no `Gemfile` (ex.: `jekyll`, `jekyll-remote-theme`, `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-feed`)

Instalação (local)
------------------
1. Instale Ruby e Bundler.
2. No diretório do projeto, execute:

```bash
bundle install
```

Como usar / Desenvolvimento local
---------------------------------
- Build estático:

```bash
bundle exec jekyll build
```

- Servir localmente com live-reload:

```bash
bundle exec jekyll serve --livereload
```

Abra `http://localhost:4000` (ou `http://localhost:4000/<baseurl>/` se `baseurl` estiver configurado no `_config.yml`).


Deploy GitHub Pages
-------------------
No GitHub Pages, há dois formatos principais de publicação:

- **User site** (`<usuario>.github.io`): o site é servido na raiz do domínio.
  - Exemplo em `_config.yml`: `baseurl: ""`
- **Project site** (`<usuario>.github.io/<repositorio>`): o site é servido dentro do caminho do repositório.
  - Exemplo em `_config.yml`: `baseurl: "/portfolio"`

Use também `url` com o domínio completo (ex.: `url: "https://davi.github.io"`) para gerar links absolutos corretamente.

Observações
-----------
- Coloque suas imagens de perfil e projetos em `assets/images/`.
- Adicione o currículo em `assets/cv.pdf` se quiser que o botão de download funcione.
- Para adicionar páginas de detalhe de projeto, crie arquivos `.html` ou `.md` no root (ex.: `projeto1.html`) e linke-os em `projects.html`.

Autor
-----
Davi Milhome

Licença
-------
Este projeto está licenciado sob a licença MIT — veja o arquivo `LICENSE` para detalhes.
