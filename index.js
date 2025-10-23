const section = document.querySelector('.video-container');
const vid = document.querySelector('.js-video');

vid.pause();

let targetTime = 0;
let currentTime = 0;

function scroll() {
  const distance = window.scrollY - section.offsetTop;
  const total = section.clientHeight - window.innerHeight;

  let percentage = distance / total;
  percentage = Math.max(0, Math.min(percentage, 1));

  if (vid.duration > 0) {
    targetTime = vid.duration * percentage;
  }
}

// smooth interpolation loop
function smoothUpdate() {
  if (vid.duration > 0) {
    currentTime += (targetTime - currentTime) * 0.1; // 0.1 = smoothness factor
    vid.currentTime = currentTime;
  }
  requestAnimationFrame(smoothUpdate);
}

window.addEventListener('scroll', scroll);
scroll();
smoothUpdate();
