const products = [
  {
    name: "Pumkin",
    desc:"Straight from (Pumkin) Farm",
    image:
      "../image/fruits/Objects.png",
  },
  {
    name: "Tomato",
    desc:"Straight from (Tomato) Farm",
    image:
      "../image/fruits/tomato.png",
  },
  {
    name: "Pumkin",
    desc:"Straight from (Pumkin) Farm",
    image:
      "../image/fruits/Objects.png",
  },
  {
    name: "adfasdfasdf",
    desc:"Straight from (Pumkin) Farm",
    image:
      "../image/fruits/tomato-key.png",
  },
  {
    name: "asdfasdfdsf",
    desc:"Straight from (Pumkin) Farm",
    image:
      "../image/farmer.jpg",
  },
];

const animationInterval = 4000;
let isAnimating = false;
let minaImage = {
  name: "Pumpkin",
  desc:"Straight from (Pumkin) Farm",
  image:
    "../image/fruits/Objects.png",
};
let animationTimer;
let itemPositions = [];
const productRow = document.getElementById("product-row");
const productContainer = document.getElementById("product-container");
const featuredImage = document.getElementById("featured-image");
const productName = document.getElementById("product-name");
const productDesc = document.getElementById("product-description");

function getRelativePosition(element, container) {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  return {
    top: elementRect.top - containerRect.top,
    left: elementRect.left - containerRect.left,
  };
}
function initializeCarousel() {
  const containerWidth = productRow.clientWidth;
  const itemWidth = 80;
  const gap =
    (containerWidth - products.length * itemWidth) / (products.length - 1);
  const minGap = 10;

  itemPositions = [];
  const actualGap = Math.max(gap, minGap);

  for (let i = 0; i < products.length; i++) {
    const position = i * (itemWidth + actualGap);
    itemPositions.push(position);
  }

  products.forEach((product, index) => {
    const item = document.createElement("div");
    item.className = "product-item";
    item.style.left = `${itemPositions[index]}px`;

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    item.appendChild(img);
    item.setAttribute("data-name", product.name);
    item.setAttribute("data-image", product.image);

    productRow.appendChild(item);
  });

  featuredImage.src = minaImage.image;
  productName.textContent = minaImage.name;
  productDesc.textContent=minaImage.desc;

  document.querySelectorAll(".product-item").forEach((item) => {
    item.addEventListener("click", () => {
      if (!isAnimating) {
        clearInterval(animationTimer);
        rotateToItem(item);
      }
    });
  });
}

function rotateToItem(clickedItem) {
  const items = Array.from(document.querySelectorAll(".product-item"));
  const clickedIndex = items.indexOf(clickedItem);
  if (clickedIndex === 0) {
    rotateProducts();
    return;
  }
  clearInterval(animationTimer);
  for (let i = 0; i < clickedIndex; i++) {
    moveItemToEnd();
  }
  setTimeout(() => {
    animationTimer = setInterval(rotateProducts, animationInterval);
  }, 500);
}

function moveItemToEnd() {
  const items = document.querySelectorAll(".product-item");
  const firstItem = items[0];
  const lastPosition = itemPositions[itemPositions.length - 1];
  for (let i = 1; i < items.length; i++) {
    items[i].style.left = itemPositions[i - 1] + "px";
  }
  firstItem.style.left = lastPosition + "px";
  productRow.appendChild(firstItem);
}

function rotateProducts() {
  if (isAnimating) return;
  isAnimating = true;
  const items = document.querySelectorAll(".product-item");
  const firstItem = items[0];
  const featuredContainer = document.querySelector(".featured-image-container");
  const firstItemPos = getRelativePosition(firstItem, productContainer);
  const featuredPos = getRelativePosition(featuredContainer, productContainer);

  const clone = document.createElement("div");
  clone.className = "animated-clone";
  clone.style.top = firstItemPos.top + "px";
  clone.style.left = firstItemPos.left + "px";
  clone.style.borderRadius = "50%";

  const cloneImg = document.createElement("img");
  cloneImg.src = firstItem.querySelector("img").src;
  cloneImg.alt = firstItem.getAttribute("data-name");
  clone.appendChild(cloneImg);
  productContainer.appendChild(clone);
  featuredImage.classList.add("featured-fade-out");
  setTimeout(() => {
    clone.style.top = featuredPos.top + "px";
    clone.style.left = featuredPos.left + "px";
    clone.style.width = featuredContainer.offsetWidth + "px";
    clone.style.height = featuredContainer.offsetHeight + "px";
    clone.style.borderRadius = "12px";
  }, 50);

  const newFeaturedName = firstItem.getAttribute("data-name");
  const newFeaturedImage = firstItem.getAttribute("data-image");
  setTimeout(() => {
    featuredImage.src = newFeaturedImage;
    productName.textContent = newFeaturedName;

    const newItem = document.createElement("div");
    newItem.className = "product-item";

    const newImg = document.createElement("img");
    newImg.src = minaImage.image;
    newImg.alt = minaImage.name;

    newItem.appendChild(newImg);
    newItem.setAttribute("data-name", minaImage.name);
    newItem.setAttribute("data-image", minaImage.image);
    newItem.style.left = itemPositions[itemPositions.length - 1] + "px";

    newItem.addEventListener("click", () => {
      if (!isAnimating) {
        clearInterval(animationTimer);
        rotateToItem(newItem);
      }
    });
    productRow.appendChild(newItem);
    firstItem.remove();
    const remainingItems = document.querySelectorAll(".product-item");
    remainingItems.forEach((item, index) => {
      item.style.left = itemPositions[index] + "px";
    });

    minaImage = {
      name: newFeaturedName,
      image: newFeaturedImage,
    };
    clone.remove();
    featuredImage.classList.remove("featured-fade-out");
    featuredImage.classList.add("featured-fade-in");

    setTimeout(() => {
      featuredImage.classList.remove("featured-fade-in");
      isAnimating = false;
    }, 600);
  }, 800);
}
window.addEventListener("load", () => {
  initializeCarousel();
  animationTimer = setInterval(rotateProducts, animationInterval);
});

window.addEventListener("resize", () => {
  clearInterval(animationTimer);
  productRow.innerHTML = "";
  initializeCarousel();
  animationTimer = setInterval(rotateProducts, animationInterval);
});
