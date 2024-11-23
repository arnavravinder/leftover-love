<script>
  import { onMount } from "svelte";

  onMount(() => {
    document.querySelectorAll('.text-box-effect').forEach((element) => {
      element.classList.add('expand');
    });
  });
</script>

<style>
  /* CSS styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  nav ul {
    display: flex;
    list-style: none;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: #66a80f;
  }

  .nav-link {
    text-decoration: none;
    color: white;
    font-family: 'Satoshi Bold', sans-serif;
    margin: 0 1rem;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem auto;
    padding: 1rem;
    max-width: 1200px;
  }

  .image-container {
    background-image: url('path/to/your/image.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
  }

  .text-container {
    margin-top: 20vh;
    text-align: center;
  }

  .main-text {
    font-size: 3rem;
    color: #fff;
    font-family: 'Satoshi Bold', sans-serif;
  }

  .align-left,
  .align-right {
    display: flex;
    align-items: center;
  }

  .align-span {
    padding: 0.5rem;
  }

  .explanation-container {
    background: rgba(255, 255, 255, 0.9);
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
  }

  .explanation-para {
    font-size: 1.2rem;
    color: #333;
  }

  .down-btn-container {
    margin-top: 2rem;
  }

  .down-btn {
    background-color: #e2201c;
    color: #fff;
    border: none;
    padding: 1rem;
    border-radius: 50%;
    cursor: pointer;
  }

  .header-box-trending,
  .header-box {
    margin: 2rem 0;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    color: #66a80f;
    font-family: 'Satoshi Bold', sans-serif;
  }

  .services-container {
    text-align: center;
  }

  .service-box {
    margin: 1rem;
    padding: 1rem;
    background-color: #f6b042;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .service-icon {
    font-size: 2rem;
    color: white;
  }
</style>

<nav>
  <ul>
    <li class="logo-item">
      <a class="nav-link" href="#">Plateful</a>
    </li>
    <li>
      <a class="nav-link" href="#about-us">About Us</a>
    </li>
    <li>
      <a class="nav-link" href="#services">Services</a>
    </li>
    <li>
      <a class="nav-link" href="#contact-us">Contact Us</a>
    </li>
    <li class="end-item">
      <a class="nav-link">Log In</a>
    </li>
  </ul>
</nav>

<div class="container image-container">
  <div class="container main-container">
    <div class="text-container">
      <div class="main-text align-left">
        <div class="text-box-effect text-box-left"></div>
        <div class="box-trailer text-box-left"></div>
        <span class="align-span">GOOD FOOD</span>
      </div>
      <div class="main-text align-right">
        <span class="align-span outline-text">LOW COSTS</span>
        <div class="text-box-effect text-box-right"></div>
        <div class="box-trailer text-box-right"></div>
      </div>
    </div>
  </div>

  <div class="container explanation-container">
    <p
      class="explanation-para"
      data-aos="fade-up"
      data-aos-delay="2000"
    >
      Welcome to Plateful, where we turn surplus food into affordable
      meals! Our mission is to reduce food waste by connecting you with
      delicious leftover dishes from local restaurants at unbeatable
      prices. Whether you’re a foodie seeking new flavors or looking
      for budget-friendly options, Plateful helps you enjoy tasty meals
      while supporting sustainability. Join us in making a difference—one
      plate at a time!
    </p>
  </div>

  <div class="down-btn-container">
    <button class="down-btn">
      <i class="fa-solid fa-chevron-down"></i>
    </button>
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

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <link
    href="https://unpkg.com/aos@2.3.1/dist/aos.css"
    rel="stylesheet"
  />
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
</svelte:head>
