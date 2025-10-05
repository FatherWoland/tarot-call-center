// Main Application Logic

// State Management
const AppState = {
    currentSection: 'intakeSection',
    sessionStartTime: null,
    timerInterval: null,
    callerData: {
        name: '',
        topic: '',
        emotionalState: '',
        mainQuestion: '',
        followUpAnswers: {}
    },
    selectedSpread: null,
    drawnCards: [],
    currentCardIndex: 0,
    showingPosition: true, // true = showing position, false = showing card
    readingData: {}
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Start session timer
    AppState.sessionStartTime = Date.now();
    startSessionTimer();

    // Set up topic change listener
    document.getElementById('topicArea').addEventListener('change', handleTopicChange);

    // Show first section
    showSection('intakeSection');

    console.log('Tarot Call Center initialized');
}

// Session Timer
function startSessionTimer() {
    AppState.timerInterval = setInterval(() => {
        const elapsed = Date.now() - AppState.sessionStartTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        document.getElementById('sessionTime').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Section Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show requested section
    document.getElementById(sectionId).classList.add('active');
    AppState.currentSection = sectionId;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Topic Change Handler
function handleTopicChange(e) {
    const topic = e.target.value;
    AppState.callerData.topic = topic;

    // Generate follow-up questions based on topic
    const followUpContainer = document.getElementById('followUpQuestions');

    if (!topic) {
        followUpContainer.innerHTML = '';
        return;
    }

    const questions = getFollowUpQuestions(topic);
    followUpContainer.innerHTML = '<h3>Follow-up Questions</h3>';

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'form-group';

        if (q.type === 'select') {
            questionDiv.innerHTML = `
                <label>${q.question}</label>
                <select class="form-select" data-question="${index}">
                    <option value="">Select...</option>
                    ${q.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>
            `;
        } else {
            questionDiv.innerHTML = `
                <label>${q.question}</label>
                <input type="text" placeholder="${q.placeholder || ''}" data-question="${index}">
            `;
        }

        followUpContainer.appendChild(questionDiv);
    });
}

// Get Follow-up Questions Based on Topic
function getFollowUpQuestions(topic) {
    const questionSets = {
        love: [
            {
                question: 'Is this about a current relationship, a potential relationship, or are you single and seeking?',
                type: 'select',
                options: ['Current relationship', 'Potential/developing relationship', 'Single and seeking', 'Ex/past relationship']
            },
            {
                question: 'What do you most want to understand about this situation?',
                type: 'text',
                placeholder: 'e.g., their feelings, future potential, what to do...'
            }
        ],
        career: [
            {
                question: 'Are you currently employed, looking for work, or considering a career change?',
                type: 'select',
                options: ['Currently employed', 'Job searching', 'Considering career change', 'Starting a business']
            },
            {
                question: 'What\'s the main question or concern you have?',
                type: 'text',
                placeholder: 'e.g., should I leave, will I get promoted, which job...'
            }
        ],
        money: [
            {
                question: 'Is this about a specific financial decision, your overall financial situation, or future planning?',
                type: 'select',
                options: ['Specific decision', 'Current financial situation', 'Future planning']
            },
            {
                question: 'What would a positive outcome look like for you?',
                type: 'text',
                placeholder: 'Describe your financial goal...'
            }
        ],
        personal: [
            {
                question: 'What aspect of yourself or your life are you looking to better understand?',
                type: 'text',
                placeholder: 'e.g., purpose, blocks, patterns, growth...'
            },
            {
                question: 'Are you feeling stuck, or are you in a period of growth?',
                type: 'select',
                options: ['Feeling stuck/blocked', 'In growth/development', 'Uncertain/both']
            }
        ],
        family: [
            {
                question: 'Who is this about and what\'s your relationship to them?',
                type: 'text',
                placeholder: 'e.g., mother, sibling, friend...'
            },
            {
                question: 'Is there a specific issue or is this about understanding the relationship in general?',
                type: 'select',
                options: ['Specific issue/situation', 'General understanding', 'Improving the relationship']
            }
        ],
        health: [
            {
                question: 'Are you looking at physical health, mental/emotional wellbeing, or overall life balance?',
                type: 'select',
                options: ['Physical health', 'Mental/emotional wellbeing', 'Overall life balance']
            }
        ],
        general: [
            {
                question: 'If you could have clarity on one thing about your life right now, what would it be?',
                type: 'text',
                placeholder: 'What do you most need clarity on?'
            },
            {
                question: 'Are you at a crossroads, or seeking confirmation about your current path?',
                type: 'select',
                options: ['At a crossroads/facing decision', 'Seeking confirmation', 'Feeling lost/need direction']
            }
        ]
    };

    return questionSets[topic] || questionSets.general;
}

// Proceed to Spread Selection
function proceedToSpreadSelection() {
    // Collect all intake data
    AppState.callerData.name = document.getElementById('callerName').value || 'Caller';
    AppState.callerData.topic = document.getElementById('topicArea').value;
    AppState.callerData.emotionalState = document.getElementById('emotionalState').value;
    AppState.callerData.mainQuestion = document.getElementById('mainQuestion').value;

    // Validate required fields
    if (!AppState.callerData.topic) {
        alert('Please select a topic area');
        return;
    }

    if (!AppState.callerData.emotionalState) {
        alert('Please select the caller\'s emotional state');
        return;
    }

    // Collect follow-up answers
    document.querySelectorAll('#followUpQuestions [data-question]').forEach(input => {
        const questionIndex = input.getAttribute('data-question');
        AppState.callerData.followUpAnswers[questionIndex] = input.value;
    });

    // Generate spread recommendation
    const recommendedSpread = getSpreadRecommendation(
        AppState.callerData.topic,
        AppState.callerData.emotionalState,
        'general'
    );

    const spreadInfo = SPREADS[recommendedSpread];
    document.getElementById('recommendedSpreadText').innerHTML = `
        <strong>Recommended: ${spreadInfo.name}</strong><br>
        ${spreadInfo.script.intro}
    `;

    // Show spread selection
    showSection('spreadSection');
}

// Select Spread
function selectSpread(spreadId) {
    // Remove previous selection
    document.querySelectorAll('.spread-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selection to clicked card
    event.target.closest('.spread-card').classList.add('selected');

    // Save selection
    AppState.selectedSpread = spreadId;

    // Show draw section
    setTimeout(() => {
        updateReadingSummary();
        showSection('drawSection');
    }, 300);
}

// Update Reading Summary
function updateReadingSummary() {
    document.getElementById('summaryCallerName').textContent = AppState.callerData.name;
    document.getElementById('summaryTopic').textContent =
        AppState.callerData.topic.charAt(0).toUpperCase() + AppState.callerData.topic.slice(1);
    document.getElementById('summarySpread').textContent = SPREADS[AppState.selectedSpread].name;
    document.getElementById('summaryEmotion').textContent =
        AppState.callerData.emotionalState.charAt(0).toUpperCase() + AppState.callerData.emotionalState.slice(1);
}

// Draw Cards
function drawCards() {
    const spread = SPREADS[AppState.selectedSpread];
    const cards = window.drawTarotCards(spread.cardCount, true);

    AppState.drawnCards = cards.map((card, index) => ({
        ...card,
        position: spread.positions[index]
    }));

    // Reset card index and position flag, start progressive revelation
    AppState.currentCardIndex = 0;
    AppState.showingPosition = true;
    showSection('readingSection');
    revealNextCard();
}

// Reveal Next Card (Progressive Revelation with Position First)
function revealNextCard() {
    const cardsDisplay = document.getElementById('cardsDisplay');
    const interpretationPanel = document.getElementById('interpretationPanel');

    // Clear previous content
    cardsDisplay.innerHTML = '';
    interpretationPanel.innerHTML = '';

    const currentCard = AppState.drawnCards[AppState.currentCardIndex];

    // Display all previously revealed cards
    const cardRow = document.createElement('div');
    cardRow.className = 'card-row';

    for (let i = 0; i < AppState.currentCardIndex; i++) {
        const card = AppState.drawnCards[i];
        const cardDiv = document.createElement('div');
        cardDiv.className = `tarot-card ${card.isReversed ? 'card-reversed' : ''}`;
        cardDiv.innerHTML = `
            <div class="card-position">${card.position.name}</div>
            <div class="card-name">${card.displayName}</div>
            <div class="card-orientation">${card.isReversed ? 'Reversed' : 'Upright'}</div>
        `;
        cardRow.appendChild(cardDiv);
    }

    // Add current position (face down if showing position, face up if showing card)
    const currentCardDiv = document.createElement('div');
    if (AppState.showingPosition) {
        // Show face-down placeholder
        currentCardDiv.className = 'tarot-card';
        currentCardDiv.innerHTML = `
            <div class="card-position">${currentCard.position.name}</div>
            <div class="card-name">🂠</div>
            <div class="card-orientation">Face Down</div>
        `;
    } else {
        // Show revealed card
        currentCardDiv.className = `tarot-card ${currentCard.isReversed ? 'card-reversed' : ''}`;
        currentCardDiv.innerHTML = `
            <div class="card-position">${currentCard.position.name}</div>
            <div class="card-name">${currentCard.displayName}</div>
            <div class="card-orientation">${currentCard.isReversed ? 'Reversed' : 'Upright'}</div>
        `;
    }
    cardRow.appendChild(currentCardDiv);

    cardsDisplay.appendChild(cardRow);

    // STEP 1: Show position meaning
    if (AppState.showingPosition) {
        const positionSection = document.createElement('div');
        positionSection.className = 'interpretation-section';
        positionSection.innerHTML = `
            <h3>${AppState.currentCardIndex + 1}. ${currentCard.position.name}</h3>
            <div class="card-meaning">
                <p><strong>This position represents:</strong> ${currentCard.position.description}</p>
                <p>This card will show you what's happening in this area of your situation.</p>
            </div>
        `;
        interpretationPanel.appendChild(positionSection);

        // Add "Reveal Card" button
        const revealButton = document.createElement('button');
        revealButton.className = 'btn btn-primary btn-large';
        revealButton.textContent = `🎴 Reveal the ${currentCard.position.name} Card`;
        revealButton.onclick = function() {
            AppState.showingPosition = false;
            revealNextCard();
        };
        interpretationPanel.appendChild(revealButton);

    // STEP 2: Show the actual card with DRAMATIC REVEAL
    } else {
        // CARD REVEAL ANNOUNCEMENT
        const revealBox = document.createElement('div');
        revealBox.className = 'card-reveal-box';
        revealBox.innerHTML = `
            <div class="reveal-announcement">
                <h2>✨ THE CARD IS REVEALED ✨</h2>
                <div class="revealed-card-name">${currentCard.displayName}</div>
                <div class="revealed-orientation">${currentCard.isReversed ? '🔄 REVERSED' : '⬆️ UPRIGHT'}</div>
            </div>
        `;
        interpretationPanel.appendChild(revealBox);

        // INTERPRETATION SECTION
        const section = document.createElement('div');
        section.className = 'interpretation-section';

        const keywords = currentCard.meaning.keywords.map(kw =>
            `<span class="keyword-tag">${kw}</span>`
        ).join('');

        const personalizedInterpretation = generatePersonalizedCardInterpretation(currentCard, AppState.currentCardIndex);

        section.innerHTML = `
            <h3>${currentCard.position.name} Position</h3>
            <div class="card-meaning">
                <p><strong>Card Energy:</strong> ${currentCard.meaning.meaning}</p>
                <div class="keywords">${keywords}</div>
            </div>
            <div class="operator-script">
                <h4>💬 What to Say to the Caller:</h4>
                <p>${personalizedInterpretation}</p>
            </div>
        `;

        interpretationPanel.appendChild(section);

        // Check if there are more cards to reveal
        if (AppState.currentCardIndex < AppState.drawnCards.length - 1) {
            // Add "Next Position" button
            const nextButton = document.createElement('button');
            nextButton.className = 'btn btn-primary btn-large';
            nextButton.textContent = '➡️ Next Position';
            nextButton.onclick = function() {
                AppState.currentCardIndex++;
                AppState.showingPosition = true;
                revealNextCard();
            };
            interpretationPanel.appendChild(nextButton);
        } else {
            // All cards revealed - show synthesis
            const synthesisBox = document.createElement('div');
            synthesisBox.className = 'synthesis-box';
            synthesisBox.innerHTML = `
                <h3>🔮 Reading Synthesis</h3>
                <p><strong>Big Picture:</strong> ${generateSynthesis()}</p>
                <p><strong>Guidance:</strong> ${generateGuidance()}</p>
            `;
            interpretationPanel.appendChild(synthesisBox);
        }
    }
}

// Generate Personalized Card Interpretation as Direct Speech to Caller
function generatePersonalizedCardInterpretation(card, cardIndex) {
    const topic = AppState.callerData.topic;
    const emotionalState = AppState.callerData.emotionalState;
    const mainQuestion = AppState.callerData.mainQuestion;
    const callerName = AppState.callerData.name || 'you';
    const position = card.position;

    let script = '';

    // Opening that connects to their situation
    const topicContext = {
        love: 'your relationship',
        career: 'your career',
        money: 'your finances',
        personal: 'your personal growth',
        family: 'your family',
        health: 'your wellbeing',
        general: 'your life'
    };

    const context = topicContext[topic] || 'your situation';

    // Varied creative openings - not always "Beautiful"
    const openings = [
        `Alright love, so here in the ${position.name} position - this space is showing us ${position.description.toLowerCase()} - `,
        `Okay, diving into the ${position.name} position now - which reveals ${position.description.toLowerCase()} - `,
        `Mmm, so in the ${position.name} position - this is where we see ${position.description.toLowerCase()} - `,
        `Let's tune into the ${position.name} position here - this sacred space shows us ${position.description.toLowerCase()} - `,
        `Ooh, interesting! The ${position.name} position - this is illuminating ${position.description.toLowerCase()} - `,
        `Right, so the ${position.name} position is speaking to us - revealing ${position.description.toLowerCase()} - `,
        `Beautiful, so here in the ${position.name} position - this space is showing us ${position.description.toLowerCase()} - `
    ];

    script += openings[Math.floor(Math.random() * openings.length)];

    // More creative varied language for card reveals
    const cardIntros = [
        `and the universe is bringing us ${card.displayName}${card.isReversed ? ' reversed' : ''}`,
        `the cosmos has drawn ${card.displayName}${card.isReversed ? ' reversed' : ''} for us`,
        `spirit is revealing ${card.displayName}${card.isReversed ? ' in reversal' : ''}`,
        `we're being shown ${card.displayName}${card.isReversed ? ' reversed' : ''}`,
        `the divine has gifted us ${card.displayName}${card.isReversed ? ', and it\'s reversed' : ''}`
    ];

    // Connect card to their specific circumstances - VARIED CREATIVE STYLE
    if (topic === 'love') {
        if (card.isReversed) {
            script += `${cardIntros[Math.floor(Math.random() * cardIntros.length)]}, yeah? `;

            if (emotionalState === 'sad' || emotionalState === 'worried') {
                const sadResponses = [
                    `Oh honey, I'm feeling that heaviness you're carrying in your heart. This card, it's like... it's mirroring that pain right back to us, showing us what needs healing. `,
                    `Sweetheart, I can sense that ache in your chest. The cards are reflecting your sorrow back, asking you to witness it with compassion. `,
                    `My love, that heartbreak you're holding? It's written all over this card. The universe sees your pain and wants to transmute it. `
                ];
                script += sadResponses[Math.floor(Math.random() * sadResponses.length)];
            } else if (emotionalState === 'confused') {
                const confusedResponses = [
                    `Mmm, that confusion you're feeling? That totally makes sense when we tune into this energy. The universe is asking you to sit with this. `,
                    `Yeah, I get it - this feels murky, unclear. But that fog? It's actually preparing you for clarity. Spirit wants you to be patient here. `,
                    `The swirl of uncertainty around you - the cards are acknowledging it. This confusion is temporary, a necessary passage. `
                ];
                script += confusedResponses[Math.floor(Math.random() * confusedResponses.length)];
            }

            script += `What's coming through for me is that ${card.meaning.interpretation.toLowerCase()} - but right now, my love, that beautiful ${card.meaning.keywords[0]} energy is kind of stuck or turned inward in ${context}. It needs some gentle releasing. `;

            if (mainQuestion) {
                script += `So when you're asking "${mainQuestion}" - spirit is saying you need to do some inner work with this ${card.meaning.keywords[0]} energy first. That's your medicine right now, that's your path forward. `;
            }
        } else {
            script += `${cardIntros[Math.floor(Math.random() * cardIntros.length)]}! `;

            if (emotionalState === 'hopeful') {
                const hopefulResponses = [
                    `Oh and I'm loving this hopeful energy you're bringing! The cards are totally vibing with you on this, really affirming what you're already feeling in your soul. `,
                    `Your hope is so palpable, and the universe is matching that frequency! This card is saying 'yes, you're on the right path.' `,
                    `That optimism radiating from you? The cosmos is amplifying it! This is your confirmation from the divine. `
                ];
                script += hopefulResponses[Math.floor(Math.random() * hopefulResponses.length)];
            }

            script += `${card.meaning.interpretation} This is speaking straight to your heart, to ${context}. `;

            if (mainQuestion) {
                script += `When you're asking "${mainQuestion}" - what the universe is illuminating for you is that ${card.meaning.keywords[0]} is like... it's your soul's central lesson right now. This is the energy you're here to dance with. `;
            }
        }

    } else if (topic === 'career') {
        script += `spirit has gifted us ${card.displayName}${card.isReversed ? ' reversed' : ''}. Mmm. `;

        script += `${card.meaning.interpretation} This is the energy flowing through ${context} in this moment. `;

        if (mainQuestion) {
            script += `So you're asking "${mainQuestion}" - and what's coming through in the reading is that ${card.meaning.keywords[0]} is ${card.isReversed ? 'asking for your loving attention. There\'s some rebalancing needed here, some healing to tend to' : 'this beautiful force that wants to support you. Let it flow through you'}. `;
        }

        if (emotionalState === 'worried') {
            script += `I'm sensing that worry you're holding, friend. But you know what? The universe is giving us such clear guidance here. Trust in that. `;
        }

    } else if (topic === 'money') {
        script += `the universe is showing us ${card.displayName}${card.isReversed ? ' reversed' : ''}. `;

        if (emotionalState === 'worried' || emotionalState === 'anxious') {
            script += `Oh sweetheart, I can feel that financial stress you're carrying. Just breathe with me for a moment... `;
        }

        if (card.isReversed) {
            script += `This reversal? It's showing us that the energy around ${context} is a bit stuck right now, needs some movement, some shift. `;
        }

        script += `${card.meaning.interpretation} `;

        if (mainQuestion) {
            script += `You're asking "${mainQuestion}" - and the wisdom coming through is that ${card.meaning.keywords[0]} is ${card.isReversed ? 'where the blockage is, yeah? This energy needs to flow again, needs some love and attention to transform' : 'totally working with you, supporting your abundance. Open yourself to receive this'}. `;
        }

    } else if (topic === 'personal') {
        script += `the cosmos has drawn ${card.displayName}${card.isReversed ? ' reversed' : ''} for us. `;

        if (card.arcana === 'major') {
            script += `Oh wow, Major Arcana... so this is deep soul work, beautiful one. This is a sacred lesson your spirit is moving through. `;
        }

        script += `${card.meaning.interpretation} `;

        if (emotionalState === 'confused' || emotionalState === 'lost') {
            script += `I'm holding space for that feeling of being lost you're experiencing. But you know what's beautiful? That confusion is actually your soul expanding, opening to new wisdom. ${card.meaning.keywords[0]} is calling you to ${card.isReversed ? 'release the resistance, surrender, and ' : ''}just flow with this growth. Trust the process. `;
        }

        if (mainQuestion) {
            script += `When you ask "${mainQuestion}" - what I'm channeling is that ${card.meaning.keywords[0]} is literally your soul's assignment right now. This is the medicine you came here to receive. `;
        }

    } else if (topic === 'family') {
        script += `spirit is revealing ${card.displayName}${card.isReversed ? ' reversed' : ''} to us. `;

        script += `${card.meaning.interpretation} `;

        if (emotionalState === 'angry' || emotionalState === 'frustrated') {
            script += `Mmm, I'm really feeling that frustration radiating from you, and you know what? That's so valid, so real. Your feelings matter. What this card is whispering to us is that ${card.meaning.keywords[0]} is ${card.isReversed ? 'getting stuck in these family patterns. There\'s some old energy that wants to move, to shift' : 'actually your doorway through this. It\'s the healing path calling to you'}. `;
        }

        if (mainQuestion) {
            script += `When you're asking "${mainQuestion}" - the universe is pointing directly to ${card.meaning.keywords[0]}. This is the heart center of what's happening with your family. This needs your gentle, loving awareness. `;
        }

    } else {
        // General reading
        script += `the universe is presenting us with ${card.displayName}${card.isReversed ? ' reversed' : ''}. `;

        script += `${card.meaning.interpretation} `;

        if (mainQuestion) {
            script += `You're asking "${mainQuestion}" - and what's flowing through from the divine is that ${card.meaning.keywords[0]} is ${card.isReversed ? 'feeling stuck right now, needs some releasing, some clearing. This wants to transform' : 'totally here for you, available to you. This is your guiding light right now'}. `;
        }
    }

    return script;
}

// Generate Synthesis with Professional Narrative Techniques
function generateSynthesis() {
    const topic = AppState.callerData.topic;
    const spread = SPREADS[AppState.selectedSpread];
    const cards = AppState.drawnCards;

    // Analyze card patterns
    const majorCount = cards.filter(c => c.arcana === 'major').length;
    const reversedCount = cards.filter(c => c.isReversed).length;
    const suitCounts = {};

    cards.forEach(card => {
        if (card.suit) {
            suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
        }
    });

    let synthesis = '';

    // Start with the overall energy
    if (majorCount === cards.length) {
        synthesis += 'This reading is entirely Major Arcana - this is a profoundly significant moment in your life. The universe is speaking loudly, and major forces are at work beyond your immediate control. ';
    } else if (majorCount > cards.length / 2) {
        synthesis += `The dominance of Major Arcana cards reveals that this situation involves significant life lessons and spiritual themes. These aren't just day-to-day concerns - they're part of your soul's journey. `;
    } else if (majorCount === 0) {
        synthesis += 'Your reading shows all Minor Arcana cards, which means you have considerable power to influence this situation. These are practical matters within your control. ';
    }

    // Analyze suit dominance for deeper meaning
    const dominantSuit = Object.keys(suitCounts).reduce((a, b) =>
        suitCounts[a] > suitCounts[b] ? a : b,
        Object.keys(suitCounts)[0]
    );

    const suitNarratives = {
        wands: `passion and willpower are driving this situation - there's fire and momentum here, urging you to take bold action`,
        cups: 'deep emotions and relationships are at the heart of this matter - your feelings and connections with others are the key',
        swords: 'mental clarity and communication are central - this is about truth, thought processes, and how you express yourself',
        pentacles: 'practical and material concerns are foundational here - this is about building something tangible and secure'
    };

    if (dominantSuit && suitCounts[dominantSuit] > 1) {
        synthesis += `The prevalence of ${dominantSuit.charAt(0).toUpperCase() + dominantSuit.slice(1)} tells us that ${suitNarratives[dominantSuit]}. `;
    }

    // Create narrative flow based on spread type
    if (cards.length === 3 && AppState.selectedSpread === 'past-present-future') {
        synthesis += `\n\nLooking at your journey: You've moved from ${cards[0].displayName} (${cards[0].meaning.keywords.slice(0,2).join(', ')}) through ${cards[1].displayName} (${cards[1].meaning.keywords[0]}) and are heading toward ${cards[2].displayName} (${cards[2].meaning.keywords[0]}). `;

        synthesis += `This tells a story of ${cards[0].isReversed ? 'overcoming' : 'building upon'} ${cards[0].meaning.keywords[0]}, currently ${cards[1].isReversed ? 'struggling with' : 'experiencing'} ${cards[1].meaning.keywords[0]}, and ultimately ${cards[2].isReversed ? 'working through' : 'achieving'} ${cards[2].meaning.keywords[0]}. `;
    } else if (cards.length >= 3) {
        synthesis += `\n\nThe narrative arc here moves from ${cards[0].displayName} to ${cards[cards.length - 1].displayName}, showing a transformation from ${cards[0].meaning.keywords[0]} toward ${cards[cards.length - 1].meaning.keywords[0]}. `;
    }

    // Note reversals
    if (reversedCount > cards.length / 2) {
        synthesis += `\n\nWith ${reversedCount} reversed cards, much of this energy is internalized or blocked. What you see on the surface isn't the full story - there's inner work and hidden challenges to address. `;
    } else if (reversedCount > 0) {
        synthesis += `The reversed card${reversedCount > 1 ? 's' : ''} suggest${reversedCount === 1 ? 's' : ''} areas where energy is blocked or needs to be redirected inward. `;
    }

    return synthesis;
}

// Generate Deep, Actionable Guidance
function generateGuidance() {
    const cards = AppState.drawnCards;
    const firstCard = cards[0];
    const lastCard = cards[cards.length - 1];
    const topic = AppState.callerData.topic;
    const emotionalState = AppState.callerData.emotionalState;

    let guidance = '';

    // Opening based on emotional state
    const emotionalOpenings = {
        hopeful: 'Your hopeful energy aligns well with what the cards are showing. ',
        worried: 'I understand your worry, and the cards offer clarity to ease your concerns. ',
        confused: `The confusion you're feeling makes sense given what's happening, and the cards provide the clarity you need. `,
        sad: `The cards acknowledge the sadness you're carrying and offer a path forward. `,
        angry: 'Your frustration is valid, and the cards show you how to channel that energy productively. ',
        neutral: 'The cards have an important message for you. '
    };

    guidance += emotionalOpenings[emotionalState] || 'The cards have guidance for you. ';

    // Core guidance based on topic and card combinations
    if (topic === 'love') {
        if (lastCard.isReversed) {
            guidance += `In matters of the heart, ${lastCard.displayName} reversed suggests that before you can move forward in this relationship, there's internal work to be done. ${lastCard.meaning.interpretation} `;
            guidance += `The key is to ${lastCard.meaning.keywords[0]} within yourself first. `;
        } else {
            guidance += `Your relationship journey is moving toward ${lastCard.displayName}, which represents ${lastCard.meaning.keywords.slice(0,2).join(' and ')}. ${lastCard.meaning.interpretation} `;
        }

        // Add specific action based on first and last card combo
        if (firstCard.suit === 'cups' && lastCard.suit === 'cups') {
            guidance += 'This is deeply emotional territory - honor your feelings while staying open to growth. ';
        } else if (firstCard.suit === 'swords') {
            guidance += 'Clear communication is essential. Speak your truth with compassion. ';
        }

    } else if (topic === 'career') {
        if (lastCard.suit === 'pentacles') {
            guidance += `Professionally, ${lastCard.displayName} points to tangible results and material outcomes. ${lastCard.meaning.interpretation} Focus on building something concrete and sustainable. `;
        } else if (lastCard.suit === 'wands') {
            guidance += `Your career path is ignited with ${lastCard.displayName}'s energy of ${lastCard.meaning.keywords[0]}. ${lastCard.meaning.interpretation} Take bold, decisive action. `;
        } else {
            guidance += `In your career, ${lastCard.displayName} indicates ${lastCard.meaning.interpretation} `;
        }

        guidance += `The path from ${firstCard.displayName} to ${lastCard.displayName} shows ${firstCard.isReversed ? 'releasing' : 'building on'} ${firstCard.meaning.keywords[0]} to reach ${lastCard.meaning.keywords[0]}. `;

    } else if (topic === 'money') {
        guidance += `Financially, the cards reveal a progression from ${firstCard.displayName} to ${lastCard.displayName}. `;

        if (lastCard.suit === 'pentacles' && !lastCard.isReversed) {
            guidance += `${lastCard.displayName} is an excellent financial indicator - ${lastCard.meaning.interpretation} Take practical steps toward building security. `;
        } else if (lastCard.isReversed) {
            guidance += `${lastCard.displayName} reversed warns of ${lastCard.meaning.keywords[0]} - ${lastCard.meaning.interpretation} Review your approach and make necessary adjustments. `;
        } else {
            guidance += `${lastCard.displayName} suggests ${lastCard.meaning.interpretation} `;
        }

        guidance += 'Make decisions based on both wisdom and intuition, not fear. ';

    } else if (topic === 'personal') {
        guidance += `Your personal growth journey shows powerful transformation. ${firstCard.displayName} brought you ${firstCard.meaning.keywords[0]}, and you're moving toward ${lastCard.displayName}'s energy of ${lastCard.meaning.keywords[0]}. `;
        guidance += `${lastCard.meaning.interpretation} `;

        if (lastCard.arcana === 'major') {
            guidance += 'This is a significant spiritual lesson - embrace it fully. ';
        }

        guidance += `Honor your process, be patient with yourself, and trust that you're exactly where you need to be. `;

    } else if (topic === 'family') {
        guidance += `In family matters, the cards show ${firstCard.displayName} leading to ${lastCard.displayName}. ${lastCard.meaning.interpretation} `;

        if (lastCard.suit === 'cups') {
            guidance += 'Emotional healing and connection are possible when approached with openness and compassion. ';
        } else if (lastCard.suit === 'swords') {
            guidance += 'Honest communication, even when difficult, will clear the air and bring truth to light. ';
        }

        guidance += 'Approach your family with understanding, set healthy boundaries, and remember that you can only control your own actions. ';

    } else {
        // General guidance
        guidance += `The cards reveal a journey from ${firstCard.displayName} (${firstCard.meaning.keywords[0]}) to ${lastCard.displayName} (${lastCard.meaning.keywords[0]}). `;
        guidance += `${lastCard.meaning.interpretation} `;

        if (cards.some(c => c.arcana === 'major')) {
            guidance += 'The presence of Major Arcana indicates this is a significant life chapter - pay close attention to the lessons emerging. ';
        }

        guidance += 'Trust the journey, stay present with what is, and remain open to what wants to unfold. ';
    }

    // Add final empowerment
    guidance += '\n\nRemember: the cards show potential and energy, not fixed fate. You have the power to shape your path. ';

    return guidance;
}

// Export Reading
function exportReading() {
    const readingText = generateReadingText();
    const blob = new Blob([readingText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tarot-reading-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Generate Reading Text
function generateReadingText() {
    let text = `TAROT READING\n`;
    text += `Date: ${new Date().toLocaleString()}\n`;
    text += `Caller: ${AppState.callerData.name}\n`;
    text += `Topic: ${AppState.callerData.topic}\n`;
    text += `Spread: ${SPREADS[AppState.selectedSpread].name}\n`;
    text += `\n${'='.repeat(50)}\n\n`;

    AppState.drawnCards.forEach((card, index) => {
        text += `${index + 1}. ${card.position.name.toUpperCase()}\n`;
        text += `Card: ${card.displayName} ${card.isReversed ? '(Reversed)' : '(Upright)'}\n`;
        text += `Meaning: ${card.meaning.meaning}\n`;
        text += `Interpretation: ${card.meaning.interpretation}\n\n`;
    });

    text += `${'='.repeat(50)}\n\n`;
    text += `SYNTHESIS\n${generateSynthesis()}\n\n`;
    text += `GUIDANCE\n${generateGuidance()}\n`;

    return text;
}

// Redraw Cards (same spread, new cards)
function redrawCards() {
    if (confirm('Draw new cards for the same spread?')) {
        drawCards();
    }
}

// Start New Reading
function startNewReading() {
    if (confirm('Are you sure you want to start a new reading? Current reading will be lost.')) {
        // Reset state
        AppState.callerData = {
            name: '',
            topic: '',
            emotionalState: '',
            mainQuestion: '',
            followUpAnswers: {}
        };
        AppState.selectedSpread = null;
        AppState.drawnCards = [];

        // Clear forms
        document.getElementById('callerName').value = '';
        document.getElementById('topicArea').value = '';
        document.getElementById('emotionalState').value = '';
        document.getElementById('mainQuestion').value = '';
        document.getElementById('followUpQuestions').innerHTML = '';

        // Return to intake
        showSection('intakeSection');
    }
}
