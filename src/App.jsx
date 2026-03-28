import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ThemeToggle from "./components/ThemeToggle";

import TradeForm from "./components/TradeForm";
import SummaryCard from "./components/SummaryCard";
import TradeList from "./components/TradeList";
import EquityChart from "./components/EquityChart";
import Insights from "./components/Insights";
import TradeCalculator from "./components/TradeCalculator";
import RiskEngine from "./components/RiskEngine";
import Analytics from "./components/Analytics";
import DisciplineGuard from "./components/DisciplineGuard";
import DisciplineScore from "./components/DisciplineScore";
import PatternInsights from "./components/PatternInsights";
import AdaptiveFeedback from "./components/AdaptiveFeedback";

import { calculateSummary } from "./utils/calculations";
import { executionEngine } from "./core/executionEngine";

function App() {
  const [trades, setTrades] = useLocalStorage("trades", []);
  const [flash, setFlash] = useState(null);

  const today = new Date().toDateString();

  const todayTrades = trades.filter(
    (t) => new Date(t.date).toDateString() === today,
  );

  const summary = calculateSummary(todayTrades);

  // SESSION (DATA ONLY)
  const session = {
    tradesToday: todayTrades.length,
    pnlToday: summary.netPnL,
    history: trades,
  };

  const addTrade = (trade) => {
    const result = executionEngine(trade, session);

    if (!result.allowed) {
      alert(`🚫 ${result.reason}`);
      return result; // 🔥 return for UI handling
    }

    setTrades((prev) => [result.trade, ...prev]);

    setFlash(result.trade.pnl >= 0 ? "profit" : "loss");
    setTimeout(() => setFlash(null), 600);

    return result; // 🔥 return success + warnings
  };

  return (
    <div className={`app-container ${flash ? `flash-${flash}` : ""}`}>
      <div className="container-fluid py-3">
        {/* HEADER */}
        <div className="d-flex justify-content-between border-bottom align-items-center pb-2 mb-3">
          <h5 className="mb-0">📊 Execution OS</h5>
          <ThemeToggle />
        </div>

        <div className="row g-3">
          {/* LEFT */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-3">
              <div className="card">
                <h6>Decision</h6>
                <TradeCalculator />
                <RiskEngine />
              </div>

              <div className="card">
                <h6>Execution</h6>
                <TradeForm addTrade={addTrade} session={session} />
              </div>

              <DisciplineScore trades={todayTrades} />
              <DisciplineGuard trades={todayTrades} session={session} />

              <Insights trades={trades} />
              <PatternInsights trades={trades} />
              <AdaptiveFeedback trades={trades} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column gap-3">
              <SummaryCard trades={todayTrades} />

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <EquityChart trades={trades} />
                </div>
                <div className="col-12 col-md-6">
                  <Analytics trades={trades} />
                </div>
              </div>

              <TradeList trades={trades} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
