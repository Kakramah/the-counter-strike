document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    const revealTexts = document.querySelectorAll('.reveal-text');
    
    // Scroll Event Listener for Parallax and Reveal
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        
        // 1. Parallax Backgrounds
        parallaxBgs.forEach(bg => {
            const speed = 0.4; // The parallax speed
            const rect = bg.parentElement.getBoundingClientRect();
            
            // Only animate if the section is in the viewport
            if(rect.top < window.innerHeight && rect.bottom > 0) {
                // Calculate how far the element is from the center of the screen
                const centerOffset = window.innerHeight / 2 - (rect.top + rect.height / 2);
                const yPos = centerOffset * speed;
                bg.style.transform = `translateY(${yPos}px)`;
            }
        });

        // 2. Reveal Text Elements
        revealTexts.forEach(text => {
            const rect = text.getBoundingClientRect();
            // Reveal when the element is 85% into the viewport
            if(rect.top < window.innerHeight * 0.85) {
                text.classList.add('visible');
            }
        });
    });

    // Trigger scroll once to reveal elements already in view
    window.dispatchEvent(new Event('scroll'));
});

// Form Submission (No alerts allowed)
function submitPledge() {
    const nameInput = document.getElementById('citizenName');
    const feedback = document.getElementById('formFeedback');
    const btn = document.querySelector('.submit-btn');
    
    if(nameInput.value.trim() !== "") {
        // Simulate network request
        btn.innerHTML = "جاري التوثيق...";
        btn.style.opacity = "0.7";
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = "تم التوثيق";
            btn.style.background = "var(--accent-gold)";
            btn.style.color = "white";
            
            feedback.style.color = "var(--accent-gold)";
            feedback.innerHTML = `شكراً لوعيك يا ${nameInput.value}. صمتك ضربة موجعة للتفاهة.`;
            nameInput.value = "";
            nameInput.disabled = true;
        }, 1500);
    }
}
