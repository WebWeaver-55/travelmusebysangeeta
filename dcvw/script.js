// Loading Screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen")
  setTimeout(() => {
    loadingScreen.classList.add("hidden")
    document.body.style.overflow = "visible"
  }, 2000)
})

// Logo Upload Functionality
document.addEventListener("DOMContentLoaded", () => {
  const uploadBtn = document.getElementById("uploadBtn")
  const logoUpload = document.getElementById("logoUpload")
  const logoImage = document.getElementById("logoImage")
  const logoIcon = document.getElementById("logoIcon")

  uploadBtn.addEventListener("click", () => {
    logoUpload.click()
  })

  logoUpload.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        logoImage.src = e.target.result
        logoImage.style.display = "block"
        logoIcon.style.display = "none"
      }
      reader.readAsDataURL(file)
    }
  })
})

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileNav = document.getElementById("mobileNav")

mobileMenuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("active")
  mobileMenuBtn.classList.toggle("active")
})

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active")
    mobileMenuBtn.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]')
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Header scroll effect
const header = document.querySelector(".header")
let lastScrollY = window.scrollY

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY

  if (currentScrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  // Hide/show header on scroll (mobile)
  if (window.innerWidth <= 768) {
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }
  }

  lastScrollY = currentScrollY
})

// Hero Slider
const heroSlides = document.querySelectorAll(".hero-slide")
let currentSlide = 0

function nextSlide() {
  heroSlides[currentSlide].classList.remove("active")
  currentSlide = (currentSlide + 1) % heroSlides.length
  heroSlides[currentSlide].classList.add("active")
}

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000)

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroSlides = document.querySelectorAll(".hero-bg")

  heroSlides.forEach((slide) => {
    const speed = scrolled * 0.3
    slide.style.transform = `translateY(${speed}px)`
  })
})

// Open YouTube video function
function openVideo(url) {
  window.open(url, "_blank")
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"

      // Special animation for stats
      if (entry.target.classList.contains("stat-item")) {
        animateCounter(entry.target)
      }
    }
  })
}, observerOptions)

// Observe elements for animation
const animateElements = document.querySelectorAll(
  ".video-card, .destination-card, .gallery-item, .stat-item, .contact-item",
)
animateElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(50px)"
  el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  observer.observe(el)
})

// Counter animation for stats
function animateCounter(element) {
  const numberElement = element.querySelector(".stat-number")
  if (!numberElement) return

  const finalNumber = numberElement.textContent
  const numericValue = Number.parseInt(finalNumber.replace(/\D/g, ""))
  const suffix = finalNumber.replace(/[\d,]/g, "")

  let currentNumber = 0
  const increment = numericValue / 50
  const timer = setInterval(() => {
    currentNumber += increment
    if (currentNumber >= numericValue) {
      currentNumber = numericValue
      clearInterval(timer)
    }

    if (numericValue >= 1000000) {
      numberElement.textContent = (currentNumber / 1000000).toFixed(1) + "M" + suffix.replace(/[\d.M]/g, "")
    } else if (numericValue >= 1000) {
      numberElement.textContent = (currentNumber / 1000).toFixed(0) + "K" + suffix.replace(/[\d.K]/g, "")
    } else {
      numberElement.textContent = Math.floor(currentNumber) + suffix
    }
  }, 30)
}

// Add ripple effect to buttons
const buttons = document.querySelectorAll(".btn, .about-btn, .social-btn")
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect styles
const style = document.createElement("style")
style.textContent = `
    .btn, .about-btn, .social-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Touch gestures for mobile navigation
let touchStartX = 0
let touchEndX = 0

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX
})

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
})

function handleSwipe() {
  const swipeThreshold = 100
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0 && !mobileNav.classList.contains("active")) {
      // Swipe left - open mobile menu
      mobileNav.classList.add("active")
      mobileMenuBtn.classList.add("active")
    } else if (diff < 0 && mobileNav.classList.contains("active")) {
      // Swipe right - close mobile menu
      mobileNav.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
    }
  }
}

// Lazy loading for images
const lazyImages = document.querySelectorAll("img[data-src]")
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove("lazy")
      imageObserver.unobserve(img)
    }
  })
})

lazyImages.forEach((img) => imageObserver.observe(img))

// Smooth page transitions
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset

    // Update scroll indicator opacity
    const scrollIndicator = document.querySelector(".scroll-indicator")
    if (scrollIndicator) {
      const opacity = Math.max(0, 1 - scrolled / 300)
      scrollIndicator.style.opacity = opacity
    }
  }, 16),
) // ~60fps

// Add smooth hover effects for cards
const cards = document.querySelectorAll(".video-card, .destination-card, .gallery-item")
cards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileNav.classList.contains("active")) {
    mobileNav.classList.remove("active")
    mobileMenuBtn.classList.remove("active")
  }
})

// Focus management for accessibility
const focusableElements = document.querySelectorAll(
  'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
)
let currentFocusIndex = 0

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    if (e.shiftKey) {
      currentFocusIndex = Math.max(0, currentFocusIndex - 1)
    } else {
      currentFocusIndex = Math.min(focusableElements.length - 1, currentFocusIndex + 1)
    }
  }
})

// Initialize animations on page load
window.addEventListener("load", () => {
  // Trigger initial animations
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    heroContent.style.animation = "fadeInUp 1.5s ease forwards"
  }

  // Start intersection observer
  observer.observe(document.querySelector(".about"))
})

// Preload critical images
function preloadImages() {
  const criticalImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  ]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Start preloading
preloadImages()
