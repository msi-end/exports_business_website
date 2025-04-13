// Product configuration
const products = [
    { name: 'Strawberry', image: 'https://fastly.picsum.photos/id/317/200/200.jpg?hmac=YE2w8fnOodl9AG9z8fKPtgEXGkIwnVxXXQVC6VCLJl8' },
    { name: 'Carrot', image: 'https://fastly.picsum.photos/id/317/200/200.jpg?hmac=YE2w8fnOodl9AG9z8fKPtgEXGkIwnVxXXQVC6VCLJl8' },
    { name: 'Eggplant', image: 'https://fastly.picsum.photos/id/317/200/200.jpg?hmac=YE2w8fnOodl9AG9z8fKPtgEXGkIwnVxXXQVC6VCLJl8' },
    { name: 'Cauliflower', image: 'https://fastly.picsum.photos/id/317/200/200.jpg?hmac=YE2w8fnOodl9AG9z8fKPtgEXGkIwnVxXXQVC6VCLJl8' },
    { name: 'Banana', image: 'https://fastly.picsum.photos/id/317/200/200.jpg?hmac=YE2w8fnOodl9AG9z8fKPtgEXGkIwnVxXXQVC6VCLJl8' }
];

// Configuration
const animationInterval = 4000; // 4 seconds between rotations
let isAnimating = false;
let minaImage = { name: 'Pumpkin', image: 'https://fastly.picsum.photos/id/317/200/200.jpg?hmac=YE2w8fnOodl9AG9z8fKPtgEXGkIwnVxXXQVC6VCLJl8' };
let animationTimer;
let itemPositions = [];

// Get DOM elements
const productRow = document.getElementById('product-row');
const productContainer = document.getElementById('product-container');
const featuredImage = document.getElementById('featured-image');
const productName = document.getElementById('product-name');

// Get position of an element relative to the container
function getRelativePosition(element, container) {
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    return {
        top: elementRect.top - containerRect.top,
        left: elementRect.left - containerRect.left
    };
}

// Initialize the carousel
function initializeCarousel() {
    // Calculate positions based on container width
    const containerWidth = productRow.clientWidth;
    const itemWidth = 80; // Width of each product item
    const gap = (containerWidth - (products.length * itemWidth)) / (products.length - 1);
    const minGap = 10; // Minimum gap between items
    
    // Create position array
    itemPositions = [];
    const actualGap = Math.max(gap, minGap);
    
    for (let i = 0; i < products.length; i++) {
        const position = i * (itemWidth + actualGap);
        itemPositions.push(position);
    }
    
    // Create product items
    products.forEach((product, index) => {
        const item = document.createElement('div');
        item.className = 'product-item';
        item.style.left = `${itemPositions[index]}px`;
        
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        
        item.appendChild(img);
        item.setAttribute('data-name', product.name);
        item.setAttribute('data-image', product.image);
        
        productRow.appendChild(item);
    });
    
    // Set initial featured product
    featuredImage.src = minaImage.image;
    productName.textContent = minaImage.name;
    
    // Add event listeners to products
    document.querySelectorAll('.product-item').forEach(item => {
        item.addEventListener('click', () => {
            if (!isAnimating) {
                clearInterval(animationTimer);
                rotateToItem(item);
            }
        });
    });
}

// Rotate to specific item when clicked
function rotateToItem(clickedItem) {
    // Find the index of the clicked item
    const items = Array.from(document.querySelectorAll('.product-item'));
    const clickedIndex = items.indexOf(clickedItem);
    
    // If it's already the first item, just trigger normal rotation
    if (clickedIndex === 0) {
        rotateProducts();
        return;
    }
    
    // Temporarily remove rotation
    clearInterval(animationTimer);
    
    // Move the clicked item to the first position
    for (let i = 0; i < clickedIndex; i++) {
        moveItemToEnd();
    }
    
    // Restart the rotation
    setTimeout(() => {
        animationTimer = setInterval(rotateProducts, animationInterval);
    }, 500);
}

// Move the first item in the row to the end
function moveItemToEnd() {
    const items = document.querySelectorAll('.product-item');
    const firstItem = items[0];
    const lastPosition = itemPositions[itemPositions.length - 1];
    
    // Update positions for all other items
    for (let i = 1; i < items.length; i++) {
        items[i].style.left = itemPositions[i - 1] + 'px';
    }
    
    // Move first item to end
    firstItem.style.left = lastPosition + 'px';
    
    // Reorder DOM elements
    productRow.appendChild(firstItem);
}

// Enhanced animation for rotating products
function rotateProducts() {
    if (isAnimating) return;
    isAnimating = true;
    
    // Get all items and specifically the first one
    const items = document.querySelectorAll('.product-item');
    const firstItem = items[0];
    
    // Get featured image container for positioning
    const featuredContainer = document.querySelector('.featured-image-container');
    
    // 1. Get positions for animation
    const firstItemPos = getRelativePosition(firstItem, productContainer);
    const featuredPos = getRelativePosition(featuredContainer, productContainer);
    
    // 2. Create animated clone of the first item
    const clone = document.createElement('div');
    clone.className = 'animated-clone';
    clone.style.top = firstItemPos.top + 'px';
    clone.style.left = firstItemPos.left + 'px';
    clone.style.borderRadius = '50%';
    
    const cloneImg = document.createElement('img');
    cloneImg.src = firstItem.querySelector('img').src;
    cloneImg.alt = firstItem.getAttribute('data-name');
    clone.appendChild(cloneImg);
    
    // 3. Add clone to container
    productContainer.appendChild(clone);
    
    // 4. Fade out current featured image
    featuredImage.classList.add('featured-fade-out');
    
    // 5. Animate clone to featured position
    setTimeout(() => {
        clone.style.top = featuredPos.top + 'px';
        clone.style.left = featuredPos.left + 'px';
        clone.style.width = featuredContainer.offsetWidth + 'px';
        clone.style.height = featuredContainer.offsetHeight + 'px';
        clone.style.borderRadius = '12px';
    }, 50);
    
    // Get data for the new featured product
    const newFeaturedName = firstItem.getAttribute('data-name');
    const newFeaturedImage = firstItem.getAttribute('data-image');
    
    // 6. After animation completes
    setTimeout(() => {
        // Update featured image and product name
        featuredImage.src = newFeaturedImage;
        productName.textContent = newFeaturedName;
        
        // Create new item for the previously featured product
        const newItem = document.createElement('div');
        newItem.className = 'product-item';
        
        const newImg = document.createElement('img');
        newImg.src = minaImage.image;
        newImg.alt = minaImage.name;
        
        newItem.appendChild(newImg);
        newItem.setAttribute('data-name', minaImage.name);
        newItem.setAttribute('data-image', minaImage.image);
        newItem.style.left = itemPositions[itemPositions.length - 1] + 'px';
        
        // Add event listener to new item
        newItem.addEventListener('click', () => {
            if (!isAnimating) {
                clearInterval(animationTimer);
                rotateToItem(newItem);
            }
        });
        
        // Add new item to the row
        productRow.appendChild(newItem);
        
        // Remove the first item from DOM
        firstItem.remove();
        
        // Shift all remaining items left
        const remainingItems = document.querySelectorAll('.product-item');
        remainingItems.forEach((item, index) => {
            item.style.left = itemPositions[index] + 'px';
        });
        
        // Update current featured product
        minaImage = {
            name: newFeaturedName,
            image: newFeaturedImage
        };
        
        // Remove animation clone
        clone.remove();
        
        // Fade in new featured image
        featuredImage.classList.remove('featured-fade-out');
        featuredImage.classList.add('featured-fade-in');
        
        setTimeout(() => {
            featuredImage.classList.remove('featured-fade-in');
            isAnimating = false;
        }, 600);
        
    }, 800);
}

// Initialize on window load and resize
window.addEventListener('load', () => {
    initializeCarousel();
    animationTimer = setInterval(rotateProducts, animationInterval);
});

// Recalculate positions on window resize
window.addEventListener('resize', () => {
    clearInterval(animationTimer);
    
    // Remove all items
    productRow.innerHTML = '';
    
    // Reinitialize
    initializeCarousel();
    
    // Restart animation
    animationTimer = setInterval(rotateProducts, animationInterval);
});