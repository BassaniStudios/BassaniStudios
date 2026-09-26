/* ============================================
   BASSANI STUDIOS - Main JS
   Loader, Mouse Trail, Slides, Music, Nav
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ----- LOADER -----
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 1800);
    });
    // Fallback
    setTimeout(() => loader.classList.add('hidden'), 3500);
  }

  // ----- NAVBAR SCROLL -----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ----- MOBILE MENU -----
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // ----- MOUSE TRAIL (neon particles) -----
  const canvas = document.getElementById('trail-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 40;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.03 + 0.015;
        // Alterna entre ciano e rosa
        this.color = Math.random() > 0.5 ? '0, 245, 255' : '255, 122, 122';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.97;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.life})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        ctx.fill();
      }
    }

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      for (let i = 0; i < 2; i++) {
        if (particles.length < maxParticles) {
          particles.push(new Particle(mouseX, mouseY));
        }
      }
    });

    function animateTrail() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateTrail);
    }
    animateTrail();
  }

  // ----- SIMPLE SLIDES -----
  const slidesContainer = document.querySelector('.slides');
  const dots = document.querySelectorAll('.slide-dot');
  if (slidesContainer && dots.length) {
    let current = 0;
    const total = slidesContainer.children.length;

    function goTo(n) {
      current = (n + total) % total;
      slidesContainer.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    setInterval(() => goTo(current + 1), 5000);
  }

  // ----- MUSIC PLAYER -----
  const playBtn = document.getElementById('music-play');
  const audio = document.getElementById('bg-music');
  if (playBtn && audio) {
    let playing = false;
    playBtn.addEventListener('click', () => {
      if (playing) {
        audio.pause();
        playBtn.innerHTML = '▶';
        playBtn.setAttribute('aria-label', 'Play');
      } else {
        audio.play().catch(() => {});
        playBtn.innerHTML = '❚❚';
        playBtn.setAttribute('aria-label', 'Pause');
      }
      playing = !playing;
    });
  }

  // ----- ACTIVE NAV LINK -----
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
