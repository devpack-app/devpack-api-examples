"""Small client for the devpack API. Needs Python 3.8 or later, and has no dependencies."""
import json
import urllib.error
import urllib.request

BASE_URL = "https://devpack.app/v1"


class DevpackError(Exception):
    def __init__(self, status, code, message):
        super().__init__(message)
        self.status = status
        self.code = code


def devpack(endpoint, **params):
    """Call an endpoint and return its data. Parameters go in a POST body, so secrets stay out of URLs and logs."""
    request = urllib.request.Request(
        f"{BASE_URL}/{endpoint}",
        data=json.dumps(params).encode(),
        headers={"content-type": "application/json", "user-agent": "devpack-api-examples"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.load(response)["data"]
    except urllib.error.HTTPError as error:
        details = json.load(error)["error"]
        raise DevpackError(error.code, details["code"], details["message"]) from None
