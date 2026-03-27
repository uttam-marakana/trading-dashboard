import { useLocalStorage } from "./hooks/useLocalStorage";
import ThemeToggle from "./components/ThemeToggle";

import TradeForm from "./components/TradeForm";
import SummaryCard from "./components/SummaryCard";
import TradeList from "./components/TradeList";
import DisciplineGuard from "./components/DisciplineGuard";
import EquityChart from "./components/EquityChart";
import Insights from "./components/Insights";
import TradeCalculator from "./components/TradeCalculator";
import RiskEngine from "./components/RiskEngine";
import Analytics from "./components/Analytics";

import { calculateSummary } from "./utils/calculations";

function App() {
  const [trades, setTrades] = useLocalStorage("trades", []);

  // SESSION STATE (CORE ADDITION)
  const summary = calculateSummary(trades);

  const session = {
    tradesToday: trades.length,
    pnlToday: summary.netPnL,
    isLocked:
      trades.length >= 3 || summary.isLossLimitHit || summary.netPnL >= 1200,
  };

  const addTrade = (trade) => {
    // HARD LOCK
    if (session.isLocked) {
      alert("🚫 You’re DONE for the day. Walk away.)");
      return;
    }

    setTrades((prev) => [trade, ...prev]);
  };

  return (
    <div className="app-container">
      <div className="container-fluid py-3">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">📊 Execution OS</h5>
          <ThemeToggle />
        </div>

        <div className="row g-3">
          {/* LEFT */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-3">
              <RiskEngine />
              <TradeCalculator />

              {/* ENGINE CONNECTED */}
              <TradeForm addTrade={addTrade} session={session} />

              <DisciplineGuard trades={trades} />
              <Insights trades={trades} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column gap-3">
              <SummaryCard trades={trades} />

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
