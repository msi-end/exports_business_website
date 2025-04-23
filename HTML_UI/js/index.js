
document.addEventListener("DOMContentLoaded", function() {
  // Function to initialize the slider for a given section
  function initializeSlider(sliderSelector) {
      const slider = document.querySelector(sliderSelector);
      const prevButton = slider.querySelector('svg:first-of-type');
      const nextButton = slider.querySelector('svg:last-of-type');
      const dots = slider.querySelectorAll('.image-slider-dash');
      let currentSlide = 0;

      // Function to update the active slide and dots
      function updateSlide() {
          // Reset all slides and dots
          dots.forEach(dot => dot.classList.remove('active'));
          const slides = slider.querySelectorAll('.position-relative img');
          slides.forEach(slide => slide.classList.add('hidden'));

          // Activate the current slide and corresponding dot
          slides[currentSlide].classList.remove('hidden');
          dots[currentSlide].classList.add('active');
      }

      // Event listener for the "previous" button
      prevButton.addEventListener("click", function() {
          currentSlide = (currentSlide === 0) ? dots.length - 1 : currentSlide - 1;
          updateSlide();
      });

      // Event listener for the "next" button
      nextButton.addEventListener("click", function() {
          currentSlide = (currentSlide === dots.length - 1) ? 0 : currentSlide + 1;
          updateSlide();
      });

      // Event listeners for dot clicks
      dots.forEach((dot, index) => {
          dot.addEventListener("click", function() {
              currentSlide = index;
              updateSlide();
          });
      });

      // Initialize the slider
      updateSlide();
  }

  // Initialize sliders for both sections
  initializeSlider('.hero-two .image-slider');
  initializeSlider('.empowerment .image-slider');
});


function animateFarmerCard(card) {
  const img = card.querySelector("img");
  const svg = card.querySelector("object");
  const text = card.querySelector("p");
  anime({
    targets: img,
    scale: [
      { value: 1.05, duration: 300 },
      { value: 0.9, duration: 300 },
    ],
    opacity: [1, 0.8],
    filter: ["grayscale(0%)", "grayscale(20%)"],
    easing: "easeInOutSine",
  });

  anime({
    targets: svg,
    rotate: "+=360",
    duration: 1500,
    easing: "easeInOutElastic(1, .5)",
    scale: [1, 1.1, 1],
  });

  anime({
    targets: text,
    translateY: [10, 0, 10],
    opacity: [0.8, 1, 0.8],
    duration: 1000,
    easing: "easeInOutSine",
  });
}
function startRandomEmpowermentAnimation() {
  const cards = document.querySelectorAll(".empowerment-images");
  function loopAnimate() {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    animateFarmerCard(randomCard);
    const nextDelay = Math.floor(Math.random() * 1200) + 800;
    setTimeout(loopAnimate, nextDelay);
  }
  loopAnimate();
}

document.addEventListener("DOMContentLoaded", startRandomEmpowermentAnimation);
async function typeText(targetSelector, text, speed = 50) {
  const target = document.querySelector(targetSelector);
  target.innerHTML = "";
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.opacity = 0;
    target.appendChild(span);
  });
  await anime({
    targets: target.querySelectorAll("span"),
    opacity: [0, 1],
    delay: anime.stagger(speed),
    duration: 100,
    easing: "easeInOutQuad",
  }).finished;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function loopTyping() {
  const taglineText = "No #1 People's choice for Fresh food";
  const subText = "Packed With Love From North-East India";
  const repeats = 50;
  for (let i = 0; i < repeats; i++) {
    await typeText("#tagline-text", taglineText);
    await sleep(100);
    await typeText("#subtagline-text", subText);
    await sleep(2000);
  }
}
document.addEventListener("DOMContentLoaded", loopTyping);

const features = document.querySelectorAll(".feature");
function setRandomFloatingFeatures() {
  features.forEach((feature) => {
    if (feature.classList.contains("floating")) {
      feature.classList.add("fading-out");
      setTimeout(() => {
        feature.classList.remove("floating", "fading-out");
      }, 500);
    }
  });
  setTimeout(() => {
    const randomIndices = [];
    while (randomIndices.length < 2) {
      const rand = Math.floor(Math.random() * features.length);
      if (!randomIndices.includes(rand)) {
        randomIndices.push(rand);
      }
    }
    randomIndices.forEach((index) => {
      features[index].classList.add("floating");
    });
  }, 500);
}
setRandomFloatingFeatures();
setInterval(setRandomFloatingFeatures, 6000);

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".category-card");
  let currentIndex = 0;

  setInterval(() => {
    cards.forEach((card) => card.classList.remove("active"));
    cards[currentIndex].classList.add("active");
    currentIndex = (currentIndex + 1) % cards.length;
  }, 1500);
});

const nav = document.querySelector(".navigation");
const menuToggleBtns = document.querySelectorAll(".menu-toggle-btn");
const navContent = document.querySelector(".navigation-content");
function toggleMenu() {
  nav.removeAttribute("data-aos");
  nav.classList.toggle("navigation-active");
}

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel");
  function rotateFruits() {
    const fruits = carousel.children;
    const firstFruit = fruits[0];
    firstFruit.classList.add("fade-out");
    carousel.style.transition = "transform 0.8s ease-in-out";
    carousel.style.transform = "translateX(-220px)";
    setTimeout(() => {
      carousel.style.transition = "none";
      carousel.style.transform = "translateX(0)";
      const clone = firstFruit.cloneNode(true);
      clone.classList.remove("fade-out", "first");

      // Trigger fade-in animation
      requestAnimationFrame(() => {
        clone.classList.add("fade-in");
        setTimeout(() => {
          clone.classList.remove("fade-in");
        }, 800);
      });
      carousel.removeChild(firstFruit);
      carousel.appendChild(clone);
      requestAnimationFrame(() => {
        carousel.children[0].classList.add("first");
      });
    }, 800);
  }
  carousel.children[0].classList.add("first");
  setInterval(rotateFruits, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
  const plusIcons = document.querySelectorAll(".navigation-plus-icon");
  plusIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
      const dropdown = icon.parentElement.nextElementSibling;
      if (!dropdown || !dropdown.classList.contains("submenu")) return;
      const isOpen = dropdown.classList.contains("show");
      document.querySelectorAll(".dropdown.submenu").forEach((menu) => {
        menu.classList.remove("show");
      });
      document.querySelectorAll(".navigation-plus-icon").forEach((i) => {
        i.classList.remove("rotate");
      });
      if (!isOpen) {
        dropdown.classList.add("show");
        icon.classList.add("rotate");
      }
    });
  });
});



function updateMapProductShowcase(region) {
  const State = {
    "Assam": {
      title: "ASSAM",
      description:
        "Assam produces a wide variety of seasonal fruits rich in flavor and nutrients.",
      image: "../image/fruits/banana.png",
      alt: "Fruits from Assam",
    },
  };
  const data = State[region];
  if (!data) return;
  const leftContent = document.querySelector(".map-product-container .left-content");
  const title = leftContent.querySelector("h2");
  const desc = leftContent.querySelector("p");
  const img = leftContent.querySelector(".product-images");
  title.classList.add("fade-out");
  desc.classList.add("fade-out");
  img.classList.add("fade-out");
  setTimeout(() => {
    title.textContent = data.title;
    desc.textContent = data.description;
    img.src = data.image;
    img.alt = data.alt || data.title;
    title.classList.remove("fade-out");
    desc.classList.remove("fade-out");
    img.onload = () => {
      img.classList.remove("fade-out");
    };
    if (img.complete) {
      img.onload();
    }

  }, 500);  
}



