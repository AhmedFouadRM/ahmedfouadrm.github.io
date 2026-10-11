// Initialize Lucide Icons
lucide.createIcons();

// Intersection Observer for Scroll Animations
document.addEventListener("DOMContentLoaded", function () {
  const faders = document.querySelectorAll(".fade-in:not(.appear)");

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px 100px 0px",
  };

  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
});

// Spotlight Effect
const spotlightCards = document.querySelectorAll(
  ".card, .exp-card, .skill-card",
);
spotlightCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

// Scroll Listeners
const backToTop = document.getElementById("backToTop");
const scrollProgress = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

  // Scroll Progress Bar Logic
  if (scrollProgress) {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolledPercentage = (scrolled / height) * 100;
    scrollProgress.style.width = scrolledPercentage + "%";
  }

  // Back-to-Top Button Logic
  if (scrolled > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

// Mobile Nav Toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

function setNavOpen(open) {
  navLinks.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

navToggle.addEventListener("click", () => {
  setNavOpen(!navLinks.classList.contains("open"));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNavOpen(false));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setNavOpen(false);
});

// Carousel Buttons (scroll by one visible page of screenshots)
document.querySelectorAll(".card-gallery").forEach((gallery) => {
  const carousel = gallery.querySelector(".carousel");
  gallery.querySelector(".carousel-btn.prev").addEventListener("click", () => {
    carousel.scrollBy({ left: -carousel.clientWidth, behavior: "smooth" });
  });
  gallery.querySelector(".carousel-btn.next").addEventListener("click", () => {
    carousel.scrollBy({ left: carousel.clientWidth, behavior: "smooth" });
  });
});

// Footer Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Highlight the nav link for the section in view
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
navAnchors.forEach((a) => {
  const section = document.querySelector(a.getAttribute("href"));
  if (section) sectionObserver.observe(section);
});
