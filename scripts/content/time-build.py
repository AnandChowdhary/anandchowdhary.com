"""Measure one complete build and its waited-for children on Linux."""
import json
import resource
import subprocess
import sys
import time

started = time.monotonic()
result = subprocess.run(sys.argv[2:])
usage = resource.getrusage(resource.RUSAGE_CHILDREN)
with open(sys.argv[1], "w") as output:
    json.dump({"elapsedSeconds": time.monotonic() - started,
               "userSeconds": usage.ru_utime,
               "systemSeconds": usage.ru_stime,
               "maxProcessRssKiB": usage.ru_maxrss}, output)
sys.exit(result.returncode)
