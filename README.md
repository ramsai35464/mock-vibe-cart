# Mock Vibe Cart 🛒

Mock Vibe Cart is a simple and responsive e-commerce application built using **React** for the frontend and **JSON Server** as a mock backend API. The app supports product browsing, adding items to cart, and viewing cart summary.

---

## 🚀 Features

* Product listing page
* Add to cart functionality
* Cart quantity management
* Remove products from cart
* Mock backend using JSON Server
* API integration with Axios
* Clean folder structure
* Fully responsive design

---

## 🛠️ Tech Stack

| Frontend                  | Backend     | Tools        |
| ------------------------- | ----------- | ------------ |
| React                     | JSON Server | Git & GitHub |
| Axios                     | REST API    | VS Code      |
| CSS / Tailwind (optional) | Node.js     | npm          |

---

## 📁 Project Structure

```
mock-vibe-cart/
├── backend/
│   ├── db.json
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### ✅ 1. Clone the repository

```
git clone https://github.com/ramsai35464/mock-vibe-cart.git
cd mock-vibe-cart
```

### ✅ 2. Setup backend

```
cd backend
npm install
npm run server
```

Backend runs on **[http://localhost:5000](http://localhost:5000)**

### ✅ 3. Setup frontend

```
cd ../frontend
npm install
npm start
```

Frontend runs on **[http://localhost:3000](http://localhost:3000)**

---

## 🔗 API Endpoints

| Endpoint         | Description         |
| ---------------- | ------------------- |
| GET /products    | Get all products    |
| GET /cart        | View cart           |
| POST /cart       | Add product to cart |
| PATCH /cart/:id  | Update cart item    |
| DELETE /cart/:id | Remove from cart    |

---

## 💡 Future Enhancements

* User authentication (Login/Register)
* Product search & filters
* Order history page
* Product categories

---

## 🤝 Contributing

Pull requests are welcome. Feel free to fork this repo and improve the project!

---

## 📞 Contact

**Author:** Ramsai

If you like this project, ⭐ star the repository! 😎

---

Happy Coding! 💻🔥
