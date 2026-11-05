"""Export the SEO title and description of several pages to a CSV file.

Run with: python meta_report.py https://example.com https://devpack.app
Writes meta-report.csv, with a note on each page that needs attention.
"""
import csv
import sys

from devpack import DevpackError, devpack

urls = sys.argv[1:]
if not urls:
    sys.exit(__doc__)


def notes(page):
    found = []
    title, description = page.get("title") or "", page.get("description") or ""
    if not title:
        found.append("missing title")
    elif len(title) > 60:
        found.append("title over 60 characters")
    if not description:
        found.append("missing description")
    elif len(description) > 160:
        found.append("description over 160 characters")
    if not (page.get("openGraph") or {}).get("image"):
        found.append("no social image")
    return "; ".join(found) or "ok"


with open("meta-report.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["url", "status", "title", "description", "notes"])
    for url in urls:
        try:
            page = devpack("meta", url=url)
            writer.writerow([page["url"], page["status"], page.get("title") or "", page.get("description") or "", notes(page)])
            print(f"{notes(page):40} {url}")
        except DevpackError as error:
            writer.writerow([url, error.status, "", "", error])
            print(f"{'error':40} {url}: {error}")

print("\nSaved meta-report.csv")
