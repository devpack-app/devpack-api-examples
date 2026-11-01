// Small client for the devpack API. Needs Node 18 or later, and has no dependencies.
const BASE_URL = 'https://devpack.app/v1';

export class DevpackError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

// Calls an endpoint and returns its data. Parameters go in a POST body, so secrets stay out of URLs and logs.
export async function devpack(endpoint, params = {}) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(params),
  });
  const body = await response.json();
  if (!body.ok) throw new DevpackError(response.status, body.error.code, body.error.message);
  return body.data;
}
