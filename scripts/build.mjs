import { cp, mkdir } from 'node:fs/promises';

const source = new URL('../dist/', import.meta.url);
const output = new URL('../build/', import.meta.url);
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
console.log('Portfolio ready in build/');
