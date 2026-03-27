export const logMissedTrade = (reason) => {
  const existing = JSON.parse(localStorage.getItem("missedTrades")) || [];

  const updated = [
    {
      id: Date.now(),
      reason,
      date: new Date(),
    },
    ...existing,
  ];

  localStorage.setItem("missedTrades", JSON.stringify(updated));
};
