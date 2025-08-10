// Amazigh alphabet data with audio file paths
const amazighAlphabet = [
    { letter: "ⴰ", name: "Ya", sound: "a (like \"a\" in \"car\")", audioFile: "audio/a.mp3" },
    { letter: "ⴱ", name: "Yab", sound: "b (as in \"bat\")", audioFile: "audio/b.mp3" },
    { letter: "ⴳ", name: "Yag", sound: "g (hard \"g\" in \"go\")", audioFile: "audio/g.mp3" },
    { letter: "ⴳⵯ", name: "Yagw", sound: "gw (like \"gu\" in \"guava\")", audioFile: "audio/gw.mp3" },
    { letter: "ⴷ", name: "Yad", sound: "d (as in \"dog\")", audioFile: "audio/d.mp3" },
    { letter: "ⴹ", name: "Yaḍ", sound: "ḍ (emphatic d, tongue pressed to roof)", audioFile: "audio/dd.mp3" },
    { letter: "ⴻ", name: "Ye", sound: "e (like \"e\" in \"bed\")", audioFile: "audio/e.mp3" },
    { letter: "ⴼ", name: "Yaf", sound: "f (as in \"fun\")", audioFile: "audio/f.mp3" },
    { letter: "ⴽ", name: "Yak", sound: "k (as in \"cat\")", audioFile: "audio/k.mp3" },
    { letter: "ⴽⵯ", name: "Yakw", sound: "kw (like \"qu\" in \"queen\")", audioFile: "audio/kw.mp3" },
    { letter: "ⵀ", name: "Yah", sound: "h (as in \"hat\")", audioFile: "audio/h.mp3" },
    { letter: "ⵃ", name: "Yaḥ", sound: "ḥ (strong h, like Arabic ح)", audioFile: "audio/hh.mp3" },
    { letter: "ⵄ", name: "Yaɛ", sound: "ʿ (like Arabic ع, voiced throat sound)", audioFile: "audio/ain.mp3" },
    { letter: "ⵅ", name: "Yakh", sound: "kh (as in \"Bach\" or Arabic خ)", audioFile: "audio/kh.mp3" },
    { letter: "ⵇ", name: "Yaq", sound: "q (deep k, like Arabic ق)", audioFile: "audio/q.mp3" },
    { letter: "ⵉ", name: "Yi", sound: "i (like \"ee\" in \"see\")", audioFile: "audio/i.mp3" },
    { letter: "ⵊ", name: "Yaj", sound: "j (as in French \"jour\")", audioFile: "audio/j.mp3" },
    { letter: "ⵍ", name: "Yal", sound: "l (as in \"love\")", audioFile: "audio/l.mp3" },
    { letter: "ⵎ", name: "Yam", sound: "m (as in \"man\")", audioFile: "audio/m.mp3" },
    { letter: "ⵏ", name: "Yan", sound: "n (as in \"net\")", audioFile: "audio/n.mp3" },
    { letter: "ⵓ", name: "Yu", sound: "u (like \"oo\" in \"food\")", audioFile: "audio/u.mp3" },
    { letter: "ⵔ", name: "Yar", sound: "r (rolled/trilled r)", audioFile: "audio/r.mp3" },
    { letter: "ⵕ", name: "Yaṛ", sound: "ṛ (emphatic r, deeper)", audioFile: "audio/rr.mp3" },
    { letter: "ⵖ", name: "Yaɣ", sound: "gh (French \"r\" or Arabic غ)", audioFile: "audio/gh.mp3" },
    { letter: "ⵖⵯ", name: "Yaɣw", sound: "ghw (gh + w sound)", audioFile: "audio/ghw.mp3" },
    { letter: "ⵙ", name: "Yas", sound: "s (as in \"sun\")", audioFile: "audio/s.mp3" },
    { letter: "ⵚ", name: "Yaṣ", sound: "ṣ (emphatic s)", audioFile: "audio/ss.mp3" },
    { letter: "ⵛ", name: "Yac", sound: "sh (as in \"shoe\")", audioFile: "audio/sh.mp3" },
    { letter: "ⵜ", name: "Yat", sound: "t (as in \"top\")", audioFile: "audio/t.mp3" },
    { letter: "ⵟ", name: "Yaṭ", sound: "ṭ (emphatic t)", audioFile: "audio/tt.mp3" },
    { letter: "ⵡ", name: "Yaw", sound: "w (as in \"we\")", audioFile: "audio/w.mp3" },
    { letter: "ⵢ", name: "Yay", sound: "y (as in \"yes\")", audioFile: "audio/y.mp3" },
    { letter: "ⵣ", name: "Yaz", sound: "z (as in \"zoo\")", audioFile: "audio/z.mp3" },
    { letter: "ⵥ", name: "Yaẓ", sound: "ẓ (emphatic z)", audioFile: "audio/zz.mp3" },
    { letter: "ⴺ", name: "Yaḏ", sound: "ḍ̣ (another emphatic d, close to ⴹ)", audioFile: "audio/dh.mp3" },
    { letter: "ⵞ", name: "Yaç", sound: "tch (like \"ch\" in \"church\")", audioFile: "audio/c.mp3" },
    { letter: "ⴵ", name: "Yaɣ̌", sound: "dj (like \"j\" in \"juice\")", audioFile: "audio/gh2.mp3" },
    { letter: "ⵒ", name: "Yaḇ", sound: "p (as in \"pen\")", audioFile: "audio/bh.mp3" },
    { letter: "ⵠ", name: "Yav", sound: "v (as in \"van\")", audioFile: "audio/v.mp3" }
];

// Audio player for custom sounds
let audioPlayer = new Audio();
let currentAudio = '';
let currentIndex = 0;
const loadingOverlay = document.getElementById('loading-overlay');

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Generate alphabet grid
document.addEventListener('DOMContentLoaded', function() {
    const alphabetGrid = document.getElementById('alphabet-grid');
    const audioStatus = document.getElementById('audio-status');
    
    // Create tiles for each letter
    amazighAlphabet.forEach((item, index) => {
        const tile = document.createElement('div');
        tile.className = 'alphabet-tile';
        tile.setAttribute('tabindex', '0'); // Make focusable for keyboard navigation
        tile.setAttribute('role', 'button');
        tile.setAttribute('aria-label', `Letter ${item.name}, ${item.sound}`);
        tile.innerHTML = `
            <div class="alphabet-letter">${item.letter}</div>
            <div class="alphabet-name">${item.name}</div>
        `;
        
        // Add click event to show in practice area
        tile.addEventListener('click', () => {
            displayLetter(item);
            currentIndex = index;
            // Update URL without refreshing page
            history.replaceState(null, '', `?letter=${index}`);
        });
        
        // Keyboard accessibility
        tile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tile.click();
            }
        });
        
        alphabetGrid.appendChild(tile);
    });
    
    // Check URL for letter parameter
    const letterParam = getUrlParameter('letter');
    if (letterParam && !isNaN(parseInt(letterParam)) && parseInt(letterParam) < amazighAlphabet.length) {
        currentIndex = parseInt(letterParam);
    }
    
    // Initialize practice area
    displayLetter(amazighAlphabet[currentIndex]);
    
    // Set letter count in footer
    document.getElementById('letter-count').textContent = `${amazighAlphabet.length} letters`;
    
    // Add event listeners for practice controls
    document.getElementById('next-letter').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % amazighAlphabet.length;
        displayLetter(amazighAlphabet[currentIndex]);
        history.replaceState(null, '', `?letter=${currentIndex}`);
    });
    
    document.getElementById('prev-letter').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + amazighAlphabet.length) % amazighAlphabet.length;
        displayLetter(amazighAlphabet[currentIndex]);
        history.replaceState(null, '', `?letter=${currentIndex}`);
    });
    
    document.getElementById('play-sound').addEventListener('click', () => {
        playLetterAudio(amazighAlphabet[currentIndex]);
    });
    
    // Audio events
    audioPlayer.addEventListener('playing', () => {
        audioStatus.textContent = 'Playing...';
        audioStatus.className = 'audio-status playing';
        loadingOverlay.classList.add('hidden');
    });
    
    audioPlayer.addEventListener('ended', () => {
        audioStatus.textContent = '';
        audioStatus.className = 'audio-status';
    });
    
    audioPlayer.addEventListener('error', () => {
        audioStatus.textContent = 'Audio not available';
        audioStatus.className = 'audio-status error';
        loadingOverlay.classList.add('hidden');
        setTimeout(() => {
            audioStatus.textContent = '';
            audioStatus.className = 'audio-status';
        }, 2000);
    });
    
    audioPlayer.addEventListener('waiting', () => {
        loadingOverlay.classList.remove('hidden');
    });
    
    // About link functionality
    document.getElementById('about-link').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Learn Amazigh Alphabets is an educational tool designed to help users learn the Tifinagh script used for writing the Amazigh (Berber) language in North Africa.');
    });
});

// Function to display a letter in the practice area
function displayLetter(letterData) {
    document.getElementById('current-letter').textContent = letterData.letter;
    document.getElementById('letter-name').textContent = letterData.name;
    document.getElementById('letter-sound').textContent = letterData.sound;
    currentAudio = letterData.audioFile;
}

// Function to play letter audio
function playLetterAudio(letterData) {
    if (letterData.audioFile) {
        // Show loading initially
        loadingOverlay.classList.remove('hidden');
        
        // Stop current audio if playing
        audioPlayer.pause();
        audioPlayer.src = letterData.audioFile;
        
        // Set a timeout in case the audio never loads
        const timeoutId = setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            document.getElementById('audio-status').textContent = 'Audio loading timed out';
            document.getElementById('audio-status').className = 'audio-status error';
        }, 8000);
        
        // Try to play the audio
        audioPlayer.load();
        audioPlayer.play().then(() => {
            clearTimeout(timeoutId);
        }).catch(error => {
            clearTimeout(timeoutId);
            console.error('Error playing audio:', error);
            document.getElementById('audio-status').textContent = 'Error playing audio';
            document.getElementById('audio-status').className = 'audio-status error';
            loadingOverlay.classList.add('hidden');
        });
    }
}

// Keyboard navigation for the page
document.addEventListener('keydown', (e) => {
    // Allow arrow keys to navigate letters in practice mode
    if (e.key === 'ArrowRight') {
        document.getElementById('next-letter').click();
    } else if (e.key === 'ArrowLeft') {
        document.getElementById('prev-letter').click();
    } else if (e.key === 'ArrowDown' || e.key === ' ') {
        // Space or down arrow to play sound
        if (document.activeElement === document.getElementById('play-sound') || 
            document.activeElement.tagName !== 'BUTTON') {
            e.preventDefault(); // Prevent page scrolling
            document.getElementById('play-sound').click();
        }
    }
});
