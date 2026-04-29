import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

const docsRoot = join(process.cwd(), 'src/content/docs');
const rootRelativeMarkdownLink = /\[[^\]]+\]\(\/(?!\/)([^)]+)\)/g;

function getDocFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      return getDocFiles(fullPath);
    }

    return entry.isFile() && fullPath.endsWith('.mdx') ? [fullPath] : [];
  });
}

describe('docs links', () => {
  it('avoids root-relative markdown links in docs content', () => {
    const offenders = getDocFiles(docsRoot).flatMap((filePath) => {
      const source = readFileSync(filePath, 'utf8');
      const matches = Array.from(source.matchAll(rootRelativeMarkdownLink));

      return matches.map((match) => ({
        file: relative(process.cwd(), filePath),
        link: match[0],
      }));
    });

    expect(offenders).toEqual([]);
  });
});
