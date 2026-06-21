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

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

function showFieldError(field, message) {
  const wrapper = field.closest(".form-field");
  wrapper.classList.toggle("invalid", Boolean(message));
  wrapper.querySelector(".field-error").textContent = message;
}

function validateContactForm() {
  const name = contactForm.elements.name;
  const email = contactForm.elements.email;
  const message = contactForm.elements.message;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  showFieldError(name, "");
  showFieldError(email, "");
  showFieldError(message, "");

  if (name.value.trim().length < 2) {
    showFieldError(name, "Vui lòng nhập tên của bạn.");
    isValid = false;
  }

  if (!emailPattern.test(email.value.trim())) {
    showFieldError(email, "Email chưa đúng định dạng.");
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    showFieldError(message, "Hãy chia sẻ thêm một chút về dự án nhé.");
    isValid = false;
  }

  return isValid;
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";

  if (!validateContactForm()) {
    formStatus.textContent = "Bạn kiểm tra lại các mục được đánh dấu nhé.";
    contactForm.querySelector(".invalid input, .invalid textarea")?.focus();
    return;
  }

  const data = new FormData(contactForm);
  const subject = `Dự án mới từ ${data.get("name")} — ${data.get("project")}`;
  const body = [
    `Tên: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Loại dự án: ${data.get("project")}`,
    `Ngân sách: ${data.get("budget")}`,
    "",
    "Nội dung:",
    data.get("message"),
  ].join("\n");

  formStatus.textContent = "Đang mở ứng dụng email của bạn…";
  window.location.href = `mailto:hello@lastudio.vn?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
});

contactForm.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.closest(".form-field").classList.contains("invalid")) {
      showFieldError(field, "");
    }
  });
});
