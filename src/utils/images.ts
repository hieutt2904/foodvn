import fs from 'node:fs';
import path from 'node:path';

// Sinh URL ảnh AI từ Pollinations.ai làm fallback khi chưa có ảnh thật.
// Khi `image` set trong frontmatter, hoặc file `public/images/recipes/<slug>.jpg` tồn tại,
// helper sẽ ưu tiên dùng ảnh thật.

interface PollinationsOpts {
  width?: number;
  height?: number;
  seed?: number;
}

const STYLE_SUFFIX =
  'professional food photography, top-down composition, natural daylight, vibrant colors, shallow depth of field, restaurant quality, ultra detailed';

const SUPPORTED_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'avif'] as const;
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BASE = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

export function pollinationsUrl(prompt: string, opts: PollinationsOpts = {}): string {
  const { width = 800, height = 500, seed = 42 } = opts;
  const fullPrompt = `${prompt}, ${STYLE_SUFFIX}`;
  const encoded = encodeURIComponent(fullPrompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true&enhance=true`;
}

// Tìm file local trong public/<relativeDir>/<basename>.<ext> với mọi đuôi ảnh hỗ trợ.
// Trả URL public (đã prefix BASE) nếu thấy, ngược lại null.
function findLocalImage(relativeDir: string, basename: string): string | null {
  for (const ext of SUPPORTED_EXTS) {
    const abs = path.join(PUBLIC_DIR, relativeDir, `${basename}.${ext}`);
    if (fs.existsSync(abs)) {
      return `${BASE}/${relativeDir}/${basename}.${ext}`.replace(/\\/g, '/');
    }
  }
  return null;
}

function slugToSeed(slug: string): number {
  let seed = 0;
  for (let i = 0; i < slug.length; i++) {
    seed = (seed * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return seed % 1_000_000;
}

interface RecipeImageInput {
  id: string;
  data: { title: string; image?: string; imagePrompt?: string };
}

export function recipeImageUrl(recipe: RecipeImageInput, opts: PollinationsOpts = {}): string {
  // 1. URL/path explicit trong frontmatter — ưu tiên cao nhất.
  if (recipe.data.image) return recipe.data.image;

  // 2. Convention: public/images/recipes/<slug>.<ext>
  const local = findLocalImage('images/recipes', recipe.id);
  if (local) return local;

  // 3. Fallback AI để site không vỡ khi bạn chưa upload ảnh.
  const prompt =
    recipe.data.imagePrompt ??
    `Vietnamese ${recipe.data.title}, traditional Vietnamese cuisine`;
  return pollinationsUrl(prompt, { seed: slugToSeed(recipe.id), ...opts });
}

export function heroImageUrl(opts: PollinationsOpts = {}): string {
  const local = findLocalImage('images', 'hero');
  if (local) return local;
  return pollinationsUrl(
    'Vietnamese cuisine feast on rustic wooden table, top-down flat lay, pho, banh mi, fresh spring rolls, bun cha, banh xeo, vibrant herbs and chili',
    { width: 1920, height: 1080, seed: 71429, ...opts },
  );
}

const REGION_PROMPTS: Record<string, string> = {
  bac: 'Northern Vietnamese cuisine spread, steaming pho bo bowl and bun cha with grilled pork, Hanoi old quarter street food, autumn light',
  trung: 'Central Vietnamese cuisine spread, fiery red bun bo Hue and yellow mi Quang on table, Hue imperial cuisine, dramatic red and orange tones',
  nam: 'Southern Vietnamese cuisine spread, com tam broken rice plate and banh mi sandwich, Saigon street food, tropical bright sunlight',
};

const REGION_SEEDS: Record<string, number> = { bac: 11111, trung: 22222, nam: 33333 };

export function regionImageUrl(region: 'bac' | 'trung' | 'nam', opts: PollinationsOpts = {}): string {
  const local = findLocalImage('images/regions', region);
  if (local) return local;
  return pollinationsUrl(REGION_PROMPTS[region], {
    width: 800,
    height: 600,
    seed: REGION_SEEDS[region],
    ...opts,
  });
}
