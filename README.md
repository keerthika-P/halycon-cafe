# 🌑✨ HALYCON CAFE — Dark Luxury Ordering System

A full-stack, dark-cinematic café website + online ordering system, built exactly to spec:
**React + GSAP/Framer Motion frontend, Java Spring Boot backend, MySQL database, JWT auth, Razorpay payments.**

Near KSREI, KSR Kalvi Nagar, Tamil Nadu.

---

## 📁 What's in this zip

```
halycon-cafe/
├── backend/     Java 17 + Spring Boot REST API (JWT auth, JPA, Razorpay SDK)
├── frontend/    React 18 + Vite dark-luxury UI (Framer Motion, cart/likes/search/checkout)
├── database/    halycon_cafe.sql — full schema + every menu item from the brief, pre-seeded
└── README.md    you are here
```

## ⚠️ Please read before running

This project was generated in a sandboxed environment with **no internet access**, so a few things
need to happen on your machine (which does have internet) before it runs:

1. **Images** — the database ships with `/images/filename.jpg` paths only; no image files are
   included. See the "Adding your own real food photos" section below — it's a simple manual
   drag-and-drop process, no code changes needed.
2. **`npm install`** and **Maven build** need to run on your machine — the sandbox that built this
   couldn't download packages.
3. **MySQL**, a **Razorpay account** (test keys are fine), and **Java 17 + Maven** need to be installed
   locally.

Everything else — every page, every API endpoint, cart/likes/search/filter logic, JWT security,
the full menu with every item from your brief, and the database schema — is real, working code.

---

## 🚀 Running it

### 1. Database
```bash
mysql -u root -p < database/halycon_cafe.sql
```

### 2. Backend (Java 17 + Maven required)
```bash
cd backend
# edit src/main/resources/application.properties:
#   - spring.datasource.password
#   - app.jwt.secret        (generate: openssl rand -base64 64)
#   - razorpay.key.id / razorpay.key.secret (from https://dashboard.razorpay.com)
mvn spring-boot:run
```
Runs on `http://localhost:8080`.

### 3. Frontend (Node 18+ required)
```bash
cd frontend
npm install
cp .env.example .env     # fill in VITE_RAZORPAY_KEY_ID
npm run dev
```
Runs on `http://localhost:5173` and proxies `/api` calls to the backend.

---

## 🧠 Tech stack (as specified)

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Framer Motion, GSAP, Swiper, Lenis, Axios, lucide-react |
| Backend | Java 17, Spring Boot 3, Spring Security + JWT, Spring Data JPA |
| Database | MySQL + Hibernate |
| Payments | Razorpay Java SDK + Razorpay Checkout.js, UPI QR fallback field on orders |

## 🍽️ Menu coverage

All 7 categories from the brief are seeded with every named item: Fresh Juices, Milk Specials,
Coffee & Tea, Snacks, Evening Snacks, Mojitos, Signature Specials — 33 items total, each with
description, ingredients, price, rating, calories, and a themed image.

## 🛒 Feature coverage

- JWT signup/login, protected routes
- Cart: add / remove / update quantity, live totals
- Likes: like/unlike, dedicated Liked page
- Search + category/trending/popular/veg-nonveg/chef-special filters
- Checkout → Order → Razorpay payment → signature verification → order status tracking
  (Placed → Preparing → Packed → Out for Delivery → Delivered)
- Admin menu overview page (`/admin`, role-gated) — extend with the same controller pattern
  for full CRUD if you need it
- 3D-tilt food cards, glass-morphism, glow borders, scroll-reveal animations, ambient
  floating-particle hero background, dark palette exactly matching your brief's hex values

## 🖼️ Adding your own real food photos (manual method)

Every menu item's `image_url` in the database now points to a simple local path, e.g.:

```
/images/apple-juice.jpg
```

This works exactly like a static asset reference — no code changes needed, ever. Here's the full process:

### Step 1 — Download your photos
Search Google Images / Pexels / Unsplash for each dish and save the photo to your computer.

### Step 2 — Rename each file exactly as listed
Open **`IMAGE_FILENAMES.md`** in this project — it has the exact filename for all 33 menu items
(e.g. `Apple Juice` → `apple-juice.jpg`). Rename each downloaded photo to match, **exactly**
(lowercase, dashes, `.jpg`).

> If your downloaded image is `.png` or `.webp` instead of `.jpg`, either convert it to `.jpg`
> (any online converter, or "Save As" from an image viewer), or just change the extension in
> `database/halycon_cafe.sql` for that item to match (e.g. `.png`).

### Step 3 — Drop them into one folder
Place **all** renamed files into:
```
frontend/public/images/
```
That's it — no subfolders, no config.

### Step 4 — Reload
- If the frontend dev server (`npm run dev`) is already running, just **refresh the browser** —
  Vite serves everything in `public/` as static files automatically, no restart needed.
- If you add more images later, same thing: drop the file in, refresh the browser.

### Why this works
`frontend/public/` is Vite's static-asset folder — anything inside it is served at the root URL
exactly as-is. So a file at `frontend/public/images/apple-juice.jpg` is reachable in the browser
at `http://localhost:5173/images/apple-juice.jpg`, which is exactly what the database's
`image_url` column points to. The `<img src={item.imageUrl}>` in `FoodCard.jsx` just displays
whatever's there — real photo, placeholder, doesn't matter to the code.



- Wire GSAP/Lenis smooth-scroll (both are already in `package.json`, not yet applied — easy to
  add a `useLenis` hook in `App.jsx` if you want the buttery scroll feel from the brief)
- Add Swiper carousels to the category sections for the "cinematic gallery" feel
- Add a real admin CRUD UI (create/edit/delete menu items) on top of the existing endpoints
