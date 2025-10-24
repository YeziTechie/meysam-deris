

gsap.registerPlugin(ScrollTrigger);

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

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
  item.addEventListener("click", () => {
    const target = document.querySelector(item.dataset.target);
    target.scrollIntoView({
      behavior: "smooth",
      block: "start" // scrolls so the target is at the top
    });
  });
});

// Optional: highlight nav item on scroll
const sections = ["#videography", "#photography", "#ai"].map(id => document.querySelector(id));

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + window.innerHeight / 2; // center of screen
  sections.forEach((section, i) => {
    const navItem = navItems[i];
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      navItem.classList.add("active");
    } else {
      navItem.classList.remove("active");
    }
  });
});