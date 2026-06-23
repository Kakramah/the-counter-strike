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

// Form Submission (Web3Forms API Integration)
async function submitPledge() {
    const nameInput = document.getElementById('citizenName');
    const feedback = document.getElementById('formFeedback');
    const btn = document.querySelector('.submit-btn');
    const name = nameInput.value.trim();
    
    if(name !== "") {
        btn.innerHTML = "جاري التوثيق...";
        btn.disabled = true;
        btn.style.opacity = "0.7";
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '2527772c-69c7-4bd9-9319-a5b705e44bac',
                    subject: 'الالتزام بوثيقة الوعي - الضربة المعاكسة',
                    name: name
                })
            });
            
            if(response.ok) {
                btn.innerHTML = "تم التوثيق";
                btn.style.background = "var(--accent-gold)";
                btn.style.color = "white";
                
                feedback.style.color = "var(--accent-gold)";
                feedback.innerHTML = `شكراً لوعيك يا ${name}. صمتك ضربة موجعة للتفاهة.`;
                nameInput.value = "";
                nameInput.disabled = true;
            } else {
                btn.innerHTML = "فشل التوثيق";
                btn.disabled = false;
                btn.style.opacity = "1";
                feedback.style.color = "#ff4444";
                feedback.innerHTML = "حدث خطأ أثناء التوثيق. حاول مجدداً.";
            }
        } catch (error) {
            btn.innerHTML = "خطأ في الاتصال";
            btn.disabled = false;
            btn.style.opacity = "1";
            feedback.style.color = "#ff4444";
            feedback.innerHTML = "تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.";
        }
    }
}
