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

    // STEP 2: Show the actual card with interpretation
    } else {
        const section = document.createElement('div');
        section.className = 'interpretation-section';

        const keywords = currentCard.meaning.keywords.map(kw =>
            `<span class="keyword-tag">${kw}</span>`
        ).join('');

        const personalizedInterpretation = generatePersonalizedCardInterpretation(currentCard, AppState.currentCardIndex);

        section.innerHTML = `
            <h3>${AppState.currentCardIndex + 1}. ${currentCard.position.name}: ${currentCard.displayName} ${currentCard.isReversed ? '(Reversed)' : ''}</h3>
            <div class="card-meaning">
                <p><strong>Position:</strong> ${currentCard.position.description}</p>
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

// Generate Personalized Card Interpretation Based on Caller's Circumstances
function generatePersonalizedCardInterpretation(card, cardIndex) {
    const topic = AppState.callerData.topic;
    const emotionalState = AppState.callerData.emotionalState;
    const mainQuestion = AppState.callerData.mainQuestion;
    const callerName = AppState.callerData.name || 'you';
    const position = card.position;

    let interpretation = '';

    // Opening that connects to their situation
    const topicContext = {
        love: 'your relationship situation',
        career: 'your career path',
        money: 'your financial situation',
        personal: 'your personal growth journey',
        family: 'your family dynamics',
        health: 'your health and wellbeing',
        general: 'your life path'
    };

    const context = topicContext[topic] || 'your situation';

    // Start with position context
    interpretation += `In the ${position.name} position, representing ${position.description.toLowerCase()}, `;

    // Connect card to their specific circumstances
    if (topic === 'love') {
        if (card.isReversed) {
            interpretation += `${card.displayName} reversed addresses ${context}. `;
            interpretation += `This suggests that ${card.meaning.interpretation.toLowerCase()} `;

            if (emotionalState === 'sad' || emotionalState === 'worried') {
                interpretation += `The pain you're feeling is reflected here - `;
            } else if (emotionalState === 'confused') {
                interpretation += `The confusion you mentioned makes sense because `;
            }

            interpretation += `in matters of the heart, ${card.meaning.keywords[0]} is being blocked or internalized. `;

            if (mainQuestion) {
                interpretation += `Regarding "${mainQuestion}" - this card suggests you need to address the reversed energy of ${card.meaning.keywords[0]} before moving forward. `;
            }
        } else {
            interpretation += `${card.displayName} speaks directly to ${context}. `;
            interpretation += `${card.meaning.interpretation} `;

            if (emotionalState === 'hopeful') {
                interpretation += `Your hopeful energy aligns with this card's message of ${card.meaning.keywords[0]}. `;
            }

            if (mainQuestion) {
                interpretation += `In relation to your question about "${mainQuestion}" - this card shows that ${card.meaning.keywords[0]} is key to understanding your path forward. `;
            }
        }

    } else if (topic === 'career') {
        interpretation += `${card.displayName} ${card.isReversed ? 'reversed' : ''} reveals important insights about ${context}. `;

        if (card.suit === 'pentacles') {
            interpretation += `As a Pentacles card, this speaks to the practical, material aspects of your work life. `;
        } else if (card.suit === 'wands') {
            interpretation += `As a Wands card, this addresses your passion, ambition, and drive in your career. `;
        } else if (card.suit === 'swords') {
            interpretation += `As a Swords card, this points to mental clarity, communication, and decision-making at work. `;
        } else if (card.suit === 'cups') {
            interpretation += `As a Cups card, this reflects the emotional fulfillment and relationships in your professional life. `;
        }

        interpretation += `${card.meaning.interpretation} `;

        if (mainQuestion) {
            interpretation += `When you ask "${mainQuestion}" - this card indicates that ${card.meaning.keywords[0]} ${card.isReversed ? 'needs attention and rebalancing' : 'is the energy you should focus on'}. `;
        }

    } else if (topic === 'money') {
        interpretation += `${card.displayName} ${card.isReversed ? 'reversed' : ''} addresses ${context}. `;

        if (card.suit === 'pentacles' && !card.isReversed) {
            interpretation += `This is a strong financial indicator. `;
        } else if (card.isReversed) {
            interpretation += `The reversal suggests financial energy that's blocked or needs redirection. `;
        }

        interpretation += `${card.meaning.interpretation} `;

        if (emotionalState === 'worried' || emotionalState === 'anxious') {
            interpretation += `I know money concerns are causing you stress. This card shows that ${card.meaning.keywords[0]} is ${card.isReversed ? 'an area needing your attention' : 'available to you now'}. `;
        }

        if (mainQuestion) {
            interpretation += `Regarding "${mainQuestion}" - the answer lies in ${card.isReversed ? 'correcting' : 'embracing'} the energy of ${card.meaning.keywords[0]}. `;
        }

    } else if (topic === 'personal') {
        interpretation += `${card.displayName} ${card.isReversed ? 'reversed' : ''} speaks to ${context}. `;

        if (card.arcana === 'major') {
            interpretation += `As a Major Arcana card, this represents a significant spiritual lesson and life theme you're working with. `;
        }

        interpretation += `${card.meaning.interpretation} `;

        if (emotionalState === 'confused' || emotionalState === 'lost') {
            interpretation += `The confusion you're experiencing is part of this journey - ${card.meaning.keywords[0]} is calling you to ${card.isReversed ? 'release resistance and' : ''} embrace growth. `;
        }

        if (mainQuestion) {
            interpretation += `Your question "${mainQuestion}" is answered through the lens of ${card.meaning.keywords[0]} - this is what your soul is working on right now. `;
        }

    } else if (topic === 'family') {
        interpretation += `${card.displayName} ${card.isReversed ? 'reversed' : ''} illuminates ${context}. `;
        interpretation += `${card.meaning.interpretation} `;

        if (emotionalState === 'angry' || emotionalState === 'frustrated') {
            interpretation += `Your frustration is valid - this card shows that ${card.meaning.keywords[0]} is ${card.isReversed ? 'being blocked in these relationships' : 'the path to healing'}. `;
        }

        if (mainQuestion) {
            interpretation += `When it comes to "${mainQuestion}" - this card reveals that ${card.meaning.keywords[0]} is central to resolving this family matter. `;
        }

    } else {
        // General reading
        interpretation += `${card.displayName} ${card.isReversed ? 'reversed' : ''} appears in ${context}. `;
        interpretation += `${card.meaning.interpretation} `;

        if (mainQuestion) {
            interpretation += `In answer to "${mainQuestion}" - this card brings the energy of ${card.meaning.keywords[0]}, which ${card.isReversed ? 'needs to be unblocked or redirected' : 'is available to guide you forward'}. `;
        }
    }

    return interpretation;
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
