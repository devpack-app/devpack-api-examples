# devpack API examples

JavaScript and Python examples for the [devpack API](https://devpack.app/api-docs), which offers 50 developer utilities over HTTP: hashing, UUIDs, color conversion, DNS, SSL checks, cron schedules, A/B test maths and more.

**No API key or sign-up needed.** The examples have no dependencies.

## Try it now

```bash
curl "https://devpack.app/v1/uuid?count=2"
```

## Run the examples

**JavaScript** (Node 18 or later):

```bash
cd javascript
node quickstart.mjs
node site-health.mjs example.com
```

**Python** (3.8 or later):

```bash
cd python
python quickstart.py
python ab_test.py 5000 200 5000 250
```

## Use it in your own code

```js
import { devpack } from './devpack.mjs';

const color = await devpack('color', { value: '#2563eb' });
```

```python
from devpack import devpack

color = devpack("color", value="#2563eb")
```

## What's in this repository

| Path | What it shows |
| --- | --- |
| [`javascript/devpack.mjs`](javascript/devpack.mjs) | A small API client with error handling |
| [`javascript/quickstart.mjs`](javascript/quickstart.mjs) | Hashes, slugs, colors, cron and status codes |
| [`javascript/site-health.mjs`](javascript/site-health.mjs) | A command-line website health report |
| [`python/devpack.py`](python/devpack.py) | The same client for Python |
| [`python/quickstart.py`](python/quickstart.py) | The quickstart in Python |
| [`python/ab_test.py`](python/ab_test.py) | An A/B test significance check |
| [`javascript/ssl-expiry-monitor.mjs`](javascript/ssl-expiry-monitor.mjs) | Warns before SSL certificates expire, and fails CI when one needs renewing |
| [`python/meta_report.py`](python/meta_report.py) | Exports page titles and descriptions to a CSV, with notes on what to fix |
| [`github-actions/site-check.yml`](github-actions/site-check.yml) | A daily GitHub Actions check that your site is up and its certificate is valid |
| [`tutorials/website-health-report.md`](tutorials/website-health-report.md) | A step-by-step tutorial |

## Endpoints

| Group | Examples |
| --- | --- |
| Text and data | `hash`, `base64`, `slug`, `json-format`, `jwt-decode`, `csv-to-json` |
| Generators | `uuid`, `password`, `nanoid`, `hmac`, `lorem-ipsum` |
| Conversion | `color`, `timestamp`, `unit-convert`, `cron-next`, `http-status` |
| Marketing | `ab-test`, `ab-sample-size`, `roas`, `ad-metrics` |
| Network | `dns`, `ssl`, `status`, `headers`, `redirects`, `whois`, `meta` |

See the [full API docs](https://devpack.app/api-docs), or load the [OpenAPI file](https://devpack.app/v1/openapi.json) into your own tools.

## Rate limits

Free use is counted per IP address, with no key needed:

| Limit | Requests |
| --- | --- |
| Compute endpoints | 60 per minute |
| Network endpoints | 15 per minute |
| All endpoints | 1,000 per day |

Check the `X-RateLimit-*` response headers to see what you have left.

Send secrets, such as tokens, in a `POST` body rather than a URL, because URLs can end up in logs.

## Prefer a browser?

Many of these endpoints have a matching tool at [devpack.app](https://devpack.app), such as the [JSON Formatter](https://devpack.app/json-formatter), [SSL Checker](https://devpack.app/ssl-checker) and [CORS Tester](https://devpack.app/cors-tester).

## License

The examples in this repository are [MIT licensed](LICENSE). Your use of the API is covered by the [devpack terms](https://devpack.app/terms).
