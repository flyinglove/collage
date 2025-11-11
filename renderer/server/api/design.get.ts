import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { createError } from 'h3';
import type { ContainerNode } from '~/types';

export default defineEventHandler(async () => {
  const filePath = join(process.cwd(), 'public', 'design.json');

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as ContainerNode;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw createError({ statusCode: 404, statusMessage: 'Design file not found' });
    }

    console.error('[design.get] Failed to read design.json', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to load design file' });
  }
});
