document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".hero-two-content-1");
  const images = sliderContainer.querySelectorAll("img");
  const prevBtn = document.querySelector(".image-slider svg:first-child");
  const nextBtn = document.querySelector(".image-slider svg:last-child");
  const dashes = document.querySelectorAll(".image-slider-dash");
  let currentIndex = 0;
  let slideInterval;
  const slideDuration = 1000;
  function initSlider() {
    images.forEach((img, index) => {
      img.style.display = index === 0 ? "block" : "none";
    });
    updateDashes();
    startAutoSlide();
  }
  function showSlide(index) {
    if (index < 0) {
      index = images.length - 1;
    } else if (index >= images.length) {
      index = 0;
    }

    images[currentIndex].style.display = "none";
    images[index].style.display = "block";
    currentIndex = index;
    updateDashes();
  }
  function updateDashes() {
    dashes.forEach((dash, index) => {
      dash.classList.toggle("active", index === currentIndex);
    });
  }
  function nextSlide() {
    showSlide(currentIndex + 1);
  }
  function prevSlide() {
    showSlide(currentIndex - 1);
  }
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, slideDuration);
  }
  function pauseAutoSlide() {
    clearInterval(slideInterval);
  }
  nextBtn.addEventListener("click", () => {
    pauseAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    pauseAutoSlide();
    prevSlide();
    startAutoSlide();
  });
  dashes.forEach((dash, index) => {
    dash.addEventListener("click", () => {
      pauseAutoSlide();
      showSlide(index);
      startAutoSlide();
    });
  });
  sliderContainer.addEventListener("mouseenter", pauseAutoSlide);
  sliderContainer.addEventListener("mouseleave", startAutoSlide);
  initSlider();
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
    }    loopAnimate();
  }

  document.addEventListener("DOMContentLoaded", startRandomEmpowermentAnimation);
  async function typeText(targetSelector, text, speed = 50) {
    const target = document.querySelector(targetSelector);
    target.innerHTML = '';
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = 0;
      target.appendChild(span);
    });
    await anime({
      targets: target.querySelectorAll('span'),
      opacity: [0, 1],
      delay: anime.stagger(speed),
      duration: 100,
      easing: 'easeInOutQuad',
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
