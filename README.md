# 📊 Execution OS — Trading Decision System

A professional-grade trading dashboard built with React + Vite, designed to help traders **track, analyze, and improve execution discipline**.

---

## 🚀 Features

### ✅ Core

* Trade logging system
* Real-time PnL tracking
* Angel One brokerage calculation
* Equity curve visualization

### 🧠 Decision Engine

* Trade calculator (before entry validation)
* Break-even move detection
* Charges preview

### ⚠️ Risk Engine

* Position sizing
* Risk per trade calculation
* Capital protection logic

### 📊 Analytics Engine

* Strategy performance tracking
* Time-based performance analysis
* Win rate & expectancy
* AI-based insights (behavior detection)

### 🧘 Discipline System

* Daily loss limit enforcement
* Overtrading detection
* Direction switching alerts

---

## 🧱 Tech Stack

| Layer    | Technology                   |
| -------- | ---------------------------- |
| Frontend | React + Vite                 |
| UI       | Bootstrap + Custom Glass CSS |
| Forms    | Formik                       |
| Charts   | Recharts                     |
| State    | React Hooks + LocalStorage   |
| Date     | Day.js                       |

---

## 📁 Folder Structure

```
src/
 ├── components/
 │    ├── TradeForm.jsx
 │    ├── TradeList.jsx
 │    ├── SummaryCard.jsx
 │    ├── DisciplineGuard.jsx
 │    ├── TradeCalculator.jsx
 │    ├── RiskEngine.jsx
 │    ├── EquityChart.jsx
 │    ├── Analytics.jsx
 │    ├── Insights.jsx
 │
 ├── utils/
 │    ├── calculations.js
 │    ├── analytics.js
 │
 ├── hooks/
 │    ├── useLocalStorage.js
 │
 ├── context/
 │    ├── ThemeContext.jsx
 │
 ├── App.jsx
 ├── main.jsx
 ├── styles.css
```

---

## ⚙️ Installation

```bash
git clone <your-repo>
cd execution-os
yarn install
yarn dev
```

---

## 📦 Required Libraries

```bash
yarn add formik uuid dayjs recharts
```

---

## 🌗 Theme Support

* Light / Dark toggle
* Persistent via localStorage
* Glass UI design

---

## 🧠 How Traders Should Use This

### Step-by-step:

1. Open Trade Calculator
   → Check if trade is worth taking

2. Use Risk Engine
   → Define SL & position size

3. Execute trade

4. Log trade

5. Review analytics daily

---

## 🎯 Why This Is Powerful

Most traders:

* Track trades ❌
* Ignore behavior ❌

This system:

* Tracks behavior ✅
* Detects mistakes ✅
* Improves decision-making ✅

---

## 🚀 Deployment (Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "initial"
git remote add origin <repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

* Go to https://vercel.com
* Import GitHub repo
* Framework: Vite
* Click Deploy

---

## 📈 Future Roadmap

* AI trade suggestions
* Backend (Firebase / Supabase)
* Multi-account support
* Strategy backtesting

---

## 👨‍💻 Author

Built for disciplined traders who want to become **system-driven operators**.

---

## ⚠️ Disclaimer

This tool is for educational and analytical purposes only.
Trading involves risk.
