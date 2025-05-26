# IdleonToolbox Gear Loadouts Extension

A custom extension for the IdleonToolbox that adds advanced gear loadout management capabilities for Idleon MMORPG players.

## 🎯 Project Overview

This extension adds a comprehensive gear loadout system to the existing IdleonToolbox, allowing players to:
- Create and save custom gear configurations
- Manage equipment, cards, chips, prayers, and obols in one interface
- See item availability and location across characters
- Import/export loadout configurations
- Get best-in-slot recommendations from owned gear

## 🚀 Features

### Core Loadout System
- **Interactive Gear Slots**: Click any slot to open item selection modal
- **Multi-Category Support**: Equipment, Cards, Chips, Prayers, Obols
- **Item Availability**: Visual indicators showing where items are located
- **Character Association**: Link loadouts to specific characters

### Save/Load System
- **Named Loadouts**: Save configurations with custom names
- **Persistent Storage**: Uses localStorage for data persistence
- **Import/Export**: JSON file support for sharing loadouts
- **Loadout Management**: Create, edit, delete saved configurations

### Enhanced Item Selection
- **Search & Filter**: Find items quickly with search and filtering
- **Stat-based Sorting**: Sort by power, defence, or other stats
- **Ownership Indicators**: See which character owns each item
- **Requirements Display**: View level and class restrictions

## 🛠️ Technical Stack

- **Framework**: React 18 + Next.js 13 (Pages Router)
- **UI Library**: Material-UI v5
- **Authentication**: Firebase Auth (existing integration)
- **Data Source**: Direct connection to Idleon game servers
- **Styling**: Emotion styled components
- **State Management**: React Context + useReducer

## 📁 Project Structure

```
memory-bank/                    # Project documentation
├── projectbrief.md            # Core requirements and scope
├── productContext.md          # User experience goals
├── systemPatterns.md          # Architecture patterns
├── techContext.md             # Technical setup
├── activeContext.md           # Current work focus
├── progress.md                # Status tracking
└── implementation-plan.md     # Detailed implementation steps

pages/tools/
└── gear-loadouts.jsx          # Main loadout page

components/tools/gear-loadouts/
├── LoadoutDisplay.jsx          # Main loadout interface
├── LoadoutEquipment.jsx        # Equipment slot grid
├── LoadoutCards.jsx            # Card slot management
├── LoadoutChips.jsx            # Chip slot management
├── LoadoutPrayers.jsx          # Prayer slot management
├── LoadoutObols.jsx            # Obol slot management
├── GearSlotModal.jsx           # Item selection modal
└── LoadoutManager.jsx          # Save/load functionality
```

## 🔧 Development Setup

### Prerequisites
- Node.js 16+ 
- npm 8+
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/Reznal/IdleonToolbox.git
cd IdleonToolbox

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run tests
npm run lint         # Lint code
```

## 🎮 Usage

### Getting Started
1. Navigate to the "Tools" section in IdleonToolbox
2. Select "Gear Loadouts" from the tools menu
3. Choose a character from the dropdown
4. Click any gear slot to open item selection
5. Save your loadout with a custom name

### Creating Loadouts
1. **Select Character**: Choose which character's gear to base the loadout on
2. **Configure Slots**: Click gear slots to select items from your inventory
3. **Save Configuration**: Give your loadout a name and save it
4. **Load Anytime**: Access saved loadouts from the loadout manager

### Managing Items
- **Search**: Use the search bar to find specific items quickly
- **Filter**: Filter by ownership status (owned, equipped, available)
- **Sort**: Sort items by stats like power, defence, or name
- **Availability**: See which character currently has each item

## 🔗 Integration with Existing Systems

### Data Sources
- **Character Data**: Uses existing character parser from `parsers/characters.js`
- **Item Data**: Integrates with `parsers/items.js` for item processing
- **Storage Data**: Accesses account storage through existing parsers
- **Authentication**: Uses existing Firebase authentication system

### UI Consistency
- **Material-UI Components**: Follows existing component patterns
- **Design Language**: Matches current IdleonToolbox visual style
- **Responsive Layout**: Uses established grid and layout systems
- **Navigation**: Integrates with existing tools navigation

## 📊 Development Progress

Current Status: **Setup & Planning Complete (15%)**

### Completed ✅
- Repository analysis and architecture understanding
- Authentication verification and compatibility confirmation
- Comprehensive technical planning and documentation
- Memory bank creation with full project documentation
- Repository setup and environment preparation

### In Progress 🔄
- Development environment setup and dependency installation
- Core page structure and component architecture

### Planned 📋
- Interactive gear slot system implementation
- Item selection modal with filtering and sorting
- Save/load functionality with localStorage persistence
- Enhanced sampling companion integration
- Performance optimization and testing

## 🤝 Contributing

This is a personal extension project. The implementation follows the existing IdleonToolbox patterns and conventions:

- **Code Style**: Follow existing ESLint configuration
- **Component Patterns**: Use established component structure
- **Import Aliases**: Use existing path aliases (@components, @parsers, etc.)
- **State Management**: Follow AppContext patterns for global state

## 📝 Documentation

### Memory Bank System
This project uses a comprehensive memory bank system for documentation:
- **Project Brief**: Core requirements and technical constraints
- **Product Context**: User experience goals and problem statements
- **System Patterns**: Architecture and design patterns
- **Technical Context**: Development environment and dependencies
- **Active Context**: Current work focus and immediate next steps
- **Progress Tracking**: Detailed status monitoring and metrics

### Implementation Guide
See `memory-bank/implementation-plan.md` for detailed step-by-step implementation instructions with code examples.

## 🔒 Authentication & Data Access

This extension uses the same authentication system as the main IdleonToolbox:
- **Firebase Integration**: Direct connection to Idleon game servers
- **OAuth Support**: Google and Apple login options
- **Real-time Data**: Live synchronization with game data
- **Security**: Uses existing Firebase security rules

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Fork the repository to your GitHub account
2. Connect your fork to Vercel
3. Deploy with default Next.js settings
4. Your personal instance will have full authentication access

### Alternative Deployment
- **Netlify**: Static site deployment option
- **Custom Server**: Node.js server deployment
- **Docker**: Containerized deployment option

## 📄 License

This project extends the existing IdleonToolbox under the same GPL-3.0 license. See the main repository for license details.

## 🙏 Acknowledgments

- **Morta1**: Original IdleonToolbox creator and maintainer
- **Lava Flame Games**: Idleon MMORPG developers
- **IdleonToolbox Community**: Users and contributors to the original project

---

**Note**: This is an extension of the community-made IdleonToolbox tool, not an official Idleon game feature. 