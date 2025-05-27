document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('.start-btn');
    const proposalPopup = document.getElementById('proposalPopup');
    const successMessage = document.getElementById('successMessage');
    const yesBtn = document.querySelector('.yes-btn');
    const noBtn = document.querySelector('.no-btn');
    const floatingHearts = document.querySelector('.floating-hearts');
    const proposalText = document.getElementById('proposal-text');
    const quoteText = document.querySelector('.quote-text');

    const romanticProposals = [
        "I can't imagine my life without you 🥺",
        "You're the missing piece to my heart 💝",
        "Please be mine forever 💕",
        "My heart beats only for you 💓",
        "I promise to love you forever 🌹",
        "You're my dream come true 💫",
        "Let me be your forever person 💑",
        "My love for you grows stronger each day 💖",
        "You're the answer to all my prayers 🙏",
        "Let's write our love story together 📝💕"
    ];

    const romanticQuotes = [
        "In your eyes, I found my home. In your heart, I found my love. In your soul, I found my purpose. 💑",
        "Every love story is beautiful, but ours will be my favorite. 💕",
        "You're not just my love, you're my soul's recognition. 💖",
        "With you, forever doesn't seem long enough. 💝",
        "You're the first and last thing on my mind each and every day. 💫",
        "I choose you. And I'll choose you over and over. Without pause, without doubt, in a heartbeat. I'll keep choosing you. 💑"
    ];

    let currentProposalIndex = 0;

    // Start button click handler
    startBtn.addEventListener('click', () => {
        proposalPopup.style.display = 'flex';
        proposalPopup.style.opacity = '0';
        setTimeout(() => {
            proposalPopup.style.opacity = '1';
        }, 10);
    });

    // Yes button click handler
    yesBtn.addEventListener('click', () => {
        proposalPopup.style.opacity = '0';
        setTimeout(() => {
            proposalPopup.style.display = 'none';
            showSuccessMessage();
        }, 500);
    });

    // No button click handler
    noBtn.addEventListener('click', () => {
        shakeNoButton();
        moveNoButton();
        updateProposalText();
    });

    // Prevent closing popup by clicking outside
    proposalPopup.addEventListener('click', (e) => {
        if (e.target === proposalPopup) {
            e.stopPropagation();
        }
    });

    // Function to shake the No button
    function shakeNoButton() {
        noBtn.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            noBtn.style.animation = '';
        }, 500);
    }

    // Function to randomly move the No button
    function moveNoButton() {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${Math.max(25, Math.min(x, window.innerWidth - noBtn.offsetWidth - 25))}px`;
        noBtn.style.top = `${Math.max(25, Math.min(y, window.innerHeight - noBtn.offsetHeight - 25))}px`;
    }

    // Function to update proposal text
    function updateProposalText() {
        currentProposalIndex = (currentProposalIndex + 1) % romanticProposals.length;
        proposalText.style.animation = 'none';
        proposalText.offsetHeight; // Trigger reflow
        proposalText.style.animation = 'textPop 0.5s ease-out';
        proposalText.textContent = romanticProposals[currentProposalIndex];
    }

    // Function to show success message with random quote
    function showSuccessMessage() {
        successMessage.style.display = 'flex';
        const randomQuote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
        quoteText.textContent = randomQuote;
        createFloatingHearts();
        animateSuccessHearts();
    }

    // Function to create floating hearts animation
    function createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['❤️', '💖', '💕', '💝', '💗'][Math.floor(Math.random() * 5)];
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animation = `float ${Math.random() * 2 + 3}s ease-in-out`;
            heart.style.opacity = '0';
            floatingHearts.appendChild(heart);

            // Trigger animation
            setTimeout(() => heart.style.opacity = '1', 10);

            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 300);
    }

    // Function to animate success hearts
    function animateSuccessHearts() {
        const hearts = document.querySelector('.success-hearts');
        hearts.style.animation = 'heartbeat 1.5s infinite';
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px) rotate(-5deg); }
        75% { transform: translateX(5px) rotate(5deg); }
    }

    @keyframes float {
        0% {
            bottom: -20px;
            opacity: 0;
            transform: translateX(-20px) rotate(0deg);
        }
        10% {
            opacity: 1;
        }
        100% {
            bottom: 100%;
            opacity: 0;
            transform: translateX(20px) rotate(360deg);
        }
    }

    @keyframes textPop {
        0% { transform: scale(0.8); opacity: 0; }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
    }

    @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);