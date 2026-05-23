function AboutSecOverlay(){
  const overLayAbout = document.getElementById("AboutPageOverlay");
  overLayAbout.style.display = "flex";
}

function CloseOverlay(){
  const overLayAbout = document.getElementById("AboutPageOverlay");
  overLayAbout.style.display = "none";
}

window.addEventListener("click", (e) =>{
  const overlay = document.getElementById("AboutPageOverlay");
  const content = document.getElementById("aboutPageContent");
  if(e.target == overlay){
    CloseOverlay();
  }
});


const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    // Update the position of the div based on mouse X and Y
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Optional: Add an effect when clicking
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.1)';
});

// Add this in a <script> tag at the bottom of your HTML, before </body>

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, { threshold: 0.15 });

// Observe each element you want to animate
document.querySelectorAll(
  '#about h2, #about h3, #about > hr, #about_para p, .tech_grid, #connect-way'
).forEach((el, i) => {
  el.style.transitionDelay = `${i * 60}ms`; // stagger
  observer.observe(el);
});

const wrapper = document.querySelector('.projects-scroll-wrapper');
let isDown = false;
let startX;
let scrollLeft;

wrapper.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
});

wrapper.addEventListener('mouseleave', () => { isDown = false; });
wrapper.addEventListener('mouseup', () => { isDown = false; });

wrapper.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - wrapper.offsetLeft;
  const walk = (x - startX) * 1.5;
  wrapper.scrollLeft = scrollLeft - walk;
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const filter = this.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? 'flex' : 'none';
    });
  });
});

const scrollAmount = 324; // card width (300) + gap (24)

document.getElementById('arrow-left').addEventListener('click', () => {
  wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

document.getElementById('arrow-right').addEventListener('click', () => {
  wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

const cards = document.querySelectorAll('.project-card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('in-view');
      }, i * 120); // stagger: each card 120ms after previous
      cardObserver.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => cardObserver.observe(card));

const projectEls = document.querySelectorAll(
  '#projects h2, #projects > hr, .section-sub, .filter-btn'
);

const elObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('in-view');
      }, i * 80);
      elObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

projectEls.forEach(el => elObserver.observe(el));

const skillscards = document.querySelectorAll(".skill-card");

const SkillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {

      const index = [...skillscards].indexOf(entry.target);

      entry.target.style.transitionDelay = `${index * 120}ms`;
      entry.target.classList.add("in-view");

      SkillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

skillscards.forEach(card => SkillObserver.observe(card));

const scrollBtn = document.getElementById("scrollTopBtn");

// Show button when scrolling
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

// Scroll to top smoothly
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const Skillobserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.skill-card').forEach(el => Skillobserver.observe(el));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in-view');
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  '.exp-heading, .exp-underline, .exp-sub, .timeline, .exp-card'
).forEach(el => io.observe(el));


const logo = document.getElementById('venkat_logo');

logo.addEventListener('mousemove', (e) => {
  const rect = logo.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = (e.clientX - cx) / (rect.width / 2);
  const dy = (e.clientY - cy) / (rect.height / 2);

  logo.style.transform = `
    perspective(400px)
    rotateY(${dx * 20}deg)
    rotateX(${-dy * 20}deg)
    scale(1.1)
  `;
  logo.style.filter = `drop-shadow(${-dx*8}px ${dy*8}px 16px rgba(0,0,0,0.25))`;
});

logo.addEventListener('mouseleave', () => {
  logo.style.transform = 'perspective(400px) rotateY(0) rotateX(0) scale(1)';
  logo.style.filter = 'none';
  logo.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease';
});