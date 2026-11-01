// Prints a quick health report for a website.
// Run with: node site-health.mjs example.com
import { devpack } from './devpack.mjs';

const site = process.argv[2];
if (!site) {
  console.error('Usage: node site-health.mjs example.com');
  process.exit(1);
}
const domain = site.replace(/^https?:\/\//, '').split('/')[0];
const url = `https://${domain}`;

// each check runs on its own, so one failure doesn't stop the report
const checks = {
  Status: ['status', { url }],
  SSL: ['ssl', { domain }],
  'Page tags': ['meta', { url }],
  'Email DNS': ['email-dns', { domain }],
};

const names = Object.keys(checks);
const results = await Promise.allSettled(names.map(n => devpack(...checks[n])));

console.log(`Health report for ${domain}\n`);
results.forEach((result, i) => {
  if (result.status === 'fulfilled') console.log(`${names[i]}\n${JSON.stringify(result.value, null, 2)}\n`);
  else console.log(`${names[i]}\nFailed: ${result.reason.message}\n`);
});
