#!/usr/bin/env node

/**
 * Script to replace hardcoded values with theme variables
 * Ensures all styling uses the theme system for easy updates
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Mapping of hardcoded values to theme variables
const REPLACEMENTS = {
  // Padding/Margin values
  'paddingTop: 20': 'paddingTop: theme.spacing.lg',
  'paddingTop: 60': 'paddingTop: theme.spacing["3xl"]',
  'paddingVertical: 20': 'paddingVertical: theme.spacing.lg',
  'paddingVertical: 22': 'paddingVertical: theme.spacing.xl',
  'paddingVertical: 24': 'paddingVertical: theme.spacing.xl',
  'paddingHorizontal: 32': 'paddingHorizontal: theme.spacing["2xl"]',
  'paddingVertical: 4': 'paddingVertical: theme.spacing.xs / 2',
  'marginTop: 2': 'marginTop: theme.spacing.xs / 4',
  'marginBottom: 2': 'marginBottom: theme.spacing.xs / 4',
  
  // Font sizes - map to typography.fontSize
  'fontSize: 10': 'fontSize: theme.typography.fontSize.xs',
  'fontSize: 12': 'fontSize: theme.typography.fontSize.xs',
  'fontSize: 13': 'fontSize: theme.typography.fontSize.sm',
  'fontSize: 14': 'fontSize: theme.typography.fontSize.sm',
  'fontSize: 15': 'fontSize: theme.typography.fontSize.base',
  'fontSize: 16': 'fontSize: theme.typography.fontSize.base',
  'fontSize: 17': 'fontSize: theme.typography.fontSize.base',
  'fontSize: 18': 'fontSize: theme.typography.fontSize.lg',
  'fontSize: 20': 'fontSize: theme.typography.fontSize.xl',
  'fontSize: 24': 'fontSize: theme.typography.fontSize["2xl"]',
  'fontSize: 28': 'fontSize: theme.typography.fontSize["3xl"]',
  'fontSize: 32': 'fontSize: theme.typography.fontSize["4xl"]',
  'fontSize: 36': 'fontSize: theme.typography.fontSize["4xl"]',
  'fontSize: 42': 'fontSize: theme.typography.fontSize["5xl"]',
};

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  for (const [oldValue, newValue] of Object.entries(REPLACEMENTS)) {
    if (content.includes(oldValue)) {
      content = content.replace(new RegExp(oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newValue);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${filePath}`);
    return true;
  }
  
  return false;
}

// Find all style files
const styleFiles = glob.sync('app/**/*.styles.tsx', { 
  cwd: path.join(__dirname, '..'),
  absolute: true 
});

const componentFiles = glob.sync('app/components/**/*.tsx', {
  cwd: path.join(__dirname, '..'),
  absolute: true
});

const allFiles = [...styleFiles, ...componentFiles];

console.log(`Found ${allFiles.length} files to check...\n`);

let fixedCount = 0;
allFiles.forEach(file => {
  if (fixFile(file)) {
    fixedCount++;
  }
});

console.log(`\n✓ Fixed ${fixedCount} files`);
console.log('✓ All hardcoded values replaced with theme variables');
