// Tarot Card Data
// This file contains all 78 tarot cards with their meanings

const TAROT_DECK = {
    majorArcana: [
        {
            number: 0,
            name: "The Fool",
            arcana: "major",
            upright: {
                keywords: ["innocence", "new beginnings", "free spirit", "spontaneity", "adventure"],
                meaning: "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginners luck, improvisation and believing in the universe.",
                interpretation: "You are about to embark on a new journey. The Fool encourages you to have an open, curious mind and a sense of excitement. Anything can happen, and the Fool reminds you to keep your faith that the universe will provide and guide you on your way."
            },
            reversed: {
                keywords: ["recklessness", "taken advantage of", "inconsideration", "stupidity"],
                meaning: "When reversed, the Fool suggests you are living in the moment and not considering consequences. You may be acting recklessly or taking unnecessary risks.",
                interpretation: "You may need to reassess your current situation. Are you taking too many risks? Are you being naive? The reversed Fool asks you to be more mindful of your decisions and their potential consequences."
            }
        },
        // Add more Major Arcana cards...
    ],

    minorArcana: {
        wands: [
            {
                name: "Ace of Wands",
                suit: "wands",
                number: 1,
                upright: {
                    keywords: ["inspiration", "new opportunities", "growth", "potential"],
                    meaning: "A spark of inspiration, new creative beginning, enthusiasm and potential",
                    interpretation: "New creative energy is flowing. This is the perfect time to start that project or pursue that passion you've been thinking about."
                },
                reversed: {
                    keywords: ["emerging idea", "lack of direction", "distractions", "delays"],
                    meaning: "Creative energy is there but blocked by fear or doubt",
                    interpretation: "You have the idea and the potential, but something is holding you back. Examine what's blocking your creative flow."
                }
            },
            // Add more Wands...
        ],
        cups: [
            {
                name: "Ace of Cups",
                suit: "cups",
                number: 1,
                upright: {
                    keywords: ["love", "new relationships", "compassion", "creativity"],
                    meaning: "New emotional beginning, overflowing love, divine love and compassion",
                    interpretation: "Your heart is open to new emotional experiences. Love, compassion, and creative inspiration are flowing into your life."
                },
                reversed: {
                    keywords: ["self-love", "intuition", "repressed emotions", "blocked creativity"],
                    meaning: "Emotional energy is blocked or being redirected inward",
                    interpretation: "Focus on self-love and inner emotional healing before seeking external connections."
                }
            },
            // Add more Cups...
        ],
        swords: [
            {
                name: "Ace of Swords",
                suit: "swords",
                number: 1,
                upright: {
                    keywords: ["breakthroughs", "new ideas", "mental clarity", "success", "truth"],
                    meaning: "Mental breakthrough, clarity of thought, new ideas and perspectives, truth revealed",
                    interpretation: "A moment of mental clarity is cutting through confusion. New ideas and perspectives are emerging that will help you see the truth."
                },
                reversed: {
                    keywords: ["inner clarity", "re-thinking", "clouded judgment", "confusion"],
                    meaning: "Mental clarity is present but internalized or blocked",
                    interpretation: "You may have the answer within you, but external noise or self-doubt is preventing you from seeing it clearly."
                }
            },
            // Add more Swords...
        ],
        pentacles: [
            {
                name: "Ace of Pentacles",
                suit: "pentacles",
                number: 1,
                upright: {
                    keywords: ["new financial opportunity", "prosperity", "abundance", "manifestation"],
                    meaning: "New material beginning, prosperity, manifestation of goals, financial opportunity",
                    interpretation: "A new financial or material opportunity is presenting itself. This is a great time for new ventures and manifesting abundance."
                },
                reversed: {
                    keywords: ["lost opportunity", "lack of planning", "scarcity mindset"],
                    meaning: "Material opportunity is blocked or poorly planned",
                    interpretation: "An opportunity may have been missed or isn't as solid as it appeared. Review your plans and approach carefully."
                }
            },
            // Add more Pentacles...
        ]
    }
};

// Full deck array for shuffling and drawing
function getFullDeck() {
    const fullDeck = [];

    // Add all Major Arcana
    TAROT_DECK.majorArcana.forEach(card => {
        fullDeck.push({
            ...card,
            id: `major-${card.number}`,
            displayName: card.name
        });
    });

    // Add all Minor Arcana
    Object.keys(TAROT_DECK.minorArcana).forEach(suit => {
        TAROT_DECK.minorArcana[suit].forEach(card => {
            fullDeck.push({
                ...card,
                id: `${suit}-${card.number}`,
                displayName: card.name
            });
        });
    });

    return fullDeck;
}

// Shuffle deck
function shuffleDeck(deck) {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Draw cards with possibility of reversed
function drawCard(deck, allowReversed = true) {
    const card = deck.pop();
    const isReversed = allowReversed && Math.random() < 0.3; // 30% chance of reversed

    return {
        ...card,
        isReversed,
        meaning: isReversed ? card.reversed : card.upright
    };
}

// Draw multiple cards
function drawCards(count, allowReversed = true) {
    const deck = shuffleDeck(getFullDeck());
    const drawnCards = [];

    for (let i = 0; i < count; i++) {
        drawnCards.push(drawCard(deck, allowReversed));
    }

    return drawnCards;
}

// Expose functions to window object for use in other scripts
window.drawTarotCards = drawCards;
window.getFullDeck = getFullDeck;
window.shuffleDeck = shuffleDeck;
