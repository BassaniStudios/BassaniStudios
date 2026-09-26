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

  // ----- MUSIC PLAYER (ImageKit /music playlist) -----
  // Entire playlist shuffled on each page load.
  const MUSIC_BASE = 'https://ik.imagekit.io/bassanistudio/music/';
  const MUSIC_ALL = [
    { title: 'Sam Fender, Olivia Dean — Rein Me In', url: 'https://ik.imagekit.io/bassanistudio/music/Sam%20Fender,%20Olivia%20Dean%20-%20Rein%20Me%20In%20(Official%20Video)%20-%20SamFenderVEVO.mp3' },
    { title: "dodie — Someone Was Listening", url: "https://ik.imagekit.io/bassanistudio/music/'Someone%20Was%20Listening'%20by%20dodie%20-%20Life%20is%20Strange%20Double%20Exposure%20-%20Life%20is%20Strange.mp3" },
    { title: 'The Smashing Pumpkins — 1979 (Acoustic)', url: 'https://ik.imagekit.io/bassanistudio/music/1979%20(Acoustic)%20-%20The%20Smashing%20Pumpkins.mp3' },
    { title: 'Agridoce — Dançando', url: 'https://ik.imagekit.io/bassanistudio/music/Agridoce%20-%20Dan%C3%A7ando%20-%20Agridoce%20(1).mp3' },
    { title: 'Nobuo Uematsu — Breezy', url: 'https://ik.imagekit.io/bassanistudio/music/Breezy%20-%20Nobuo%20Uematsu.mp3' },
    { title: 'Cage The Elephant — Cigarette Daydreams', url: 'https://ik.imagekit.io/bassanistudio/music/Cage%20The%20Elephant%20-%20Cigarette%20Daydreams%20-%20Mafalda%20(1).mp3' },
    { title: 'Daughter — Burn It Down', url: 'https://ik.imagekit.io/bassanistudio/music/Daughter%20-%20Burn%20It%20Down.mp3' },
    { title: 'Daughter — Glass', url: 'https://ik.imagekit.io/bassanistudio/music/Glass%20-%20Daughter.mp3' },
    { title: 'Lanterns On The Lake — Through The Cellar Door', url: 'https://ik.imagekit.io/bassanistudio/music/Lanterns%20On%20The%20Lake%20-%20Through%20The%20Cellar%20Door%20-%20Lanterns%20On%20The%20Lake.mp3' },
    { title: 'Radiohead — Let Down (Remastered)', url: 'https://ik.imagekit.io/bassanistudio/music/Let%20Down%20(Remastered)%20-%20Radiohead.mp3' },
    { title: 'Syd Matters — To All Of You', url: 'https://ik.imagekit.io/bassanistudio/music/To%20All%20Of%20You%20By%20Syd%20Matters%20-%20King_WCKD.mp3' },
    { title: 'Daughter — Glass (alt)', url: 'https://ik.imagekit.io/bassanistudio/music/Daughter%20-%20Glass.mp3' },
    { title: 'Lea Porcelain — Pool Song', url: 'https://ik.imagekit.io/bassanistudio/music/Pool%20Song%20-%20Lea%20Porcelain.mp3' },
    { title: 'Powfu — death bed (coffee for your head)', url: 'https://ik.imagekit.io/bassanistudio/music/Powfu%20-%20death%20bed%20(coffee%20for%20your%20head)%20(Official%20Video)%20ft.%20beabadoobee%20-%20PowfuVEVO.mp3' },
    { title: 'Radiohead — Everything in its Right Place', url: 'https://ik.imagekit.io/bassanistudio/music/Radiohead%20-%20Everything%20in%20its%20Right%20Place%20(HD)%20-%20VUPHORIA.mp3' },
    { title: 'Syd Matters — Obstacles', url: 'https://ik.imagekit.io/bassanistudio/music/Syd%20Matters%20-%20Obstacles%20-%20Syd%20matters.mp3' },
    { title: 'Tears For Fears — Head Over Heels', url: 'https://ik.imagekit.io/bassanistudio/music/Tears%20For%20Fears%20-%20Head%20Over%20Heels%20-%20TearsForFearsVEVO.mp3' },
    { title: 'Teddy Swims — Lose Control (The Village Sessions)', url: 'https://ik.imagekit.io/bassanistudio/music/Teddy%20Swims%20-%20Lose%20Control%20(The%20Village%20Sessions)%20-%20Teddy%20Swims.mp3' },
  ];

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const MUSIC_PLAYLIST = shuffleArray(MUSIC_ALL);

  const playBtn = document.getElementById('music-play');
  const audio = document.getElementById('bg-music');
  const musicTitle = document.querySelector('.music-info strong');
  const musicSub = document.querySelector('.music-info span');
  const prevBtn = document.getElementById('music-prev');
  const nextBtn = document.getElementById('music-next');

  if (playBtn && audio) {
    let playing = false;
    let trackIndex = 0;

    function loadTrack(i) {
      if (!MUSIC_PLAYLIST.length) {
        if (musicTitle) musicTitle.textContent = 'Studio Radio';
        if (musicSub) musicSub.textContent = 'No tracks';
        return;
      }
      trackIndex = ((i % MUSIC_PLAYLIST.length) + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length;
      const t = MUSIC_PLAYLIST[trackIndex];
      audio.src = t.url || (MUSIC_BASE + encodeURIComponent(t.file));
      if (musicTitle) musicTitle.textContent = t.title || t.file || 'Track';
      if (musicSub) musicSub.textContent = `${trackIndex + 1} / ${MUSIC_PLAYLIST.length}`;
    }

    function play() {
      if (!MUSIC_PLAYLIST.length) return;
      audio.play().then(() => {
        playing = true;
        playBtn.innerHTML = '❚❚';
        playBtn.setAttribute('aria-label', 'Pause');
      }).catch(() => {});
    }

    function pause() {
      audio.pause();
      playing = false;
      playBtn.innerHTML = '▶';
      playBtn.setAttribute('aria-label', 'Play');
    }

    loadTrack(0);

    const vol = document.getElementById('music-vol');
    if (vol) {
      audio.volume = parseFloat(vol.value) || 0.7;
      vol.addEventListener('input', () => {
        audio.volume = parseFloat(vol.value);
      });
    }

    playBtn.addEventListener('click', () => {
      if (!MUSIC_PLAYLIST.length) return;
      if (playing) pause();
      else play();
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        loadTrack(trackIndex - 1);
        if (playing) play();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        loadTrack(trackIndex + 1);
        if (playing) play();
      });
    }

    audio.addEventListener('ended', () => {
      loadTrack(trackIndex + 1);
      play();
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
