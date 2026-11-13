# Pushpalatha N, Portfolio

Single-page portfolio built with HTML5, CSS3 and vanilla JavaScript. No dependencies, no build step.

```
portfolio/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── profile-photo.jpg
    └── Pushpalatha_N_Resume.pdf   (used by the Download Resume button)
```

## Run locally (MacBook)

Option 1: double-click `index.html`, or in Terminal:

```bash
cd portfolio
open index.html
```

Option 2: local server:

```bash
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Export as a one-page A4 PDF (Chrome)

1. Open `index.html` in Google Chrome.
2. Press `Cmd + P`.
3. Destination: **Save as PDF**.
4. Paper size: **A4**. Margins: **Default**. Scale: **100%** (Default).
5. Turn **Background graphics** ON, and **Headers and footers** OFF.
6. Click **Save**.

The print stylesheet hides navigation and buttons, shows both projects, and fits everything on one A4 page.

## Deploy free

**GitHub Pages**
1. Create a new public repo (e.g. `portfolio`) and push these files to `main`.
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
3. Your site appears at `https://<username>.github.io/portfolio/`.

**Netlify**
1. Go to app.netlify.com → Add new site → *Deploy manually*.
2. Drag the `portfolio` folder onto the page. The site goes live immediately with a free `*.netlify.app` URL.

## Adding LinkedIn / GitHub later

Add `<li><a href="YOUR_URL" target="_blank" rel="noopener">LinkedIn</a></li>` to the `.hero-links` list and the `.contact-list` in `index.html`.
# pushpalatha-portfolio
# pushpalatha-portfolio
