# 🍜 FoodVN — Cẩm nang món ăn Việt Nam

Trang web tĩnh chứa 17+ công thức món ăn ba miền Bắc – Trung – Nam, xây dựng bằng **Astro + Tailwind CSS + Pagefind**, deploy miễn phí trên **GitHub Pages**.

## Tính năng

- 17 công thức món ăn Việt (5 Bắc + 5 Trung + 5 Nam + 2 tráng miệng)
- Phân loại theo **vùng miền** và **bữa ăn**
- **Tìm kiếm client-side** bằng Pagefind (không cần backend)
- **Dark mode** với lưu trạng thái trong localStorage
- **Print-friendly**: in công thức ra giấy như một cuốn sách
- Responsive, accessible, SEO-ready

## Tech stack

| Lớp | Công nghệ |
|---|---|
| Framework | [Astro 5](https://astro.build) (SSG) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Content | Markdown + Content Collections (type-safe schema) |
| Search | [Pagefind 1](https://pagefind.app) (static search) |
| Fonts | Be Vietnam Pro + Playfair Display (Google Fonts) |
| Hosting | GitHub Pages (qua GitHub Actions) |

## Cấu trúc thư mục

```
foodvn/
├── src/
│   ├── content/recipes/         # 17 file Markdown công thức
│   ├── content.config.ts        # Schema + nhãn vùng/bữa ăn
│   ├── layouts/                 # BaseLayout
│   ├── components/              # Header, Footer, RecipeCard, ThemeToggle
│   ├── pages/                   # Routes
│   │   ├── index.astro          # Trang chủ
│   │   ├── recipes/[id].astro   # Chi tiết công thức
│   │   ├── mien/[region].astro  # Lọc theo miền
│   │   ├── bua/[meal].astro     # Lọc theo bữa
│   │   ├── search.astro         # Trang tìm kiếm
│   │   └── gioi-thieu.astro
│   └── styles/global.css
├── public/                      # Static assets (favicon)
├── astro.config.mjs
├── package.json
└── .github/workflows/deploy.yml # CI/CD GitHub Pages
```

## Chạy local

```bash
npm install
npm run dev        # http://localhost:4321
```

Lưu ý: trang `/search` cần build trước (Pagefind chạy sau khi build):

```bash
npm run build      # astro build && pagefind --site dist
npm run preview    # xem search hoạt động
```

## Triển khai lên GitHub Pages

### 1. Sửa `astro.config.mjs`

Đổi `site` và `base` cho khớp với repo của bạn. Nếu repo tên `foodvn` thuộc user `yourname`:

```js
export default defineConfig({
  site: 'https://yourname.github.io',
  base: '/foodvn',
  // ...
});
```

Nếu dùng custom domain (vd `foodvn.com`):

```js
export default defineConfig({
  site: 'https://foodvn.com',
  base: '/',
});
```

### 2. Bật GitHub Pages

1. Tạo repo trên GitHub, push code lên branch `main`.
2. Vào **Settings → Pages**, chọn **Source: GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` sẽ tự build và deploy mỗi khi push lên `main`.

### 3. Push code lên

```bash
git init
git add .
git commit -m "Initial FoodVN cookbook site"
git branch -M main
git remote add origin git@github.com:yourname/foodvn.git
git push -u origin main
```

Sau 2-3 phút Action chạy xong, trang sẽ có ở `https://yourname.github.io/foodvn/`.

## Thêm ảnh thật cho món ăn

Site fallback ảnh AI (Pollinations.ai) khi chưa có ảnh local. Để thay bằng ảnh thật, chỉ cần drop file vào đúng thư mục theo convention:

```
public/images/
├── hero.jpg                    # Banner trang chủ
├── regions/{bac,trung,nam}.jpg # Banner 3 miền
└── recipes/<slug>.jpg          # Ảnh từng món, tên file = slug recipe
```

Đuôi hỗ trợ: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`. Helper tự dò file — chưa có thì dùng AI fallback. Chi tiết tên file 17 món xem [public/images/README.md](public/images/README.md).

Override per-recipe bằng frontmatter:
```yaml
image: https://example.com/anh.jpg   # URL ngoài
image: /foodvn/images/recipes/pho-special.jpg  # đường dẫn khác
```

## Thêm công thức mới

Tạo file Markdown mới trong `src/content/recipes/<slug>.md`:

```markdown
---
title: Tên món ăn
description: Mô tả ngắn 1-2 câu
region: bac | trung | nam | ca-nuoc
meal: sang | trua | toi | trang-mieng | an-vat
mainDish: true
difficulty: de | trung-binh | kho
prepTime: 30
cookTime: 45
servings: 4
featured: false
tags: [tag1, tag2]
ingredients:
  - { name: Nguyên liệu, quantity: '200 g' }
steps:
  - 'Bước 1: ...'
  - 'Bước 2: ...'
tips: |
  Mẹo bếp...
---

Đoạn giới thiệu món ăn (Markdown body).
```

Schema được validate bởi Zod (xem `src/content.config.ts`) — sai field sẽ báo lỗi khi build.

## Hosting miễn phí khác

Ngoài GitHub Pages, dự án này có thể deploy lên các nền tảng miễn phí khác mà không cần sửa nhiều:

| Hosting | Ưu điểm | Nhược điểm |
|---|---|---|
| **GitHub Pages** | Tích hợp GitHub, không giới hạn bandwidth cho repo public | Phải set `base` nếu repo không phải `user.github.io` |
| Cloudflare Pages | CDN nhanh nhất, unlimited bandwidth | Cần tài khoản CF |
| Netlify | Build cực dễ, preview deploy cho PR | Free tier 100GB bandwidth/tháng |
| Vercel | DX tốt nhất | Free tier giới hạn 100GB/tháng |

## Giấy phép

Mã nguồn: MIT. Nội dung công thức: tham khảo và biên soạn lại từ nguồn ẩm thực dân gian Việt Nam, dùng cho mục đích phi thương mại.
