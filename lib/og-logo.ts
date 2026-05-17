import { readFile } from 'node:fs/promises';
import path from 'node:path';

let cachedLogoDataUrl: string | undefined;

export async function getOgLogoDataUrl() {
  if (!cachedLogoDataUrl) {
    const logo = await readFile(path.join(process.cwd(), 'public/logo.png'));
    cachedLogoDataUrl = `data:image/png;base64,${logo.toString('base64')}`;
  }

  return cachedLogoDataUrl;
}
