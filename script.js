// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with better settings
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        offset: 50,
        delay: 0,
        easing: 'ease-in-out',
        anchorPlacement: 'top-bottom'
    });

    // Handle preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    });
});

// Function to refresh AOS
function refreshAOS() {
    AOS.refresh();
}

// Function to open invitation
function openInvitation() {
    const openingPage = document.querySelector('.opening-page');
    const mainContent = document.querySelector('.main-content');
    
    openingPage.style.display = 'none';
    mainContent.style.display = 'block';
    
    // Refresh AOS after content is shown
    setTimeout(() => {
        refreshAOS();
    }, 100);
    
    playMusic();
}

// Add scroll event listener to refresh AOS
window.addEventListener('scroll', function() {
    refreshAOS();
});

// Add resize event listener to refresh AOS
window.addEventListener('resize', function() {
    refreshAOS();
});

// DOM Elements
const openingPage = document.querySelector('.opening-page');
const mainContent = document.querySelector('.main-content');
const openInvitationBtn = document.querySelector('.open-invitation-btn');
const audioBtn = document.querySelector('.audio-btn');
const backgroundMusic = document.getElementById('background-music');

// Countdown Elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Gallery Elements
const galleryItems = document.querySelectorAll('.gallery-item');
const mobileGalleryItems = document.querySelectorAll('.mobile-gallery-item');
const mobileGalleryContainer = document.querySelector('.mobile-gallery-container');
const prevButton = document.querySelector('.gallery-nav .prev');
const nextButton = document.querySelector('.gallery-nav .next');
const dotsContainer = document.querySelector('.gallery-dots');

// Wedding Date (June 14, 2025)
const weddingDate = new Date('2025-06-14T00:00:00');

// Create Modal Elements
const modal = document.createElement('div');
modal.className = 'gallery-modal';
modal.innerHTML = `
    <div class="modal-content">
        <button class="modal-close"><i class="fas fa-times"></i></button>
        <button class="modal-prev"><i class="fas fa-chevron-left"></i></button>
        <button class="modal-next"><i class="fas fa-chevron-right"></i></button>
        <img src="" alt="Gallery Image">
    </div>
`;
document.body.appendChild(modal);

// Mobile Gallery Functionality
let currentSlide = 0;
const totalSlides = mobileGalleryItems.length;

// Create dots
function createDots() {
    mobileGalleryItems.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('gallery-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

// Update dots
function updateDots() {
    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    const offset = -currentSlide * 100;
    mobileGalleryContainer.style.transform = `translateX(${offset}%)`;
    updateDots();
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
}

// Initialize mobile gallery
function initMobileGallery() {
    createDots();
    
    // Set initial position
    mobileGalleryContainer.style.transform = 'translateX(0)';
    
    // Add event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    // Touch events for swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    mobileGalleryContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    mobileGalleryContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(touchStartX - touchEndX);
    });
    
    function handleSwipe(diff) {
        const swipeThreshold = 50;
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// Gallery Modal Functionality
let currentImageIndex = 0;
const allImages = Array.from(galleryItems).map(item => item.querySelector('img').src);

function openModal(index) {
    currentImageIndex = index;
    const modalImg = modal.querySelector('img');
    modalImg.src = allImages[index];
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    modal.querySelector('img').src = allImages[currentImageIndex];
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    modal.querySelector('img').src = allImages[currentImageIndex];
}

// Add click events to gallery items
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openModal(index));
});

mobileGalleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openModal(index));
});

// Modal event listeners
modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.querySelector('.modal-prev').addEventListener('click', showPrevImage);
modal.querySelector('.modal-next').addEventListener('click', showNextImage);

// Close modal on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
});

// Function to update countdown
function updateCountdown() {
    const currentDate = new Date();
    const difference = weddingDate - currentDate;

    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update DOM elements with padding
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');

    // Add animation class when numbers change
    if (seconds === 0) {
        daysElement.classList.add('animate');
        hoursElement.classList.add('animate');
        minutesElement.classList.add('animate');
        secondsElement.classList.add('animate');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            daysElement.classList.remove('animate');
            hoursElement.classList.remove('animate');
            minutesElement.classList.remove('animate');
            secondsElement.classList.remove('animate');
        }, 1000);
    }
}

// Function to play music with animation
function playMusic() {
    backgroundMusic.play()
        .then(() => {
            audioBtn.classList.remove('muted');
            audioBtn.classList.add('playing');
        })
        .catch(error => {
            console.log('Autoplay prevented:', error);
        });
}

// Function to pause music with animation
function pauseMusic() {
    backgroundMusic.pause();
    audioBtn.classList.add('muted');
    audioBtn.classList.remove('playing');
}

// Function to toggle music
function toggleMusic() {
    if (backgroundMusic.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}

// Event Listeners
openInvitationBtn.addEventListener('click', openInvitation);
audioBtn.addEventListener('click', toggleMusic);

// Initialize audio button state
audioBtn.classList.add('muted');

// Start countdown
updateCountdown();
setInterval(updateCountdown, 1000);

// Initialize mobile gallery
initMobileGallery();

// Floating Navbar Functionality
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section[id]');

// Utility functions for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Optimize scroll event handler
const setActiveNavItem = throttle(() => {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${sectionId}`) {
          item.classList.add('active');
        }
      });
    }
  });
}, 100);

// Optimize resize event handler
const handleResize = debounce(() => {
  // Add any resize-related logic here
}, 250);

// Optimize touch events
const handleSwipe = throttle((diff) => {
  const swipeThreshold = 50;
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}, 100);

// Add event listeners with optimized handlers
window.addEventListener('scroll', setActiveNavItem);
window.addEventListener('resize', handleResize);

// Optimize mobile gallery touch events
let touchStartX = 0;
let touchEndX = 0;

mobileGalleryContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

mobileGalleryContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe(touchStartX - touchEndX);
});

// Copy Button Functionality
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const accountNumber = button.getAttribute('data-clipboard');
    
    try {
      await navigator.clipboard.writeText(accountNumber);
      
      // Update button state
      button.classList.add('copied');
      const originalIcon = button.querySelector('i');
      originalIcon.className = 'fas fa-check';
      
      // Show success message
      showAlert('Nomor rekening berhasil disalin!', 'success');
      
      // Reset button after 2 seconds
      setTimeout(() => {
        button.classList.remove('copied');
        originalIcon.className = 'fas fa-copy';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      showAlert('Gagal menyalin nomor rekening', 'error');
    }
  });
});

// Alert Function
function showAlert(message, type = 'info') {
  const alert = document.createElement('div');
  alert.className = `custom-alert ${type}`;
  alert.innerHTML = `
    <div class="alert-content">
      <div class="alert-icon">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      </div>
      <div class="alert-text">
        <h4>${type === 'success' ? 'Berhasil!' : 'Perhatian!'}</h4>
        <p>${message}</p>
      </div>
      <button class="close-alert">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="alert-progress"></div>
  `;
  
  document.body.appendChild(alert);
  
  // Show alert
  setTimeout(() => alert.classList.add('show'), 100);
  
  // Auto close after 3 seconds
  setTimeout(() => {
    alert.classList.remove('show');
    setTimeout(() => alert.remove(), 300);
  }, 3000);
  
  // Close button functionality
  alert.querySelector('.close-alert').addEventListener('click', () => {
    alert.classList.remove('show');
    setTimeout(() => alert.remove(), 300);
  });
}

// Wishes Form Handling
const wishesForm = document.getElementById('rsvp-form');
const wishesList = document.getElementById('wishes-list');

// Load wishes when page loads
document.addEventListener('DOMContentLoaded', loadWishes);

// Handle form submission
wishesForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = wishesForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Mengirim...';
    btnLoader.style.display = 'block';
    
    try {
        const formData = {
            name: document.getElementById('name').value,
            attendance: document.getElementById('attendance').value,
            guests: document.getElementById('guests').value,
            message: document.getElementById('message').value
        };
        
        const response = await fetch('api/wishes.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            showAlert('Ucapan berhasil dikirim!', 'success');
            wishesForm.reset();
            loadWishes(); // Reload wishes
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        showAlert('Gagal mengirim ucapan. Silakan coba lagi.', 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.textContent = 'Kirim Ucapan';
        btnLoader.style.display = 'none';
    }
});

// Function to load wishes
async function loadWishes() {
    try {
        const response = await fetch('api/wishes.php');
        const data = await response.json();
        
        if (data.status === 'success') {
            displayWishes(data.data);
        }
    } catch (error) {
        console.error('Failed to load wishes:', error);
    }
}

// Function to display wishes
function displayWishes(wishes) {
    wishesList.innerHTML = '';
    
    if (wishes.length === 0) {
        wishesList.innerHTML = '<p class="no-wishes">Belum ada ucapan. Jadilah yang pertama!</p>';
        return;
    }
    
    wishes.forEach(wish => {
        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        
        const attendance = wish.attendance === 'yes' ? 'Akan Hadir' : 'Tidak Bisa Hadir';
        const guests = wish.guests ? ` (${wish.guests} orang)` : '';
        
        wishCard.innerHTML = `
            <div class="wish-header">
                <h4>${wish.name}</h4>
                <span>${attendance}${guests}</span>
            </div>
            <p>${wish.message}</p>
            <div class="wish-date">${formatDate(wish.created_at)}</div>
        `;
        
        wishesList.appendChild(wishCard);
    });
}

// Function to format date
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to set guest name
function setGuestName() {
    const guestName = getUrlParameter('to');
    if (guestName) {
        document.getElementById('guest-name').textContent = guestName;
    }
}

// Call setGuestName when document is ready
document.addEventListener('DOMContentLoaded', function() {
    setGuestName();
    // ... existing code ...
});
