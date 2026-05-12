# Hướng dẫn upload ảnh

Drop ảnh đúng tên file vào đúng thư mục — site sẽ TỰ phát hiện và ưu tiên dùng ảnh thật thay vì AI fallback. Không cần sửa code.

## Đuôi file hỗ trợ

`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` — helper tự dò theo thứ tự trên.

## Cấu trúc

```
public/images/
├── hero.jpg                    # Banner trang chủ (khuyên 1920×1080 hoặc lớn hơn)
├── regions/
│   ├── bac.jpg                 # Ảnh đại diện miền Bắc (4:5, ~800×1000)
│   ├── trung.jpg               # Ảnh đại diện miền Trung
│   └── nam.jpg                 # Ảnh đại diện miền Nam
└── recipes/                    # Ảnh từng món — tên file = slug recipe
    ├── pho-bo-ha-noi.jpg
    ├── bun-cha-ha-noi.jpg
    ├── banh-cuon-thanh-tri.jpg
    ├── cha-ca-la-vong.jpg
    ├── bun-thang.jpg
    ├── bun-bo-hue.jpg
    ├── mi-quang.jpg
    ├── banh-xeo-mien-trung.jpg
    ├── cao-lau-hoi-an.jpg
    ├── nem-lui-hue.jpg
    ├── com-tam-sai-gon.jpg
    ├── banh-mi-sai-gon.jpg
    ├── hu-tieu-nam-vang.jpg
    ├── lau-mam.jpg
    ├── goi-cuon.jpg
    ├── che-ba-mau.jpg
    └── banh-flan.jpg
```

## Khuyến nghị về ảnh

- **Hero**: ngang, 16:9 hoặc rộng hơn, ≥ 1600px chiều ngang
- **Regions**: dọc, tỉ lệ 4:5, ~800×1000px
- **Recipes**: ngang, tỉ lệ 5:3 (~800×500px là vừa với card), JPEG quality ~80%

Mỗi ảnh nên < 200KB sau khi nén để load nhanh. Có thể nén bằng [squoosh.app](https://squoosh.app) hoặc [tinypng.com](https://tinypng.com).

## Override per-recipe

Nếu muốn dùng URL ngoài hoặc tên file khác, set trong frontmatter của recipe:

```yaml
image: https://example.com/anh.jpg
# hoặc
image: /foodvn/images/recipes/pho-special.jpg
```

`image` trong frontmatter có ưu tiên cao nhất, ghi đè cả file local theo convention.

## Khi nào dùng AI fallback

Nếu file local chưa tồn tại, helper sẽ tự fallback Pollinations.ai với prompt định sẵn. Nhờ vậy bạn có thể upload ảnh DẦN DẦN từng món mà không làm vỡ site.
