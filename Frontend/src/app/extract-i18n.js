const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Define languages to generate
const languages = ['en', 'de']; // Add more languages as needed

// Define the i18n directory
const i18nDir = path.resolve(__dirname, '../assets/i18n/');

// Ensure the i18n directory exists
if (!fs.existsSync(i18nDir)) {
    fs.mkdirSync(i18nDir, { recursive: true });
}

// Find all .html and .ts files
const files = glob.sync(path.resolve(__dirname, '../**/*.{html,ts}'));

// Regex for extracting translation keys
const translationRegex = /\{\{\s*'([^']+)' \|\s*translate\s*\}\}/g;
const tsRegex = /translate\.instant\(['"]([^'"]+)['"]\)/g;

// Extract translation keys
const translationKeys = new Set();
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = translationRegex.exec(content)) !== null) {
        translationKeys.add(match[1]);
    }
    while ((match = tsRegex.exec(content)) !== null) {
        translationKeys.add(match[1]);
    }
});

// Process each language
languages.forEach(lang => {
    const langJsonPath = path.join(i18nDir, `${lang}.json`);

    // Load existing translations if file exists
    let existingTranslations = {};
    if (fs.existsSync(langJsonPath)) {
        existingTranslations = JSON.parse(fs.readFileSync(langJsonPath, 'utf8'));
    }

    // Merge with extracted keys
    const updatedTranslations = {};
    translationKeys.forEach(key => {
        updatedTranslations[key] = existingTranslations[key] || "";
    });

    // Save back to JSON
    fs.writeFileSync(langJsonPath, JSON.stringify(updatedTranslations, null, 2));
    console.log(`✅ Translations extracted for: ${lang}.json`);
});

console.log("🚀 i18n Extraction Complete!");
