const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const outputDir = path.join(__dirname, 'public');
const outputFile = path.join(outputDir, 'index.html');

try {
    // Ensure public directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Read template, styles, script, and data
    let template = fs.readFileSync(path.join(srcDir, 'template.html'), 'utf8');
    const styles = fs.readFileSync(path.join(srcDir, 'styles.css'), 'utf8');
    const script = fs.readFileSync(path.join(srcDir, 'script.js'), 'utf8');
    const talksData = fs.readFileSync(path.join(srcDir, 'talks.json'), 'utf8');

    // Inject content into the template
    template = template.replace('{{STYLES}}', styles);
    template = template.replace('{{SCRIPT}}', script);
    template = template.replace('{{TALK_DATA}}', talksData);

    // Write the final index.html
    fs.writeFileSync(outputFile, template);

    console.log(`Successfully built ${outputFile}`);

} catch (error) {
    console.error('Error building the website:', error);
    process.exit(1);
}
