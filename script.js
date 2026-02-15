// ========================================
// Smooth Scrolling Navigation
// ========================================
// ========================================
// Responsive Navbar Toggle
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Toggle icon between bars and times
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        // Close mobile menu if open
        if (hamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }

        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scroll for CTA button
document.querySelector('.cta-button').addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
});

// ========================================
// Active Navigation Link Highlighting
// ========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Events Tab Switching
// ========================================
const tabButtons = document.querySelectorAll('.tab-button');
const eventsLists = document.querySelectorAll('.events-list');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and lists
        tabButtons.forEach(btn => btn.classList.remove('active'));
        eventsLists.forEach(list => list.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Show corresponding events list
        const targetTab = button.getAttribute('data-tab');
        const targetList = document.getElementById(`${targetTab}-events`);
        if (targetList) {
            targetList.classList.add('active');
        }
    });
});

// ========================================
// Dark/Light Theme Toggle
// ========================================
// ========================================
// Dark/Light Theme Toggle (PERMANENT DARK MODE ENFORCED)
// ========================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Enforce Dark Theme
body.classList.add('dark-theme');
localStorage.setItem('theme', 'dark');

// Hide Toggle Button (Since it's permanent)
if (themeToggle) {
    themeToggle.style.display = 'none';
}

// ========================================
// Scroll Reveal Animation
// ========================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.house-card, .event-item, .objective-card, .awards-card, .contact-card, .gallery-item');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('reveal', 'active');
        }
    });
}

// Add reveal class to elements
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.house-card, .event-item, .objective-card, .awards-card, .contact-card');
    elements.forEach(el => el.classList.add('reveal'));

    // Initial check
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// ========================================
// House Card Hover Effects Enhancement
// ========================================
const houseCards = document.querySelectorAll('.house-card');

houseCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        // Add a subtle pulse animation
        this.style.animation = 'pulse 0.5s ease';
    });

    card.addEventListener('mouseleave', function () {
        this.style.animation = '';
    });
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: translateY(-10px) scale(1); }
        50% { transform: translateY(-10px) scale(1.02); }
    }
`;
document.head.appendChild(style);

// ========================================
// Navbar Background on Scroll
// ========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'var(--card-bg)';
        navbar.style.boxShadow = '0 4px 20px var(--shadow)';
    } else {
        navbar.style.background = 'var(--card-bg)';
        navbar.style.boxShadow = '0 2px 10px var(--shadow)';
    }
});

// ========================================
// Event Items Stagger Animation
// ========================================
function staggerAnimation() {
    const activeEventsList = document.querySelector('.events-list.active');
    if (activeEventsList) {
        const eventItems = activeEventsList.querySelectorAll('.event-item');
        eventItems.forEach((item, index) => {
            item.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s forwards`;
            item.style.opacity = '0';
        });
    }
}

// Trigger stagger animation when tab changes
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        setTimeout(staggerAnimation, 100);
    });
});

// Initial stagger animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(staggerAnimation, 300);
});

// ========================================
// Counter Animation for Points (Optional Enhancement)
// ========================================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ========================================
// Parallax Effect for Header (Subtle)
// ========================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-content');
    const scrolled = window.pageYOffset;
    if (header && scrolled < window.innerHeight) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
        header.style.opacity = 1 - (scrolled / 600);
    }
});

// ========================================
// Add Tooltips to Event Icons (Optional)
// ========================================
const eventItems = document.querySelectorAll('.event-item');
eventItems.forEach(item => {
    item.setAttribute('title', 'Click for more details');
});

// ========================================
// Highlight Current Section in Viewport
// ========================================
const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// ========================================
// Console Welcome Message
// ========================================
console.log('%c🏆 Welcome to Sports Carnival 2026! 🏆', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%cMay the best house win!', 'color: #004e89; font-size: 14px;');

// ========================================
// Performance: Debounce Scroll Events
// ========================================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(revealOnScroll));

// ========================================
// Accessibility: Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        themeToggle.click();
    }
});

// ========================================
// Loading Animation (Optional)
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Replace Font Awesome Icons with Sport Emojis
// ======================================== 
// This provides better visual representation for sports
document.addEventListener('DOMContentLoaded', () => {
    // Define sport emoji mappings
    const sportEmojis = {
        'Cricket': '🏏',
        'Badminton': '🏸',
        'Tennis': '🎾',
        'Ball Badminton': '🥎',
        'Basketball': '🏀',
        'Chess': '♟️',
        'Handball': '🤾',
        'Kho-Kho': '🏃',
        'Table Tennis': '🏓',
        'Volleyball': '🏐',
        'Kabaddi': '🤼',
        'Football': '⚽',
        'Throw Ball': '🥎'
    };

    // Replace icons with emojis
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach(item => {
        const sportName = item.querySelector('span')?.textContent.trim();
        const icon = item.querySelector('i');

        if (sportName && icon && sportEmojis[sportName]) {
            // Create emoji element
            const emojiSpan = document.createElement('span');
            emojiSpan.classList.add('emoji-icon'); // Add class for identification
            emojiSpan.textContent = sportEmojis[sportName];
            emojiSpan.style.fontSize = '2rem';
            emojiSpan.style.display = 'inline-block';
            emojiSpan.style.transition = 'transform 0.3s ease';

            // Replace icon with emoji
            icon.replaceWith(emojiSpan);

            // Add hover effect
            item.addEventListener('mouseenter', () => {
                emojiSpan.style.transform = 'scale(1.2) rotate(10deg)';
            });

            item.addEventListener('mouseleave', () => {
                emojiSpan.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });
});

// ========================================
// House Letters - Tooltips and Animations
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Add tooltips to all letter badges
    const letters = document.querySelectorAll('.letter');
    letters.forEach(letter => {
        const letterText = letter.textContent;
        letter.setAttribute('data-tooltip', `Names starting with ${letterText}`);
        letter.setAttribute('title', `Students with names starting with ${letterText} belong to this house`);
    });

    // Animate letters on house card hover
    const houseCards = document.querySelectorAll('.house-card');
    houseCards.forEach(card => {
        const cardLetters = card.querySelectorAll('.letter');

        card.addEventListener('mouseenter', () => {
            // Stagger animation for letters
            cardLetters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.transform = 'scale(1.05)';
                    letter.style.transition = 'transform 0.3s ease';
                }, index * 50); // 50ms delay between each letter
            });
        });

        card.addEventListener('mouseleave', () => {
            // Reset all letters
            cardLetters.forEach(letter => {
                letter.style.transform = 'scale(1)';
            });
        });
    });

    // Add pulse animation to letters on page load
    setTimeout(() => {
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.animation = 'letterPulse 0.5s ease';
            }, index * 30);
        });
    }, 500);
});

// Add pulse animation to CSS dynamically for letters
const letterStyle = document.createElement('style');
letterStyle.textContent = `
    @keyframes letterPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(letterStyle);

// ========================================
// Boys/Girls Letter Toggle System
// ========================================

// Letter data structure for boys and girls
const houseLetters = {
    boys: {
        red: ['F', 'C', 'D', 'P', 'L', 'U', 'V', 'Y'],
        green: ['A', 'B', 'H', 'M'],
        blue: ['G', 'J', 'K', 'T', 'N'],
        yellow: ['E', 'I', 'O', 'R', 'S']
    },
    girls: {
        red: ['N', 'S'],
        green: ['C', 'H', 'K', 'L', 'O', 'P', 'U', 'Y'],
        blue: ['D', 'E', 'G', 'I', 'T', 'R'],
        yellow: ['A', 'B', 'F', 'J', 'M', 'Q', 'V']
    }
};

// Current active category
let currentCategory = 'boys';

// Function to update house letters
function updateHouseLetters(category) {
    const houses = ['red', 'green', 'blue', 'yellow'];

    houses.forEach(house => {
        const houseCard = document.querySelector(`.house-card[data-house="${house}"]`);
        if (!houseCard) return;

        const lettersContainer = houseCard.querySelector('.letters-container');
        if (!lettersContainer) return;

        // Fade out animation
        lettersContainer.style.opacity = '0';
        lettersContainer.style.transform = 'translateY(-10px)';

        // Update letters after fade out
        setTimeout(() => {
            // Clear existing letters
            lettersContainer.innerHTML = '';

            // Get new letters for this house and category
            const letters = houseLetters[category][house];

            // Create new letter badges
            letters.forEach(letter => {
                const letterSpan = document.createElement('span');
                letterSpan.className = 'letter';
                letterSpan.textContent = letter;
                letterSpan.setAttribute('data-tooltip', `Names starting with ${letter}`);
                letterSpan.setAttribute('title', `Students with names starting with ${letter} belong to this house`);
                lettersContainer.appendChild(letterSpan);
            });

            // Fade in animation
            setTimeout(() => {
                lettersContainer.style.opacity = '1';
                lettersContainer.style.transform = 'translateY(0)';
            }, 50);
        }, 300);
    });

    currentCategory = category;
}

// Initialize toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-button');

    // Add transition styles to letters containers
    const lettersContainers = document.querySelectorAll('.letters-container');
    lettersContainers.forEach(container => {
        container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    // Add click event listeners to toggle buttons
    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // Don't do anything if already active
            if (category === currentCategory) return;

            // Update button states
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update house letters
            updateHouseLetters(category);
        });
    });

    // Initialize with boys category (already set in HTML, but ensure letters are properly set up)
    // The letters are already in HTML for boys, so we just need to ensure tooltips are set
    setTimeout(() => {
        const allLetters = document.querySelectorAll('.letter');
        allLetters.forEach(letter => {
            const letterText = letter.textContent;
            if (!letter.hasAttribute('data-tooltip')) {
                letter.setAttribute('data-tooltip', `Names starting with ${letterText}`);
                letter.setAttribute('title', `Students with names starting with ${letterText} belong to this house`);
            }
        });
    }, 100);
});

// ========================================
// Event Details Modal System
// ========================================

// Event data structure with separated boys and girls data
const eventDetails = {
    'Ball Badminton': {
        eventType: 'Team',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏸', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏸', results: {}, fixtures: [] }
    },
    'Basketball': {
        eventType: 'Team',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏀', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏀', results: {}, fixtures: [] }
    },
    'Badminton': {
        eventType: 'Team',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏸', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏸', results: {}, fixtures: [] }
    },
    'Chess': {
        eventType: 'Team',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '♟️', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '♟️', results: {}, fixtures: [] }
    },
    'Cricket': {
        eventType: 'Team',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏏', results: {}, fixtures: [] }
    },
    'Handball': {
        eventType: 'Team',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🤾', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🤾', results: {}, fixtures: [] }
    },
    'Kho-Kho': {
        eventType: 'Team',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏃', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏃', results: {}, fixtures: [] }
    },
    'Table Tennis': {
        eventType: 'Team',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏓', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏓', results: {}, fixtures: [] }
    },
    'Tennis': {
        eventType: 'Team',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🎾', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🎾', results: {}, fixtures: [] }
    },
    'Volleyball': {
        eventType: 'Team',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏐', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏐', results: {}, fixtures: [] }
    },
    'Kabaddi': {
        eventType: 'Team',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🤼', results: {}, fixtures: [] }
    },
    'Football': {
        eventType: 'Team',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '⚽', results: {}, fixtures: [] }
    },
    'Throw Ball': {
        eventType: 'Team',
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🥎', results: {}, fixtures: [] }
    },
    '100 Meters': {
        type: 'Athletics',
        eventType: 'Individual',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏃', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏃', results: {}, fixtures: [] }
    },
    '200 Meters': {
        type: 'Athletics',
        eventType: 'Individual',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏃', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏃', results: {}, fixtures: [] }
    },
    '400 Meters': {
        type: 'Athletics',
        eventType: 'Individual',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏃', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏃', results: {}, fixtures: [] }
    },
    '800 Meters': {
        type: 'Athletics',
        eventType: 'Individual',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏃', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏃', results: {}, fixtures: [] }
    },
    '1500 Meters': {
        type: 'Athletics',
        eventType: 'Individual',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏃', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏃', results: {}, fixtures: [] }
    },
    '5000 Meters': {
        type: 'Athletics',
        eventType: 'Individual',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏃', results: {}, fixtures: [] }
    },
    '10 KM Walk': {
        type: 'Athletics',
        eventType: 'Individual',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🚶', results: {}, fixtures: [] }
    },
    '5 KM Walk': {
        type: 'Athletics',
        eventType: 'Individual',
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🚶‍♀️', results: {}, fixtures: [] }
    },
    '4 × 100 Meters Relay': {
        type: 'Athletics',
        eventType: 'Relay',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏃', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏃', results: {}, fixtures: [] }
    },
    '4 × 400 Meters Relay': {
        type: 'Athletics',
        eventType: 'Relay',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏃', results: {}, fixtures: [] }
    },
    'Long Jump': {
        type: 'Athletics',
        eventType: 'Individual',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '👟', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '👟', results: {}, fixtures: [] }
    },
    'Triple Jump': {
        type: 'Athletics',
        eventType: 'Individual',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '👟', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '👟', results: {}, fixtures: [] }
    },
    'Shot Put': {
        type: 'Athletics',
        eventType: 'Individual',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '💪', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '💪', results: {}, fixtures: [] }
    },
    'Discus Throw': {
        type: 'Athletics',
        eventType: 'Individual',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '💿', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '💿', results: {}, fixtures: [] }
    },
    'Javelin Throw': {
        type: 'Athletics',
        eventType: 'Individual',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🗡️', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🗡️', results: {}, fixtures: [] }
    },
    'Hammer Throw': {
        type: 'Athletics',
        eventType: 'Individual',
        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🔨', results: {}, fixtures: [] },
        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🔨', results: {}, fixtures: [] }
    }
};

// ========================================
// Load Saved Results from Firestore (Real-time)
// ========================================
function loadSavedResults() {
    // Check if Firebase is available
    if (typeof db === 'undefined') {
        console.error("Firebase not initialized!");
        return;
    }

    // Real-time listener
    db.collection("sportsDay").doc("data").onSnapshot((doc) => {
        if (doc.exists) {
            console.log("Received real-time update from Firebase!");
            const savedData = doc.data();

            // Merge Events
            if (savedData.events) {
                mergeData(savedData.events);
            }
            // Merge Gallery (handled separately in getGalleryImages, but we can sync here)
            if (savedData.gallery) {
                // We'll let getGalleryImages read this via a global variable or simpler:
                // Just update the global gallery array and re-render
                window.firebaseGallery = savedData.gallery;
                initGallery();
                if (typeof initAdminGallery === 'function') renderAdminGalleryList();
            }

            // Re-calculate points and render
            calculatePoints();
            renderPublicEvents(); // Ensure this is defined
        } else {
            console.log("No data found in Firebase. Creating default...");
            // First run migration if needed
            migrateDataToFirebase();
        }
    }, (error) => {
        console.error("Error getting data:", error);
    });

    // Helper to merge data
    function mergeData(sourceData) {
        Object.keys(sourceData).forEach(eventName => {
            if (eventDetails[eventName]) {
                const savedEvent = sourceData[eventName];
                // Deep merge logic
                if (savedEvent.boys) Object.assign(eventDetails[eventName].boys, savedEvent.boys);
                if (savedEvent.girls) Object.assign(eventDetails[eventName].girls, savedEvent.girls);
                if (savedEvent.results) eventDetails[eventName].results = savedEvent.results;
                // Event props
                ['date', 'time', 'venue', 'fixtures', 'type', 'eventType'].forEach(prop => {
                    if (savedEvent[prop] !== undefined) eventDetails[eventName][prop] = savedEvent[prop];
                });
            } else {
                // New event
                eventDetails[eventName] = sourceData[eventName];
            }
        });
    }
}

// One-time migration function
function migrateDataToFirebase() {
    // Check if we have local data to migrate
    const localEvents = localStorage.getItem('sportsDayEventDetails');
    const localGallery = localStorage.getItem('sportsDayGalleryImages');

    // If we have data.js data, use that too
    const fallbackEvents = (window.sportsDayData && window.sportsDayData.events) || {};
    const fallbackGallery = (window.sportsDayData && window.sportsDayData.gallery) || [];

    const eventsToSave = localEvents ? JSON.parse(localEvents) : fallbackEvents;
    const galleryToSave = localGallery ? JSON.parse(localGallery) : fallbackGallery;

    if (Object.keys(eventsToSave).length > 0 || galleryToSave.length > 0) {
        db.collection("sportsDay").doc("data").set({
            events: eventsToSave,
            gallery: galleryToSave
        }, { merge: true })
            .then(() => {
                console.log("Migration successful!");
                alert("Data successfully migrated to Firebase!");
            })
            .catch((error) => console.error("Migration failed:", error));
    }
}

// ========================================
// Data Persistence (Download for GitHub)
// ========================================
function downloadDataFile() {
    // 1. Gather current state
    const currentEvents = eventDetails;
    const currentGallery = getGalleryImages().filter(img => !img.isLocal); // Only keep uploaded ones

    // 2. Construct Data Object
    const dataObj = {
        events: currentEvents,
        gallery: currentGallery
    };

    // 3. Convert to JS String
    const fileContent = `// ========================================\n// Sports Day Data File\n// Generated: ${new Date().toLocaleString()}\n// ========================================\n\nwindow.sportsDayData = ${JSON.stringify(dataObj, null, 4)};`;

    // 4. Trigger Download
    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('data.js downloaded!\n\nPlease replace the file in your "Kreeda-26" folder with this one, then commit and push to GitHub.');
}

// ========================================
// Scoring Logic & Leaderboard
// ========================================

// Points Configuration
const POINTS_SYSTEM = {
    'Individual': { 1: 6, 2: 4.5, 3: 3 },
    'Relay': { 1: 12, 2: 9, 3: 6 },
    'Team': { 1: 10, 2: 5 } // 1 = Winner, 2 = Runner-up
};

// House Scores
let houseScores = {
    boys: { 'red': 0, 'green': 0, 'blue': 0, 'yellow': 0 },
    girls: { 'red': 0, 'green': 0, 'blue': 0, 'yellow': 0 }
};

// House Display Names
const houseNames = {
    'red': 'Red Rangers',
    'green': 'Green Gladiators',
    'blue': 'Blue Blasters',
    'yellow': 'Yellow Warriors'
};

const houseIcons = {
    'red': 'fire',
    'green': 'leaf',
    'blue': 'water',
    'yellow': 'sun'
};

// Function to calculate points
function calculatePoints() {
    // Reset scores
    ['boys', 'girls'].forEach(category => {
        Object.keys(houseScores[category]).forEach(house => houseScores[category][house] = 0);
    });

    // Iterate through all events
    Object.keys(eventDetails).forEach(eventName => {
        const event = eventDetails[eventName];
        const eventType = event.eventType || 'Individual';
        const pointsConfig = POINTS_SYSTEM[eventType];

        // Check boys results (team sports: stored under event.boys.results)
        if (event.boys && event.boys.results && Object.keys(event.boys.results).length > 0) {
            processResults(event.boys.results, pointsConfig, 'boys');
        }

        // Check girls results (team sports: stored under event.girls.results)
        if (event.girls && event.girls.results && Object.keys(event.girls.results).length > 0) {
            processResults(event.girls.results, pointsConfig, 'girls');
        }

        // Check event-level results (athletics: admin saves to event.results directly)
        if (event.results && Object.keys(event.results).length > 0) {
            // Athletics events - add to boys by default (they are individual events)
            // If the event has both boys and girls, results at event level count for boys
            processResults(event.results, pointsConfig, 'boys');
        }
    });

    // Update UI for both categories
    updateLeaderboardUI('boys');
    updateLeaderboardUI('girls');
}

function processResults(results, pointsConfig, category) {
    if (!results) return;

    // Helper to get normalized house key (red, green, blue, yellow)
    const getHouseKey = (resultItem) => {
        if (!resultItem) return null;

        // 1. Try explicit color property (set by new admin logic)
        if (resultItem.color && houseScores[category].hasOwnProperty(resultItem.color)) {
            return resultItem.color;
        }

        // 2. Fallback: Parse from house name (e.g. "Red Rangers" -> "red")
        if (resultItem.house) {
            const name = resultItem.house.toLowerCase();
            if (name.includes('red')) return 'red';
            if (name.includes('green')) return 'green';
            if (name.includes('blue')) return 'blue';
            if (name.includes('yellow')) return 'yellow';
        }

        return null;
    };

    // Process Winner / 1st
    const winnerHouse = getHouseKey(results.winner);
    if (winnerHouse) {
        houseScores[category][winnerHouse] += pointsConfig[1];
    }

    // Process Runner-up / 2nd
    const runnerHouse = getHouseKey(results.runnerUp);
    if (runnerHouse) {
        houseScores[category][runnerHouse] += pointsConfig[2];
    }

    // Process 3rd Place (if applicable)
    const thirdHouse = getHouseKey(results.thirdPlace);
    if (thirdHouse && pointsConfig[3]) {
        houseScores[category][thirdHouse] += pointsConfig[3];
    }
}

function updateLeaderboardUI(category) {
    const tbody = document.getElementById(`${category}-leaderboard-body`);
    if (!tbody) return;

    // Sort houses by score for this category
    const scores = houseScores[category];
    const sortedHouses = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);

    // Clear current table
    tbody.innerHTML = '';

    // Render rows
    sortedHouses.forEach((house, index) => {
        const rank = index + 1;
        const score = scores[house];

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${rank}</td>
            <td>
                <span class="house-badge ${house}">
                    <i class="fas fa-${houseIcons[house]}"></i> ${houseNames[house]}
                </span>
            </td>
            <td>${score}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Leaderboard Tabs Logic
document.addEventListener('DOMContentLoaded', () => {
    // Load any saved results from localStorage first
    loadSavedResults();

    // Then calculate and render leaderboard
    calculatePoints();

    const leaderboardTabs = document.querySelectorAll('.leaderboard-tab');
    if (leaderboardTabs.length > 0) {
        leaderboardTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                leaderboardTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const category = tab.getAttribute('data-category');
                const boysTable = document.getElementById('boys-leaderboard');
                const girlsTable = document.getElementById('girls-leaderboard');

                if (category === 'boys') {
                    boysTable.style.display = 'table';
                    girlsTable.style.display = 'none';
                } else {
                    boysTable.style.display = 'none';
                    girlsTable.style.display = 'table';
                }
            });
        });
    }
});

// Modal elements
const modal = document.getElementById('eventModal');

// Only initialize modal if it exists
if (modal) {
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalTime = document.getElementById('modalTime');
    const modalVenue = document.getElementById('modalVenue');
    const modalCategory = document.getElementById('modalCategory');
    const modalFixtures = document.getElementById('modalFixtures');
    const modalResults = document.getElementById('modalResults');

    // Function to open modal with event details
    function openEventModal_OLD(eventName, eventData) {
        const event = eventData;

        if (!event) {
            console.warn('Event not found:', eventName);
            return;
        }

        // Populate modal content
        modalIcon.textContent = event.icon || '🏆';
        modalTitle.textContent = eventName + ' (' + event.category + ')';
        modalDate.textContent = event.date;
        modalTime.textContent = event.time;
        modalVenue.textContent = event.venue;
        modalCategory.textContent = event.category;

        // Populate fixtures if available
        if (event.fixtures && event.fixtures.length > 0) {
            let fixturesHTML = '<h3>Fixtures</h3><div class="fixtures-list">';
            event.fixtures.forEach(fixture => {
                fixturesHTML += `
                    <div class="fixture-item">
                        <span class="fixture-match">${fixture.match}</span>
                        <div class="fixture-meta">
                            ${fixture.score ? `<span class="fixture-score">${fixture.score}</span>` : ''}
                            <span class="fixture-date"><i class="far fa-calendar-alt"></i> ${fixture.date}</span>
                            <span class="fixture-time"><i class="far fa-clock"></i> ${fixture.time}</span>
                        </div>
                    </div>
                `;
            });
            fixturesHTML += '</div>';
            modalFixtures.innerHTML = fixturesHTML;
            modalFixtures.style.display = 'block';
        } else {
            modalFixtures.style.display = 'none';
        }

        // Populate results
        // Populate results
        let resultsHTML = '';

        if (event.results) {
            if (event.results.winner) {
                resultsHTML += `
                <div class="result-item winner">
                    <span class="result-position">🏆 Winner</span>
                    <span class="result-house ${event.results.winner.color || 'gray'}">${event.results.winner.house || 'TBD'}</span>
                    <span class="result-score">${event.results.winner.score || ''}</span>
                </div>`;
            }

            if (event.results.runnerUp) {
                resultsHTML += `
                <div class="result-item runner-up">
                    <span class="result-position">🥈 Runner-up</span>
                    <span class="result-house ${event.results.runnerUp.color || 'gray'}">${event.results.runnerUp.house || 'TBD'}</span>
                    <span class="result-score">${event.results.runnerUp.score || ''}</span>
                </div>`;
            }

            if (event.results.thirdPlace) {
                resultsHTML += `
                <div class="result-item third-place">
                    <span class="result-position">🥉 3rd Place</span>
                    <span class="result-house ${event.results.thirdPlace.color || 'gray'}">${event.results.thirdPlace.house || 'TBD'}</span>
                    <span class="result-score">${event.results.thirdPlace.score || ''}</span>
                </div>`;
            }
        }

        if (!resultsHTML) {
            resultsHTML = '<div class="no-results">Results not yet declared</div>';
        }

        modalResults.innerHTML = resultsHTML;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close modal
    function closeEventModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Add click listeners to all event items
    document.addEventListener('DOMContentLoaded', () => {
        const allEventItems = document.querySelectorAll('.event-item');

        allEventItems.forEach(item => {
            item.addEventListener('click', function () {
                // Get text content, ignoring the emoji icon
                // If emoji replacement ran, there might be two spans. We want the one that is NOT the emoji-icon.
                // If emoji replacement didn't run (or no emoji), it's just the first span.
                let eventNameSpan = this.querySelector('span:not(.emoji-icon)');

                // Fallback if no specific span is found (e.g. if structure changes)
                if (!eventNameSpan) {
                    eventNameSpan = this.querySelector('span');
                }

                const eventName = eventNameSpan?.textContent.trim();

                // Find parent container to determine gender
                const parentList = this.closest('.events-list');
                const listId = parentList ? parentList.id : '';

                let gender = 'boys'; // default
                if (listId === 'girls-events' || listId === 'athletics-girls-events') {
                    gender = 'girls';
                }

                if (eventName && eventDetails[eventName]) {
                    const eventData = eventDetails[eventName][gender];
                    if (eventData) {
                        openEventModal(eventName, gender);
                    } else {
                        // Fallback: try the other gender if this one doesn't exist (e.g. mixed events handled differently?)
                        // or just log error. For now, strict separation.
                        console.warn(`No data found for ${eventName} (${gender})`);
                    }
                } else {
                    console.log('Clicked item but could not find event name or data:', this);
                }
            });
        });

        // Close modal on X button click
        if (modalClose) {
            modalClose.addEventListener('click', closeEventModal);
        }

        // Close modal on overlay click
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeEventModal);
        }

        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeEventModal();
            }
        });

        // Contact Toggle Logic
        const contactToggleBtns = document.querySelectorAll('.contact-toggle-btn');
        const contactGrids = document.querySelectorAll('.contacts-grid');

        contactToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                contactToggleBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                // Hide all contact grids
                contactGrids.forEach(grid => {
                    grid.style.display = 'none';
                    grid.classList.remove('active');
                });

                // Show target grid
                const targetId = btn.getAttribute('data-target');
                const targetGrid = document.getElementById(targetId);
                if (targetGrid) {
                    targetGrid.style.display = 'grid';
                    setTimeout(() => targetGrid.classList.add('active'), 10);
                }
            });
        });
    });

    console.log('🎯 Event modal system initialized! Click any event to see details.');

    // Initialize Admin Mode regardless of modal existence
    initAdminMode();
} else {
    console.log('ℹ️ Event modal HTML not found. Modal functionality disabled.');
    // Still init admin mode even if main modal is missing
    initAdminMode();
}

// Admin Mode Implementation


// ========================================
// New GUI Admin Mode Implementation
// ========================================
function initAdminMode() {
    // 1. Check if we have saved data in localStorage and override eventDetails
    // OLD LOGIC REMOVED: Now handled by loadSavedResults() which syncs with Firebase/Data.js
    // This avoids double-loading and potential merge conflicts/errors.
    console.log("Admin Mode Initializing...");

    const adminTrigger = document.getElementById('adminTrigger');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const adminDashboardModal = document.getElementById('adminDashboardModal');
    const adminLoginClose = document.getElementById('adminLoginClose');
    const adminDashboardClose = document.getElementById('adminDashboardClose');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminPasswordInput = document.getElementById('adminPassword');
    const adminError = document.getElementById('adminError');

    // GUI Elements
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminEventList = document.getElementById('adminEventList');
    const adminEditForm = document.getElementById('adminEditForm');
    const adminWelcomeMsg = document.getElementById('adminWelcomeMsg');

    // Form Inputs
    const editEventTitle = document.getElementById('editEventTitle');
    const inputs = {
        date: document.getElementById('editDate'),
        time: document.getElementById('editTime'),
        venue: document.getElementById('editVenue'),
        // Updated to match Winner/Runner/Third Place structure
        winnerHouse: document.getElementById('editWinnerHouse'),
        winnerScore: document.getElementById('editWinnerScore'),
        runnerHouse: document.getElementById('editRunnerHouse'),
        runnerScore: document.getElementById('editRunnerScore'),
        thirdHouse: document.getElementById('editThirdHouse'),
        thirdScore: document.getElementById('editThirdScore')
    };
    const editFixturesContainer = document.getElementById('editFixturesContainer');
    const addFixtureBtn = document.getElementById('addFixtureBtn');
    const saveEventBtn = document.getElementById('saveEventBtn');
    const addNewEventBtn = document.getElementById('addNewEventBtn');
    const deleteEventBtn = document.getElementById('deleteEventBtn'); // New delete button

    let currentCategory = 'boys';
    let currentEventName = null;

    if (!adminTrigger) return;

    // Auth State Listener (The Fix for Persistent Login & Dashboard Access)
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in.
            console.log("Admin Logged In:", user.email);
            // Verify if dashboard is closed but user clicked trigger? No, just let trigger handle it.
            // Be sure login modal is closed if open
            if (adminLoginModal.classList.contains('active')) {
                adminLoginModal.classList.remove('active');
                openAdminDashboard();
            }
        } else {
            // User is signed out.
            console.log("Admin Logged Out");
            // If dashboard is open, close it (security)
            if (adminDashboardModal.classList.contains('active')) {
                adminDashboardModal.classList.remove('active');
                alert("Session expired. Please log in again.");
            }
        }
    });

    // Trigger Click with Auth Check
    adminTrigger.addEventListener('click', () => {
        if (auth.currentUser) {
            // Already logged in, go straight to dashboard
            openAdminDashboard();
        } else {
            // Not logged in, show login modal
            adminLoginModal.classList.add('active');
            adminPasswordInput.value = '';
            // Reset fields
            if (document.getElementById('adminRealPassword')) document.getElementById('adminRealPassword').value = '';
            adminError.style.display = 'none';
            adminPasswordInput.focus();
        }
    });

    // Close Modals (Force Logout on Close)
    const closeAdminModals = () => {
        adminLoginModal.classList.remove('active');
        adminDashboardModal.classList.remove('active');
        // Force logout so next time they must login again
        auth.signOut().then(() => {
            console.log("Admin Logged Out (Modal Closed)");
        }).catch((error) => {
            console.error("Logout Error:", error);
        });
    };

    if (adminLoginClose) adminLoginClose.addEventListener('click', closeAdminModals);
    if (adminDashboardClose) adminDashboardClose.addEventListener('click', closeAdminModals);

    // Logout Button Logic
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', () => {
            closeAdminModals(); // This triggers signOut
        });
    }

    const handleLogin = () => {
        const email = adminPasswordInput.value;
        const passField = document.getElementById('adminRealPassword');
        const pass = passField ? passField.value : '';

        console.log("Attempting login with:", email);

        if (!email || !pass) {
            adminError.textContent = "Please enter both email and password.";
            adminError.style.display = 'block';
            return;
        }

        // FORCE LOGIN EVERY TIME (Persistence.NONE)
        auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
            .then(() => {
                return auth.signInWithEmailAndPassword(email, pass);
            })
            .then((userCredential) => {
                // Signed in
                console.log("Login Successful:", userCredential.user.email);
                adminLoginModal.classList.remove('active');
                openAdminDashboard();
                // Clear fields
                adminPasswordInput.value = '';
                if (passField) passField.value = '';
                adminError.style.display = 'none';
            })
            .catch((error) => {
                console.error("Login Failed:", error);
                adminError.textContent = "Login Failed: " + error.message;
                adminError.style.display = 'block';
            });
    };

    if (adminLoginBtn) adminLoginBtn.addEventListener('click', handleLogin);
    if (adminPasswordInput) {
        adminPasswordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const realPass = document.getElementById('adminRealPassword');
                if (realPass) realPass.focus();
            }
        });
    }

    const adminRealPasswordInput = document.getElementById('adminRealPassword');
    if (adminRealPasswordInput) {
        adminRealPasswordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleLogin();
        });
    }

    // Wire up Download Button
    const downloadBtn = document.getElementById('downloadDataBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadDataFile);
    }

    // --- Dashboard Start ---
    function openAdminDashboard() {
        adminDashboardModal.classList.add('active');
        renderEventList(currentCategory);
        adminEditForm.style.display = 'none';
        adminWelcomeMsg.style.display = 'block';
    }

    // --- Tab Switching ---
    adminTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            adminTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.getAttribute('data-tab');
            renderEventList(currentCategory);
            adminEditForm.style.display = 'none';
            adminWelcomeMsg.style.display = 'block';
        });
    });

    // --- Render Event List ---
    function renderEventList(category) {
        adminEventList.innerHTML = '';

        // Filter events based on category
        // Note: eventDetails structure is { "Cricket": { "boys": {...}, "girls": {...} }, "100m": { "category": "Athletics", ... } }

        Object.keys(eventDetails).forEach(eventName => {
            const eventData = eventDetails[eventName];
            let shouldShow = false;

            if (category === 'athletics') {
                // Team events: { boys: {...}, girls: {...} }
                // Athletics: { category: "Athletics", ... } OR just flat data.

                if (eventData.category === 'Athletics' || (eventData.boys && eventData.boys.category === 'Athletics')) {
                    shouldShow = true;
                }
            } else {
                // Team events for Boys/Girls
                if (eventData[category]) {
                    shouldShow = true;
                }
            }

            if (shouldShow) {
                const item = document.createElement('div');
                item.className = 'admin-event-item';
                item.textContent = eventName;
                item.addEventListener('click', () => {
                    document.querySelectorAll('.admin-event-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    loadEventForEdit(eventName, category);
                });
                adminEventList.appendChild(item);
            }
        });
    }

    // --- Load Event Data ---
    function loadEventForEdit(eventName, category) {
        currentEventName = eventName;
        adminWelcomeMsg.style.display = 'none';
        adminEditForm.style.display = 'block';
        editEventTitle.textContent = `Edit ${eventName} (${category})`;

        // Get specific data
        let data;
        if (category === 'athletics') {
            // Athletics data might be direct or nested
            data = eventDetails[eventName];
            // If nested under boys/girls inside athletics (rare but possible), handle it?
            // Assuming flat for now based on previous steps
        } else {
            data = eventDetails[eventName][category];
        }

        if (!data) return; // Should not happen

        // Populate Inputs
        inputs.date.value = data.date || '';
        inputs.time.value = data.time || '';
        inputs.venue.value = data.venue || '';

        if (data.results) {
            inputs.winnerHouse.value = data.results.winner?.house || '';
            inputs.winnerScore.value = data.results.winner?.score || '';
            inputs.runnerHouse.value = data.results.runnerUp?.house || '';
            inputs.runnerScore.value = data.results.runnerUp?.score || '';
            inputs.thirdHouse.value = data.results.thirdPlace?.house || '';
            inputs.thirdScore.value = data.results.thirdPlace?.score || '';
        } else {
            // Clear if no results
            Object.values(inputs).slice(3).forEach(input => input ? input.value = '' : null);
        }

        // Render Fixtures
        renderFixturesInput(data.fixtures);
    }

    function renderFixturesInput(fixtures) {
        editFixturesContainer.innerHTML = '';
        if (!fixtures || fixtures.length === 0) return;

        fixtures.forEach((fixture, index) => {
            addFixtureRow(fixture, index);
        });
    }

    function addFixtureRow(fixture = {}, index = null) {
        const row = document.createElement('div');
        row.className = 'fixture-row';
        row.innerHTML = `
            <input type="text" placeholder="Match Details (e.g. Semifinal 1: Red vs Blue)" class="admin-input" value="${fixture.match || ''}">
            <input type="text" placeholder="Score" class="admin-input" style="width: 80px;" value="${fixture.score || ''}">
            <input type="text" placeholder="Time" class="admin-input" style="width: 100px;" value="${fixture.time || ''}">
            <i class="fas fa-trash remove-fixture" title="Remove Match"></i>
        `;

        row.querySelector('.remove-fixture').addEventListener('click', () => row.remove());
        editFixturesContainer.appendChild(row);
    }

    if (addFixtureBtn) {
        addFixtureBtn.addEventListener('click', () => addFixtureRow());
    }

    // --- Save Logic ---
    if (saveEventBtn) {
        saveEventBtn.addEventListener('click', () => {
            if (!currentEventName || !currentCategory) return;

            // Constuct new data object (partial)
            const updatedInfo = {
                date: inputs.date.value,
                time: inputs.time.value,
                venue: inputs.venue.value,
                results: {},
                fixtures: []
            };

            // Helper to get color
            const getColor = (h) => {
                if (!h) return 'gray';
                const n = h.toLowerCase();
                if (n.includes('red')) return 'red';
                if (n.includes('blue')) return 'blue';
                if (n.includes('green')) return 'green';
                if (n.includes('yellow')) return 'yellow';
                return 'gray';
            };

            if (inputs.winnerHouse.value) updatedInfo.results.winner = { house: inputs.winnerHouse.value, score: inputs.winnerScore.value, color: getColor(inputs.winnerHouse.value) };
            if (inputs.runnerHouse.value) updatedInfo.results.runnerUp = { house: inputs.runnerHouse.value, score: inputs.runnerScore.value, color: getColor(inputs.runnerHouse.value) };
            if (inputs.thirdHouse.value) updatedInfo.results.thirdPlace = { house: inputs.thirdHouse.value, score: inputs.thirdScore.value, color: getColor(inputs.thirdHouse.value) };


            // Gather fixtures
            const rows = editFixturesContainer.querySelectorAll('.fixture-row');
            rows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                if (inputs[0].value.trim()) {
                    updatedInfo.fixtures.push({
                        match: inputs[0].value,
                        score: inputs[1].value,
                        time: inputs[2].value
                        // Date? Inherit from event or add input if needed.
                        // For simplicity, keeping existing structure
                    });
                }
            });



            // Update Global Object
            let target;
            if (currentCategory === 'athletics') {
                target = eventDetails[currentEventName];
            } else {
                target = eventDetails[currentEventName][currentCategory];
            }

            // Merge
            Object.assign(target, updatedInfo);

            // Merge
            Object.assign(target, updatedInfo);

            // Persist to Firebase
            if (!auth.currentUser) {
                alert("You must be logged in to save changes!");
                return;
            }

            db.collection("sportsDay").doc("data").set({
                events: eventDetails
            }, { merge: true })
                .then(() => {
                    console.log("Data saved to Firestore");
                    alert('Event Saved Successfully!');
                    // Recalculate leaderboard
                    calculatePoints();
                })
                .catch((error) => {
                    console.error("Error saving data: ", error);
                    alert("Error saving data: " + error.message);
                });
        });
    }

    // --- Add New Event Logic ---
    if (addNewEventBtn) {
        addNewEventBtn.addEventListener('click', () => {
            const newName = prompt("Enter Name for New Event:");
            if (newName && !eventDetails[newName]) {
                // Initialize structure
                if (currentCategory === 'athletics') {
                    // Fix: Match structure of existing Athletics events
                    eventDetails[newName] = {
                        type: 'Athletics',
                        eventType: 'Individual', // Default to Individual, can be changed if needed but UI doesn't expose it easily yet
                        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏃', results: {}, fixtures: [] },
                        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏃', results: {}, fixtures: [] }
                    };
                } else {
                    // Fix: Match structure of Team events
                    eventDetails[newName] = {
                        eventType: 'Team',
                        boys: { date: '', time: '', venue: '', category: 'Boys', icon: '🏆', results: {}, fixtures: [] },
                        girls: { date: '', time: '', venue: '', category: 'Girls', icon: '🏆', results: {}, fixtures: [] }
                    };
                }

                // Save and Render
                if (!auth.currentUser) {
                    alert("You must be logged in to save!");
                    return;
                }

                db.collection("sportsDay").doc("data").set({
                    events: eventDetails
                }, { merge: true })
                    .then(() => {
                        renderEventList(currentCategory);
                        // Critical Fix: Update Public View immediately (if needed locally, though listener handles it)
                        if (typeof renderPublicEvents === 'function') renderPublicEvents();
                        alert(`Event "${newName}" created successfully!`);
                    });

                // Critical Fix: Update Public View immediately
                if (typeof renderPublicEvents === 'function') {
                    renderPublicEvents();
                }

                alert(`Event "${newName}" created successfully!`);
            } else if (eventDetails[newName]) {
                alert('Event already exists!');
            }
        });
    }

    // --- Delete Event Logic ---
    if (deleteEventBtn) {
        deleteEventBtn.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete ${currentEventName}?`)) {
                delete eventDetails[currentEventName];

                if (!auth.currentUser) return;

                // For delete, we might need to set the whole object or use update with deleteField if we knew the path.
                // Since we store all events in one 'events' map, we set the whole map again.
                db.collection("sportsDay").doc("data").set({
                    events: eventDetails
                }, { merge: true }) // merge true is fine as we are replacing the 'events' key effectively with modified object
                    .then(() => {
                        renderEventList(currentCategory);
                        adminEditForm.style.display = 'none';
                        adminWelcomeMsg.style.display = 'block';
                    });
            }
        });
    }
}

// ========================================
// Public View Functions (Restored & Dynamic)
// ========================================

function openEventModal(eventName, gender) {
    const modal = document.getElementById('eventModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.getElementById('modalIcon');
    const modalGenderToggle = document.getElementById('modalGenderToggle');
    const boysPanel = document.getElementById('modalBoysPanel');
    const girlsPanel = document.getElementById('modalGirlsPanel');

    const event = eventDetails[eventName];
    if (!event) return;

    const hasBoys = !!event.boys;
    const hasGirls = !!event.girls;

    // Set title and icon
    modalTitle.textContent = eventName;
    const iconData = (event.boys && event.boys.icon) || (event.girls && event.girls.icon) || '🏆';
    if (iconData && iconData.startsWith('fa')) {
        modalIcon.innerHTML = `<i class="${iconData}"></i>`;
    } else {
        modalIcon.textContent = iconData;
    }

    // Helper: populate a single gender panel
    function populateGenderPanel(data, prefix) {
        document.getElementById(prefix + 'Date').textContent = data.date || 'TBD';
        document.getElementById(prefix + 'Time').textContent = data.time || 'TBD';
        document.getElementById(prefix + 'Venue').textContent = data.venue || 'TBD';

        // Fixtures
        const fixturesEl = document.getElementById(prefix + 'Fixtures');
        fixturesEl.innerHTML = '';
        const fTitle = document.createElement('h3');
        fTitle.textContent = 'Fixtures';
        fixturesEl.appendChild(fTitle);

        if (data.fixtures && data.fixtures.length > 0) {
            data.fixtures.forEach(fixture => {
                const fDiv = document.createElement('div');
                fDiv.className = 'fixture-item';
                fDiv.innerHTML = `
                    <div class="fixture-match">${fixture.match}</div>
                    <div class="fixture-meta">
                        ${fixture.score ? `<span class="fixture-score">${fixture.score}</span>` : ''}
                        <span class="fixture-time">${fixture.time || ''}</span>
                    </div>
                `;
                fixturesEl.appendChild(fDiv);
            });
        } else {
            const noFix = document.createElement('p');
            noFix.textContent = 'No matches scheduled yet.';
            noFix.style.opacity = '0.6';
            noFix.style.fontStyle = 'italic';
            fixturesEl.appendChild(noFix);
        }

        // Results
        const resultsEl = document.getElementById(prefix + 'Results');
        resultsEl.innerHTML = '';
        const rTitle = document.createElement('h3');
        rTitle.textContent = 'Results';
        resultsEl.appendChild(rTitle);

        if (data.results && (data.results.winner || data.results.runnerUp || data.results.thirdPlace)) {
            const createResultRow = (label, res) => {
                if (!res) return '';
                return `
                <div class="result-row">
                    <span class="result-label">${label}</span>
                    <span class="result-house" style="color: ${res.color || 'var(--text-color)'}">${res.house}</span>
                    <span class="result-score">${res.score || ''}</span>
                </div>`;
            };
            resultsEl.innerHTML += createResultRow('🏆 Winner', data.results.winner);
            resultsEl.innerHTML += createResultRow('🥈 Runner Up', data.results.runnerUp);
            resultsEl.innerHTML += createResultRow('🥉 Third Place', data.results.thirdPlace);
        } else {
            const noRes = document.createElement('p');
            noRes.textContent = 'Results not declared yet.';
            noRes.style.opacity = '0.6';
            noRes.style.fontStyle = 'italic';
            resultsEl.appendChild(noRes);
        }
    }

    // Populate both panels
    if (hasBoys) {
        populateGenderPanel(event.boys, 'modalBoys');
    }
    if (hasGirls) {
        populateGenderPanel(event.girls, 'modalGirls');
    }

    // Handle gender toggle visibility
    if (gender) {
        // Specific gender requested — hide toggle, show only that gender's panel
        modalGenderToggle.style.display = 'none';
        if (gender === 'boys') {
            boysPanel.classList.add('active');
            girlsPanel.classList.remove('active');
        } else {
            boysPanel.classList.remove('active');
            girlsPanel.classList.add('active');
        }
    } else if (hasBoys && hasGirls) {
        // No specific gender — show toggle, default to Boys
        modalGenderToggle.style.display = 'flex';
        boysPanel.classList.add('active');
        girlsPanel.classList.remove('active');
        // Reset toggle buttons
        const genderBtns = modalGenderToggle.querySelectorAll('.modal-gender-btn');
        genderBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.gender === 'boys') btn.classList.add('active');
        });
    } else if (hasBoys) {
        modalGenderToggle.style.display = 'none';
        boysPanel.classList.add('active');
        girlsPanel.classList.remove('active');
    } else if (hasGirls) {
        modalGenderToggle.style.display = 'none';
        boysPanel.classList.remove('active');
        girlsPanel.classList.add('active');
    }

    modal.classList.add('active');
}

// Wire up gender toggle buttons inside modal
document.addEventListener('DOMContentLoaded', () => {
    const modalGenderToggle = document.getElementById('modalGenderToggle');
    if (modalGenderToggle) {
        const genderBtns = modalGenderToggle.querySelectorAll('.modal-gender-btn');
        const boysPanel = document.getElementById('modalBoysPanel');
        const girlsPanel = document.getElementById('modalGirlsPanel');

        genderBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                genderBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (btn.dataset.gender === 'boys') {
                    boysPanel.classList.add('active');
                    girlsPanel.classList.remove('active');
                } else {
                    boysPanel.classList.remove('active');
                    girlsPanel.classList.add('active');
                }
            });
        });
    }
});


function renderPublicEvents() {
    const boysContainer = document.getElementById('boys-events');
    const girlsContainer = document.getElementById('girls-events');
    const athleticsBoysContainer = document.getElementById('athletics-events');
    const athleticsGirlsContainer = document.getElementById('athletics-girls-events');

    // Clear existing
    if (boysContainer) boysContainer.innerHTML = '';
    if (girlsContainer) girlsContainer.innerHTML = '';
    if (athleticsBoysContainer) athleticsBoysContainer.innerHTML = '';
    if (athleticsGirlsContainer) athleticsGirlsContainer.innerHTML = '';

    const trackEvents = ['100 Meters', '200 Meters', '400 Meters', '800 Meters', '1500 Meters', '5000 Meters', '10 KM Walk', '5 KM Walk', '4 × 100 Meters Relay', '4 × 400 Meters Relay']; // Simple filter

    const createEventItem = (name, icon, gender) => {
        const div = document.createElement('div');
        div.className = 'event-item';

        let iconHtml = '';
        if (icon && (icon.includes('fa-') || icon.includes('fas') || icon.includes('fab'))) {
            iconHtml = `<i class="${icon}"></i>`;
        } else {
            iconHtml = `<span style="font-size: 1.2em;">${icon || '🏆'}</span>`;
        }

        div.innerHTML = `${iconHtml} <span>${name}</span>`;
        div.addEventListener('click', () => openEventModal(name, gender));
        return div;
    };

    const addHeader = (container, text, iconClass) => {
        const div = document.createElement('div');
        div.className = 'event-category';
        div.innerHTML = `<h4><i class="${iconClass}"></i> ${text}</h4>`;
        container.appendChild(div);
    };

    const athBoysTrack = [];
    const athBoysField = [];
    const athGirlsTrack = [];
    const athGirlsField = [];

    Object.keys(eventDetails).forEach(name => {
        const event = eventDetails[name];

        if (event.type === 'Athletics') {
            const isTrack = trackEvents.includes(name);

            if (event.boys) {
                if (isTrack) athBoysTrack.push({ name, icon: event.boys.icon });
                else athBoysField.push({ name, icon: event.boys.icon });
            }
            if (event.girls) {
                if (isTrack) athGirlsTrack.push({ name, icon: event.girls.icon });
                else athGirlsField.push({ name, icon: event.girls.icon });
            }
        } else {
            // Team Sports
            if (event.boys && boysContainer) {
                boysContainer.appendChild(createEventItem(name, event.boys.icon, 'boys'));
            }
            if (event.girls && girlsContainer) {
                girlsContainer.appendChild(createEventItem(name, event.girls.icon, 'girls'));
            }
        }
    });

    if (athleticsBoysContainer) {
        if (athBoysTrack.length > 0) {
            addHeader(athleticsBoysContainer, 'Track & Road Events', 'fas fa-running');
            athBoysTrack.forEach(e => athleticsBoysContainer.appendChild(createEventItem(e.name, e.icon, 'boys')));
        }
        if (athBoysField.length > 0) {
            addHeader(athleticsBoysContainer, 'Field Events', 'fas fa-medal');
            athBoysField.forEach(e => athleticsBoysContainer.appendChild(createEventItem(e.name, e.icon, 'boys')));
        }
    }

    if (athleticsGirlsContainer) {
        if (athGirlsTrack.length > 0) {
            addHeader(athleticsGirlsContainer, 'Track & Road Events', 'fas fa-running');
            athGirlsTrack.forEach(e => athleticsGirlsContainer.appendChild(createEventItem(e.name, e.icon, 'girls')));
        }
        if (athGirlsField.length > 0) {
            addHeader(athleticsGirlsContainer, 'Field Events', 'fas fa-medal');
            athGirlsField.forEach(e => athleticsGirlsContainer.appendChild(createEventItem(e.name, e.icon, 'girls')));
        }
    }

}


function initSportsDay() {
    // 1. Initialize Admin Mode (Load Data)
    if (typeof initAdminMode === 'function') {
        initAdminMode();
    }

    // 2. Render Public List (from loaded data)
    renderPublicEvents();

    // 3. Tab Logic
    const tabButtons = document.querySelectorAll('.tab-button');
    const eventLists = document.querySelectorAll('.events-list');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            eventLists.forEach(list => list.classList.remove('active'));

            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');

            // Map tab to container ID
            // boys -> boys-events
            // girls -> girls-events
            // athletics -> athletics-events
            // athletics-girls -> athletics-girls-events

            let containerId = '';
            if (tabId === 'boys') containerId = 'boys-events';
            else if (tabId === 'girls') containerId = 'girls-events';
            else if (tabId === 'athletics') containerId = 'athletics-events';
            else if (tabId === 'athletics-girls') containerId = 'athletics-girls-events';

            const container = document.getElementById(containerId);
            if (container) container.classList.add('active');
        });
    });

    // 4. Modal Logic
    const modal = document.getElementById('eventModal');
    const closeBtn = modal ? modal.querySelector('.modal-close') : null;
    const overlay = modal ? modal.querySelector('.modal-overlay') : null;

    const closeModal = () => {
        if (modal) modal.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    // Toggle Logic (House Contacts)
    // ... (Already in HTML? Or logic needs to be here? 
    // The implementation plan (Step 1359) said "Implement Toggle Logic". 
    // I should add it here to be safe if it's missing.)

    const contactBtns = document.querySelectorAll('.contact-toggle-btn');
    const contactGrids = document.querySelectorAll('.contacts-grid');

    contactBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            contactBtns.forEach(b => b.classList.remove('active'));
            contactGrids.forEach(g => g.classList.remove('active'));
            contactGrids.forEach(g => g.style.display = 'none'); // Ensure hide

            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            const targetGrid = document.getElementById(target);
            if (targetGrid) {
                targetGrid.classList.add('active');
                targetGrid.style.display = 'grid'; // Restore display
            }
        });
    });
}

// Start
document.addEventListener('DOMContentLoaded', initSportsDay);

// ========================================
// Save Event Data to Firestore
// ========================================
function saveEventData() {
    if (!auth.currentUser) {
        alert("You must be logged in to save changes!");
        return;
    }

    db.collection("sportsDay").doc("data").set({
        events: eventDetails
    }, { merge: true })
        .then(() => {
            // Success handled by listener
            console.log("Data saved to Firestore");
        })
        .catch((error) => {
            console.error("Error saving data: ", error);
            alert("Error saving data: " + error.message);
        });
}

// ========================================
// Photo Gallery Implementation
// ========================================

// Use this array to add images manually via code
const customGalleryImages = [
    // Example:
    { src: "https://example.com/photo.jpg", tag: "Cricket", name: "Finals" },
];

function getGalleryImages() {
    // Combine Firebase images with manual code-added images
    const fbImages = window.firebaseGallery || [];
    return [...fbImages, ...customGalleryImages];
}

function initGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-image') : null;
    const lightboxCaption = lightbox ? lightbox.querySelector('.lightbox-caption') : null;
    const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const prevBtn = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const nextBtn = lightbox ? lightbox.querySelector('.lightbox-next') : null;

    let currentIndex = 0;
    const allImages = getGalleryImages();

    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    // Populate Gallery
    allImages.forEach((imgObj, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item reveal';
        item.style.animationDelay = `${index * 0.05}s`;

        // Determine caption: prefer tag
        let captionText = imgObj.tag || '';

        item.innerHTML = `
            <div class="gallery-img-wrapper">
                <img src="${imgObj.src}" alt="Gallery Image" class="gallery-img" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
            ${captionText ? `<div class="gallery-caption-text">${captionText}</div>` : ''}
        `;

        item.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(item);
    });

    // Trigger scroll reveal for new items
    setTimeout(revealOnScroll, 100);

    // Lightbox Functions
    function openLightbox(index) {
        if (!lightbox || !lightboxImg) return;
        currentIndex = index;
        updateLightboxImage();
        lightbox.style.display = 'flex';
        // Small delay to allow display:flex to apply before adding active class for opacity transition
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300); // Match transition duration
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        if (!lightboxImg) return;
        const imgObj = allImages[currentIndex];
        lightboxImg.src = imgObj.src;
        if (lightboxCaption) {
            if (imgObj.isLocal) {
                const caption = imgObj.src.replace('images/', '').split('.')[0].replace(/[-_]/g, ' ');
                lightboxCaption.textContent = caption;
            } else {
                // Use stored name or fallback
                let caption = imgObj.name || 'Uploaded Photo';
                if (imgObj.tag) {
                    caption = `${imgObj.tag} | ${caption}`;
                }
                lightboxCaption.textContent = caption;
            }
        }
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % allImages.length;
        updateLightboxImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        updateLightboxImage();
    }

    // Event Listeners
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });

    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}

// ========================================
// Admin Gallery Logic
// ========================================
function initAdminGallery() {
    const tabBtns = document.querySelectorAll('.admin-tab');
    const adminEventList = document.getElementById('adminEventList');
    const adminEditForm = document.getElementById('adminEditForm');
    const adminWelcomeMsg = document.getElementById('adminWelcomeMsg');
    const adminGalleryManager = document.getElementById('adminGalleryManager');

    // Handle Tab Switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tab = btn.getAttribute('data-tab');

            if (tab === 'gallery') {
                // Show Gallery UI
                if (adminEventList) adminEventList.style.display = 'none';
                if (adminEditForm) adminEditForm.style.display = 'none';
                if (adminWelcomeMsg) adminWelcomeMsg.style.display = 'none';
                if (adminGalleryManager) adminGalleryManager.style.display = 'block';
                renderAdminGalleryList();
            } else if (tab === 'reset') {
                // Handled by other listener
            } else if (tab === 'boys' || tab === 'girls') {
                // Show Event UI
                if (typeof currentCategory !== 'undefined') currentCategory = tab;
                if (adminEventList) adminEventList.style.display = 'block';
                if (adminGalleryManager) adminGalleryManager.style.display = 'none';
                if (adminEditForm) adminEditForm.style.display = 'none';
                if (adminWelcomeMsg) adminWelcomeMsg.style.display = 'block';
                // Only call if defined and not gallery
                if (typeof renderEventList === 'function') renderEventList(tab);
            }
        });
    });

    // Populate Event Select Dropdown
    const eventSelect = document.getElementById('adminGalleryEventSelect');
    if (eventSelect) {
        // Clear existing options except first
        while (eventSelect.options.length > 1) {
            eventSelect.remove(1);
        }
        // Add events
        Object.keys(eventDetails).sort().forEach(eventName => {
            const option = document.createElement('option');
            option.value = eventName;
            option.textContent = eventName;
            eventSelect.appendChild(option);
        });
    }

    // Upload Logic (Firebase Storage)
    const uploadBtn = document.getElementById('uploadPhotoBtn');
    const fileInput = document.getElementById('adminGalleryUpload');

    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', () => {
            if (!auth.currentUser) {
                alert("You must be logged in!");
                return;
            }

            const file = fileInput.files[0];
            const selectedEvent = eventSelect ? eventSelect.value : '';

            if (!file) {
                alert('Please select a photo first.');
                return;
            }

            const fileName = `gallery/${Date.now()}_${file.name}`;
            const storageRef = storage.ref(fileName);

            // Upload Task
            const uploadTask = storageRef.put(file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Progress function
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    uploadBtn.textContent = `Uploading ${Math.round(progress)}%...`;
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error("Upload failed:", error);
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            alert("Upload Failed: User doesn't have permission to access the object");
                            break;
                        case 'storage/canceled':
                            alert("Upload Failed: User canceled the upload");
                            break;
                        case 'storage/unknown':
                            alert("Upload Failed: Unknown error occurred, inspect error.serverResponse");
                            break;
                        default:
                            alert("Upload Failed: " + error.message);
                    }
                    uploadBtn.textContent = 'Upload';
                },
                () => {
                    // Complete function
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);

                        const newImage = {
                            src: downloadURL,
                            isLocal: false,
                            name: file.name,
                            tag: selectedEvent
                        };

                        const currentGallery = window.firebaseGallery || [];
                        currentGallery.push(newImage);

                        db.collection("sportsDay").doc("data").set({
                            gallery: currentGallery
                        }, { merge: true })
                            .then(() => {
                                alert("Photo uploaded successfully!");
                                fileInput.value = '';
                                if (eventSelect) eventSelect.value = '';
                                uploadBtn.textContent = 'Upload';
                            });
                    });
                }
            );
        });
    }

    // Delete All Logic
    const deleteAllBtn = document.getElementById('deleteAllPhotosBtn');
    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', () => {
            if (!auth.currentUser) return;
            if (confirm('Are you sure you want to delete ALL photos?')) {
                db.collection("sportsDay").doc("data").update({
                    gallery: []
                }).then(() => alert("All photos deleted."));
            }
        });
    }
}

function renderAdminGalleryList() {
    const list = document.getElementById('adminGalleryList');
    if (!list) return;
    list.innerHTML = '';

    const uploaded = JSON.parse(localStorage.getItem('sportsDayGalleryImages') || '[]');

    if (uploaded.length === 0) {
        list.innerHTML = '<p>No custom photos uploaded.</p>';
        return;
    }

    uploaded.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'admin-gallery-item';
        // Add filename display
        let displayName = img.name || `Photo ${index + 1}`;
        if (img.tag) {
            displayName = `[${img.tag}] ${displayName}`;
        }
        item.innerHTML = `
            <img src="${img.src}" alt="${displayName}">
            <div class="admin-gallery-name">${displayName}</div>
            <button class="admin-gallery-delete" title="Delete">&times;</button>
        `;

        const deleteBtn = item.querySelector('.admin-gallery-delete');
        deleteBtn.addEventListener('click', () => {
            if (confirm('Delete this photo?')) {
                const current = JSON.parse(localStorage.getItem('sportsDayGalleryImages') || '[]');
                current.splice(index, 1);
                localStorage.setItem('sportsDayGalleryImages', JSON.stringify(current));
                renderAdminGalleryList();
                if (typeof initGallery === 'function') initGallery();
            }
        });

        list.appendChild(item);
    });
}

// Initialize Gallery when DOM is loaded
// Initialize Gallery and Data when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Load Data (Local or Public)
    if (typeof loadSavedResults === 'function') loadSavedResults();

    // 2. Render Public Components
    if (typeof renderPublicEvents === 'function') renderPublicEvents();
    if (typeof calculatePoints === 'function') calculatePoints();

    // 3. Initialize Galleries
    if (typeof initGallery === 'function') initGallery();
    if (typeof initAdminGallery === 'function') initAdminGallery();
    if (typeof initAdminMode === 'function') initAdminMode();

    // Re-trigger scroll reveal for new items
    setTimeout(() => {
        if (typeof revealOnScroll === 'function') revealOnScroll();
    }, 500);
});
