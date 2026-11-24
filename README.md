# Ninotchca's portfolio

From the repository root, run:

```powershell
cd frontend
pnpm dev
```

Open **http://127.0.0.1:5173**. No `pnpm install` is required: the dev script starts the existing Python server. Python 3.10+ and pnpm must be available. Refresh the browser after editing files; this server does not provide hot reload. Stop with Ctrl+C.

Alternatively, run `python main.py` from the repository root and open **http://127.0.0.1:8000**. Use `python main.py --port 8080` for another port.

## Structure

- `main.py`: local entry point.
- `app/__init__.py`: local HTTP server and route handling.
- `frontend/src/pages/index.html`: page content and semantic structure.
- `frontend/src/styles/main.css`: palette, typography, layout, responsive styles, and motion preferences.
- `frontend/src/scripts/main.js`: accessible mobile navigation and screenshot selection.
- `frontend/src/data/project-template.json`: unpublished authoring worksheet for future projects; not automatically rendered.
- `src/`: existing photographs, screenshots, résumé, and font assets retained in place.

The root index redirects to the new frontend for existing static previews. The Python server serves the frontend directly at `/`. Use the repository root as the static hosting directory so existing assets resolve. JSX and Tailwind are optional and have not been added: this design uses native CSS and JavaScript, avoiding an unnecessary build step.

## Adding your current projects

Use **screenshots and a description together**. Start with one clear cover image, a one-sentence summary, your role, and the technology used. Expand into the problem, constraints, key decisions, result, and reflection. Include two or three annotated screenshots that support your explanation. Early sketches or iterations help if available. Do not invent research, impact metrics, testimonials, or responsibilities.

Fill out `frontend/src/data/project-template.json` as a worksheet, then use its content to author an article in the Selected Work section. Replace the “next chapter” section once a project is ready. Add images under `frontend/src/assets/projects/` and reference them from the page as `../assets/projects/filename.png`. Link to the actual repository or live demo when available. The retained Metropolitan Theater entry uses only previously supplied project facts; its detailed personal contribution still needs your input.

## Design references and checks

Content organization follows [NN/G's portfolio guidance](https://www.nngroup.com/articles/ux-design-portfolios/): scannable project stories, personal contribution, decisions, evidence, and learning. Motion follows [W3C C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39): static by default, optional motion inside `prefers-reduced-motion: no-preference`, and an explicit reduce override. No autoplay or animated carousel.

Before publishing, inspect mobile and desktop layouts, tab through navigation and gallery buttons, press Escape to close the mobile menu, and enable the operating system's Reduce Motion setting. Verify your résumé and external links. Following C39 alone is not a claim of full WCAG conformance.
