// Complete Traditional 78-Card Tarot Deck

const MAJOR_ARCANA_CARDS = [
    { number: 0, name: "The Fool", upright: {keywords: ["innocence", "new beginnings", "free spirit"], meaning: "New beginnings, having faith in the future, spontaneity", interpretation: "You are about to embark on a new journey. Have an open, curious mind."}, reversed: {keywords: ["recklessness", "foolishness"], meaning: "Being reckless, not considering consequences", interpretation: "You may need to be more mindful of your decisions."}},
    { number: 1, name: "The Magician", upright: {keywords: ["manifestation", "resourcefulness", "power"], meaning: "Manifestation and resourcefulness, using your skills", interpretation: "You have all the tools you need to succeed. Take inspired action."}, reversed: {keywords: ["manipulation", "poor planning"], meaning: "Manipulation or wasted talent", interpretation: "Are you using your powers wisely?"}},
    { number: 2, name: "The High Priestess", upright: {keywords: ["intuition", "sacred knowledge", "mystery"], meaning: "Intuition and inner wisdom", interpretation: "Trust your intuition. The answers lie within."}, reversed: {keywords: ["secrets", "disconnection"], meaning: "Disconnected from intuition", interpretation: "Reconnect with your inner voice."}},
    { number: 3, name: "The Empress", upright: {keywords: ["femininity", "abundance", "nature"], meaning: "Abundance, nurturing, creativity", interpretation: "Time of growth and abundance. Nurture yourself and others."}, reversed: {keywords: ["creative block", "dependence"], meaning: "Creative blocks or codependency", interpretation: "Are you nurturing yourself as much as others?"}},
    { number: 4, name: "The Emperor", upright: {keywords: ["authority", "structure", "control"], meaning: "Authority and solid foundations", interpretation: "Take charge and create structure. Be disciplined."}, reversed: {keywords: ["domination", "rigidity"], meaning: "Abuse of power or excessive control", interpretation: "Are you being too rigid or controlling?"}},
    { number: 5, name: "The Hierophant", upright: {keywords: ["tradition", "conformity", "institutions"], meaning: "Tradition and established institutions", interpretation: "Seek wisdom from traditional approaches or mentors."}, reversed: {keywords: ["rebellion", "challenging status quo"], meaning: "Rebellion against tradition", interpretation: "Create your own spiritual path."}},
    { number: 6, name: "The Lovers", upright: {keywords: ["love", "harmony", "choices"], meaning: "Deep connections and important choices", interpretation: "An important decision about relationships or values."}, reversed: {keywords: ["disharmony", "misalignment"], meaning: "Relationship disharmony or misaligned values", interpretation: "Examine if you're being true to yourself."}},
    { number: 7, name: "The Chariot", upright: {keywords: ["control", "willpower", "success"], meaning: "Victory through determination", interpretation: "Success through focused determination. Drive forward with confidence."}, reversed: {keywords: ["lack of direction", "opposition"], meaning: "Losing control or lacking direction", interpretation: "Reassess your goals and direction."}},
    { number: 8, name: "Strength", upright: {keywords: ["courage", "compassion", "inner strength"], meaning: "Inner fortitude and gentle control", interpretation: "You have the strength to overcome challenges with compassion."}, reversed: {keywords: ["self-doubt", "weakness"], meaning: "Self-doubt or lack of confidence", interpretation: "Reconnect with your inner power."}},
    { number: 9, name: "The Hermit", upright: {keywords: ["introspection", "solitude", "inner guidance"], meaning: "Soul-searching and inner wisdom", interpretation: "Time for introspection. Seek answers within."}, reversed: {keywords: ["isolation", "loneliness"], meaning: "Excessive isolation", interpretation: "Balance solitude with connection."}},
    { number: 10, name: "Wheel of Fortune", upright: {keywords: ["luck", "cycles", "destiny"], meaning: "Life cycles and changing fortunes", interpretation: "A turning point. Life is cyclical - trust the flow."}, reversed: {keywords: ["bad luck", "resistance"], meaning: "Resisting change or bad luck", interpretation: "Embrace inevitable transformations."}},
    { number: 11, name: "Justice", upright: {keywords: ["fairness", "truth", "cause and effect"], meaning: "Fairness and karmic justice", interpretation: "Truth and fairness will prevail. Actions have consequences."}, reversed: {keywords: ["unfairness", "dishonesty"], meaning: "Unfair treatment or dishonesty", interpretation: "Examine where truth is lacking."}},
    { number: 12, name: "The Hanged Man", upright: {keywords: ["pause", "surrender", "new perspective"], meaning: "Voluntary sacrifice for new perspective", interpretation: "Let go and see things differently."}, reversed: {keywords: ["resistance", "stalling"], meaning: "Resisting necessary change", interpretation: "Are you truly surrendering or just avoiding?"}},
    { number: 13, name: "Death", upright: {keywords: ["endings", "transformation", "transition"], meaning: "Necessary endings and transformation", interpretation: "Something must end for something new to begin."}, reversed: {keywords: ["resistance to change", "fear"], meaning: "Resisting necessary endings", interpretation: "Release your fear and allow transformation."}},
    { number: 14, name: "Temperance", upright: {keywords: ["balance", "moderation", "patience"], meaning: "Balance and the middle path", interpretation: "Seek balance and practice patience."}, reversed: {keywords: ["imbalance", "excess"], meaning: "Imbalance or excess", interpretation: "Restore equilibrium and practice moderation."}},
    { number: 15, name: "The Devil", upright: {keywords: ["bondage", "materialism", "attachment"], meaning: "Bondage to material world or unhealthy attachments", interpretation: "Examine what's holding you captive."}, reversed: {keywords: ["freedom", "releasing"], meaning: "Breaking free from bondage", interpretation: "You're breaking free from what bound you."}},
    { number: 16, name: "The Tower", upright: {keywords: ["upheaval", "chaos", "revelation"], meaning: "Sudden upheaval and dramatic change", interpretation: "Sudden change brings truth and clears false structures."}, reversed: {keywords: ["avoiding disaster", "fear of change"], meaning: "Resisting upheaval or narrowly avoiding disaster", interpretation: "Make changes before they're forced upon you."}},
    { number: 17, name: "The Star", upright: {keywords: ["hope", "faith", "renewal"], meaning: "Hope, healing and renewed faith", interpretation: "Hope and renewal are here. Have faith in your path."}, reversed: {keywords: ["hopelessness", "disconnection"], meaning: "Loss of faith or disconnection", interpretation: "Reconnect with your inner light."}},
    { number: 18, name: "The Moon", upright: {keywords: ["illusion", "intuition", "subconscious"], meaning: "Illusion and navigating uncertainty", interpretation: "Trust your intuition through uncertainty. Things aren't as they seem."}, reversed: {keywords: ["fear release", "clarity"], meaning: "Releasing fear or gaining clarity", interpretation: "Hidden fears are emerging to be released."}},
    { number: 19, name: "The Sun", upright: {keywords: ["joy", "success", "positivity"], meaning: "Joy, success and celebration", interpretation: "Time of joy and success. Celebrate!"}, reversed: {keywords: ["temporary setback", "inner joy"], meaning: "Temporary clouds or excessive optimism", interpretation: "Reconnect with your inner joy."}},
    { number: 20, name: "Judgement", upright: {keywords: ["rebirth", "inner calling", "absolution"], meaning: "Awakening to your true purpose", interpretation: "You're being called to a higher level. Reflect and step into rebirth."}, reversed: {keywords: ["self-doubt", "harsh judgment"], meaning: "Self-criticism or ignoring your calling", interpretation: "Practice self-compassion and listen to your higher self."}},
    { number: 21, name: "The World", upright: {keywords: ["completion", "accomplishment", "fulfillment"], meaning: "Completion and achievement", interpretation: "You've reached the end of a journey successfully."}, reversed: {keywords: ["incomplete", "seeking closure"], meaning: "Incomplete goals or delays", interpretation: "Finish what you started. Avoid shortcuts."}}
];

const MINOR_ARCANA_DATA = {
    wands: [
        { num: 1, name: "Ace", upright: {keywords: ["inspiration", "new opportunities"], meaning: "New creative beginning", interpretation: "New creative energy is flowing."}, reversed: {keywords: ["delays", "distractions"], meaning: "Creative blocks", interpretation: "Something is blocking your creative flow."}},
        { num: 2, name: "Two", upright: {keywords: ["planning", "decisions"], meaning: "Future planning", interpretation: "Plan for the future and make decisions."}, reversed: {keywords: ["fear", "lack of planning"], meaning: "Fear of unknown", interpretation: "Align with your inner goals."}},
        { num: 3, name: "Three", upright: {keywords: ["expansion", "foresight"], meaning: "Progress and expansion", interpretation: "Your preparations are paying off."}, reversed: {keywords: ["delays", "obstacles"], meaning: "Unexpected delays", interpretation: "Playing small or facing obstacles."}},
        { num: 4, name: "Four", upright: {keywords: ["celebration", "harmony"], meaning: "Celebration and joy", interpretation: "Time to celebrate achievements."}, reversed: {keywords: ["conflict", "transition"], meaning: "Inner harmony needed", interpretation: "Find harmony within."}},
        { num: 5, name: "Five", upright: {keywords: ["conflict", "competition"], meaning: "Conflict and tension", interpretation: "Diverse perspectives clashing."}, reversed: {keywords: ["avoiding conflict"], meaning: "Inner conflict", interpretation: "Release tension or seek cooperation."}},
        { num: 6, name: "Six", upright: {keywords: ["success", "recognition"], meaning: "Public recognition", interpretation: "Victory and public success."}, reversed: {keywords: ["private achievement"], meaning: "Personal success", interpretation: "Define success for yourself."}},
        { num: 7, name: "Seven", upright: {keywords: ["challenge", "perseverance"], meaning: "Defending your position", interpretation: "Stand your ground with courage."}, reversed: {keywords: ["exhaustion", "giving up"], meaning: "Feeling overwhelmed", interpretation: "You may be exhausted from defending."}},
        { num: 8, name: "Eight", upright: {keywords: ["movement", "swift action"], meaning: "Fast-paced change", interpretation: "Things are happening quickly."}, reversed: {keywords: ["delays", "frustration"], meaning: "Delays or slowing down", interpretation: "Patience needed, things are delayed."}},
        { num: 9, name: "Nine", upright: {keywords: ["resilience", "persistence"], meaning: "Last stand, perseverance", interpretation: "Nearly there - persist despite weariness."}, reversed: {keywords: ["overwhelm", "paranoia"], meaning: "Struggle and defensiveness", interpretation: "You may be too defensive."}},
        { num: 10, name: "Ten", upright: {keywords: ["burden", "responsibility"], meaning: "Heavy burdens", interpretation: "Carrying too much responsibility."}, reversed: {keywords: ["delegation", "release"], meaning: "Releasing burdens", interpretation: "Time to delegate or let go."}},
        { num: 11, name: "Page", upright: {keywords: ["inspiration", "discovery"], meaning: "Enthusiastic messenger", interpretation: "New ideas and enthusiasm."}, reversed: {keywords: ["delays", "self-limiting"], meaning: "Blocked ideas", interpretation: "Self-limiting beliefs present."}},
        { num: 12, name: "Knight", upright: {keywords: ["passion", "adventure"], meaning: "Bold action", interpretation: "Charging ahead with passion."}, reversed: {keywords: ["impulsiveness", "haste"], meaning: "Scattered energy", interpretation: "Too much haste, slow down."}},
        { num: 13, name: "Queen", upright: {keywords: ["confidence", "independence"], meaning: "Charismatic and bold", interpretation: "Confident leader, vibrant energy."}, reversed: {keywords: ["self-confidence", "introverted"], meaning: "Need for self-respect", interpretation: "Re-establish sense of self."}},
        { num: 14, name: "King", upright: {keywords: ["leadership", "vision"], meaning: "Visionary leader", interpretation: "Bold leadership and vision."}, reversed: {keywords: ["impulsiveness", "ruthless"], meaning: "Tyrannical behavior", interpretation: "Temper impulsiveness with wisdom."}}
    ],
    cups: [
        { num: 1, name: "Ace", upright: {keywords: ["love", "new relationships"], meaning: "New emotional beginning", interpretation: "Heart open to new emotional experiences."}, reversed: {keywords: ["self-love", "repressed emotions"], meaning: "Blocked emotions", interpretation: "Focus on self-love first."}},
        { num: 2, name: "Two", upright: {keywords: ["partnership", "connection"], meaning: "Mutual attraction", interpretation: "Partnership and union forming."}, reversed: {keywords: ["break-up", "disharmony"], meaning: "Relationship imbalance", interpretation: "Self-love or relationship issues."}},
        { num: 3, name: "Three", upright: {keywords: ["celebration", "friendship"], meaning: "Friendship and celebration", interpretation: "Celebrate with friends and community."}, reversed: {keywords: ["independence", "overindulgence"], meaning: "Need for alone time", interpretation: "Time for independence."}},
        { num: 4, name: "Four", upright: {keywords: ["meditation", "contemplation"], meaning: "Reevaluation needed", interpretation: "Meditate on what truly matters."}, reversed: {keywords: ["new perspectives"], meaning: "Checking in emotionally", interpretation: "Finding new perspectives."}},
        { num: 5, name: "Five", upright: {keywords: ["loss", "regret"], meaning: "Grief and disappointment", interpretation: "Focusing on loss, need to move forward."}, reversed: {keywords: ["forgiveness", "moving on"], meaning: "Self-forgiveness", interpretation: "Time to forgive and move on."}},
        { num: 6, name: "Six", upright: {keywords: ["nostalgia", "childhood"], meaning: "Childhood memories", interpretation: "Innocence and nostalgia present."}, reversed: {keywords: ["living in past"], meaning: "Stuck in the past", interpretation: "Release the past, find playfulness."}},
        { num: 7, name: "Seven", upright: {keywords: ["choices", "illusion"], meaning: "Multiple options", interpretation: "Many choices, but some may be illusions."}, reversed: {keywords: ["clarity", "alignment"], meaning: "Finding clarity", interpretation: "Gaining clarity from overwhelm."}},
        { num: 8, name: "Eight", upright: {keywords: ["walking away", "withdrawal"], meaning: "Leaving behind", interpretation: "Walking away to seek deeper meaning."}, reversed: {keywords: ["trying again", "indecision"], meaning: "One more try", interpretation: "Unsure if should stay or go."}},
        { num: 9, name: "Nine", upright: {keywords: ["contentment", "satisfaction"], meaning: "Wish fulfillment", interpretation: "Emotional satisfaction and contentment."}, reversed: {keywords: ["inner happiness", "materialism"], meaning: "Finding happiness within", interpretation: "True happiness comes from within."}},
        { num: 10, name: "Ten", upright: {keywords: ["harmony", "happy family"], meaning: "Emotional fulfillment", interpretation: "Lasting happiness and harmony."}, reversed: {keywords: ["disconnection", "misalignment"], meaning: "Family disharmony", interpretation: "Misaligned values in relationships."}},
        { num: 11, name: "Page", upright: {keywords: ["creativity", "intuition"], meaning: "Intuitive messenger", interpretation: "Creative and intuitive messages."}, reversed: {keywords: ["creative blocks"], meaning: "Doubting intuition", interpretation: "Creative blocks or emotional immaturity."}},
        { num: 12, name: "Knight", upright: {keywords: ["romance", "charm"], meaning: "Romantic idealist", interpretation: "Following heart's desires."}, reversed: {keywords: ["moodiness", "jealousy"], meaning: "Unrealistic expectations", interpretation: "Too much idealism, ground yourself."}},
        { num: 13, name: "Queen", upright: {keywords: ["compassion", "intuition"], meaning: "Emotionally nurturing", interpretation: "Deeply intuitive and compassionate."}, reversed: {keywords: ["co-dependency"], meaning: "Giving too much", interpretation: "Practice self-care and boundaries."}},
        { num: 14, name: "King", upright: {keywords: ["emotional balance", "diplomacy"], meaning: "Emotional mastery", interpretation: "Wise, balanced, and diplomatic."}, reversed: {keywords: ["emotional manipulation"], meaning: "Moodiness or manipulation", interpretation: "Avoid emotional manipulation."}}
    ],
    swords: [
        { num: 1, name: "Ace", upright: {keywords: ["clarity", "breakthrough"], meaning: "Mental breakthrough", interpretation: "Clarity cutting through confusion."}, reversed: {keywords: ["confusion", "clouded judgment"], meaning: "Mental blocks", interpretation: "Clarity is present but blocked."}},
        { num: 2, name: "Two", upright: {keywords: ["difficult decision", "stalemate"], meaning: "Difficult choice", interpretation: "Stalemate, avoiding a decision."}, reversed: {keywords: ["indecision", "confusion"], meaning: "Information overload", interpretation: "Paralyzed by indecision."}},
        { num: 3, name: "Three", upright: {keywords: ["heartbreak", "sorrow"], meaning: "Heartbreak and grief", interpretation: "Painful truth, necessary grief."}, reversed: {keywords: ["healing", "forgiveness"], meaning: "Releasing pain", interpretation: "Healing and forgiveness emerging."}},
        { num: 4, name: "Four", upright: {keywords: ["rest", "recovery"], meaning: "Rest and recuperation", interpretation: "Time for rest and contemplation."}, reversed: {keywords: ["burn-out", "restlessness"], meaning: "Exhaustion or restlessness", interpretation: "Deep exhaustion or can't rest."}},
        { num: 5, name: "Five", upright: {keywords: ["conflict", "defeat"], meaning: "Hollow victory", interpretation: "Winning at others' expense."}, reversed: {keywords: ["reconciliation"], meaning: "Making amends", interpretation: "Time to reconcile and communicate."}},
        { num: 6, name: "Six", upright: {keywords: ["transition", "moving on"], meaning: "Moving to calmer waters", interpretation: "Transition away from troubles."}, reversed: {keywords: ["resistance", "baggage"], meaning: "Resisting change", interpretation: "Still carrying emotional baggage."}},
        { num: 7, name: "Seven", upright: {keywords: ["deception", "strategy"], meaning: "Getting away with something", interpretation: "Deception or strategic thinking."}, reversed: {keywords: ["imposter syndrome"], meaning: "Self-deceit", interpretation: "Being honest with yourself."}},
        { num: 8, name: "Eight", upright: {keywords: ["restriction", "trapped"], meaning: "Feeling trapped", interpretation: "Self-imposed mental prison."}, reversed: {keywords: ["releasing beliefs"], meaning: "Breaking free", interpretation: "Releasing limiting thoughts."}},
        { num: 9, name: "Nine", upright: {keywords: ["anxiety", "worry"], meaning: "Mental anguish", interpretation: "Anxiety and sleepless nights."}, reversed: {keywords: ["releasing worry"], meaning: "Releasing fears", interpretation: "Letting go of deep-seated fears."}},
        { num: 10, name: "Ten", upright: {keywords: ["painful ending", "rock bottom"], meaning: "Painful conclusion", interpretation: "Rock bottom - can only go up now."}, reversed: {keywords: ["recovery", "resisting end"], meaning: "Avoiding inevitable end", interpretation: "Recovery or refusing to let go."}},
        { num: 11, name: "Page", upright: {keywords: ["curiosity", "new ideas"], meaning: "Curious messenger", interpretation: "Thirst for knowledge and truth."}, reversed: {keywords: ["all talk", "confusion"], meaning: "No follow-through", interpretation: "All talk and no action."}},
        { num: 12, name: "Knight", upright: {keywords: ["action", "ambition"], meaning: "Swift and driven", interpretation: "Charging ahead intellectually."}, reversed: {keywords: ["impulsive", "unfocused"], meaning: "Scattered energy", interpretation: "Too impulsive, focus needed."}},
        { num: 13, name: "Queen", upright: {keywords: ["independent", "clear boundaries"], meaning: "Clear thinking and direct", interpretation: "Independent thought, honest judgment."}, reversed: {keywords: ["bitter", "cold"], meaning: "Overly harsh", interpretation: "Too harsh or withholding."}},
        { num: 14, name: "King", upright: {keywords: ["intellectual power", "truth"], meaning: "Clear judgment", interpretation: "Analytical authority and truth."}, reversed: {keywords: ["manipulation", "abuse of power"], meaning: "Misuse of intellect", interpretation: "Using intelligence to manipulate."}}
    ],
    pentacles: [
        { num: 1, name: "Ace", upright: {keywords: ["opportunity", "prosperity"], meaning: "New material opportunity", interpretation: "Financial opportunity presenting itself."}, reversed: {keywords: ["lost opportunity"], meaning: "Missed opportunity", interpretation: "Opportunity blocked or missed."}},
        { num: 2, name: "Two", upright: {keywords: ["balance", "adaptability"], meaning: "Juggling priorities", interpretation: "Balancing multiple priorities."}, reversed: {keywords: ["overwhelm", "disorganization"], meaning: "Over-committed", interpretation: "Too much to handle, prioritize."}},
        { num: 3, name: "Three", upright: {keywords: ["teamwork", "collaboration"], meaning: "Skilled work", interpretation: "Building something through collaboration."}, reversed: {keywords: ["disharmony", "working alone"], meaning: "Lack of teamwork", interpretation: "Working alone or team conflicts."}},
        { num: 4, name: "Four", upright: {keywords: ["security", "control"], meaning: "Holding onto resources", interpretation: "Security through saving and control."}, reversed: {keywords: ["greed", "letting go"], meaning: "Over-spending or greed", interpretation: "Either too controlling or too loose."}},
        { num: 5, name: "Five", upright: {keywords: ["hardship", "poverty"], meaning: "Financial loss", interpretation: "Material insecurity and hardship."}, reversed: {keywords: ["recovery"], meaning: "Recovery from loss", interpretation: "Finding help and recovering."}},
        { num: 6, name: "Six", upright: {keywords: ["generosity", "charity"], meaning: "Giving and receiving", interpretation: "Generosity and sharing resources."}, reversed: {keywords: ["strings attached"], meaning: "One-sided charity", interpretation: "Imbalanced giving or taking."}},
        { num: 7, name: "Seven", upright: {keywords: ["patience", "long-term view"], meaning: "Assessment of progress", interpretation: "Patience and long-term investment."}, reversed: {keywords: ["impatience", "frustration"], meaning: "Lack of long-term vision", interpretation: "Impatient for results."}},
        { num: 8, name: "Eight", upright: {keywords: ["mastery", "skill"], meaning: "Dedication to craft", interpretation: "Mastery through practice and dedication."}, reversed: {keywords: ["perfectionism"], meaning: "Poor quality or perfectionism", interpretation: "Misdirected effort or too perfect."}},
        { num: 9, name: "Nine", upright: {keywords: ["abundance", "luxury"], meaning: "Self-sufficiency", interpretation: "Material abundance and independence."}, reversed: {keywords: ["over-investment in work"], meaning: "Material instability", interpretation: "Working too hard, unstable."}},
        { num: 10, name: "Ten", upright: {keywords: ["wealth", "legacy"], meaning: "Lasting wealth", interpretation: "Family legacy and long-term security."}, reversed: {keywords: ["financial failure"], meaning: "Dark side of wealth", interpretation: "Poor financial planning or family issues."}},
        { num: 11, name: "Page", upright: {keywords: ["manifestation", "new job"], meaning: "Student of material world", interpretation: "New financial opportunity or learning."}, reversed: {keywords: ["procrastination"], meaning: "Lack of progress", interpretation: "Procrastinating or poor planning."}},
        { num: 12, name: "Knight", upright: {keywords: ["hard work", "routine"], meaning: "Methodical progress", interpretation: "Dedicated, reliable, hardworking."}, reversed: {keywords: ["boredom", "stuck"], meaning: "Feeling stuck", interpretation: "Bored or too perfectionist."}},
        { num: 13, name: "Queen", upright: {keywords: ["nurturing", "practical"], meaning: "Practical nurturer", interpretation: "Grounded, resourceful, creating comfort."}, reversed: {keywords: ["work-home conflict"], meaning: "Financial independence vs care", interpretation: "Balancing self-care with providing."}},
        { num: 14, name: "King", upright: {keywords: ["wealth", "business"], meaning: "Master of material world", interpretation: "Financial success and business acumen."}, reversed: {keywords: ["materialistic", "stubborn"], meaning: "Obsessed with wealth", interpretation: "Too focused on money, inflexible."}}
    ]
};

// Build deck - ONLY 22 Major Arcana cards
function getFullDeck() {
    const fullDeck = [];

    // Add all Major Arcana
    MAJOR_ARCANA_CARDS.forEach(card => {
        fullDeck.push({
            ...card,
            id: `major-${card.number}`,
            arcana: 'major',
            displayName: card.name
        });
    });

    // Minor Arcana excluded - using only 22 Major Arcana cards
    // Object.keys(MINOR_ARCANA_DATA).forEach(suit => {
    //     MINOR_ARCANA_DATA[suit].forEach(card => {
    //         const cardName = `${card.name} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`;
    //         fullDeck.push({
    //             ...card,
    //             name: cardName,
    //             displayName: cardName,
    //             id: `${suit}-${card.num}`,
    //             suit: suit,
    //             arcana: 'minor',
    //             number: card.num
    //         });
    //     });
    // });

    return fullDeck;
}

// Shuffle deck using Fisher-Yates algorithm
function shuffleDeck(deck) {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Draw single card with possible reversal
function drawCard(deck, allowReversed = true) {
    const card = deck.pop();
    const isReversed = allowReversed && Math.random() < 0.3; // 30% chance reversed

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

// Expose functions to window
window.drawTarotCards = drawCards;
window.getFullDeck = getFullDeck;
window.shuffleDeck = shuffleDeck;

// Log deck size for verification
console.log(`🔮 Major Arcana Deck Loaded: ${getFullDeck().length} cards`);
