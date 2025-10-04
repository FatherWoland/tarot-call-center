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

    // Display cards and interpretation
    displayReading();
    showSection('readingSection');
}

// Display Reading
function displayReading() {
    const cardsDisplay = document.getElementById('cardsDisplay');
    const interpretationPanel = document.getElementById('interpretationPanel');

    // Clear previous content
    cardsDisplay.innerHTML = '';
    interpretationPanel.innerHTML = '';

    // Display cards
    const cardRow = document.createElement('div');
    cardRow.className = 'card-row';

    AppState.drawnCards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = `tarot-card ${card.isReversed ? 'card-reversed' : ''}`;
        cardDiv.innerHTML = `
            <div class="card-position">${card.position.name}</div>
            <div class="card-name">${card.displayName}</div>
            <div class="card-orientation">${card.isReversed ? 'Reversed' : 'Upright'}</div>
        `;
        cardRow.appendChild(cardDiv);
    });

    cardsDisplay.appendChild(cardRow);

    // Display interpretation for each card
    AppState.drawnCards.forEach((card, index) => {
        const section = document.createElement('div');
        section.className = 'interpretation-section';

        const keywords = card.meaning.keywords.map(kw =>
            `<span class="keyword-tag">${kw}</span>`
        ).join('');

        section.innerHTML = `
            <h3>${index + 1}. ${card.position.name}: ${card.displayName} ${card.isReversed ? '(Reversed)' : ''}</h3>
            <div class="card-meaning">
                <p><strong>Position Meaning:</strong> ${card.position.description}</p>
                <p><strong>Card Meaning:</strong> ${card.meaning.meaning}</p>
                <div class="keywords">${keywords}</div>
            </div>
            <div class="operator-script">
                <h4>💬 What to Say:</h4>
                <p>"${card.meaning.interpretation}"</p>
            </div>
        `;

        interpretationPanel.appendChild(section);
    });

    // Add synthesis section
    const synthesisBox = document.createElement('div');
    synthesisBox.className = 'synthesis-box';
    synthesisBox.innerHTML = `
        <h3>🔮 Reading Synthesis</h3>
        <p><strong>Big Picture:</strong> ${generateSynthesis()}</p>
        <p><strong>Guidance:</strong> ${generateGuidance()}</p>
    `;
    interpretationPanel.appendChild(synthesisBox);
}

// Generate Synthesis
function generateSynthesis() {
    const topic = AppState.callerData.topic;
    const spread = SPREADS[AppState.selectedSpread];
    const cards = AppState.drawnCards;

    // Count card types for overall energy
    const majorCount = cards.filter(c => c.arcana === 'major').length;
    const suitCounts = {};

    cards.forEach(card => {
        if (card.suit) {
            suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
        }
    });

    let synthesis = '';

    if (majorCount > cards.length / 2) {
        synthesis += 'This reading is dominated by Major Arcana cards, indicating significant life themes and fated energies at play. ';
    }

    const dominantSuit = Object.keys(suitCounts).reduce((a, b) =>
        suitCounts[a] > suitCounts[b] ? a : b,
        Object.keys(suitCounts)[0]
    );

    const suitMeanings = {
        wands: 'action, passion, and creative energy',
        cups: 'emotions, relationships, and feelings',
        swords: 'mental activity, communication, and challenges',
        pentacles: 'material matters, finances, and practical concerns'
    };

    if (dominantSuit && suitCounts[dominantSuit] > 1) {
        synthesis += `The reading is heavily influenced by ${suitMeanings[dominantSuit]}. `;
    }

    synthesis += `The overall energy suggests ${cards[0].meaning.keywords[0]} leading to ${cards[cards.length - 1].meaning.keywords[0]}.`;

    return synthesis;
}

// Generate Guidance
function generateGuidance() {
    const lastCard = AppState.drawnCards[AppState.drawnCards.length - 1];
    const topic = AppState.callerData.topic;

    const guidanceTemplates = {
        love: `The path forward in your relationship involves ${lastCard.meaning.keywords[0]}. Trust the guidance of the cards and communicate openly.`,
        career: `Your career path is showing ${lastCard.meaning.keywords[0]}. Take action aligned with this energy and trust the process.`,
        money: `Financially, the cards suggest ${lastCard.meaning.keywords[0]}. Make decisions with both wisdom and faith.`,
        personal: `Your personal growth journey is moving toward ${lastCard.meaning.keywords[0]}. Honor this process and be patient with yourself.`,
        family: `Your family dynamic is evolving toward ${lastCard.meaning.keywords[0]}. Approach with compassion and understanding.`,
        general: `Your path forward involves ${lastCard.meaning.keywords[0]}. Trust in the journey and remain open to what unfolds.`
    };

    return guidanceTemplates[topic] || guidanceTemplates.general;
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
