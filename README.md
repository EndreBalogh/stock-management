# 📦 Inventory Tracking App

A simple inventory tracking application built using Next.js, TypeScript, Redux Toolkit, and Chakra UI. This app helps users manage products, update inventory levels, and track changes efficiently.

## ✨ Features

- **Product Management**: Create, update, and delete products with fields like name, description, price, and stock.
- **Inventory Management**: Add or subtract from product inventory, with all changes tracked and displayed.
- **Product Listing**: Search and filter functionality to quickly find specific products.
- **Data Validation**: Ensures product data remains consistent and accurate.
- **Responsive UI**: Built with Chakra UI for a user-friendly experience on all devices.

## 🛠 Tech Stack

- **Next.js 14**: Framework for building server-rendered React applications.
- **TypeScript**: For static type checking and improved code quality.
- **Redux Toolkit**: Manages state efficiently across the application.
- **Chakra UI**: Component library for consistent and responsive design.
- **Styled Components**: Ensures consistent styles across the app.
- **Vercel**: Hosting platform for deployment and continuous integration.

## 🚀 Getting Started

### 🔧 Prerequisites

Make sure you have **Node.js** and **npm** installed.

### 📥 Installation

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/EndreBalogh/stock-management.git
    cd stock-management
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Run the Development Server**:
    ```sh
    npm run dev
    ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## ⚙️ Key Considerations and Challenges

- **State Management**: Utilizes Redux Toolkit for consistent and efficient state management across components.
- **Data Validation**: Ensures robust validation to keep data consistent and free from errors.
- **Performance Optimization**: Currently, all data is managed client-side. Server-side pagination or infinite scrolling could be added for improved performance.
- **Design Choices**: Chakra UI provides a responsive and consistent design.
  
### 🚀 Potential Improvements

- **Pagination**: Implement pagination for the product list to efficiently handle large datasets.
- **Advanced Filtering**: Add more advanced filtering options (e.g., sorting by multiple columns).
- **Error Handling**: Enhance error handling, particularly for network-related issues.
- **Unit Tests**: Add unit tests for critical components and utility functions.

## 🌍 Live Deployment

Check out the live app: [Inventory Tracking App on Vercel](https://stock-management-endre-balogh.vercel.app/)

---

Developed by **Endre Balogh**

Email: endrebalogh75@gmail.com
