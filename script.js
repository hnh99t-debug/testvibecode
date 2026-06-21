const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 90}ms`;
  observer.observe(element);
});

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav");
const navLinks = navigation.querySelectorAll("a");

function toggleMenu(forceClose = false) {
  const shouldOpen = forceClose ? false : !navigation.classList.contains("open");
  navigation.classList.toggle("open", shouldOpen);
  menuButton.classList.toggle("active", shouldOpen);
  menuButton.setAttribute("aria-expanded", String(shouldOpen));
  menuButton.setAttribute("aria-label", shouldOpen ? "Đóng menu" : "Mở menu");
  document.body.style.overflow = shouldOpen ? "hidden" : "";
}

menuButton.addEventListener("click", () => toggleMenu());
navLinks.forEach((link) => link.addEventListener("click", () => toggleMenu(true)));

const heroVisual = document.querySelector(".hero-visual");

if (window.matchMedia("(pointer: fine)").matches) {
  heroVisual.addEventListener("mousemove", (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroVisual.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    heroVisual.style.transform = "";
  });
}
