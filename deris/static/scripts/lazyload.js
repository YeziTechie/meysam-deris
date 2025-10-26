document.addEventListener("DOMContentLoaded", () => {
  const mediaElements = document.querySelectorAll("video.gallery-video, img");

  mediaElements.forEach(el => {
    // Add skeleton
    el.classList.add("skeleton");

    // Replace src with data-src for lazy loading
    if (el.tagName === "VIDEO") {
      const src = el.getAttribute("src");
      el.setAttribute("data-src", src);
      el.removeAttribute("src");
    } else if (el.tagName === "IMG") {
      const src = el.getAttribute("src");
      el.setAttribute("data-src", src);
      el.removeAttribute("src");
    }
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const src = el.getAttribute("data-src");

        if (src) {
          if (el.tagName === "VIDEO") {
            el.src = src;
            el.load();
          } else {
            el.src = src;
          }
        }

        el.addEventListener("loadeddata", () => el.classList.remove("skeleton"), { once: true });
        el.addEventListener("load", () => el.classList.remove("skeleton"), { once: true });

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  mediaElements.forEach(el => observer.observe(el));
});
