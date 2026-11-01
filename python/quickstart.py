"""Run with: python quickstart.py"""
import json

from devpack import devpack


def show(label, value):
    print(f"\n{label}\n{json.dumps(value, indent=2, ensure_ascii=False)}")


show("Hash some text", devpack("hash", text="hello world", algorithm="sha256"))
show("Make a URL slug", devpack("slug", text="Hello, Wörld! This is devpack"))
show("Convert a color", devpack("color", value="#2563eb"))
show("Find the next cron runs", devpack("cron-next", expression="0 9 * * 1", count=3))
show("Look up a status code", devpack("http-status", code=429))
