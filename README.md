# Anant Traders — Modern Frontend (Lightweight)

This package contains a modern, attractive frontend for the **Anant Traders** clothing brand.
It uses plain HTML/CSS/vanilla JS (no heavy frameworks) and is ready to pair with the Go backend you already have.

## Included
- index.html, login.html, signup.html, cart.html, admin.html
- css/styles.css (modern responsive styles)
- js/app.js (product list, cart, filters, auth stubs)
- assets/logo.svg (vector logo) and placeholder product/hero images (small PNGs)
- README with next steps

## How to use
1. Extract the ZIP and serve the folder with a static server or from your Go backend file server.
2. Place your real logo in `assets/logo.svg` or overwrite with PNG.
3. Wire the frontend forms to your backend endpoints (`/signup`, `/login`, `/api/products`, etc.).
4. Implement payment gateway and OTP endpoints on backend as previously discussed.

## Notes & TODOs
- Client currently uses `localStorage` for cart; replace with server-side cart for logged in users.
- Replace placeholder images in `assets/` with real product photos.
- Hook signup/login to backend using fetch/XHR and implement secure sessions or JWTs.
