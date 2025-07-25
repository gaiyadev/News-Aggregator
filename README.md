# 📰 News Aggregator

A modern news aggregator built with **React**, **TypeScript**, **Tailwind CSS**, and **Docker**.

This app pulls articles from NewsAPI, The Guardian, and the New York Times, and provides powerful filtering and personalization features.

---

## 🚀 Features

- 🔍 Search articles by keyword
- 🗂️ Filter by category, source, and publication date
- 🧠 Personalized news feed using localStorage
- 📰 Pulls from NewsAPI, The Guardian API, and NYT API
- 📱 Responsive UI for mobile and desktop
- 🐳 Dockerized setup for consistency across environments

---

## ⚙️ Setup Instructions

Follow the steps below to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/news-aggregator.git
cd news-aggregator
```

### 2. Create and Configure the .env File

```bash
cp .env.example .env
```

Edit the .env file and replace the placeholders with your actual API keys:

```bash
# .env
VITE_NEWS_API_KEY=your_newsapi_key
VITE_GUARDIAN_API_KEY=your_guardian_api_key
VITE_NYT_API_KEY=your_nyt_api_key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the App Locally (Development)

```bash
npm run dev
```

Then open your browser at:

```bash
http://localhost:5173
```

### 🐳 Docker Setup

This project comes Docker-ready. To run with Docker:

### 1. Build and Start the Containers

```bash
docker-compose up --build
```

http://localhost:3000

```bash
http://localhost:3000
```

📌 Ensure your .env file is present before building the Docker image.

#### 2. Stop the Docker Containers

```bash
docker-compose down
```
