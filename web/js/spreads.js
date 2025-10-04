// Tarot Spread Definitions

const SPREADS = {
    'one-card': {
        name: 'One Card',
        cardCount: 1,
        positions: [
            { name: 'The Answer', description: 'Direct response to the question or situation' }
        ],
        script: {
            intro: "Let's draw a single card to see what guidance the tarot has for you today...",
            structure: "This card represents the answer or guidance you need right now."
        }
    },

    'past-present-future': {
        name: 'Past-Present-Future',
        cardCount: 3,
        positions: [
            { name: 'Past', description: 'Past influences, what led to this moment, foundation of the situation' },
            { name: 'Present', description: 'Current energy, what\'s happening now, present challenges or blessings' },
            { name: 'Future', description: 'Likely outcome if current path continues, what\'s emerging, potential direction' }
        ],
        script: {
            intro: "I'm going to draw three cards for you - one showing what brought you to this point, one revealing what's happening now, and one showing where you're heading...",
            structure: "Look at how the past influences the present, and how both point toward the future."
        }
    },

    'situation-action-outcome': {
        name: 'Situation-Action-Outcome',
        cardCount: 3,
        positions: [
            { name: 'Situation', description: 'Current circumstances, what you\'re dealing with' },
            { name: 'Action', description: 'What you should do, recommended approach, action to take' },
            { name: 'Outcome', description: 'Result if you take this action, likely conclusion' }
        ],
        script: {
            intro: "Let's see what the cards reveal about your situation, what action you should take, and what outcome that action will bring...",
            structure: "This spread gives you practical guidance on how to handle your situation."
        }
    },

    'you-them-relationship': {
        name: 'You-Them-Relationship',
        cardCount: 3,
        positions: [
            { name: 'You', description: 'Your energy, feelings, perspective, what you bring' },
            { name: 'Them', description: 'Their energy, feelings, perspective, what they bring' },
            { name: 'Relationship', description: 'The dynamic between you, the relationship itself, potential' }
        ],
        script: {
            intro: "Let's look at this relationship from three angles - your energy, their energy, and the dynamic between you...",
            structure: "See how your energies interact and what the relationship itself is showing you."
        }
    },

    'decision-crossroads': {
        name: 'Decision Crossroads',
        cardCount: 5,
        positions: [
            { name: 'Option A', description: 'First choice/path and its energy' },
            { name: 'You/Center', description: 'Your current position, what you bring to this decision' },
            { name: 'Pro of A', description: 'Benefits or positive aspects of option A' },
            { name: 'Option B', description: 'Second choice/path and its energy' },
            { name: 'Pro of B', description: 'Benefits or positive aspects of option B' }
        ],
        script: {
            intro: "You're at a crossroads. I'll draw five cards - one for each option, one for you in the center, and one showing the benefits of each path...",
            structure: "Weigh both options carefully, considering your central position and the benefits of each path."
        }
    },

    'celtic-cross': {
        name: 'Celtic Cross',
        cardCount: 10,
        positions: [
            { name: 'Present/Self', description: 'Current situation, where you are now, heart of the matter' },
            { name: 'Challenge', description: 'What crosses you, immediate challenge or opposing force' },
            { name: 'Foundation', description: 'Root cause, basis of situation, subconscious influences' },
            { name: 'Recent Past', description: 'What\'s passing away, recent past influences' },
            { name: 'Possible Future', description: 'Best possible outcome, conscious goals' },
            { name: 'Near Future', description: 'What\'s approaching, likely developments in near term' },
            { name: 'Your Approach', description: 'How you see yourself, your attitude, your role' },
            { name: 'External Influences', description: 'How others see you, environmental factors' },
            { name: 'Hopes and Fears', description: 'Your inner desires and anxieties about the situation' },
            { name: 'Final Outcome', description: 'Likely culmination if current path continues' }
        ],
        script: {
            intro: "This is a significant question, so I'm going to use our most comprehensive spread - the Celtic Cross. This will give us deep insight into every aspect of your situation...",
            structure: "Start with cards 1 & 2 (present and challenge), then card 3 (foundation), look at the timeline (4 & 6), consider perspectives (7 & 8), reflect on card 9, and synthesize with cards 5 & 10."
        }
    }
};

// Get spread recommendation based on topic and question type
function getSpreadRecommendation(topic, emotionalState, questionType) {
    const recommendations = {
        love: {
            general: 'you-them-relationship',
            decision: 'decision-crossroads',
            future: 'past-present-future',
            guidance: 'situation-action-outcome'
        },
        career: {
            general: 'situation-action-outcome',
            decision: 'decision-crossroads',
            future: 'past-present-future',
            guidance: 'situation-action-outcome'
        },
        money: {
            general: 'situation-action-outcome',
            decision: 'past-present-future',
            future: 'past-present-future',
            guidance: 'situation-action-outcome'
        },
        personal: {
            general: 'past-present-future',
            decision: 'situation-action-outcome',
            future: 'celtic-cross',
            guidance: 'past-present-future'
        },
        family: {
            general: 'you-them-relationship',
            decision: 'situation-action-outcome',
            future: 'past-present-future',
            guidance: 'situation-action-outcome'
        },
        general: {
            general: 'celtic-cross',
            decision: 'decision-crossroads',
            future: 'past-present-future',
            guidance: 'situation-action-outcome'
        }
    };

    // Default to general guidance if no specific match
    const topicRecs = recommendations[topic] || recommendations.general;
    return topicRecs[questionType] || topicRecs.general;
}

// Get spread by ID
function getSpread(spreadId) {
    return SPREADS[spreadId];
}

// Get all spread IDs
function getAllSpreadIds() {
    return Object.keys(SPREADS);
}
