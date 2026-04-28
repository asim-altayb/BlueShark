const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'src', 'assets');

const filesToDelete = [
    "blue.jpg", "camb (10).jpg", "camb (11).jpg", "camb (12).jpg", "camb (14).jpg",
    "camb (16).jpg", "camb (17).jpg", "camb (18).jpg", "camb (19).jpg", "camb (2).jpg",
    "camb (20).jpg", "camb (21).jpg", "camb (22).jpg", "camb (23).jpg", "camb (24).jpg",
    "camb (25).jpg", "camb (3).jpg", "camb (5).jpg", "camb (6).jpg", "camb (7).jpg",
    "camb (9).jpg", "camb3.jpg", "camb4.webp", "crack (1).jpg", "dive.mp4",
    "dolphin.jpg", "dolphin3.webp", "dolphin4.jpg", "food.jpg", "food2.jpg",
    "food3.jpg", "foodw.webp", "foodw2.jpg", "foodw3.webp", "foodw4.webp",
    "foodw5.jpg", "foodw6.webp", "foodw7.webp", "foodw8.jpg", "foodw9.avif",
    "gedo (1).jpg", "gedo (13).jpg", "gedo (15).jpg", "gedo (16).jpg", "gedo (17).jpg",
    "gedo (18).jpg", "gedo (19).jpg", "gedo (20).jpg", "gedo (21).jpg", "gedo (3).jpg",
    "gedo (6).jpg", "gedo (7).jpg", "gido (11).jpg", "gido (15).jpg", "gido (16).jpg",
    "gido (22).jpg", "gido (9).jpg", "hus4.jpg", "hus5.jpg", "IMG-20251117-WA0036.jpg",
    "jelly.jpg", "jelly2.avif", "jelly3.jpg", "jelly4.webp", "masharf (5).jpg",
    "ombria.mp4", "omria2.jpg", "omriacut (1).png", "omriacut (2).png", "papper.jpg",
    "romy.webp", "sea.jpg", "seashell.webp", "seashell2.webp", "seashell3.webp",
    "seashell4.jpg", "seashell5.jpg", "seashell7.webp", "seaship.webp", "seaship2.jpg",
    "shel.avif", "shiohero2.jpg", "ship.webp", "shipcut.webp", "shipcut1.png",
    "shiphero.jpg", "shiphero3.jpg", "shiphero5.avif", "shore2.jpg", "shore3.jpg",
    "slelll.webp", "star2.jpg", "star3.avif", "sun.jpg", "supply2.jpg"
];

filesToDelete.forEach(file => {
    const filePath = path.join(assetsDir, file);
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted: ${file}`);
        } else {
            console.log(`File not found (already deleted?): ${file}`);
        }
    } catch (err) {
        console.error(`Error deleting ${file}:`, err);
    }
});
