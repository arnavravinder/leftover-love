<script lang="ts">
  import { onMount } from 'svelte';
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import RestaurantList from '$lib/components/RestaurantList.svelte';
  import RestaurantHome from '$lib/components/RestaurantHome.svelte';
  import { session } from '$lib/session';
  import FoodIcon from '~icons/mdi/food';
  import QRIcon from '~icons/mdi/qrcode-scan';
  import PickupIcon from '~icons/mdi/car-pickup';

  onMount(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  });
</script>

<svelte:head>
	<title>Plateful | Home</title>
</svelte:head>

<div>
	{#if $session?.userData?.isUser}
		<RestaurantList />
	{:else if $session?.user?.uid}
		<RestaurantHome />
	{:else}
	<style> @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    height: 100dvh;
    overflow-x: hidden;
}

.container {
    width: 100%;
    height: 100dvh;
    transition: width 1s ease-in-out;
    container-type: inline-size;
}

.main-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(246, 125, 49, 0.95);
}

.explanation-container {
    width: 0;
    font-family: "Kanit", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F5F5F5;
    text-align: center;
    background-color:rgba(246, 125, 49, 0.95);
}

.image-container {
    background-image: url(/assets/food-template.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center 40%;
    display: flex;
    position: relative;
}

.steps-container {
    width: 100%;
    height: 100dvh;
    position: relative;
    overflow: hidden;
    background-color: hsl(23, 92%, 56%);
}

.scroll-image-container {
    position: absolute;
    height: 160%;
    width: 200%;
    left: 50%;
    top: 100%;
    transform: translate(-50%, -50%);
    background-image: url(/assets/pijja\ \(1\).png);
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    text-align: center;
    font-family: "Jost", sans-serif;
    font-size: 2cqmax;
    font-weight: 700;
    color: white;
    transition: left 500ms ease, top 500ms ease, height 500ms ease;
}

.text-container {
    line-height: 7.5vw;
    width: 40vw;
    container-type: inline-size;
}

.main-text {
    text-align: left;
    font-size: 12.5cqmax;
    font-family: "Kanit", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-weight: 700;
    position: relative;
    color: white;
    text-wrap: nowrap;
    overflow: hidden;
    text-align: center;
    transition: text 1s ease;
}

.align-right {
    text-align: right;
}

.align-span {
    opacity: 0;
}

.outline-text {
    color: transparent;
    -webkit-text-stroke: 2px white;
    font-weight: bold;
}

.text-box-effect {
    position: absolute;
    width: 0;
    height: 100%;
    top: 0;
    z-index: 3;
    background-color: white;
}

@keyframes expand {
    0% {
        width: 0;
    }

    100% {
        width: 100%;
    }
}

@keyframes contract {
    0% {
        width: 100%;
    }

    100% {
        width:0%;
    }
}

@keyframes expand-trailer {
    0% {
        width: -10%;
    }

    100% {
        width: 100%;
    }
}

@keyframes contract-trailer {
    0% {
        width: 120%;
    }

    100% {
        width: 0%;
    }
}

.text-box-right {
    right: 0;
}

.text-box-left {
    left: 0;
}

.expand {
    animation: expand 600ms ease-in-out;
}

.contract {
    animation: contract 600ms ease-in-out forwards;
}

.box-trailer {
    position: absolute;
    background-color: transparent;
    border: 2px solid white;
    z-index: 2 !important;
    height: 100%;
    top: 0;
}

.expand-trailer {
    animation: expand-trailer 600ms ease-in-out;
}

.contract-trailer {
    animation: contract-trailer 600ms ease-in-out;
}

.explanation-para {
    font-size: 1.75cqmax;
    max-width: 60%;
}

.down-btn-container {
    position: absolute;
    left: 50%;
    bottom: 1vmax;
    transform: translateX(-50%);
    width: 2.5vmax;
    aspect-ratio: 1/1;
    container-type: inline-size;
}

.down-btn {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    border: 2px solid white;
    background-color: transparent;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 2.5cqmax;
    opacity: 0;
    transition: all 500ms ease;
}

::-webkit-scrollbar {
    width: 0;
    height: 5px;
}

::-webkit-scrollbar-track {
    background-color: hsl(23, 92%, 57%);
}

::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 50px;
}

.services-container {
    background-color: hsl(23, 92%, 56%);
}

.scroll-top {
    top: 15%;
}

.scroll-bottom {
    top: 75%;
}

.scroll-left {
    text-align: left;
    left: 5%;
    grid-template-areas: 
    "number header"
    "unk para";
    grid-template-columns: 1fr 12fr;
    grid-template-rows: 1fr 12fr;
}

.scroll-right {
    text-align: right;
    left: 75%;
    grid-template-areas: 
    "header number"
    "para unk";
    grid-template-columns: 12fr 1fr;
    grid-template-rows: 1fr 12fr;
}

.scroll-right .scroll-header {
    justify-self: right;
}

.scroll-text {
    position: absolute;
    display: grid;
    gap: 10px;
    align-items: start;
    width: 20%;
    aspect-ratio: 1/1;
    container-type: inline-size;
}

.scroll-number {
    grid-area: number;
    width: 100%;
    height: 100%;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4cqw;
}

.scroll-header {
    grid-area: header;
    font-size: 6cqw;
    display: flex;
    align-items: center;
}

.scroll-para {
    grid-area: para;
    font-size: 2cqw;
    font-weight: 500;
}

.scroll-title {
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translate(-50%, -10%);
    font-size: 3cqw;
}

.trending-books {
    height: 65%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: hsl(23, 92%, 58%);
    font-family: 'Jost', sans-serif;
    color: hsl(23, 92%, 58%);
}

.header-box-trending {
    flex: 1;
    padding: 0.5%;
    padding-left: 3%;
    padding-right: 3%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
}

.books-box {
    flex: 6.5;
    padding-left: 3%;
    padding-right: 3%;
    padding-top: 0;
    column-gap: calc(2.5% / 6);
    white-space: nowrap;
    overflow-x: auto;
}

.book-container {
    height: 90%;
    aspect-ratio: 375 / 479.938;
    display: inline-flex;
    flex-direction: column;
    margin-right: 1%;
    border-radius: 25px;
    background-color: white;
    margin-top: auto;
}

.book-image {
    flex: 4;
    background-image: url(assets/placeholderimg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
}

.book-text {
    flex: 1;
    display: flex;
    align-items: center;
    container-type: inline-size;
    padding: 5%;
    padding-bottom: 3%;
}

.book-text-container {
    flex: 4;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.book-text-title {
    font-weight: bold;
    font-size: 7.5cqw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; 
}

.book-text-grade, .book-text-seller {
    font-weight: 300;
    font-size: 4.5cqw;
    text-overflow: ellipsis;
}

.see-more-container {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.see-more {
    height: 5cqh;
    width: 27.5cqw;
    border-radius: 50px;
    border: 2px hsl(23, 92%, 58%) solid;
    color: hsl(23, 92%, 58%);
    cursor: pointer;
    background-color: transparent;
    transition: all 0.25s ease-in;
    font-size: 4cqw;
}

.see-more:hover {
    background-color: white;
}

.services-container {
    background-color: hsl(23, 92%, 56%);
    padding: 5%;
    text-align: center;
    color: white;
    font-family: 'Kanit', sans-serif;
    position: relative;
    display: flex;
}

.header-box {
    height: 100%;
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.header-box h1 {
    font-size: 3cqw;
}

.services-boxes {
    width: 65%;
    height: 100%;
    display: grid;
    grid-template-columns: 4fr 4fr 4fr;
    grid-template-rows: 1fr 1fr 1fr;
    row-gap: 5%;
}

.service-box {
    grid-column: 2;
    background-color: white;
    color: hsl(23, 92%, 56%);
    border-radius: 15px;
    width: 100%;
    height: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 4%;
}

.service-box:hover {
    transform: translateY(-1%);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.service-icon {
    font-size: 2.5cqmax;
    color: hsl(23, 92%, 56%);
}

nav {
    width: 100%;
    height: 6%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: rgba(246, 125, 49, 0.5);
    transition: background 1s ease;
    container-type: inline-size;
}

.bg-dark {
    background-color: rgba(246, 125, 49, 1);
}

ul {
    display: flex;
    list-style-type: none;
    width: 100%;
    height: 100%;
}

li {
    height: 100%;
    width: 5cqmax;
    display: flex;
    align-items: center;
    justify-content: center;
    container-type: inline-size;
}

li > a {
    font-size: 17.5cqw;
    text-decoration: none;
    font-family: 'Jost', sans-serif;
    color: white;
    cursor: pointer;
    transition: color 1s ease;
}

.logo-item {
    width: 7.5cqw;
}

.logo-item > a {
    font-size: 18cqw;
}

.end-item {
    margin-left: auto;
}</style>
<script>
AOS.init();

document.querySelectorAll('.text-box-effect').forEach(element => {
    element.classList.add('expand');
  
    element.addEventListener('animationend', event => {
      if (event.animationName === 'expand') {
        if (element.classList.contains('text-box-right')) {
            element.style.right = 'auto';
            element.style.left = '0';
        } else if (element.classList.contains('text-box-left')) {
            element.style.left = 'auto';
            element.style.right = '0';
        }

        element.classList.remove('expand');
        element.classList.add('contract');
        
      } else if (event.animationName === 'contract') {
        element.classList.remove('contract');
        element.style.display = 'none';
      }
    });
});

document.querySelectorAll('.box-trailer').forEach(element => {
    element.classList.add('expand-trailer');
  
    element.addEventListener('animationend', event => {
      document.querySelectorAll('.align-span')[0].style.opacity = '1';
      document.querySelectorAll('.align-span')[1].style.opacity = '1';
      if (event.animationName === 'expand-trailer') {
        if (element.classList.contains('text-box-right')) {
            element.style.right = 'auto';
            element.style.left = '0';
        } else if (element.classList.contains('text-box-left')) {
            element.style.left = 'auto';
            element.style.right = '0';
        }

        element.classList.remove('expand-trailer');
        element.classList.add('contract-trailer');
        
      } else if (event.animationName === 'contract-trailer') {
        element.classList.remove('contract-trailer');
        element.style.display = 'none';
      }
    });
});

setTimeout(() => {
    document.querySelector('.explanation-container').style.width = '100%';
}, 1000);


setTimeout(() => {
    document.querySelector('.down-btn').style.opacity ='1';
}, 3000)

const positions = [['97.5%', '100%'], ['97.5%', '5%'], ['0%', '0%'], ['-1%', '96%']]

let prevScroll = 0;
let scrollCounter = 0;
const scrollIncrement = 5;
const scrollContainer = document.querySelector('.scroll-image-container');
let scrollEnabled = false;
let threshold = window.innerHeight * 1.65

window.addEventListener('scroll', () => {
    if (window.scrollY >= threshold - 75 && window.scrollY <= threshold + 75) {
        if (!scrollEnabled) {
            scrollEnabled = true;
        }
    } else {
        scrollEnabled = false;
    }
});

window.addEventListener('wheel', (event) => {
    if (scrollEnabled) {
        event.preventDefault();

        prevScroll = scrollCounter;
        if (event.deltaY > 0) {
            scrollCounter++;
        } else if (event.deltaY < 0 && scrollCounter > 0) {
            scrollCounter--;
        }

        if (scrollCounter >= scrollIncrement * 5 || (scrollCounter - prevScroll < 0 && scrollCounter <= scrollIncrement)) {
            scrollContainer.style.height = '130%';
            scrollContainer.style.left = '50%';
            scrollContainer.style.top = '100%';
            scrollCounter = 0;
            scrollEnabled = false;
        } else if (scrollCounter >= scrollIncrement * 4) {
            scrollContainer.style.top = positions[3][1];
            scrollContainer.style.left = positions[3][0];
        } else if (scrollCounter >= scrollIncrement * 3) {
            scrollContainer.style.top = positions[2][1];
            scrollContainer.style.left = positions[2][0];
        } else if (scrollCounter >= scrollIncrement * 2) {
            scrollContainer.style.top = positions[1][1];
            scrollContainer.style.left = positions[1][0];
        } else if (scrollCounter >= scrollIncrement) {
            scrollContainer.style.height = '160%';
            scrollContainer.style.top = positions[0][1];
            scrollContainer.style.left = positions[0][0];        
        }
    }
}, { passive: false });

const navbar = document.querySelector('nav');
const scrollThreshold = window.innerHeight;

window.addEventListener('scroll', () => {
  if (window.scrollY >= scrollThreshold - 20) {
    navbar.classList.add('bg-dark');
    document.querySelector('.down-btn').style.display = 'none';
  } else {
    navbar.classList.remove('bg-dark');
  }
})
</script>

    <nav>
        <ul>
            <li class = 'logo-item'>
                <a class = 'nav-link' href="#">Plateful</a>
            </li>
            <li>
                <a class = 'nav-link' href="#about-us">About Us</a>
            </li>
            <li>
                <a class = 'nav-link' href="#services">Services</a>
            </li>
            <li>
                <a class = 'nav-link' href="#contact-us">Contact Us</a>
            </li>
            <li class = 'end-item'>
                <a class = 'nav-link'>Log In</a>
            </li>
        </ul>
    </nav>

    <div class = 'container image-container'>
        <div class = 'container main-container'>
            <div class = 'text-container'>
                <div class = 'main-text align-left'><div class = 'text-box-effect text-box-left'></div><div class = 'box-trailer text-box-left'></div><span class = 'align-span'>GOOD FOOD</span></div>
                <div class = 'main-text align-right'><span class = 'align-span outline-text'>LOW COSTS</span><div class = 'text-box-effect text-box-right'></div><div class = 'box-trailer text-box-right'></div></div>
            </div>
        </div>

        <div class = 'container explanation-container'>
            <p class = 'explanation-para' data-aos="fade-up" data-aos-delay = '2000'>Welcome to Plateful, where we turn surplus food into affordable meals! Our mission is to reduce food waste by connecting you with delicious leftover dishes from local restaurants at unbeatable prices. Whether you’re a foodie seeking new flavors or looking for budget-friendly options, Plateful helps you enjoy tasty meals while supporting sustainability. Join us in making a difference—one plate at a time!</p>
        </div>

        <div class = 'down-btn-container'>
            <button class = 'down-btn'><i class="fa-solid fa-chevron-down"></i></button>
        </div>
    </div>

    <div class = "trending-books" id = "trending">
        <div class = "header-box-trending">
            <h1>Order Now</h1>
        </div>
        <div class = "books-box">
            <div class = 'book-container'>
                <div class = "book-image">
                </div>
                <div class = "book-text">
                    <div class = "book-text-container">
                        <p class = "book-text-title">Paratha</p>
                        <p class = "book-text-grade">punjab grill</p>
                        <p class = "book-text-seller">₹200</p>
                    </div>
                    <div class = "see-more-container">
                      <button class = "see-more">See More</button>
                    </div>
                </div>
            </div>
            <div class = 'book-container'>
                <div class = "book-image">
                </div>
                <div class = "book-text">
                    <div class = "book-text-container">
                        <p class = "book-text-title">Paratha</p>
                        <p class = "book-text-grade">punjab grill</p>
                        <p class = "book-text-seller">₹200</p>
                    </div>
                    <div class = "see-more-container">
                      <button class = "see-more">See More</button>
                    </div>
                </div>
            </div>
            <div class = 'book-container'>
                <div class = "book-image">
                </div>
                <div class = "book-text">
                    <div class = "book-text-container">
                        <p class = "book-text-title">Paratha</p>
                        <p class = "book-text-grade">punjab grill</p>
                        <p class = "book-text-seller">₹200</p>
                    </div>
                    <div class = "see-more-container">
                      <button class = "see-more">See More</button>
                    </div>
                </div>
            </div>
            <div class = 'book-container'>
                <div class = "book-image">
                </div>
                <div class = "book-text">
                    <div class = "book-text-container">
                        <p class = "book-text-title">Paratha</p>
                        <p class = "book-text-grade">punjab grill</p>
                        <p class = "book-text-seller">₹200</p>
                    </div>
                    <div class = "see-more-container">
                      <button class = "see-more">See More</button>
                    </div>
                </div>
            </div>
            <div class = 'book-container'>
                <div class = "book-image">
                </div>
                <div class = "book-text">
                    <div class = "book-text-container">
                        <p class = "book-text-title">Paratha</p>
                        <p class = "book-text-grade">punjab grill</p>
                        <p class = "book-text-seller">₹200</p>
                    </div>
                    <div class = "see-more-container">
                      <button class = "see-more">See More</button>
                    </div>
                </div>
            </div>
            <div class = 'book-container'>
                <div class = "book-image">
                </div>
                <div class = "book-text">
                    <div class = "book-text-container">
                        <p class = "book-text-title">Paratha</p>
                        <p class = "book-text-grade">punjab grill</p>
                        <p class = "book-text-seller">₹200</p>
                    </div>
                    <div class = "see-more-container">
                      <button class = "see-more">See More</button>
                    </div>
                </div>
            </div>
            <div class = 'book-container'>
                <div class = "book-image">
                </div>
                <div class = "book-text">
                    <div class = "book-text-container">
                        <p class = "book-text-title">Paratha</p>
                        <p class = "book-text-grade">punjab grill</p>
                        <p class = "book-text-seller">₹200</p>
                    </div>
                    <div class = "see-more-container">
                      <button class = "see-more">See More</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class = 'container steps-container'>
        <div class = 'scroll-image-container'>
            <div class = 'scroll-title'>
                <h1>STEPS</h1>
            </div>
            <div class='scroll-text scroll-left scroll-top'>
                <div class='scroll-number'>1</div>
                <div class='scroll-header'>Browse Deals</div>
                <div class='scroll-para'>
                    Discover surplus food from nearby restaurants at discounted prices. These deals are updated daily, so act fast to grab your favorites before they’re gone!
                </div>
            </div>
            <div class='scroll-text scroll-left scroll-bottom'>
                <div class='scroll-number'>2</div>
                <div class='scroll-header'>Select Your Items</div>
                <div class='scroll-para'>
                    Choose from a variety of delicious options. Add your selected items to your cart and review your choices before proceeding to checkout.
                </div>
            </div>
            <div class='scroll-text scroll-right scroll-bottom'>
                <div class='scroll-number'>3</div>
                <div class='scroll-header'>Make Payment</div>
                <div class='scroll-para'>
                    Pay securely through our platform. Once the payment is completed, you'll receive a confirmation with pickup instructions.
                </div>
            </div>
            <div class='scroll-text scroll-right scroll-top'>
                <div class='scroll-number'>4</div>
                <div class='scroll-header'>Pick Up Your Order</div>
                <div class='scroll-para'>
                    Head to the restaurant and show your confirmation to pick up your order. Enjoy your meal while helping reduce food waste!
                </div>
            </div>            
        </div>
    </div>

    <div class="container services-container">
        <div class="header-box">
            <h1 data-aos="fade-up">Our Services</h1>
        </div>

        <div class="services-boxes" data-aos="fade-up">
            <div class="service-box">
                <i class="fa-solid fa-utensils service-icon"></i>
                <h2>Curated Meals</h2>
                <p>We turn unsold, fresh food into affordable meals for you.</p>
            </div>
            <div class="service-box">
                <i class="fa-solid fa-hand-holding-heart service-icon"></i>
                <h2>Sustainability</h2>
                <p>Reduce food waste while enjoying delicious dishes.</p>
            </div>
            <div class="service-box">
                <i class="fa-solid fa-truck-fast service-icon"></i>
                <h2>Fast Delivery</h2>
                <p>Choose delivery or pickup at your convenience.</p>
            </div>
        </div>
    </div>
	{/if}
</div>
