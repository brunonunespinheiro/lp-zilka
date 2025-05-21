// DOM Elements
const backToTopBtn = document.getElementById('back-to-top');
const navbarElement = document.querySelector('.navbar');
const whatsappForm = document.getElementById('whatsapp-form');
const cottonParticles = document.querySelectorAll('.cotton-particle');
const cottonThreads = document.querySelectorAll('.cotton-thread');

// Scroll event for Navbar and Back to Top button
window.addEventListener('scroll', function() {
  // Navbar effect on scroll
  if (window.scrollY > 100) {
    navbarElement.classList.add('scrolled');
  } else {
    navbarElement.classList.remove('scrolled');
  }
  
  // Back to top button visibility
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('active');
  } else {
    backToTopBtn.classList.remove('active');
  }
});

// Back to top button click event
backToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const navbarHeight = navbarElement.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// WhatsApp form submission
if (whatsappForm) {
  whatsappForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const interest = document.getElementById('interest').value;
    const message = document.getElementById('message').value;
    
    // Format WhatsApp message
    let whatsappMessage = `Olá! Meu nome é ${name}. Vi o site da Zilka e estou interessado(a) em conhecer mais sobre ${interest}.`;
    
    if (phone) {
      whatsappMessage += ` Meu telefone para contato: ${phone}.`;
    }
    
    if (message) {
      whatsappMessage += ` Mensagem adicional: ${message}`;
    }
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp number - Format: country code + number without any symbols
    const whatsappNumber = "5598970180735"; // Número atualizado
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
  });
}

// Products image hover effect enhancement
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
  const image = card.querySelector('img');
  
  // Add hover effect
  card.addEventListener('mouseenter', function() {
    image.style.filter = 'brightness(1.1) contrast(1.1)';
  });
  
  card.addEventListener('mouseleave', function() {
    image.style.filter = 'none';
  });
});

// Animation on scroll (simple implementation)
function animateOnScroll() {
  const elements = document.querySelectorAll('.product-card, .value-card');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Cotton particle and thread interactive animation
function animateCottonElements() {
  // Random movement for cotton particles
  cottonParticles.forEach(particle => {
    const random = Math.random() * 20 - 10;
    const randomX = Math.random() * 15 - 7.5;
    const randomY = Math.random() * 15 - 7.5;
    const randomRotate = Math.random() * 20 - 10;
    
    particle.style.transition = 'transform 8s ease-in-out';
    particle.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
    
    setTimeout(() => {
      particle.style.transition = 'transform 8s ease-in-out';
      particle.style.transform = 'translate(0, 0) rotate(0deg)';
    }, 8000);
  });
  
  // Gentle sway for cotton threads
  cottonThreads.forEach(thread => {
    const randomRotate = Math.random() * 8 - 4;
    const currentRotation = parseFloat(thread.getAttribute('data-rotation') || 0);
    const newRotation = currentRotation + randomRotate;
    
    thread.setAttribute('data-rotation', newRotation);
    thread.style.transition = 'transform 5s ease-in-out';
    thread.style.transform = `rotate(${newRotation}deg)`;
  });
  
  // Schedule next animation
  setTimeout(animateCottonElements, 8000);
}

// Initialize elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const elementsToAnimate = document.querySelectorAll('.product-card, .value-card');
  
  elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Initial check for elements in viewport
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Start cotton elements animation
  animateCottonElements();
  
  // Cursor interactive effect with cotton particles
  document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    cottonParticles.forEach(particle => {
      const rect = particle.getBoundingClientRect();
      const particleX = rect.left + rect.width / 2;
      const particleY = rect.top + rect.height / 2;
      
      const distanceX = mouseX - particleX;
      const distanceY = mouseY - particleY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      if (distance < 100) {
        const moveX = distanceX * 0.1;
        const moveY = distanceY * 0.1;
        
        particle.style.transition = 'transform 1s ease-out';
        particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        
        setTimeout(() => {
          particle.style.transition = 'transform 2s ease-in-out';
          particle.style.transform = 'translate(0, 0) scale(1)';
        }, 1000);
      }
    });
  });
});

// Mobile menu auto-close when clicking a nav link
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    if (window.innerWidth < 992) {
      navbarCollapse.classList.remove('show');
    }
  });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  
  document.querySelectorAll('section[id]').forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelector('.navbar-nav .nav-link[href="#' + sectionId + '"]')?.classList.add('active');
    } else {
      document.querySelector('.navbar-nav .nav-link[href="#' + sectionId + '"]')?.classList.remove('active');
    }
  });
});