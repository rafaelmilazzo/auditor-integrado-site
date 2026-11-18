// Menu mobile
const menuBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");

menuBtn?.addEventListener("click", () => {
  const isOpen = nav.getAttribute("data-open") === "true";
  nav.setAttribute("data-open", String(!isOpen));
  menuBtn.setAttribute("aria-expanded", String(!isOpen));
});

// Carrossel centralizado de telas
const tabBtns = Array.from(document.querySelectorAll("[data-tab-target]"));
const slides = Array.from(document.querySelectorAll(".afi-slide"));
const stageCaption = document.getElementById("stage-caption");

function setActiveSlide(activeIndex) {
  const total = slides.length;
  slides.forEach((slide, i) => {
    if (i === activeIndex) {
      slide.setAttribute("data-pos", "center");
      if (stageCaption) stageCaption.textContent = slide.getAttribute("data-caption") || "";
    } else if (i === (activeIndex + 1) % total) {
      slide.setAttribute("data-pos", "right");
    } else {
      slide.setAttribute("data-pos", "left");
    }
  });
  tabBtns.forEach((b, i) => b.setAttribute("aria-selected", String(i === activeIndex)));
}

tabBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => setActiveSlide(index));
});

slides.forEach((slide, index) => {
  slide.addEventListener("click", () => {
    if (slide.getAttribute("data-pos") === "center") {
      const img = slide.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.setAttribute("data-open", "true");
    } else {
      setActiveSlide(index);
    }
  });
});

// Modal de Termos com aceite lembrado na sessão
const modal = document.getElementById("terms-modal");
const acceptBtn = document.getElementById("terms-accept");
const check1 = document.getElementById("terms-check-1");
const check2 = document.getElementById("terms-check-2");
const targetLabel = document.getElementById("terms-filename");
let pendingUrl = null;

function updateAcceptState() {
  acceptBtn.disabled = !(check1.checked && check2.checked);
}

check1?.addEventListener("change", updateAcceptState);
check2?.addEventListener("change", updateAcceptState);

document.querySelectorAll("[data-download-file]").forEach((link) => {
  link.addEventListener("click", (e) => {
    const file = link.getAttribute("data-download-file");
    const url = link.getAttribute("href");
    if (sessionStorage.getItem("afi_terms_accepted") === "true") {
      return; // Já aceitou nesta sessão: baixa direto
    }
    e.preventDefault();
    pendingUrl = url;
    targetLabel.textContent = file;
    modal.setAttribute("data-open", "true");
  });
});

document.getElementById("terms-cancel")?.addEventListener("click", () => {
  modal.setAttribute("data-open", "false");
});

acceptBtn?.addEventListener("click", () => {
  sessionStorage.setItem("afi_terms_accepted", "true");
  modal.setAttribute("data-open", "false");
  if (pendingUrl && pendingUrl !== "#") {
    window.location.href = pendingUrl;
  }
});

// Lightbox para ampliar screenshots
const lightbox = document.getElementById("lightbox-modal");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll("[data-zoom]").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.setAttribute("data-open", "true");
  });
});

lightbox?.addEventListener("click", () => {
  lightbox.setAttribute("data-open", "false");
});
