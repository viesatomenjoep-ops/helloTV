import os

def check_brackets(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Just a basic check for unmatched brackets
    stack = []
    for i, char in enumerate(content):
        # Ignore strings roughly
        if char in '({[':
            stack.append((char, i))
        elif char in ')}]':
            if not stack:
                return f"Unmatched {char} at index {i}"
            top, _ = stack.pop()
            if (top == '(' and char != ')') or \
               (top == '{' and char != '}') or \
               (top == '[' and char != ']'):
                return f"Mismatched {top} and {char} at index {i}"
    
    # This is too naive for JSX, so let's just ask the user for the Vercel error.
