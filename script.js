// Just a fun console log to say hi!
console.log("Hey there 👋, thanks for checking out my code!");

window.addEventListener('load', () => {
    alert("Welcome to my personal website! 🧠✨");
});

// 📅 Utility to get timestamp
function getTimestamp() {
    return new Date().toLocaleString();
}

// 🖱️ Click event listener
document.addEventListener('click', (event) => {
    const target = event.target;
    const type = identifyElementType(target);
    console.log(`[${getTimestamp()}], Event: click, Element: ${type}`);
});

// 👀 Intersection Observer to track section views
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const type = identifyElementType(entry.target);
            console.log(`[${getTimestamp()}], Event: view, Element: ${type}`);
        }
    });
}, { threshold: 0.5 });

// Attach observer to important sections
document.querySelectorAll('section, img, a, p').forEach(el => {
    observer.observe(el);
});

// 🧠 Function to identify the element type
function identifyElementType(el) {
    if (el.tagName === 'IMG') return 'image';
    if (el.tagName === 'A') return 'hyperlink';
    if (el.tagName === 'P') return 'text';
    if (el.tagName === 'H2' || el.tagName === 'H1') return 'header';
    if (el.tagName === 'SELECT') return 'dropdown';
    if (el.tagName === 'UL' || el.tagName === 'LI') return 'list item';
    if (el.closest('section')) {
        return el.closest('section').className || 'section';
    }
    return el.tagName.toLowerCase();
}

function analyzeText() {
    const text = document.getElementById("inputText").value;

    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const words = (text.match(/\b\w+\b/g) || []).length;
    const spaces = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];

    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'our', 'their'];
    const prepositions = ['in', 'on', 'at', 'by', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'from', 'up', 'down', 'over', 'under', 'to', 'of', 'for'];
    const articles = ['a', 'an'];

    const countTokens = (tokenList) => {
        const countMap = {};
        for (let word of tokens) {
            if (tokenList.includes(word)) {
                countMap[word] = (countMap[word] || 0) + 1;
            }
        }
        return countMap;
    };

    const pronounCount = countTokens(pronouns);
    const prepositionCount = countTokens(prepositions);
    const articleCount = countTokens(articles);

    let result = `
Letters: ${letters}
Words: ${words}
Spaces: ${spaces}
Newlines: ${newlines}
Special Symbols: ${specialSymbols}

Pronouns:
${JSON.stringify(pronounCount, null, 2)}

Prepositions:
${JSON.stringify(prepositionCount, null, 2)}

Indefinite Articles:
${JSON.stringify(articleCount, null, 2)}
    `;

    document.getElementById("analysisResult").textContent = result;
}

// Lightbox functionality
document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    });
});

document.querySelector('.lightbox .close').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.getElementById('lightbox').style.display = 'none';
    }
});

document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    document.getElementById("themeToggle").textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});
