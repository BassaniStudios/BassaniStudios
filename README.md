# Bassani Studios

Digital studio showcase — photos, cinematic videos and crew content inspired by GTA worlds.

**Live site (after GitHub Pages is enabled):**  
`https://YOUR_USERNAME.github.io/bassani-studios/`

---

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Photo Studio | `photo-studio.html` |
| Video Studio | `video-studio.html` |
| Crew Studio | `crews-videos.html` |
| Bassani Studios (brand) | `bassani-studios.html` |
| Video Player | `video-player.html` |
| About | `about.html` |

---

## How to publish on GitHub Pages

### 1. Create the repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `bassani-studios` (or any name you prefer)
3. Public
4. **Do not** add README / .gitignore / license (this folder already has them)
5. Create repository

### 2. Upload the files

**Option A — GitHub website (easiest)**  
1. Open the empty repo  
2. Click **uploading an existing file**  
3. Drag the entire contents of this folder (all HTML, `css/`, `js/`, etc.)  
4. Commit

**Option B — Git command line**

```bash
cd bassani-studios
git init
git add .
git commit -m "Initial Bassani Studios site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bassani-studios.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Repo → **Settings** → **Pages** (left menu)
2. **Source**: Deploy from a branch
3. **Branch**: `main` / folder `/ (root)`
4. Save

Wait 1–2 minutes. Your site will be at:

```text
https://YOUR_USERNAME.github.io/bassani-studios/
```

---

## URL options (ways to customize)

### 1. Default GitHub Pages URL (free)

```text
https://USERNAME.github.io/REPO_NAME/
```

Example: `https://bassanistudios.github.io/bassani-studios/`

### 2. User/organization site (root domain on GitHub)

If the repo is named exactly `USERNAME.github.io`:

```text
https://USERNAME.github.io/
```

Create a repo called `yourname.github.io`, put the site files in the root, enable Pages.

### 3. Custom domain (your own domain)

Example: `https://bassanistudios.com` or `https://www.bassanistudios.com`

1. Buy a domain (Namecheap, Google Domains, Cloudflare, Registro.br, etc.)
2. In the repo → **Settings** → **Pages** → **Custom domain** → type your domain → Save
3. GitHub will show the DNS records you need. Typical setup:

| Type  | Name | Value                          |
|-------|------|--------------------------------|
| A     | @    | 185.199.108.153                |
| A     | @    | 185.199.109.153                |
| A     | @    | 185.199.110.153                |
| A     | @    | 185.199.111.153                |
| CNAME | www  | USERNAME.github.io             |

4. Wait for DNS (can take minutes to a few hours)
5. Enable **Enforce HTTPS** in Pages settings

Optional: add a file `CNAME` in the repo root containing only:

```text
bassanistudios.com
```

### 4. Subpath vs root

- Repo `bassani-studios` → site at `/bassani-studios/`
- Repo `USERNAME.github.io` → site at `/` (cleaner URL)

If you use a subpath and links break, make sure all links are relative (`href="photo-studio.html"`) — this project already uses relative links.

---

## Photo Studio config

Open `photo-studio.html` and edit the CONFIG block near the bottom:

```js
const TOTAL = 1244;
const BASE = 'https://ik.imagekit.io/BassaniStudios/BASSANI%20STUDIOS%20PHOTO%20WEB/';
const NAME = (n) => `photo%20(${n})`;
const EXT = '.jpg';
```

Paste one working public ImageKit URL and adjust `BASE` / `EXT` so all 1244 photos load.

---

## Local test

```bash
# Python
python -m http.server 8000

# then open http://localhost:8000
```

Or use **Live Server** in VS Code / Cursor.

Do **not** open HTML via double-click (`file://`) — YouTube embeds will show Error 153.

---

## Stack

- HTML / CSS / Vanilla JS
- ImageKit for images
- YouTube embeds for videos

© 2026 Bassani Studios
