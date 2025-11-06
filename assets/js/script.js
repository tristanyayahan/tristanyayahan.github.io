// assets/js/script.js

// --- Apply saved theme immediately (prevents white flash) ---
(function applySavedThemeImmediately() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  } catch (e) {
  }
})();

// --- Component Loader ---
const components = [
  "navbar",
  "header",
  "about",
  "projects",
  "contact",
  "footer"
];

async function loadComponents() {
  const app = document.getElementById("app");
  const preloader = document.getElementById("preloader");

  // Load all components
  for (let file of components) {
    const res = await fetch(`components/${file}.html`);
    const html = await res.text();
    app.insertAdjacentHTML("beforeend", html);
  }

  // Wait for all images in #app to load
  const images = app.querySelectorAll("img");
  const imagePromises = Array.from(images).map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = img.onerror = resolve;
    });
  });

  await Promise.all(imagePromises);

  // Hide preloader after images load
  preloader.classList.add("hidden");

  // Initialize EmailJS after all components are loaded
  emailjs.init("Fi-OOBVIwwYITqjAC");
}

// --- Theme Toggle ---
function initThemeToggle() {
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;
  if (!toggleBtn) return;

  // Apply saved state to button appearance
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "🌙";
    toggleBtn.classList.remove("btn-outline-light");
    toggleBtn.classList.add("btn-outline-dark");
  } else {
    body.classList.remove("dark-mode");
    toggleBtn.textContent = "☀️";
    toggleBtn.classList.remove("btn-outline-dark");
    toggleBtn.classList.add("btn-outline-light");
  }

  // Toggle functionality
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const mode = body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", mode);

    if (mode === "dark") {
      toggleBtn.textContent = "🌙";
      toggleBtn.classList.remove("btn-outline-light");
      toggleBtn.classList.add("btn-outline-dark");
    } else {
      toggleBtn.textContent = "☀️";
      toggleBtn.classList.remove("btn-outline-dark");
      toggleBtn.classList.add("btn-outline-light");
    }
  });
}

// --- Project Modal ---
function initModals() {
  const projectModal = document.getElementById("projectModal");
  if (!projectModal) return;

  projectModal.addEventListener("show.bs.modal", event => {
    const card = event.relatedTarget; // clicked card
    if (!card) return;

    const title = card.querySelector(".card-title")?.textContent || "";
    const img = card.querySelector("img")?.src || "";
    const desc = card.querySelector(".card-text")?.textContent || "";
    const link = card.querySelector("a.btn")?.href || "#";
    const techList = card.querySelectorAll(".list-inline-item");

    projectModal.querySelector("#modalTitle").textContent = title;
    const modalImage = projectModal.querySelector("#modalImage");
    if (modalImage) {
      modalImage.src = img;
      modalImage.alt = title;
    }

    projectModal.querySelector("#modalDesc").textContent = desc;
    const modalLink = projectModal.querySelector("#modalLink");
    if (modalLink) modalLink.href = link;

    const modalTechList = projectModal.querySelector("#modalTechStack");
    if (modalTechList) {
      modalTechList.innerHTML = "";
      techList.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-inline-item";
        li.textContent = item.textContent;
        modalTechList.appendChild(li);
      });
    }
  });
}

// --- Global Alerts ---
function initGlobalAlerts() {
  const alertBox = document.getElementById("alertBox");
  if (alertBox) {
    setTimeout(() => {
      alertBox.classList.add("fade-out");
      setTimeout(() => {
        if (alertBox && alertBox.parentNode) alertBox.remove();
      }, 600);
    }, 4000);
  }
}

// --- Contact Form ---
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  const formAlert = document.getElementById("formAlert");
  if (!contactForm) return;

  const submitBtn = contactForm.querySelector("button[type='submit']");

  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Sending...";
    }

    emailjs.sendForm("service_nxz2jwh", "template_ab6moce", this)
      .then(() => {
        showFormAlert("✅ Message sent successfully!", "success");
        contactForm.reset();
      })
      .catch((error) => {
        showFormAlert("❌ Failed to send: " + error.text, "danger");
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Send Message";
        }
      });
  });

  function showFormAlert(message, type) {
    if (!formAlert) return;
    formAlert.className = `alert alert-${type} text-center`;
    formAlert.textContent = message;
    formAlert.classList.remove("d-none");

    setTimeout(() => {
      formAlert.classList.add("fade-out");
      setTimeout(() => {
        formAlert.className = "d-none";
        formAlert.textContent = "";
      }, 600);
    }, 4000);
  }
}

// --- Master Initialization ---
document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();
  initThemeToggle();
  initModals();
  initGlobalAlerts();
  initContactForm();
});
