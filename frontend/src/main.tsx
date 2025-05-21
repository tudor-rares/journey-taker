import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/app.css'
import './styles/components/map.css'
import './styles/components/sidebar.css'
import App from './App.tsx'

// Add font for modern look - Google Fonts import can be added to index.html
document.documentElement.classList.add('modern-theme');

// Initialize any global theme settings
const initTheme = () => {
  // Add a subtle animation to the body on load
  document.body.classList.add('animate-fadeIn');
  
  // Add smooth scrolling to the document
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Optional: Create a custom cursor effect for modern UI
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  
  // Optional: Add a subtle particle background
  if (typeof window !== 'undefined') {
    createParticleBackground();
  }
};

// Create subtle particle background for modern effect
const createParticleBackground = () => {
  const container = document.createElement('div');
  container.className = 'particle-container';
  document.body.appendChild(container);
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2-6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    // Set gradient color
    particle.style.background = `rgba(${Math.floor(Math.random() * 100) + 156}, ${Math.floor(Math.random() * 100) + 50}, ${Math.floor(Math.random() * 100) + 156}, ${Math.random() * 0.3 + 0.1})`;
    
    // Random animation duration between 20-60s
    const duration = Math.random() * 40 + 20;
    particle.style.animation = `floating ${duration}s ease-in-out infinite`;
    
    // Add delay
    particle.style.animationDelay = `${Math.random() * duration}s`;
    
    container.appendChild(particle);
  }
};

// Run theme initialization
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initTheme);
}

// Create custom CSS for additional modern effects
const styleElement = document.createElement('style');
styleElement.textContent = `
  .custom-cursor {
    position: fixed;
    width: 10px;
    height: 10px;
    background: linear-gradient(to right, #ec4899, #8b5cf6);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
    opacity: 0.7;
    mix-blend-mode: screen;
    transition: width 0.2s, height 0.2s, opacity 0.2s;
  }
  
  .particle-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
  }
  
  .particle {
    position: absolute;
    border-radius: 50%;
    filter: blur(1px);
    pointer-events: none;
  }
  
  /* Gradient underline animation */
  .gradient-underline {
    position: relative;
    display: inline-block;
  }
  
  .gradient-underline::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(90deg, #ec4899, #8b5cf6);
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
  }
  
  .gradient-underline:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  
  /* Text gradient effect */
  .text-gradient {
    background: linear-gradient(90deg, #ec4899, #8b5cf6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;
document.head.appendChild(styleElement);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
