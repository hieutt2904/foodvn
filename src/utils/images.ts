// Sinh URL ảnh AI từ Pollinations.ai (miễn phí, không cần API key).
// Khi `image` đã set trong frontmatter, dùng trực tiếp — cho phép bạn thay bằng ảnh thật.

interface PollinationsOpts {
  width?: number;
  height?: number;
  seed?: number;
}

const STYLE_SUFFIX =
  'professional food photography, top-down composition, natural daylight, vibrant colors, shallow depth of field, restaurant quality, ultra detailed';

export function pollinationsUrl(prompt: string, opts: PollinationsOpts = {}): string {
  const { width = 800, height = 500, seed = 42 } = opts;
  const fullPrompt = `${prompt}, ${STYLE_SUFFIX}`;
  const encoded = encodeURIComponent(fullPrompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true&enhance=true`;
}

// Hash ổn định từ slug -> seed, để mỗi món có một ảnh nhất quán giữa các build.
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
  if (recipe.data.image) return recipe.data.image;
  const prompt =
    recipe.data.imagePrompt ??
    `Vietnamese ${recipe.data.title}, traditional Vietnamese cuisine, served in ceramic bowl with chopsticks, herbs and lime on the side`;
  return pollinationsUrl(prompt, { seed: slugToSeed(recipe.id), ...opts });
}
