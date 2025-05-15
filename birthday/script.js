// Configuration
const CONFIG = {
    name: "Ruchika", // Replace with the actual name
    birthDate: "2007-05-16", // Update this to the actual birth date
    wishes: [
        "Every moment with you makes life more beautiful! 🌹",
        "Your smile lights up my world in ways words can't describe! ✨",
        "Thank you for being the most amazing person in my life! 💝",
        "Today we celebrate the day an angel was born! 👼",
        "You're not just a year older, but a year more wonderful! 🎈"
    ],
    photos: [
        "assets/first.jpeg",
        "assets/second.jpeg",
        "assets/third.jpeg",
        "assets/fourth.jpeg",
        "assets/five.jpeg"
    ]
};

// Particles Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.width = particle.style.height = Math.random() * 15 + 5 + 'px';
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 6000);
    }, 200);
}

// Page Transition
document.getElementById('heart').addEventListener('click', () => {
    const landingPage = document.getElementById('landing-page');
    const mainPage = document.getElementById('main-page');
    const audio = document.getElementById('bgMusic');
    const audioControl = document.getElementById('audio-control');
    
    landingPage.classList.add('page-transition');
    setTimeout(() => {
        landingPage.style.display = 'none';
        mainPage.classList.remove('hidden');
        startMainPageAnimations();
        
        // Start audio and update icon
        audio.currentTime = 17;
        audio.play().then(() => {
            // Update icon to playing state
            audioControl.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                </svg>
            `;
            window.isPlaying = true;
        }).catch(error => {
            console.log('Auto-play prevented:', error);
            window.isPlaying = false;
        });
    }, 1000);
});

// Main Page Animations
function startMainPageAnimations() {
    // Show birthday heading
    const heading = document.getElementById('birthday-heading');
    heading.style.opacity = '1';
    heading.style.transform = 'translateY(0)';
    
    // Start wishes rotation
    startWishesRotation();
    
    // Start photos rotation
    startPhotosRotation();
    
    // Start age counter
    startAgeCounter();
    
    // Initialize background music
    initializeAudio();
}

// Wishes Rotation
function startWishesRotation() {
    let currentWishIndex = 0;
    const wishesContainer = document.getElementById('wishes-container');
    const wishElement = wishesContainer.querySelector('.wish-text');
    
    function showNextWish() {
        wishElement.textContent = CONFIG.wishes[currentWishIndex];
        wishElement.classList.add('active');
        
        setTimeout(() => {
            wishElement.classList.remove('active');
            currentWishIndex = (currentWishIndex + 1) % CONFIG.wishes.length;
        }, 3500);
    }
    
    showNextWish();
    setInterval(showNextWish, 4000);
}

// Photos Rotation
function startPhotosRotation() {
    let currentPhotoIndex = 0;
    const photosContainer = document.getElementById('photos-container');
    
    function showNextPhoto() {
        const photo = document.createElement('img');
        photo.src = CONFIG.photos[currentPhotoIndex];
        photo.className = 'photo';
        photo.style.maxHeight = '100%';
        photo.style.borderRadius = '10px';
        photo.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        
        const angle = Math.random() * 360;
        const distance = 100;
        photo.style.transform = `rotate(${angle}deg) translateX(${distance}px)`;
        
        photosContainer.appendChild(photo);
        
        setTimeout(() => {
            photo.classList.add('active');
            photo.style.transform = 'rotate(0deg) translateX(0)';
        }, 100);
        
        setTimeout(() => {
            photo.classList.remove('active');
            photo.style.transform = `rotate(-${angle}deg) translateX(-${distance}px)`;
            setTimeout(() => photo.remove(), 1000);
        }, 4000);
        
        currentPhotoIndex = (currentPhotoIndex + 1) % CONFIG.photos.length;
    }
    
    showNextPhoto();
    setInterval(showNextPhoto, 5000);
}

// Age Counter
function startAgeCounter() {
    const birthDate = new Date('2007-05-16T00:00:00+05:30'); // Indian timezone
    const targetDate = new Date('2025-05-16T01:13:00+05:30'); // Target date for reference
    
    function updateCounter() {
        // Get current date in Indian timezone
        const now = new Date();
        const currentDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        
        // Calculate years
        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();
        let hours = currentDate.getHours() - birthDate.getHours();
        let minutes = currentDate.getMinutes() - birthDate.getMinutes();
        let seconds = currentDate.getSeconds() - birthDate.getSeconds();

        // Adjust for negative values
        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }
        if (days < 0) {
            // Get last day of previous month
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            days += lastMonth.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        // Update the display
        updateCounterElement('years', years);
        updateCounterElement('months', months);
        updateCounterElement('days', days);
        updateCounterElement('hours', hours);
        updateCounterElement('minutes', minutes);
        updateCounterElement('seconds', seconds);
    }
    
    function updateCounterElement(id, value) {
        const element = document.getElementById(id);
        if (element.textContent !== value.toString()) {
            element.textContent = value;
            element.classList.remove('counter-number');
            void element.offsetWidth; // Trigger reflow
            element.classList.add('counter-number');
        }
    }
    
    // Initial update
    updateCounter();
    
    // Update every second
    setInterval(updateCounter, 1000);
}

// Audio Control
function initializeAudio() {
    const audio = document.getElementById('bgMusic');
    const audioControl = document.getElementById('audio-control');
    window.isPlaying = false;  // Make it globally accessible
    
    // Set initial time to 17 seconds
    audio.addEventListener('loadedmetadata', () => {
        audio.currentTime = 17;
    });
    
    audioControl.addEventListener('click', () => {
        if (window.isPlaying) {
            audio.pause();
            audioControl.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.012l-7-4.2V10.2l7-4.2v12.012z"/>
                </svg>
            `;
        } else {
            audio.currentTime = 17;
            audio.play().then(() => {
                audioControl.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                    </svg>
                `;
            }).catch(error => {
                console.log('Playback failed:', error);
            });
        }
        window.isPlaying = !window.isPlaying;
    });
}

// Start the initial animations
createParticles();