// Run with: node quickstart.mjs
import { devpack } from './devpack.mjs';

const show = (label, value) => console.log(`\n${label}\n${JSON.stringify(value, null, 2)}`);

show('Hash some text', await devpack('hash', { text: 'hello world', algorithm: 'sha256' }));
show('Make a URL slug', await devpack('slug', { text: 'Hello, Wörld! This is devpack' }));
show('Convert a color', await devpack('color', { value: '#2563eb' }));
show('Find the next cron runs', await devpack('cron-next', { expression: '0 9 * * 1', count: 3 }));
show('Look up a status code', await devpack('http-status', { code: 429 }));
