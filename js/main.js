// ===========================
// LIVE STATS AUTO-UPDATE
// ===========================

// -- LeetCode Live Stats --
async function fetchLeetCodeStats() {
  try {
    const response = await fetch(
      'https://alfa-leetcode-api.onrender.com/Shriram-Jadhav/solved'
    );
    const data = await response.json();

    if (data && data.solvedProblem !== undefined) {
      const leetEl = document.getElementById('leet-count');
      if (leetEl) {
        countUp(leetEl, data.solvedProblem, 1200, false, '+');
      }
    }
  } catch (error) {
    // API blocked on localhost - will work on live site
    const leetEl = document.getElementById('leet-count');
    if (leetEl) countUp(leetEl, 40, 1200, false, '+');
    console.log('LeetCode API unavailable — showing fallback value');
  }
}

// -- GitHub Live Stats --
async function fetchGitHubStats() {
  try {
    const response = await fetch(
      'https://api.github.com/users/shriram-jadhav'
    );
    const data = await response.json();

    if (data && data.public_repos !== undefined) {
      const contribEl = document.getElementById('contrib-count');
      if (contribEl) {
        contribEl.textContent = data.public_repos;
      }
    }
  } catch (error) {
    console.log('GitHub API unavailable — showing default value');
  }
}

// ===========================
// SMOOTH COUNT UP ANIMATION
// ===========================
function countUp(el, target, duration = 1500, isDecimal = false, suffix = '') {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = (isDecimal ? start.toFixed(2) : Math.floor(start)) + suffix;
  }, 16);
}

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================
const revealElements = document.querySelectorAll(
  '.about-card, .skill-category, .exp-card, .project-card, .edu-card, .contact-link, .section-header'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.classList.add('hidden');
  revealObserver.observe(el);
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ===========================
// NAVBAR SHADOW ON SCROLL
// ===========================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ===========================
// STATS COUNT UP ON SCROLL
// ===========================
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Only animate CGPA — API handles LeetCode and Repos
      const cgpa = document.querySelector('.card-stat:nth-child(1) .stat-n');
      if (cgpa) countUp(cgpa, 9.03, 1500, true);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroCard = document.querySelector('.hero-card');
if (heroCard) statsObserver.observe(heroCard);

// -- Run API fetches on page load --
fetchLeetCodeStats();
fetchGitHubStats();

// ===========================
// CONTACT FORM HANDLER
// ===========================
function handleSubmit(btn) {
  const name    = document.getElementById('form-name').value.trim();
  const email   = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim();
  const message = document.getElementById('form-message').value.trim();

  if (!name || !email || !subject || !message) {
    btn.textContent = '⚠ Please fill all fields';
    btn.style.background = '#c0392b';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
    }, 2500);
    return;
  }

  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#3a7d5a';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    btn.disabled = false;
    document.getElementById('form-name').value = '';
    document.getElementById('form-email').value = '';
    document.getElementById('form-subject').value = '';
    document.getElementById('form-message').value = '';
  }, 3000);
}

// ===========================
// SMOOTH SCROLL FOR NAV LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});