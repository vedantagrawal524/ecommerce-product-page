// DOM Elements
const menuButton = document.querySelector('.menu-button');
const overlay = document.querySelector('.overlay');
const page = document.querySelector('.page');
const navLeft = document.querySelector('.nav-left');
const navLinks = document.querySelectorAll('.nav-links');

// Menu Button - Click
menuButton.addEventListener('click', () => {
     navLeft.classList.toggle('active');
     overlay.classList.toggle('active');
     page.classList.toggle('nonActive');
});

// Nav-links - Click (Close menu when clicked & goes to link-location)
navLinks.forEach((navLink) => {
     navLink.addEventListener('click', (e) => {
          if (navLeft.classList.contains('active')) {
               navLeft.classList.toggle('active');
               overlay.classList.toggle('active');
               page.classList.toggle('nonActive');
          }
     });
});

// Overlay - Click (Close menu When clicked Outside)
overlay.addEventListener('click', (e) => {
     navLeft.classList.toggle('active');
     overlay.classList.toggle('active');
     page.classList.toggle('nonActive');
});

// Escape key - keydown (Close menu with escape Key)
document.addEventListener('keydown', (e) => {
     if (e.key === 'Escape' && navLeft.classList.contains('active')) {
          navLeft.classList.toggle('active');
          overlay.classList.toggle('active');
          page.classList.toggle('nonActive');
     }
});

