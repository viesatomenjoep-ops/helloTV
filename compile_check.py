import subprocess
import os

# Create a temporary dummy tsconfig just to see if any TS errors pop up
# Note: we don't have tsc, but we can try to find if there's a way to run tsc via node_modules
if os.path.exists('node_modules/.bin/tsc'):
    print("tsc exists, running it...")
    result = subprocess.run(['./node_modules/.bin/tsc', '--noEmit'], capture_output=True, text=True)
    print(result.stdout)
    print(result.stderr)
else:
    print("tsc not found in node_modules")
