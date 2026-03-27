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
│
├── core/                          # 🧠 SYSTEM BRAIN (ENFORCEMENT LAYER)
│   ├── executionEngine.js         # Central decision engine (ALLOW / BLOCK trade)
│   ├── tradeValidator.js          # Validates input (entry, SL, strategy, type)
│   ├── riskManager.js             # Risk calculation + validation (₹ cap)
│   ├── disciplineManager.js       # Daily rules (trades, loss, target)
│   └── marketContext.js           # (Future) Market type detection
│
├── store/                         # ⚙️ STATE ABSTRACTION (LIGHT LAYER)
│   ├── sessionStore.js            # Creates session object (pnl, trades, lock)
│   └── tradeStore.js              # Trade helpers (add, count)
│
├── components/                    # 🎨 UI LAYER (NO BUSINESS LOGIC)
│   ├── TradeForm.jsx              # Sends trade → executionEngine
│   ├── TradeList.jsx              # Immutable trade display (NET PnL)
│   ├── TradeCalculator.jsx        # Pre-trade validation (charges + BE)
│   ├── RiskEngine.jsx             # Risk preview (UI only)
│   ├── DisciplineGuard.jsx        # Displays violations (no enforcement)
│   ├── DisciplineScore.jsx        # 
│   ├── Analytics.jsx              # Strategy, time, performance stats
│   ├── Insights.jsx               # AI behavioral signals (quick view)
│   ├── EquityChart.jsx            # Net equity curve (after charges)
│   ├── SummaryCard.jsx            # Net PnL + capital snapshot
│   └── ThemeToggle.jsx            # UI theme switch
│
├── utils/                         # 🔧 PURE FUNCTIONS (SHARED LOGIC)
│   ├── calculations.js            # PnL, charges, summary (NET focused)
│   ├── analytics.js               # Stats, expectancy, AI insights
│   ├── constants.js               # System limits (risk, trades, loss)
│   ├── missedTrades.js            # Behavioral logging (future edge)
│   └── scoreEngine.js             # 
│
├── hooks/                         # ⚛️ REUSABLE HOOKS
│   └── useLocalStorage.js         # Persistent state (safe storage)
│
├── context/                       # 🌗 UI CONTEXT (OPTIONAL)
│   └── ThemeContext.jsx           # Light/Dark mode handling
│
├── styles/                        # 🎨 STYLING
│   └── index.css                 # Global + glass UI styles
│
├── App.jsx                        # 🔗 ROOT COMPOSITION (session + layout)
├── main.jsx                       # React entry point
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
