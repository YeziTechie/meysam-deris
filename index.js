import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const vid = document.querySelector(".js-video");

vid.addEventListener("loadedmetadata", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(vid, {
    currentTime: vid.duration,
    ease: "none",
    scrollTrigger: {
      trigger: ".video-container",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });
});
