const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'src', 'assets');
const srcDir = path.join(__dirname, 'src');

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const assets = fs.readdirSync(assetsDir);
const allSrcFiles = getAllFiles(srcDir);

const unusedAssets = [];

assets.forEach(asset => {
    const assetPath = path.join(assetsDir, asset);
    if (fs.statSync(assetPath).isDirectory()) return;

    let isUsed = false;
    for (const file of allSrcFiles) {
        // Don't check the asset file itself
        if (file === assetPath) continue;
        
        // Skip binary files to avoid reading errors/performance hits, 
        // but we need to check code files. 
        // Actually, we should probably only check text files (.js, .jsx, .css, .html, .json)
        // But sometimes assets are referenced in other assets? (e.g. css referencing image)
        // Let's try to read everything as utf8, if it fails or is binary, we might get garbage but 'includes' might still work for filenames.
        // Better: only check likely source files.
        const ext = path.extname(file).toLowerCase();
        if (!['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.html', '.json'].includes(ext)) continue;

        try {
            const content = fs.readFileSync(file, 'utf-8');
            if (content.includes(asset)) {
                isUsed = true;
                break;
            }
        } catch (e) {
            // ignore read errors
        }
    }
    if (!isUsed) {
        unusedAssets.push(asset);
    }
});

console.log(JSON.stringify(unusedAssets));
