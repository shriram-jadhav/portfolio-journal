// ===========================
// LIVE STATS AUTO-UPDATE
// ===========================
async function fetchLeetCodeStats() {
  try {
    const res  = await fetch('https://alfa-leetcode-api.onrender.com/Shriram-Jadhav/solved');
    const data = await res.json();
    if (data?.solvedProblem !== undefined) {
      const el = document.getElementById('leet-count');
      if (el) countUp(el, data.solvedProblem, 1200, false, '+');
    }
  } catch {
    const el = document.getElementById('leet-count');
    if (el) countUp(el, 40, 1200, false, '+');
  }
}

async function fetchGitHubStats() {
  try {
    const res  = await fetch('https://api.github.com/users/shriram-jadhav');
    const data = await res.json();
    if (data?.public_repos !== undefined) {
      const el = document.getElementById('contrib-count');
      if (el) el.textContent = data.public_repos;
    }
  } catch {}
}

// ===========================
// COUNT UP
// ===========================
function countUp(el, target, duration = 1500, isDecimal = false, suffix = '') {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = (isDecimal ? start.toFixed(2) : Math.floor(start)) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cgpa = document.getElementById('cgpa-count');
      if (cgpa) countUp(cgpa, 9.03, 1500, true);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroLeft = document.querySelector('.hero-left');
if (heroLeft) statsObserver.observe(heroLeft);

// ===========================
// LIVE JOURNAL — lines build up
// ===========================
const journalLines = [
  "Building something meaningful...",
  "Training models. Breaking things.",
  "Fixing bugs at 2 AM.",
  "Still loving the process.",
  "Grateful for coffee and curiosity.",
  "On a mission to turn logic",
  "into real-world impact.",
];

function setJournalDateTime() {
  const dateEl = document.getElementById('journal-date');
  const timeEl = document.getElementById('journal-time');
  if (!dateEl || !timeEl) return;
  const now = new Date();
  dateEl.textContent = now.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  timeEl.textContent = `${h}:${m}`;
}

function buildJournalLines() {
  const wrap = document.getElementById('journal-lines-wrap');
  if (!wrap) return;
  wrap.innerHTML = '';

  const cursorLine = document.createElement('p');
  cursorLine.classList.add('journal-log-line', 'visible');
  cursorLine.innerHTML = '<span class="journal-cursor-inline"></span>';
  wrap.appendChild(cursorLine);

  let lineIdx = 0;
  let charIdx = 0;
  let currentLineEl = null;
  let currentText = '';

  function typeNextChar() {
    if (lineIdx >= journalLines.length) {
      cursorLine.remove();
      return;
    }
    const line = journalLines[lineIdx];
    if (charIdx === 0) {
      currentLineEl = document.createElement('p');
      currentLineEl.classList.add('journal-log-line');
      currentLineEl.innerHTML = '<span class="check">✓</span><span class="line-text"></span>';
      wrap.insertBefore(currentLineEl, cursorLine);
      requestAnimationFrame(() => currentLineEl.classList.add('visible'));
      currentText = '';
    }
    currentText += line[charIdx];
    currentLineEl.querySelector('.line-text').textContent = currentText;
    charIdx++;
    if (charIdx >= line.length) {
      charIdx = 0;
      lineIdx++;
      setTimeout(typeNextChar, 500);
    } else {
      setTimeout(typeNextChar, 55);
    }
  }
  typeNextChar();
}

setJournalDateTime();
buildJournalLines();

setInterval(() => {
  const timeEl = document.getElementById('journal-time');
  if (!timeEl) return;
  const now = new Date();
  timeEl.textContent = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}, 30000);

// ===========================
// FLOATING ORANGE DOTS
// ===========================
function createFloatingDots() {
  const journal = document.querySelector('.hero-journal');
  if (!journal) return;

  const dotConfigs = [
    { x: 5,  y: 18, size: 4,   opacity: 0.18, dur: 4.2, delay: 0   },
    { x: 88, y: 22, size: 3,   opacity: 0.13, dur: 5.8, delay: 0.8 },
    { x: 10, y: 72, size: 5,   opacity: 0.15, dur: 6.1, delay: 1.2 },
    { x: 88, y: 68, size: 3.5, opacity: 0.20, dur: 4.8, delay: 0.3 },
    { x: 48, y: 8,  size: 3,   opacity: 0.10, dur: 7.0, delay: 2.0 },
    { x: 15, y: 42, size: 2.5, opacity: 0.14, dur: 5.3, delay: 1.5 },
    { x: 80, y: 85, size: 4,   opacity: 0.16, dur: 4.5, delay: 0.6 },
    { x: 6,  y: 88, size: 3,   opacity: 0.10, dur: 6.5, delay: 2.5 },
    { x: 92, y: 48, size: 2.5, opacity: 0.12, dur: 5.0, delay: 1.8 },
    { x: 50, y: 94, size: 3.5, opacity: 0.14, dur: 6.8, delay: 0.9 },
    { x: 25, y: 10, size: 2.5, opacity: 0.10, dur: 5.5, delay: 3.0 },
    { x: 72, y: 12, size: 3,   opacity: 0.12, dur: 4.9, delay: 1.1 },
  ];

  dotConfigs.forEach(cfg => {
    const dot = document.createElement('div');
    dot.classList.add('float-dot');
    dot.style.cssText = `
      width: ${cfg.size}px;
      height: ${cfg.size}px;
      left: ${cfg.x}%;
      top: ${cfg.y}%;
      --base-opacity: ${cfg.opacity};
      opacity: ${cfg.opacity};
      animation-duration: ${cfg.dur}s;
      animation-delay: -${cfg.delay}s;
    `;
    journal.appendChild(dot);
  });
}

// ===========================
// ULTRA SMOOTH CURSOR GLOW
// ===========================
const glowEl = document.createElement('div');
glowEl.classList.add('cursor-glow');
document.body.appendChild(glowEl);

const dotEl = document.createElement('div');
dotEl.classList.add('cursor-dot');
document.body.appendChild(dotEl);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;
let dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth interpolation loop
function animateCursor() {
  // Glow — very slow and smooth
  glowX += (mouseX - glowX) * 0.06;
  glowY += (mouseY - glowY) * 0.06;
  glowEl.style.left = glowX + 'px';
  glowEl.style.top  = glowY + 'px';

  // Dot — faster but still smooth
  dotX += (mouseX - dotX) * 0.18;
  dotY += (mouseY - dotY) * 0.18;
  dotEl.style.left = dotX + 'px';
  dotEl.style.top  = dotY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

// ===========================
// J KEY — DEVELOPER MODE
// ===========================
const devLogLines = [
  { prompt: '$', text: 'Initializing developer mode...', delay: 200 },
  { prompt: '>', text: 'Loading <span class="bright">Shriram Jadhav</span> profile...', delay: 600 },
  { prompt: '>', text: '<span class="check">✓</span> Curiosity: <span class="bright">100%</span>', delay: 1000 },
  { prompt: '>', text: '<span class="check">✓</span> Dedication: <span class="bright">100%</span>', delay: 1400 },
  { prompt: '>', text: '<span class="check">✓</span> Overthinking: <span class="bright">90%</span>', delay: 1800 },
  { prompt: '>', text: '<span class="check">✓</span> Bugs Fixed: <span class="bright">∞</span>', delay: 2200 },
  { prompt: '$', text: '<span class="bright">Ready to build the future. Let\'s connect! 🚀</span>', delay: 2700 },
];

const pyLines = [
  { html: '<span class="py-kw">class</span> <span class="py-fn">Developer</span><span class="py-pun">:</span>', delay: 400 },
  { html: '&nbsp;&nbsp;<span class="py-kw">def</span> <span class="py-fn">__init__</span><span class="py-pun">(</span><span class="py-var">self</span><span class="py-pun">):</span>', delay: 700 },
  { html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="py-var">self</span><span class="py-pun">.</span><span class="py-var">name</span> <span class="py-pun">=</span> <span class="py-str">"Shriram Jadhav"</span>', delay: 1000 },
  { html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="py-var">self</span><span class="py-pun">.</span><span class="py-var">role</span> <span class="py-pun">=</span> <span class="py-str">"Problem Solver"</span>', delay: 1300 },
  { html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="py-var">self</span><span class="py-pun">.</span><span class="py-var">passion</span> <span class="py-pun">=</span> <span class="py-str">["AI/ML", "Backend", "Impact"]</span>', delay: 1600 },
  { html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="py-var">self</span><span class="py-pun">.</span><span class="py-var">mission</span> <span class="py-pun">=</span> <span class="py-str">"Turning logic into impact."</span>', delay: 1900 },
  { html: '', delay: 2100 },
  { html: '&nbsp;&nbsp;<span class="py-kw">def</span> <span class="py-fn">connect</span><span class="py-pun">(</span><span class="py-var">self</span><span class="py-pun">):</span>', delay: 2300 },
  { html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="py-kw">return</span> <span class="py-str">"Let\'s build something amazing!"</span>', delay: 2600 },
  { html: '', delay: 2800 },
  { html: '<span class="py-cmt"># Thanks for exploring the journal 🧡</span>', delay: 3000 },
];

const overlay = document.createElement('div');
overlay.classList.add('dev-overlay');
overlay.innerHTML = `
  <div class="dev-panels">
    <div class="dev-terminal">
      <div class="dev-terminal-top">
        <span></span><span></span><span></span>
        <div class="dev-terminal-title">developer.log</div>
      </div>
      <div class="dev-terminal-body" id="dev-log-body"></div>
    </div>
    <div class="dev-python">
      <div class="dev-terminal-top">
        <span></span><span></span><span></span>
        <div class="dev-terminal-title">about_me.py</div>
      </div>
      <div class="dev-terminal-body dev-python-body" id="dev-py-body"></div>
    </div>
  </div>
  <div class="dev-exit">Press ESC or click anywhere to exit</div>
`;
document.body.appendChild(overlay);

let devOpen = false;
let devTimers = [];

function openDevMode() {
  devOpen = true;
  overlay.classList.add('active');
  const logBody = document.getElementById('dev-log-body');
  const pyBody  = document.getElementById('dev-py-body');
  logBody.innerHTML = '';
  pyBody.innerHTML  = '';
  devTimers.forEach(clearTimeout);
  devTimers = [];

  devLogLines.forEach(line => {
    const t = setTimeout(() => {
      const p = document.createElement('p');
      p.classList.add('dev-line');
      p.innerHTML = `<span class="prompt">${line.prompt}</span> ${line.text}`;
      logBody.appendChild(p);
      requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add('show')));
    }, line.delay);
    devTimers.push(t);
  });

  pyLines.forEach(line => {
    const t = setTimeout(() => {
      const p = document.createElement('p');
      p.classList.add('py-line');
      p.innerHTML = line.html || '&nbsp;';
      pyBody.appendChild(p);
      requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add('show')));
    }, line.delay);
    devTimers.push(t);
  });
}

function closeDevMode() {
  devOpen = false;
  overlay.classList.remove('active');
  devTimers.forEach(clearTimeout);
  devTimers = [];
}

document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName.toLowerCase();
  const isTyping = tag === 'input' || tag === 'textarea';
  if ((e.key === 'j' || e.key === 'J') && !devOpen && !isTyping) openDevMode();
  if (e.key === 'Escape') closeDevMode();
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeDevMode();
});

// ===========================
// SCROLL REVEAL
// ===========================
const revealElements = document.querySelectorAll(
  '.about-card, .skill-category, .exp-card, .project-card, .edu-card, .hobby-card, .contact-link, .section-header'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('revealed'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealElements.forEach(el => {
  el.classList.add('hidden');
  revealObserver.observe(el);
});

// ===========================
// ACTIVE NAV ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ===========================
// NAVBAR SHADOW
// ===========================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 4px 20px rgba(0,0,0,0.08)' : 'none';
});

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===========================
// CONTACT FORM
// ===========================
async function handleSubmit(btn) {
  const name    = document.getElementById('form-name').value.trim();
  const email   = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim();
  const message = document.getElementById('form-message').value.trim();

  if (!name || !email || !subject || !message) {
    btn.textContent = '⚠ Please fill all fields';
    btn.style.background = '#c0392b';
    setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background = ''; }, 2500);
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/xbdwdwpd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });

    if (response.ok) {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#3a7d5a';
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        btn.disabled = false;
        ['form-name','form-email','form-subject','form-message']
          .forEach(id => document.getElementById(id).value = '');
      }, 3000);
    } else {
      throw new Error('Failed');
    }
  } catch {
    btn.textContent = '⚠ Failed — try emailing directly';
    btn.style.background = '#c0392b';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }
}

// Run on load
fetchLeetCodeStats();
fetchGitHubStats();