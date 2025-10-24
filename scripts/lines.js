const svg = document.querySelector(".line-svg");
const path = svg.querySelector(".line-path");

const svgContainer = document.querySelector('.svg-container');
svgContainer.style.height = document.documentElement.scrollHeight + 'px';

const pathLength = path.getTotalLength();

// Initialize stroke dash style
path.style.strokeDasharray = pathLength;
path.style.strokeDashoffset = pathLength;

gsap.fromTo(
  path,
  { strokeDashoffset: pathLength },
  {
    strokeDashoffset: 0,
    duration: 10,
    ease: "none",
    scrollTrigger: {
      trigger: ".svg-container",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  }
);