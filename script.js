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
