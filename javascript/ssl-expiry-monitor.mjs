// Warns you before SSL certificates expire. Exits with code 1 if any certificate needs attention,
// so it can fail a CI job or a cron alert.
// Run with: node ssl-expiry-monitor.mjs example.com devpack.app
import { devpack } from './devpack.mjs';

const domains = process.argv.slice(2);
const WARN_DAYS = 21;
if (!domains.length) {
  console.error('Usage: node ssl-expiry-monitor.mjs example.com another-site.com');
  process.exit(1);
}

let problems = 0;
for (const domain of domains) {
  try {
    const cert = await devpack('ssl', { domain });
    const soon = cert.daysLeft <= WARN_DAYS;
    if (!cert.valid || soon) problems++;
    const state = !cert.valid ? 'INVALID' : soon ? 'RENEW SOON' : 'OK';
    console.log(`${state.padEnd(10)} ${domain.padEnd(30)} ${cert.daysLeft} days left (expires ${cert.validTo})`);
  } catch (error) {
    problems++;
    console.log(`${'ERROR'.padEnd(10)} ${domain.padEnd(30)} ${error.message}`);
  }
}
process.exit(problems ? 1 : 0);
