#!/bin/bash

# Define paths
VAULT_DIR="/home/matth/Documents/Projects/my-obsidian-vault"
VAULT_IMG_DIR="$VAULT_DIR/images"
DEST_MD_DIR="/home/matth/Documents/Projects/Nearuppp.github.io/Nearuppp.github.io/content/knowledge-hub"
DEST_IMG_DIR="/home/matth/Documents/Projects/Nearuppp.github.io/Nearuppp.github.io/public/images"

# Create destination directories if they don't exist
mkdir -p "$DEST_MD_DIR"
mkdir -p "$DEST_IMG_DIR"

echo "🔍 Copying markdown files (excluding 'Excalidraw' folders)..."

# Find and copy all .md files except those under any directory named 'Excalidraw'
find "$VAULT_DIR" \
  -type d -name "Excalidraw" -prune -false -o \
  -type f -name "*.md" -exec cp {} "$DEST_MD_DIR" \;

echo "🖼️ Copying images from images folder..."
# Copy all image files from images folder
cp -r "$VAULT_IMG_DIR/"* "$DEST_IMG_DIR"

echo "✅ Markdown and image files copied successfully (Excalidraw excluded)."
