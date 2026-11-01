"""Check whether an A/B test result is significant.

Run with: python ab_test.py 5000 200 5000 250
Arguments: visitors_a conversions_a visitors_b conversions_b
"""
import json
import sys

from devpack import devpack

if len(sys.argv) != 5:
    sys.exit(__doc__)

visitors_a, conversions_a, visitors_b, conversions_b = map(int, sys.argv[1:])
result = devpack(
    "ab-test",
    visitors_a=visitors_a,
    conversions_a=conversions_a,
    visitors_b=visitors_b,
    conversions_b=conversions_b,
)
print(json.dumps(result, indent=2))
