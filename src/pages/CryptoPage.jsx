import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { calculateSummary } from "../utils/calculations";
import { executionEngine } from "../core/executionEngine";

import TradeForm from "../components/TradeForm";
import SummaryCard from "../components/SummaryCard";
import TradeList from "../components/TradeList";
import EquityChart from "../components/EquityChart";
import Analytics from "../components/Analytics";
import DisciplineGuard from "../components/DisciplineGuard";
import DisciplineScore from "../components/DisciplineScore";
import PatternInsights from "../components/PatternInsights";
import Insights from "../components/Insights";
import AdaptiveFeedback from "../components/AdaptiveFeedback";

// Crypto module (placeholder). Uses the same engine/UI, but stores trades separately.
export default function CryptoPage() {
  const [trades, setTrades] = useLocalStorage("crypto_trades", []);
  const [flash, setFlash] = useState(null);

  const today = new Date().toDateString();
  const todayTrades = trades.filter(
    (t) => new Date(t.date).toDateString() === today,
  );

  const summary = calculateSummary(todayTrades);

  const session = {
    tradesToday: todayTrades.length,
    pnlToday: summary.netPnL,
    history: trades,
    isLocked:
      summary.isLossLimitHit || todayTrades.length >= 3 || summary.netPnL >= 1500,
  };

  const addTrade = (trade) => {
    // Tag the trade with asset type
    const taggedTrade = { ...trade, asset: "CRYPTO" };
    const result = executionEngine(taggedTrade, session);

    if (!result.allowed) {
      setFlash("blocked");
      setTimeout(() => setFlash(null), 900);
      return result;
    }

    setTrades((prev) => [result.trade, ...prev]);
    setFlash(result.trade.pnl >= 0 ? "profit" : "loss");
    setTimeout(() => setFlash(null), 600);
    return result;
  };

  return (
    <div className={`app-container ${flash ? `flash-${flash}` : ""}`}>
      <div className="container-fluid py-3">
        <div className="d-flex justify-content-between border-bottom align-items-center pb-2 mb-3">
          <h5 className="mb-0">🪙 Crypto Trading</h5>
        </div>

        <div className="row g-3">
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-3">
              <div className="card">
                <h6>Decision</h6>
                {/* Reuse existing modules for now */}
              </div>

              <div className="card">
                <h6>Execution</h6>
                <TradeForm addTrade={addTrade} session={session} />
              </div>

              <DisciplineScore trades={todayTrades} />
              <DisciplineGuard session={session} />

              <Insights trades={trades} />
              <PatternInsights trades={trades} />
              <AdaptiveFeedback trades={trades} />
            </div>
          </div>

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

