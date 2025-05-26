# Project Brief: IdleonToolbox Gear Loadouts Extension

## Project Overview
Extension of the existing IdleonToolbox community tool to add advanced gear loadout management capabilities for the Idleon MMORPG game.

## Core Requirements

### Primary Features
1. **Custom Gear Loadout System**
   - Interactive gear slot interface (Equipment, Cards, Chips, Prayers, Obols)
   - Click-to-select modal for each gear slot
   - Save/load named loadouts with character association
   - Item availability indicators showing current location
   - Sorting and filtering by stats/misc types

2. **Enhanced Sampling Companion**
   - Best-in-slot recommendations from owned gear
   - Alternative suggestions with ranking system
   - Requirements-based filtering

### Technical Constraints
- Must integrate with existing IdleonToolbox codebase
- Reuse existing data parsers (Storage.js, Characters.js, Item-Planner.js)
- Follow established UI patterns from Sampling Companion
- Maintain compatibility with existing authentication system
- Deploy to personal Vercel instance with same login capabilities

### Success Criteria
- Seamless integration with existing account data
- Intuitive UI matching current toolbox design
- Persistent loadout storage (localStorage)
- Real-time item availability tracking
- Performance comparable to existing tools

## Scope Boundaries
- **In Scope**: Gear management, loadout persistence, item availability
- **Out of Scope**: New authentication systems, game data modification, real-time multiplayer features

## Technical Approach
- Fork existing repository (https://github.com/Reznal/IdleonToolbox.git)
- Extend React/Next.js application
- Leverage existing Firebase authentication
- Reuse established component patterns
- Follow existing code organization structure 