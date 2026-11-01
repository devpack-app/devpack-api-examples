# Build a website health report

This tutorial builds a small command-line script that checks a site's status, SSL certificate, page tags and email DNS. You can run it before a launch, or on a schedule.

You'll need Node 18 or later. You don't need an API key.

## 1. Call one endpoint

Every endpoint accepts JSON in a POST body:

```bash
curl -X POST https://devpack.app/v1/status \
  -H "content-type: application/json" \
  -d '{"url":"https://example.com"}'
```

Successful responses look like `{ "ok": true, "data": { ... } }`. Errors look like `{ "ok": false, "error": { "code": "...", "message": "..." } }`.

## 2. Wrap it in a function

[`javascript/devpack.mjs`](../javascript/devpack.mjs) sends the request, returns `data` and throws a clear error when something fails.

## 3. Run several checks together

[`javascript/site-health.mjs`](../javascript/site-health.mjs) uses `Promise.allSettled`, so one failed check doesn't stop the others:

```bash
cd javascript
node site-health.mjs example.com
```

## 4. Stay within the limits

Network endpoints allow 15 requests per minute on the free plan. Each site in this script uses four, so pause between sites if you check a list.

## Next steps

- Run it daily with [GitHub Actions](https://docs.github.com/actions).
- Send failures to a chat app with a webhook.
- See every field in the [API docs](https://devpack.app/api-docs).

Prefer a visual report? Try the [SEO Checker](https://devpack.app/seo-checker) or [SSL Checker](https://devpack.app/ssl-checker).
