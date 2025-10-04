# Tarot Call Center Reading System

An AI-powered tarot reading platform designed for call center operators to deliver professional, personalized tarot readings to callers.

## Project Overview

This system serves as the **expert tarot reader**, while human operators act as the empathetic voice delivering the readings. Operators don't need tarot knowledge - the system provides complete interpretations and suggested dialogue.

## Features

- **Virtual Tarot Deck**: Interactive card drawing and display
- **Intelligent Question Flow**: Contextual questions to understand caller's needs
- **AI Interpretation Engine**: Deep, personalized card readings based on context
- **Operator Guidance**: Scripted dialogue and talking points for operators
- **Comprehensive Card Database**: All 78 tarot cards with detailed meanings
- **Multiple Spread Types**: Various reading layouts for different situations

## System Architecture

```
├── knowledge/              # Tarot knowledge base
│   ├── cards/             # Individual card data (78 cards)
│   ├── spreads/           # Spread layouts and methodologies
│   ├── interpretations/   # Reading interpretation guides
│   └── questions/         # Caller intake question flows
├── web/                   # Web application
│   ├── index.html        # Main operator interface
│   ├── styles/           # CSS styling
│   └── scripts/          # JavaScript logic
└── data/                  # Structured data files
    ├── tarot-deck.json   # Complete card database
    ├── spreads.json      # Spread definitions
    └── questions.json    # Question flow logic
```

## The Tarot Deck

### Major Arcana (22 cards)
The Major Arcana represents life's spiritual lessons and major influences.

### Minor Arcana (56 cards)
Four suits representing day-to-day experiences:
- **Wands** (Fire): Inspiration, energy, action
- **Cups** (Water): Emotions, relationships, feelings
- **Swords** (Air): Thoughts, challenges, communication
- **Pentacles** (Earth): Material world, finances, career

Each suit contains:
- Ace through 10 (numbered cards)
- Page, Knight, Queen, King (court cards)

## How It Works

1. **Caller Connects**: Operator opens the web interface
2. **Question Flow**: System asks contextual questions about the caller's situation
3. **Reading Type**: Based on responses, system suggests appropriate spread
4. **Card Drawing**: Operator initiates virtual card draw
5. **Interpretation**: System provides deep reading based on:
   - Cards drawn
   - Position in spread
   - Caller's context
   - Card combinations
6. **Delivery**: Operator relays interpretation using provided dialogue

## Reading Session Example

```
Caller: "I'm struggling with a career decision..."

System suggests: 3-Card Spread (Past-Present-Future)

Cards Drawn:
- Past: Eight of Pentacles (Reversed)
- Present: Two of Swords
- Future: The Star

System provides interpretation:
"The reversed Eight of Pentacles in your past suggests you may have felt
unfulfilled or disconnected from your work recently. The Two of Swords in
your present position shows you're at a crossroads, feeling stuck between
two options. However, The Star in your future position is incredibly
positive - it indicates hope, renewal, and that following your intuition
will lead to a brighter path..."

[Plus detailed talking points for each card]
```

## Development Log

### Phase 1: Knowledge Base Creation
- [ ] Research all 78 tarot cards
- [ ] Document upright and reversed meanings
- [ ] Create card symbolism guides
- [ ] Document common spreads
- [ ] Create interpretation methodologies

### Phase 2: Data Structure
- [ ] Build JSON database of all cards
- [ ] Structure spread definitions
- [ ] Create question flow logic

### Phase 3: Web Application
- [ ] Build operator interface
- [ ] Implement card drawing mechanics
- [ ] Create interpretation display
- [ ] Add operator guidance system

### Phase 4: AI Integration
- [ ] Build context-aware interpretation engine
- [ ] Implement card combination analysis
- [ ] Generate dynamic operator scripts

## License

Proprietary - Internal use only

---

**Project Status**: In Development
**Last Updated**: 2025-10-04
