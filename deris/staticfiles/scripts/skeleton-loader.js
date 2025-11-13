document.querySelectorAll(".lazy-media").forEach(media => {
  media.addEventListener("loadeddata", showMedia); // for videos
  media.addEventListener("load", showMedia); // for images

  function showMedia() {
    const wrapper = media.closest(".media");
    wrapper.querySelector(".skeleton").style.display = "none";
    media.style.display = "block";
  }
});


setInterval(() => {
  document.querySelectorAll('.numnum').forEach(el => {
    el.style.color = 'var(--theme)';
  });
}, 5000);
