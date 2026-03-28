export const adaptiveRules = (patterns) => {
  const rules = [];

  if (patterns.lossStreak >= 2) {
    rules.push("Pause trading after 2 losses");
  }

  if (patterns.worstHour) {
    rules.push(`Avoid trading at ${patterns.worstHour}:00`);
  }

  return rules;
};
