function loadRestaurants() {
    const restaurants = [
      { id: '1', name: 'Restaurant 1', cuisine: 'Italian', location: 'Location 1', imageURL: 'https://via.placeholder.com/300x200' },
      { id: '2', name: 'Restaurant 2', cuisine: 'Chinese', location: 'Location 2', imageURL: 'https://via.placeholder.com/300x200' }
    ];
  
    restaurants.forEach((restaurant) => {
      renderRestaurantCard(restaurant.id, restaurant);
    });
  }
  
  function renderRestaurantCard(id, data) {
    const restaurantsSection = document.querySelector('.restaurants');
  
    const restaurantCard = document.createElement('div');
    restaurantCard.classList.add('restaurant-card');
    restaurantCard.setAttribute('data-id', id);
    restaurantCard.onclick = () => showRestaurantMenu(id, data);
  
    const restaurantImage = document.createElement('img');
    restaurantImage.src = data.imageURL || 'https://via.placeholder.com/300x200';
    restaurantImage.alt = data.name + ' Image';
    restaurantCard.appendChild(restaurantImage);
  
    const restaurantInfo = document.createElement('div');
    restaurantInfo.classList.add('restaurant-info');
  
    const restaurantName = document.createElement('h2');
    restaurantName.textContent = data.name;
    restaurantInfo.appendChild(restaurantName);
  
    const restaurantDetails = document.createElement('p');
    restaurantDetails.textContent = data.cuisine + ' | ' + data.location;
    restaurantInfo.appendChild(restaurantDetails);
  
    restaurantCard.appendChild(restaurantInfo);
    restaurantsSection.appendChild(restaurantCard);
  }
  
  function filterRestaurants() {
    const cuisineSelect = document.getElementById('cuisine');
    const cuisine = cuisineSelect.value.toLowerCase();
  
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    restaurantCards.forEach(card => {
      const dataCuisine = card.querySelector('.restaurant-info p').textContent.split(' | ')[0].toLowerCase();
      const cardStyle = card.style;
      if (cuisine === 'all' || dataCuisine === cuisine) {
        cardStyle.display = 'block';
      } else {
        cardStyle.display = 'none';
      }
    });
  }
  
  function showRestaurantMenu(id, data) {
    const mainContent = document.getElementById('main-content');
    mainContent.style.display = 'none';
  
    const restaurantMenu = document.getElementById('restaurant-menu');
    restaurantMenu.style.display = 'block';
  
    const restaurantImage = document.getElementById('restaurant-image');
    restaurantImage.src = data.imageURL || 'https://via.placeholder.com/300x200';
    restaurantImage.alt = data.name + ' Image';
  
    const restaurantName = document.getElementById('restaurant-name');
    restaurantName.textContent = data.name;
  
    const restaurantAddress = document.getElementById('restaurant-address');
    restaurantAddress.textContent = data.location;
  
    const restaurantTimings = document.getElementById('restaurant-timings');
    restaurantTimings.textContent = 'Timings: ' + (data.timings || 'N/A');
  
    const restaurantDistance = document.getElementById('restaurant-distance');
    restaurantDistance.textContent = 'Distance: ' + (data.distance || 'N/A');
  
    loadMenuItems(id);
  }
  
  function loadMenuItems(id) {
    const menuItems = [
      { name: 'Pizza', description: 'Delicious cheese pizza', price: 10, imageURL: 'https://via.placeholder.com/100x100' },
      { name: 'Pasta', description: 'Creamy Alfredo pasta', price: 12, imageURL: 'https://via.placeholder.com/100x100' }
    ];
  
    const menuItemsContainer = document.querySelector('.menu-items');
    menuItemsContainer.innerHTML = '';
  
    menuItems.forEach((item) => {
      renderMenuItem(item);
    });
  }
  
  function renderMenuItem(data) {
    const menuItemsContainer = document.querySelector('.menu-items');
  
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
  
    const menuItemImage = document.createElement('img');
    menuItemImage.src = data.imageURL || 'https://via.placeholder.com/100x100';
    menuItemImage.alt = data.name + ' Image';
    menuItem.appendChild(menuItemImage);
  
    const menuItemInfo = document.createElement('div');
    menuItemInfo.classList.add('menu-item-info');
  
    const menuItemName = document.createElement('h3');
    menuItemName.textContent = data.name;
    menuItemInfo.appendChild(menuItemName);
  
    const menuItemDescription = document.createElement('p');
    menuItemDescription.textContent = data.description;
    menuItemInfo.appendChild(menuItemDescription);
  
    const menuItemPrice = document.createElement('p');
    menuItemPrice.textContent = 'Price: $' + data.price;
    menuItemInfo.appendChild(menuItemPrice);
  
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('add-to-cart');
    addToCartButton.onclick = () => addToCart(data);
    menuItemInfo.appendChild(addToCartButton);
  
    menuItem.appendChild(menuItemInfo);
    menuItemsContainer.appendChild(menuItem);
  }
  
  function addToCart(item) {
    console.log('Added to cart:', item.name);
  }
  
  function goBack() {
    const mainContent = document.getElementById('main-content');
    mainContent.style.display = 'block';
  
    const restaurantMenu = document.getElementById('restaurant-menu');
    restaurantMenu.style.display = 'none';
  }
  
  AOS.init();
  
  document.addEventListener('DOMContentLoaded', () => {
    loadRestaurants();
  });