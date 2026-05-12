import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    region: z.enum(['bac', 'trung', 'nam', 'ca-nuoc']),
    meal: z.enum(['sang', 'trua', 'toi', 'trang-mieng', 'an-vat']),
    mainDish: z.boolean().default(false),
    difficulty: z.enum(['de', 'trung-binh', 'kho']).default('trung-binh'),
    prepTime: z.number().describe('phút sơ chế'),
    cookTime: z.number().describe('phút nấu'),
    servings: z.number().default(4),
    ingredients: z.array(
      z.object({
        name: z.string(),
        quantity: z.string(),
      }),
    ),
    steps: z.array(z.string()),
    tips: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    image: z.string().optional().describe('URL ảnh — để trống sẽ dùng AI sinh từ imagePrompt'),
    imagePrompt: z.string().optional().describe('Prompt mô tả ảnh cho AI (tiếng Anh sẽ ra kết quả tốt hơn)'),
  }),
});

export const collections = { recipes };

export const REGION_LABELS: Record<string, string> = {
  bac: 'Miền Bắc',
  trung: 'Miền Trung',
  nam: 'Miền Nam',
  'ca-nuoc': 'Cả nước',
};

export const MEAL_LABELS: Record<string, string> = {
  sang: 'Bữa sáng',
  trua: 'Bữa trưa',
  toi: 'Bữa tối',
  'trang-mieng': 'Tráng miệng',
  'an-vat': 'Ăn vặt',
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  de: 'Dễ',
  'trung-binh': 'Trung bình',
  kho: 'Khó',
};
