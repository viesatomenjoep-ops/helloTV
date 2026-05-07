import os
import re

def check_dir(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                full_path = os.path.join(root, file)
                with open(full_path, 'r') as f:
                    content = f.readlines()
                
                states = set()
                for i, line in enumerate(content):
                    match = re.search(r'const\s+\[\s*([a-zA-Z0-9_]+)\s*,', line)
                    if match:
                        v = match.group(1)
                        if v in states:
                            print(f"Duplicate state {v} in {full_path}:{i+1}")
                        states.add(v)

check_dir('src')
