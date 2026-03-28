# 🧠 TradeOS — Execution Intelligence System

A professional-grade trading system built with **React + Vite**, designed to transform traders from:

❌ Emotional decision-makers
➡️
✅ System-driven operators

---

# 🎯 Core Philosophy

> This is NOT a trading app.
> This is a **decision control system**.

TradeOS enforces:

- Discipline
- Risk control
- Behavioral awareness
- Execution quality

---

# 🚀 Features

##Core System

- Trade logging (immutable history)
- Real-time **Net PnL (after charges)**
- Angel One brokerage calculation
- Equity curve visualization

---

## 🧠 Decision Engine (Pre-Trade Layer)

- Live trade evaluation (before execution)
- Break-even move detection
- Charges + net PnL preview
- Risk/Reward calculation
- ⚠ Real-time warnings

---

## ⚠️ Risk Engine

- Position sizing logic
- Risk per trade calculation
- Max risk enforcement (₹300)

---

## Execution Engine (Enforcement Layer)

- Validates every trade before execution
- Blocks:
  - High-risk trades
  - Low-confidence trades
  - Invalid setups

- Central decision engine (ALLOW / BLOCK)

---

## 📊 Analytics Engine

- Strategy performance tracking
- Time-based performance analysis
- Win rate, avg win/loss
- Expectancy calculation

---

## 🧠 AI Insights (Behavior Layer)

Detects:

- Overtrading
- Direction switching
- Low win rate
- Negative expectancy
- Risk violations
- Repeated mistakes

---

## 🧘 Discipline System

- Max 3 trades/day
- Daily loss limit (₹600)
- Profit target lock (₹1200)
- Hard session lock enforcement

---

## 📊 Scoring System (PRO EDGE)

### 🎯 Discipline Score

- Daily behavior quality (0–10)

### 📈 Trade Quality Score

- Per-trade execution quality

---

## 🧠 Pre-Trade Intelligence (KEY FEATURE)

Before execution, system shows:

- Risk (₹)
- R:R ratio
- Net PnL (after charges)
- Break-even move
- ⚠ Warnings (bad trades)

---

# 🧱 Tech Stack

| Layer    | Technology           |
| -------- | -------------------- |
| Frontend | React + Vite         |
| UI       | Bootstrap + Glass UI |
| Forms    | Formik               |
| Charts   | Recharts             |
| State    | Hooks + LocalStorage |
| Date     | Day.js               |

---

# 📁 Folder Structure

```
src/
│
├── assets/                        # 🎨 Static assets (icons, styles, images)
│
├── components/                    # 🎯 UI LAYER (NO BUSINESS LOGIC)
│   ├── AdaptiveFeedback.jsx         # AI adaptive rules display
│   ├── Analytics.jsx                # Strategy + time + performance stats
│   ├── BehaviorWarnings.jsx         # Behavior alerts (pre-trade)
│   ├── DisciplineGuard.jsx          # Rule violations display
│   ├── DisciplineScore.jsx          # Daily discipline score
│   ├── EquityChart.jsx              # Equity curve visualization
│   ├── Insights.jsx                 # AI behavioral insights
│   ├── PatternInsights.jsx          # Pattern detection UI
│   ├── PreTradeInsights.jsx         # Pre-trade intelligence (risk, RR, BE)
│   ├── RiskEngine.jsx               # Risk preview (UI only)
│   ├── SummaryCard.jsx              # Net PnL + capital overview
│   ├── ThemeToggle.jsx              # Light/Dark toggle
│   ├── TradeCalculator.jsx          # Trade viability checker
│   ├── TradeForm.jsx                # Trade execution entry
│   ├── TradeList.jsx                # Trade history display
│   └── WeeklyReport.jsx             # (Future) weekly analytics
│
├── context/                       # 🌗 UI STATE
│   └── ThemeContext.jsx             # Theme management
│
├── core/                          # 🧠 SYSTEM BRAIN (ENFORCEMENT LAYER)
│   ├── behaviorEngine.js            # Detects revenge, mistakes, patterns
│   ├── disciplineManager.js         # Daily rules (lock, limits)
│   ├── executionEngine.js           # MAIN decision engine (ALLOW / BLOCK)
│   ├── marketContext.js             # (Future) market condition logic
│   ├── patternEngine.js             # Pattern recognition (streaks, timing)
│   ├── riskManager.js               # Risk calculation + validation
│   └── tradeValidator.js            # Input validation layer
│
├── hooks/                         # ⚛️ REUSABLE LOGIC
│   └── useLocalStorage.js           # Persistent storage
│
├── store/                         # ⚙️ SESSION MANAGEMENT
│   ├── sessionStore.js              # Session abstraction (today state)
│   └── tradeStore.js                # Trade helpers (CRUD logic)
│
├── utils/                         # 🔧 PURE LOGIC (SHARED)
│   ├── adaptiveRules.js             # AI adaptive rules
│   ├── analytics.js                 # Stats + insights engine
│   ├── calculations.js              # PnL, charges, summary
│   ├── constants.js                 # System limits (risk, trades)
│   ├── missedTrades.js              # Behavior tracking (future)
│   └── scoreEngine.js               # Discipline + trade scoring
│
├── App.jsx                        # 🔗 ROOT SYSTEM COMPOSITION
├── main.jsx                       # Entry point
└── index.css                      #Global UI system (theme, glass, animations)
```

---

# ⚙️ Installation

```bash
git clone <repo-url>
cd tradeos
yarn install
yarn dev
```

---

# 📦 Dependencies

```bash
yarn add formik uuid dayjs recharts
```

---

# 🧠 How to Use

## Execution Workflow

1. Use Trade Calculator
   → Validate trade

2. Check Pre-Trade Insights
   → Risk, R:R, warnings

3. Execute trade
   → Engine validates or blocks

4. Log trade
   → Stored with behavior data

5. Review:

- Analytics
- Insights
- Discipline score

---

# 🔐 System Guarantees

- No overtrading beyond limits
- No high-risk trades
- No invalid setups
- No emotional execution bypass

---

# 🎯 Why TradeOS is Different

Most tools:

- Track trades ❌

TradeOS:

- Controls decisions ✅
- Enforces discipline ✅
- Prevents bad trades ✅

---

# 🚀 Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Select Vite
4. Deploy

---

# 📈 Future Roadmap

- Behavior AI blocker
- Broker API integration
- Cloud sync (multi-device)
- Multi-user SaaS system
- Strategy backtesting

---

# 💼 Product Vision

TradeOS → evolves into:

> **Execution Intelligence SaaS for traders**

---

# 👨‍💻 Author

Built for traders who want to become:

> **Disciplined, system-driven operators**

---

# ⚠️ Disclaimer

This tool is for educational and analytical purposes only.
Trading involves financial risk.
