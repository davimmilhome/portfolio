document.addEventListener("DOMContentLoaded", () => {
  // Atualizar ano no footer
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Adicionar funcionalidade de expandir descrições dos projetos
  // Não aplicar em textos-grid
  const projectDescs = document.querySelectorAll(".projects-grid:not(.textos-grid) .project-desc");
  
  projectDescs.forEach(desc => {
    const projectBody = desc.closest(".project-body");
    if (!projectBody) return;

    // Criar botão de expandir
    const expandBtn = document.createElement("button");
    expandBtn.className = "expand-btn";
    expandBtn.textContent = "Ver mais";
    expandBtn.setAttribute("aria-expanded", "false");
    expandBtn.style.display = "none";

    // Inserir botão após a descrição
    desc.after(expandBtn);

    // Verificar se o texto está truncado
    const checkIfTruncated = () => {
      const isOverflowing = desc.scrollHeight > desc.offsetHeight;
      expandBtn.style.display = isOverflowing ? "block" : "none";
    };

    // Verificar após loading das imagens
    setTimeout(checkIfTruncated, 100);
    window.addEventListener("load", checkIfTruncated);

    // Adicionar comportamento de clique
    expandBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isExpanded = desc.classList.contains("expanded");
      
      if (isExpanded) {
        desc.classList.remove("expanded");
        expandBtn.textContent = "Ver mais";
        expandBtn.setAttribute("aria-expanded", "false");
      } else {
        desc.classList.add("expanded");
        expandBtn.textContent = "Ver menos";
        expandBtn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Carrosséis de imagens dos projetos
  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach(carousel => {
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
    const previous = carousel.querySelector("[data-carousel-prev]");
      const next = carousel.querySelector("[data-carousel-next]");
      const zoom = carousel.querySelector("[data-carousel-zoom]");
      const lightbox = document.getElementById(carousel.dataset.lightboxTarget);
      if (lightbox && lightbox.parentElement !== document.body) {
        document.body.appendChild(lightbox);
      }
      const lightboxImage = lightbox?.querySelector("[data-lightbox-image]");
    const lightboxClose = lightbox?.querySelector("[data-lightbox-close]");
    const lightboxPrevious = lightbox?.querySelector("[data-lightbox-prev]");
    const lightboxNext = lightbox?.querySelector("[data-lightbox-next]");
    const lightboxDots = lightbox ? Array.from(lightbox.querySelectorAll("[data-lightbox-dot]")) : [];

    if (slides.length < 2) return;

    let activeIndex = slides.findIndex(slide => slide.classList.contains("is-active"));
    if (activeIndex < 0) activeIndex = 0;

    const showSlide = index => {
      activeIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", String(isActive));
      });

      if (lightbox && !lightbox.hidden) syncLightbox();
    };

    const syncLightbox = () => {
      const activeSlide = slides[activeIndex];
      if (!lightboxImage || !activeSlide) return;

      lightboxImage.src = activeSlide.currentSrc || activeSlide.src;
      lightboxImage.alt = activeSlide.alt;
      lightboxDots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", String(isActive));
      });
    };

    previous?.addEventListener("click", () => showSlide(activeIndex - 1));
    next?.addEventListener("click", () => showSlide(activeIndex + 1));
    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => showSlide(dotIndex));
    });

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.hidden = true;
      document.body.classList.remove("lightbox-open");
    };

    const openLightbox = () => {
      if (!lightbox || !lightboxImage) return;

      syncLightbox();
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      lightboxClose?.focus();
    };

    zoom?.addEventListener("click", openLightbox);
    slides.forEach(slide => slide.addEventListener("click", openLightbox));
    lightboxPrevious?.addEventListener("click", () => showSlide(activeIndex - 1));
    lightboxNext?.addEventListener("click", () => showSlide(activeIndex + 1));
    lightboxDots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => showSlide(dotIndex));
    });
    lightboxClose?.addEventListener("click", closeLightbox);
    lightbox?.addEventListener("click", event => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && lightbox && !lightbox.hidden) {
        closeLightbox();
      } else if (event.key === "ArrowLeft" && lightbox && !lightbox.hidden) {
        showSlide(activeIndex - 1);
      } else if (event.key === "ArrowRight" && lightbox && !lightbox.hidden) {
        showSlide(activeIndex + 1);
      }
    });
  });
});
