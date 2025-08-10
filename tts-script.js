document.addEventListener('DOMContentLoaded', function() {
    console.log('TTS Demo page loaded');
    
    // Add animation classes to elements
    addAnimationClasses();
    
    // Handle the about link click
    const aboutLink = document.getElementById('about-link');
    if (aboutLink) {
        aboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Learn Amazigh Alphabets is an educational tool designed to help users learn the Tifinagh script used for writing the Amazigh (Berber) language in North Africa.');
        });
    }

    // Set letter count in the footer (consistency with main page)
    const letterCount = document.getElementById('letter-count');
    if (letterCount) {
        letterCount.textContent = '39 letters';
    }

    // Handle iframe loading with improved UX
    const iframe = document.querySelector('.responsive-iframe');
    const loadingMessage = document.getElementById('loading-message');
    
    if (iframe && loadingMessage) {
        // Add pulse animation to loading spinner
        const spinner = loadingMessage.querySelector('.loading-spinner');
        if (spinner) {
            spinner.style.animation = 'spin 1s linear infinite, pulse 2s infinite alternate';
        }
        
        // Fallback in case the onload attribute doesn't work
        iframe.addEventListener('load', function() {
            fadeOut(loadingMessage);
        });
        
        // Add timeout for iframe loading
        setTimeout(function() {
            if (loadingMessage.style.display !== 'none') {
                fadeOut(loadingMessage);
            }
        }, 8000); // 8 second fallback
    }
    
    // Add page transition effect
    document.body.classList.add('fade-in');
});

// Helper function to add animation classes
function addAnimationClasses() {
    const appInfo = document.querySelector('.app-info');
    const modelInfo = document.querySelector('.model-info');
    
    if (appInfo) {
        appInfo.classList.add('animate-in');
        appInfo.style.animationDelay = '0.2s';
    }
    
    if (modelInfo) {
        modelInfo.classList.add('animate-in');
        modelInfo.style.animationDelay = '0.4s';
    }
}

// Fade out helper function
function fadeOut(element) {
    element.style.opacity = '1';
    
    (function fade() {
        if ((element.style.opacity -= 0.1) < 0) {
            element.style.display = 'none';
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const keyboardSpace = document.getElementById('keyboard-space');
const keyboardBackspace = document.getElementById('keyboard-backspace');
const keyboardClose = document.getElementById('keyboard-close');
    
// Verify keyboard controls exist
if (!keyboardSpace) console.error('Keyboard space button not found');
if (!keyboardBackspace) console.error('Keyboard backspace button not found');
if (!keyboardClose) console.error('Keyboard close button not found');
    
// Tifinagh characters organized by category
const tifinaghChars = {
    common: ['ⴱ', 'ⴳ', 'ⴷ', 'ⴼ', 'ⴽ', 'ⵀ', 'ⵊ', 'ⵍ', 'ⵎ', 'ⵏ', 'ⵔ', 'ⵙ', 'ⵛ', 'ⵜ', 'ⵡ', 'ⵢ', 'ⵣ'],
    vowels: ['ⴰ', 'ⴻ', 'ⵉ', 'ⵓ'],
    special: ['ⴳⵯ', 'ⴹ', 'ⴽⵯ', 'ⵃ', 'ⵄ', 'ⵅ', 'ⵇ', 'ⵕ', 'ⵖ', 'ⵖⵯ', 'ⵚ', 'ⵟ', 'ⵥ', 'ⴺ', 'ⵞ', 'ⴵ', 'ⵒ', 'ⵠ']
};
    
// Generate virtual keyboard - rebuilt for reliability
function generateVirtualKeyboard() {
    if (!commonCharsSection || !specialCharsSection || !vowelsSection) {
        console.error('Cannot generate keyboard: sections not found');
        return;
    }
    
    console.log('Generating keyboard sections...');
    
    // Clear existing content
    commonCharsSection.innerHTML = '';
    specialCharsSection.innerHTML = '';
    vowelsSection.innerHTML = '';
    
    // Add characters to each section
    addCharactersToSection(tifinaghChars.common, commonCharsSection);
    addCharactersToSection(tifinaghChars.special, specialCharsSection, 'special');
    addCharactersToSection(tifinaghChars.vowels, vowelsSection, 'vowel');
    
    console.log('Keyboard generated successfully');
}
    
function addCharactersToSection(characters, container, className = '') {
    if (!container) return;
        
    characters.forEach(char => {
        const button = document.createElement('button');
        button.className = `keyboard-key ${className || ''}`;
        button.textContent = char;
        button.setAttribute('aria-label', `Tifinagh character ${char}`);
        button.addEventListener('click', () => {
            insertTextAtCursor(char);
        });
        container.appendChild(button);
    });
}
    
function insertTextAtCursor(text) {
    if (!inputTextArea) return;
        
    const cursorPos = inputTextArea.selectionStart;
    const textBefore = inputTextArea.value.substring(0, cursorPos);
    const textAfter = inputTextArea.value.substring(cursorPos);
        
    inputTextArea.value = textBefore + text + textAfter;
        
    // Move cursor position
    inputTextArea.selectionStart = cursorPos + text.length;
    inputTextArea.selectionEnd = cursorPos + text.length;
    inputTextArea.focus();
}
    
function deleteCharAtCursor() {
    if (!inputTextArea) return;
        
    const cursorPos = inputTextArea.selectionStart;
    if (cursorPos > 0) {
        const textBefore = inputTextArea.value.substring(0, cursorPos - 1);
        const textAfter = inputTextArea.value.substring(cursorPos);
            
        inputTextArea.value = textBefore + textAfter;
        inputTextArea.selectionStart = cursorPos - 1;
        inputTextArea.selectionEnd = cursorPos - 1;
        inputTextArea.focus();
    }
}
    
// Initialize keyboard
generateVirtualKeyboard();
    
// Setup keyboard tab functionality
keyboardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-target');
        console.log(`Tab clicked: ${targetId}`);
            
        // Update tab states
        keyboardTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
            
        // Update section visibility
        document.querySelectorAll('.keyboard-section').forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
    });
});
    
// Setup keyboard control buttons
if (keyboardSpace) {
    keyboardSpace.addEventListener('click', () => {
        insertTextAtCursor(' ');
    });
}
    
if (keyboardBackspace) {
    keyboardBackspace.addEventListener('click', () => {
        deleteCharAtCursor();
    });
}
    
if (keyboardClose) {
    keyboardClose.addEventListener('click', () => {
        virtualKeyboard.classList.add('hidden');
        toggleKeyboardButton.innerHTML = '<span class="keyboard-icon">⌨️</span> Show Virtual Keyboard';
        toggleKeyboardButton.setAttribute('aria-expanded', 'false');
    });
}
    
// Toggle keyboard visibility
if (toggleKeyboardButton) {
    toggleKeyboardButton.addEventListener('click', () => {
        console.log('Toggle keyboard visibility');
        const isVisible = !virtualKeyboard.classList.contains('hidden');
            
        virtualKeyboard.classList.toggle('hidden');
            
        toggleKeyboardButton.innerHTML = isVisible
            ? '<span class="keyboard-icon">⌨️</span> Show Virtual Keyboard'
            : '<span class="keyboard-icon">⌨️</span> Hide Virtual Keyboard';
            
        toggleKeyboardButton.setAttribute('aria-expanded', (!isVisible).toString());
    });
}
    
// Speech rate slider
if (speechRateInput && rateValueSpan) {
    speechRateInput.addEventListener('input', () => {
        rateValueSpan.textContent = speechRateInput.value;
        speechRateInput.setAttribute('aria-valuenow', speechRateInput.value);
    });
}
    
// Clear text button
if (clearButton && inputTextArea) {
    clearButton.addEventListener('click', () => {
        inputTextArea.value = '';
        if (resultSection) {
            resultSection.classList.add('hidden');
        }
        if (downloadButton) {
            downloadButton.disabled = true;
        }
    });
}
    
// Example phrase click handlers
exampleItems.forEach(item => {
    item.addEventListener('click', () => {
        const text = item.getAttribute('data-text');
        if (inputTextArea && text) {
            inputTextArea.value = text;
            if (inputTypeSelect) {
                inputTypeSelect.value = 'tifinagh';
            }
                
            // Scroll to input area
            inputTextArea.scrollIntoView({ behavior: 'smooth' });
        }
    });
        
    // Keyboard accessibility for examples
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});
    
// TTS API endpoint (placeholder)
const TTS_API_ENDPOINT = 'https://api.example.com/mms-tts-tifinagh';
    
// Generate speech functionality
if (generateButton) {
    generateButton.addEventListener('click', async () => {
        if (!inputTextArea) return;
            
        const text = inputTextArea.value.trim();
            
        if (!text) {
            alert('Please enter some text to convert to speech.');
            return;
        }
            
        console.log('Generating speech for:', text);
            
        // Show loading overlay
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
        }
            
        try {
            // Simulate API request with a delay
            await new Promise(resolve => setTimeout(resolve, 2000));
                
            // For demonstration, use a sample audio file
            const audioUrl = 'demo-audio/sample-tts.mp3';
                
            // Update audio player
            if (ttsAudio) {
                ttsAudio.src = audioUrl;
            }
                
            // Enable download button
            if (downloadButton) {
                downloadButton.disabled = false;
                downloadButton.onclick = () => {
                    const a = document.createElement('a');
                    a.href = audioUrl;
                    a.download = 'amazigh-tts.mp3';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                };
            }
                
            // Show transcription
            if (transcriptionText) {
                transcriptionText.textContent = text;
            }
                
            // Show result section
            if (resultSection) {
                resultSection.classList.remove('hidden');
            }
                
            console.log('Speech generation completed');
                
        } catch (error) {
            console.error('Error generating speech:', error);
            alert('An error occurred while generating speech. Please try again.');
        } finally {
            // Hide loading overlay
            if (loadingOverlay) {
                loadingOverlay.classList.add('hidden');
            }
        }
    });
}
    
// About link functionality
const aboutLink = document.getElementById('about-link');
if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Learn Amazigh Alphabets is an educational tool designed to help users learn the Tifinagh script used for writing the Amazigh (Berber) language in North Africa.');
    });
}
    
// Set letter count
const letterCount = document.getElementById('letter-count');
if (letterCount) {
    const totalLetters = Object.values(tifinaghChars).flat().length;
    letterCount.textContent = `${totalLetters} letters`;
}
    
console.log('TTS Script initialized successfully');
