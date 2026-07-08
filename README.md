# Morton Roofing Website

Professional marketing website for **Morton Roofing** — Illinois roofing contractor and public adjusters.

**Live site:** [mortonroofing.best](https://mortonroofing.best)

## Services

- Residential roof replacement & repair
- Flat & commercial roofing
- Gutters & siding
- Public adjusting & insurance claims
- Storm damage assessment

## Service Areas

Woodridge, Naperville, Bolingbrook, Joliet, Calumet City, and surrounding Chicagoland communities.

## Contact

**Phone:** [331-481-3708](tel:3314813708)

---

## Updating the Website

1. Edit files locally (`index.html`, `css/styles.css`, `js/main.js`)
2. Commit and push to GitHub:

```bash
git add .
git commit -m "Update website content"
git push
```

Cloudflare Pages automatically rebuilds and deploys on every push to `main`.

---

## Cloudflare Pages Setup (One-Time)

If not yet connected, follow these steps in the [Cloudflare Dashboard](https://dash.cloudflare.com):

1. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select GitHub and authorize access
3. Choose repository: `Loudpack7000/Mortonroofing-co`
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (root)
5. Click **Save and Deploy**
6. After first deploy, go to **Custom domains** → **Set up a custom domain**
7. Enter `mortonroofing.best` (and optionally `www.mortonroofing.best`)
8. Cloudflare will configure DNS automatically since the domain is on your account

---

## Contact Form Setup

The inspection form uses [FormSubmit](https://formsubmit.co/) to deliver submissions via email.

**First-time setup:**

1. Open `index.html` and find the form `action` attribute
2. Replace the email address with your real business email:
   ```html
   action="https://formsubmit.co/YOUR-EMAIL@example.com"
   ```
3. Submit the form once on the live site — FormSubmit sends a confirmation email to activate it

Alternatively, connect a Cloudflare Worker or use Cloudflare Email Routing to receive form submissions at `@mortonroofing.best`.

---

## Project Structure

```
Mortonroofing-co/
├── index.html          # Main page (all sections)
├── css/
│   └── styles.css      # Styles
├── js/
│   └── main.js         # Navigation, form, animations
├── _headers            # Cloudflare Pages security headers
└── README.md
```

## License

© Morton Roofing. All rights reserved.
