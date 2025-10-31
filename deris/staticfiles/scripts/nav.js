gsap.registerPlugin(ScrollTrigger);

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



  function navBtn1Expand () {
    const navBtn1 = document.querySelector('.js-nav-btn-1-1');
    const navBtn2 = document.querySelector('.js-nav-btn-1-2');
    const navBtn3 = document.querySelector('.js-nav-btn-1-3');
    const navBtn4 = document.querySelector('.js-nav-btn-1-4');
    const navBtn5 = document.querySelector('.js-nav-btn-1-5');
  
    navBtn1.classList.add('nav-btn-1-clicked', 'nav-btn-1-1-clicked');
    navBtn2.classList.add('nav-btn-1-clicked', 'nav-btn-1-2-clicked');
    navBtn3.classList.add('nav-btn-1-clicked', 'nav-btn-1-3-clicked');
    navBtn4.classList.add('nav-btn-1-clicked', 'nav-btn-1-4-clicked');
    navBtn5.classList.add('nav-btn-1-clicked', 'nav-btn-1-5-clicked');
  }
  
  function navBtn1Shrink () {
    const navBtn1 = document.querySelector('.js-nav-btn-1-1');
    const navBtn2 = document.querySelector('.js-nav-btn-1-2');
    const navBtn3 = document.querySelector('.js-nav-btn-1-3');
    const navBtn4 = document.querySelector('.js-nav-btn-1-4');
    const navBtn5 = document.querySelector('.js-nav-btn-1-5');
  
    navBtn1.classList.remove('nav-btn-1-clicked', 'nav-btn-1-1-clicked');
    navBtn2.classList.remove('nav-btn-1-clicked', 'nav-btn-1-2-clicked');
    navBtn3.classList.remove('nav-btn-1-clicked', 'nav-btn-1-3-clicked');
    navBtn4.classList.remove('nav-btn-1-clicked', 'nav-btn-1-4-clicked');
    navBtn5.classList.remove('nav-btn-1-clicked', 'nav-btn-1-5-clicked');
  }
  
  function navBtn1Handler () {
    const e = document.querySelector('.js-nav-btn-1-1')
  
    if (e.classList.contains('nav-btn-1-1-clicked')) {
      navBtn1Shrink()
    } else {
      navBtn1Expand()
    }
  }
  
  document.querySelector('.js-nav-btn-1-1').addEventListener('click', navBtn1Handler);


const navbar = document.getElementById('navbar');
const toggleBtn = document.getElementById('toggle-btn');

toggleBtn.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

