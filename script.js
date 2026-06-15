// Cursor glow
const glow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Nav scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// Reveal on scroll
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
);
revealEls.forEach((el) => observer.observe(el));

// Parallax text on scroll
const parallaxText = document.getElementById("parallaxText");
const parallaxBanner = document.getElementById("parallaxBanner");
function updateParallax() {
  if (!parallaxText) return;
  const rect = parallaxBanner.getBoundingClientRect();
  const offset = (rect.top / window.innerHeight) * 120;
  parallaxText.style.transform = `translateX(${offset}px)`;
}
window.addEventListener("scroll", updateParallax, { passive: true });

// 3D tilt card
const tiltCard = document.getElementById("tiltCard");
if (tiltCard) {
  tiltCard.addEventListener("mousemove", (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    tiltCard.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  tiltCard.addEventListener("mouseleave", () => {
    tiltCard.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
  });
}

// Menu cards 3D tilt
document.querySelectorAll(".menu-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    card.style.transform = `translateY(-12px) scale(1.02) perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Floating items depth on scroll
window.addEventListener(
  "scroll",
  () => {
    const scrollY = window.scrollY;
    const items = document.querySelectorAll(".floating-item");
    items.forEach((item, i) => {
      const speed = 0.2 + i * 0.05;
      item.style.transform = `translateY(${(-scrollY * speed) % 60}px) rotate(${i * 15}deg)`;
    });
  },
  { passive: true },
);

// Number counter animation for stats
function animateCounter(el, target, suffix = "", decimals = 0) {
  let start = 0;
  const duration = 1500;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;
    el.textContent =
      decimals > 0 ? current.toFixed(1) + suffix : Math.floor(current) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const statsObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll(".stat-number");
        nums.forEach((num) => {
          const text = num.textContent;
          if (text.includes("4.9")) animateCounter(num, 4.9, "", 1);
          else if (text.includes("₹"))
            animateCounter(num, 200, "₹".padStart(1, "₹"), 0);
          else if (text.includes("%")) animateCounter(num, 100, "%", 0);
          else if (text.includes("15")) animateCounter(num, 15, "+", 0);
        });
        statsObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);
const heroStats = document.querySelector(".hero-stats");
if (heroStats) statsObs.observe(heroStats);
