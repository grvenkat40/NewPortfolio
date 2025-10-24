// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-links a ').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.nav-links li').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            let category = this.getAttribute("data-category");

            projectItems.forEach(item => {
                if (category === "all" || item.getAttribute("data-category") === category) {
                    item.style.display = "block"; // Show the item
                } else {
                    item.style.display = "none"; // Hide the item
                }
            });
        });
    });
});
document.querySelector('.DownloadResume').addEventListener('click',function(event){
    event.stopPropagation();
    const link=document.createElement('a');
    link.href="Venkat_EngineeringResumes_5.pdf";
    link.download="Venkat_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Fade-In Animations on Scroll
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Back-to-top
document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});




// Fetch Data from Flask API
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            console.log("Data from Flask:", data);
        })
        .catch(error => console.error('Error fetching data:', error));
});

const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // prevent default redirect

    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      successMessage.style.display = 'block';
      form.reset();
    } else {
      alert("Oops! Something went wrong.");
    }
  });
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    }

    function prevSlide() {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
        showSlide(currentSlide);
    }

    function nextSlide() {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);
// </script>

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let formData = new FormData(this);
    
    fetch("https://formspree.io/f/xqapylpa", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            document.getElementById("response-msg").innerText = "Message Sent Successfully!";
            document.getElementById("contact-form").reset();
        } else {
            document.getElementById("response-msg").innerText = "Something went wrong!";
        }
    }).catch(error => {
        document.getElementById("response-msg").innerText = "Error sending message.";
    });
});
