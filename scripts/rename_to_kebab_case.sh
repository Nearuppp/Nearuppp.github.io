#!/bin/bash

# Target directory
TARGET_DIR="/home/matth/Documents/Projects/Nearuppp.github.io/Nearuppp.github.io/content/knowledge-hub"

# Go to the directory
cd "$TARGET_DIR" || { echo "❌ Cannot access $TARGET_DIR"; exit 1; }

echo "🔤 Renaming .md files in $TARGET_DIR to kebab-case..."

# Loop through all markdown files
for file in *.md; do
  # Skip if no markdown files found
  [[ -e "$file" ]] || { echo "No markdown files found."; exit 0; }

  # Convert to kebab-case
  kebab=$(echo "$file" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g' | sed -E 's/^-+|-+\.md$//g').md

  # Only rename if changed
  if [[ "$file" != "$kebab" ]]; then
    mv -v "$file" "$kebab"
  fi
done

echo "✅ Renaming complete."
