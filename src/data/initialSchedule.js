export const WEEKDAY_SCHEDULE = [
    { time: "5:30 – 5:45", activity: "Wake + Silence", focusLayer: "Mental Clarity", whyItExists: "Control input before noise", mindset: "No phone. Think long-term." },
    { time: "5:45 – 6:15", activity: "Strategy / Finance Reading", focusLayer: "Capital + Strategy", whyItExists: "Build executive cognition", mindset: "1 concept. Reflect." },
    { time: "6:15 – 7:30", activity: "Gym", focusLayer: "Physical Engine", whyItExists: "Energy for decade-long game", mindset: "Train hard, not reckless." },
    { time: "7:30 – 8:30", activity: "Breakfast + Planning", focusLayer: "Direction", whyItExists: "Set 1 technical + 1 strategic intention", mindset: "Think in tradeoffs." },
    { time: "9:00 – 6:00", activity: "Office Work", focusLayer: "Production Depth", whyItExists: "Real-world system exposure", mindset: "Identify risk, cost, scaling limits daily." },
    { time: "6:00 – 7:00", activity: "Dinner + Recovery", focusLayer: "Reset", whyItExists: "Avoid cognitive stacking", mindset: "Step away fully." },
    { time: "7:00 – 8:30", activity: "Deep Rebuild Block", focusLayer: "Technical Core (70%)", whyItExists: "Distributed systems reconstruction", mindset: "No frameworks. Raw logic." },
    { time: "8:30 – 9:00", activity: "Layer Rotation", focusLayer: "Finance / Legal / Strategy (10% each)", whyItExists: "Multi-domain layering", mindset: "Mon: Finance / Tue: Legal / Wed: Strategy / Thu: Finance / Fri: Writing" },
    { time: "9:00 – 9:30", activity: "Strategic Memo / GitHub Notes", focusLayer: "Writing + Synthesis", whyItExists: "Turn knowledge into clarity", mindset: "1 page max. Sharp thinking." },
    { time: "10:15 – 5:30", activity: "Sleep", focusLayer: "Recovery", whyItExists: "Protect cognitive capital", mindset: "Non-negotiable." },
];

export const SATURDAY_SCHEDULE = [
    { time: "Morning", activity: "Gym (moderate)", purpose: "Energy", mindset: "Keep body strong" },
    { time: "10:00 – 1:00", activity: "Deep Rebuild (Core System)", purpose: "Architecture depth", mindset: "Solve hard problems" },
    { time: "1:00 – 2:00", activity: "Break", purpose: "Reset", mindset: "Full detachment" },
    { time: "2:00 – 4:00", activity: "Capital + Company Analysis", purpose: "Finance layering", mindset: "Think like CTO + CFO" },
    { time: "4:00 – 5:00", activity: "Publish / Refine README", purpose: "Visible Win", mindset: "Turn depth into signal" },
    { time: "Evening", activity: "Light reading", purpose: "Absorption", mindset: "No heavy grind" },
];

export const SUNDAY_SCHEDULE = [
    { time: "Morning", activity: "Light gym / walk", purpose: "Recovery", mindset: "Lower intensity" },
    { time: "Late Morning", activity: "Reading Lanes (3 books)", purpose: "Multi-domain compounding", mindset: "Slow thinking" },
    { time: "Afternoon", activity: "Weekly Review", purpose: "Strategic awareness", mindset: "What did I truly learn?" },
    { time: "Evening", activity: "Plan next week", purpose: "Intentional execution", mindset: "Set rebuild milestone" },
];

// Legacy alias — kept for backwards compatibility with any existing imports
export const WEEKEND_SCHEDULE = [...SATURDAY_SCHEDULE, ...SUNDAY_SCHEDULE];
