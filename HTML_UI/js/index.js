// document.addEventListener("DOMContentLoaded", function () {
//   const sliderContainer = document.querySelector(".hero-two-content-1");
//   const images = sliderContainer.querySelectorAll("img");
//   const prevBtn = document.querySelector(".image-slider svg:first-child");
//   const nextBtn = document.querySelector(".image-slider svg:last-child");
//   const dashes = document.querySelectorAll(".image-slider-dash");
//   let currentIndex = 0;
//   let slideInterval;
//   const slideDuration = 1000;
//   function initSlider() {
//     images.forEach((img, index) => {
//       img.style.display = index === 0 ? "block" : "none";
//     });
//     updateDashes();
//     startAutoSlide();
//   }
//   function showSlide(index) {
//     if (index < 0) {
//       index = images.length - 1;
//     } else if (index >= images.length) {
//       index = 0;
//     }

//     images[currentIndex].style.display = "none";
//     images[index].style.display = "block";
//     currentIndex = index;
//     updateDashes();
//   }
//   function updateDashes() {
//     dashes.forEach((dash, index) => {
//       dash.classList.toggle("active", index === currentIndex);
//     });
//   }
//   function nextSlide() {
//     showSlide(currentIndex + 1);
//   }
//   function prevSlide() {
//     showSlide(currentIndex - 1);
//   }
//   function startAutoSlide() {
//     slideInterval = setInterval(nextSlide, slideDuration);
//   }
//   function pauseAutoSlide() {
//     clearInterval(slideInterval);
//   }
//   nextBtn.addEventListener("click", () => {
//     pauseAutoSlide();
//     nextSlide();
//     startAutoSlide();
//   });

//   prevBtn.addEventListener("click", () => {
//     pauseAutoSlide();
//     prevSlide();
//     startAutoSlide();
//   });
//   dashes.forEach((dash, index) => {
//     dash.addEventListener("click", () => {
//       pauseAutoSlide();
//       showSlide(index);
//       startAutoSlide();
//     });
//   });
//   sliderContainer.addEventListener("mouseenter", pauseAutoSlide);
//   sliderContainer.addEventListener("mouseleave", startAutoSlide);
//   initSlider();
// });

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

      // Close all others
      document.querySelectorAll(".dropdown.submenu").forEach((menu) => {
        menu.classList.remove("show");
      });
      document.querySelectorAll(".navigation-plus-icon").forEach((i) => {
        i.classList.remove("rotate");
      });

      // Toggle current
      if (!isOpen) {
        dropdown.classList.add("show");
        icon.classList.add("rotate");
      }
    });
  });
});
