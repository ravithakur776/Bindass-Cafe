/* ===================== CURSOR GLOW ===================== */
const glow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ===================== NAV SCROLL EFFECT ===================== */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

/* ===================== REVEAL ON SCROLL ===================== */
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
);
revealEls.forEach((el) => revealObserver.observe(el));

/* ===================== PARALLAX TEXT ===================== */
const parallaxText = document.getElementById("parallaxText");
const parallaxBanner = document.getElementById("parallaxBanner");

function updateParallax() {
  if (!parallaxText || !parallaxBanner) return;
  const rect = parallaxBanner.getBoundingClientRect();
  const offset = (rect.top / window.innerHeight) * 120;
  parallaxText.style.transform = `translateX(${offset}px)`;
}
window.addEventListener("scroll", updateParallax, { passive: true });

/* ===================== 3D TILT — ABOUT CARD ===================== */
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

/* ===================== 3D TILT — MENU CARDS ===================== */
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

/* ===================== FLOATING ITEMS PARALLAX ===================== */
window.addEventListener(
  "scroll",
  () => {
    const scrollY = window.scrollY;
    document.querySelectorAll(".floating-item").forEach((item, i) => {
      const speed = 0.2 + i * 0.05;
      item.style.transform = `translateY(${(-scrollY * speed) % 60}px) rotate(${i * 15}deg)`;
    });
  },
  { passive: true },
);

/* ===================== STAT COUNTER ANIMATION ===================== */
function animateCounter(el, target, prefix, suffix, decimals) {
  const duration = 1500;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    const display =
      decimals > 0 ? current.toFixed(1) : Math.floor(current).toString();
    el.textContent = prefix + display + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const heroStats = document.querySelector(".hero-stats");
if (heroStats) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const nums = entry.target.querySelectorAll(".stat-number");
          nums.forEach((num) => {
            const text = num.textContent.trim();
            if (text.includes("4.9")) animateCounter(num, 4.9, "", "", 1);
            else if (text.includes("₹")) animateCounter(num, 200, "₹", "", 0);
            else if (text.includes("%")) animateCounter(num, 100, "", "%", 0);
            else if (text.includes("15")) animateCounter(num, 15, "", "+", 0);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  statsObserver.observe(heroStats);
}

/* ===================== FAB TOOLTIP LABELS ===================== */
const fabWhatsapp = document.querySelector(".fab-whatsapp");
const fabCall = document.querySelector(".fab-call");

function addTooltip(el, label) {
  el.setAttribute("title", label);
  el.addEventListener("mouseenter", () => {
    const tip = document.createElement("div");
    tip.className = "fab-tooltip";
    tip.textContent = label;
    tip.style.cssText = `
      position: fixed;
      background: rgba(15,10,5,0.92);
      color: #fff8f0;
      font-family: 'Nunito', sans-serif;
      font-size: 13px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 20px;
      pointer-events: none;
      z-index: 3000;
      white-space: nowrap;
      border: 1px solid rgba(255,107,0,0.3);
      letter-spacing: 0.5px;
    `;
    document.body.appendChild(tip);

    function positionTip(e) {
      const rect = el.getBoundingClientRect();
      tip.style.top = rect.top + rect.height / 2 - tip.offsetHeight / 2 + "px";
      tip.style.left = rect.left - tip.offsetWidth - 12 + "px";
    }

    const rect = el.getBoundingClientRect();
    // Wait one frame so tip has dimensions
    requestAnimationFrame(() => {
      tip.style.top = rect.top + rect.height / 2 - tip.offsetHeight / 2 + "px";
      tip.style.left = rect.left - tip.offsetWidth - 12 + "px";
    });

    el._tooltip = tip;
  });

  el.addEventListener("mouseleave", () => {
    if (el._tooltip) {
      el._tooltip.remove();
      el._tooltip = null;
    }
  });
}

if (fabWhatsapp) addTooltip(fabWhatsapp, "Chat on WhatsApp");
if (fabCall) addTooltip(fabCall, "Call +91 92662 04345");

/* ===================== SMOOTH ANCHOR SCROLL ===================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ===================== SPECIALS SCROLL DRAG ===================== */
const specialsScroll = document.querySelector(".specials-scroll");
if (specialsScroll) {
  let isDown = false;
  let startX;
  let scrollLeft;

  specialsScroll.addEventListener("mousedown", (e) => {
    isDown = true;
    specialsScroll.style.cursor = "grabbing";
    startX = e.pageX - specialsScroll.offsetLeft;
    scrollLeft = specialsScroll.scrollLeft;
  });
  specialsScroll.addEventListener("mouseleave", () => {
    isDown = false;
    specialsScroll.style.cursor = "default";
  });
  specialsScroll.addEventListener("mouseup", () => {
    isDown = false;
    specialsScroll.style.cursor = "default";
  });
  specialsScroll.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - specialsScroll.offsetLeft;
    const walk = (x - startX) * 1.5;
    specialsScroll.scrollLeft = scrollLeft - walk;
  });
}

/* ===================== ACTIVE NAV LINK HIGHLIGHT ===================== */
const sections = document.querySelectorAll("section[id], div[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color =
            link.getAttribute("href") === "#" + entry.target.id
              ? "var(--saffron)"
              : "";
        });
      }
    });
  },
  { threshold: 0.4 },
);
sections.forEach((s) => sectionObserver.observe(s));
