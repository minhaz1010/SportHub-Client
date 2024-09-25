# Sporting Goods E-Commerce Platform

A full-stack sport-e-commerce web application built with **React**, **TypeScript**, **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. This platform allows users to browse, filter, and purchase sporting goods.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Pages Overview](#pages-overview)
- [Backend API](#backend-api)


## Features

### Core Features

1. **Single Role User**: A single user role that can manage products.
2. **Responsive Navbar and Footer**:
   - Navbar with navigation links and logo.
   - Footer with social media icons and important page links.
3. **Homepage**:
   - Hero section with a carousel for showcasing promotions and discounts.
   - Featured products section with details like product name, category, brand, stock, rating, price, and image.
4. **All Products Page**:
   - Display all products with search, filter (category, price, rating, brand), and sort functionality.
   - Clear filters option.
5. **Single Product Page**:
   - Detailed view of the product with an option to add to cart.
6. **Cart Page**:
   - View all items in the cart, update quantities, remove items, and proceed to checkout.
7. **Checkout Page**:
   - Collect user details and choose between Cash on Delivery or Stripe payment(optional).
8. **Manage Products**:
   - User can add, update, and delete products using a form with pre-filled data for updates.
9. **Backend Integration**:
   - The backend handles all business logic with MongoDB for database management.

### Extra Features

- **RTK Query Polling**: Show the latest products after every 30 seconds on the homepage.


## Technologies Used

### Frontend

- **React**: For building the user interface.
- **TypeScript**: Type-safe code for better development experience.
- **Tailwind CSS**: Utility-first CSS for styling.
- **React-Rating**: A third-party package to display product ratings.
- **EmailJS**: For sending contact form submissions via email.
- **React-Responsive-Carousel**: For the homepage hero section.
- **React-Photo-View** (optional): For viewing product images in a lightbox.
- **Redux Toolkit (RTK Query)**: For managing global state and handling API requests.

### Backend

- **Node.js**
- **Zod**
- **Express.js**
- **TypeScript**
- **MongoDB & Mongoose**
- **repo** [Backend-Repository](https://github.com/minhaz1010/Sporthub-Server.git)



