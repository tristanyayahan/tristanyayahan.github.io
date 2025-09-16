// assets/js/script.js
// Apply saved theme immediately (runs as soon as this script file loads)
(function applySavedThemeImmediately() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  } catch (e) {
    // ignore if localStorage unavailable
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  // --- Project Modal (safe guard) ---
  const projectModal = document.getElementById("projectModal");
  if (projectModal) {
    projectModal.addEventListener("show.bs.modal", event => {
      const card = event.relatedTarget; // the clicked card
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
        modalTechList.innerHTML = ""; // clear previous list
        techList.forEach(item => {
          const li = document.createElement("li");
          li.className = "list-inline-item";
          li.textContent = item.textContent;
          modalTechList.appendChild(li);
        });
      }
    });
  }

  // --- Alerts ---
  const alertBox = document.getElementById("alertBox");
  if (alertBox) {
    setTimeout(() => {
      alertBox.classList.add("fade-out");
      setTimeout(() => {
        if (alertBox && alertBox.parentNode) alertBox.remove();
      }, 600); // wait for fade-out transition
    }, 4000); // show for 4s
  }

  // --- Theme Toggle (only if present) ---
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  // Apply saved theme (again, safe)
  const savedTheme = (() => {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  })();

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    if (toggleBtn) {
      toggleBtn.textContent = "🌙";
      toggleBtn.classList.remove("btn-outline-light");
      toggleBtn.classList.add("btn-outline-dark");
    }
  } else {
    body.classList.remove("dark-mode");
    if (toggleBtn) {
      toggleBtn.textContent = "☀️";
      toggleBtn.classList.remove("btn-outline-dark");
      toggleBtn.classList.add("btn-outline-light");
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const mode = body.classList.contains("dark-mode") ? "dark" : "light";
      try { localStorage.setItem("theme", mode); } catch (e) {}
      // update button appearance
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
});
