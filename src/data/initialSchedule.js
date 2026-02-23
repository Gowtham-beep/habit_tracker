export const WEEKDAY_SCHEDULE = [
    { 
        time: "5:30 – 5:45", 
        activity: "Wake + Silence", 
        focusLayer: "Mental Clarity", 
        whyItExists: "Anchor cognition before input noise", 
        mindset: "No phone. Think long-term positioning." 
    },

    { 
        time: "5:45 – 6:15", 
        activity: "Capital / Strategy Reading (3x week) | Java Concept Articulation (2x week)", 
        focusLayer: "Executive + Technical Depth", 
        whyItExists: "Build capital lens + improve explanation speed", 
        mindset: "Mon/Wed/Fri: Capital. Tue/Thu: Explain ACID, JVM, Threads, etc aloud." 
    },

    { 
        time: "6:15 – 7:30", 
        activity: "Gym (controlled intensity)", 
        focusLayer: "Physical Engine", 
        whyItExists: "Energy for long-term compounding", 
        mindset: "Strong, sustainable, not exhausted." 
    },

    { 
        time: "7:30 – 8:30", 
        activity: "Breakfast + Technical Planning", 
        focusLayer: "Execution Direction", 
        whyItExists: "Define 1 DSA target + 1 backend depth goal", 
        mindset: "What system problem am I solving tonight?" 
    },

    { 
        time: "9:00 – 6:00", 
        activity: "Office Work (Backend / Java Systems)", 
        focusLayer: "Production Exposure", 
        whyItExists: "Extract real-world concurrency + DB insights", 
        mindset: "Identify 1 scaling limit daily." 
    },

    { 
        time: "6:00 – 7:00", 
        activity: "Dinner + Reset", 
        focusLayer: "Recovery", 
        whyItExists: "Prevent cognitive stacking", 
        mindset: "Full detachment." 
    },

    { 
        time: "7:00 – 8:30", 
        activity: "Deep Rebuild Block (Java Core)", 
        focusLayer: "Technical Dominance (70%)", 
        whyItExists: "DSA + Backend System mastery", 
        mindset: "45 min timed DSA (Java) + 45 min project/concurrency depth." 
    },

    { 
        time: "8:30 – 9:00", 
        activity: "Layer Rotation (Finance / Legal / Strategy / Infra Cost)", 
        focusLayer: "Cross-Domain Layering (10%)", 
        whyItExists: "Engineer with capital awareness", 
        mindset: "Mon: Finance | Tue: JVM internals | Wed: Strategy | Thu: Distributed infra cost | Fri: Writing synthesis" 
    },

    { 
        time: "9:00 – 9:20", 
        activity: "Engineering Log / GitHub Notes", 
        focusLayer: "Clarity + Signal", 
        whyItExists: "Convert technical depth into articulation skill", 
        mindset: "Short note: problem → tradeoff → improvement." 
    },

    { 
        time: "10:30 – 5:30", 
        activity: "Sleep (7h minimum)", 
        focusLayer: "Recovery", 
        whyItExists: "Protect cognitive capital", 
        mindset: "Non-negotiable." 
    },
];

export const SATURDAY_SCHEDULE = [
    { time: "Morning", activity: "Gym (moderate / mobility)", purpose: "Energy", mindset: "Stable strength." },

    { time: "10:00 – 1:00", activity: "Hard System Build (Java)", purpose: "Architecture Depth", mindset: "Concurrency, locking, scaling scenario only." },

    { time: "1:00 – 2:00", activity: "Break", purpose: "Reset", mindset: "No tech thinking." },

    { time: "2:00 – 4:00", activity: "Mock Interview / 3 Timed DSA Set (Java)", purpose: "Interview Conditioning", mindset: "Real pressure. No pauses." },

    { time: "4:00 – 5:00", activity: "README / Architecture Documentation", purpose: "Signal Building", mindset: "Explain cost, CAP tradeoff, isolation choice." },

    { time: "Evening", activity: "Light reading / Systems design absorption", purpose: "Slow compounding", mindset: "No heavy grind." },
];

export const SUNDAY_SCHEDULE = [
    { time: "Morning", activity: "Light gym / walk", purpose: "Recovery", mindset: "Low intensity." },

    { time: "Late Morning", activity: "Concept Reinforcement (JVM / OS / DB recap)", purpose: "Long-term retention", mindset: "Teach the concept aloud." },

    { time: "Afternoon", activity: "Weekly Strategic Review + Resume Upgrade", purpose: "Integration", mindset: "What improved in backend depth?" },

    { time: "Evening", activity: "Plan Next Week (DSA targets + system milestone)", purpose: "Execution clarity", mindset: "Define measurable outcome." },
];

// Legacy alias — kept for backwards compatibility with any existing imports
export const WEEKEND_SCHEDULE = [...SATURDAY_SCHEDULE, ...SUNDAY_SCHEDULE];
