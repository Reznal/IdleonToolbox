# System Patterns: IdleonToolbox Architecture

## Application Architecture

### Framework Stack
- **Frontend**: React 18 with Next.js (Pages Router)
- **UI Library**: Material-UI (MUI) v5
- **Authentication**: Firebase Auth
- **Database**: Firebase Realtime Database + Firestore
- **Styling**: Emotion (styled components)
- **State Management**: React Context + useReducer

### Directory Structure
```
pages/
├── tools/                    # Tool pages (sampling-companion, item-planner, etc.)
├── account/                  # Account-related pages
└── _app.jsx                  # App wrapper with context providers

components/
├── common/                   # Shared components
│   ├── context/             # AppProvider, authentication context
│   └── NavBar/              # Navigation components
└── tools/                   # Tool-specific components
    ├── sampling-companion/  # Equipment, Cards, Chips, etc.
    └── item-planner/        # Planning components

parsers/                     # Data parsing logic
├── items.js                 # Item data processing
├── characters.js            # Character data parsing
└── index.js                 # Main parser entry point

data/                        # Static game data
└── website-data.js          # Items, bonuses, crafts data
```

## Key Design Patterns

### Component Organization
1. **Page Components**: Handle routing, data fetching, top-level state
2. **Feature Components**: Encapsulate specific functionality (Equipment, Cards)
3. **Common Components**: Reusable UI elements (ItemDisplay, Tooltip)

### Data Flow Pattern
```
AppProvider (Context) → Page Component → Feature Components → UI Components
     ↓
Firebase Auth → Game Data → Parsers → Processed Data → Component State
```

### State Management
- **Global State**: AppContext with useReducer for user data, characters, account
- **Local State**: useState for component-specific state
- **Persistence**: localStorage for user preferences and saved data

## Established Patterns to Follow

### Item Display Pattern
```jsx
// Standard item display with tooltip
<Tooltip title={<ItemDisplay {...item} character={character} account={account} owners={owners}/>}>
  <ItemIcon src={`${prefix}data/${rawName}.png`} alt={rawName}/>
</Tooltip>
```

### Grid Layout Pattern
```jsx
// Responsive grid for tool layouts
<AutoGrid withBorder>
  <Equipment {...props} />
  <Cards {...props} />
  <Chips {...props} />
</AutoGrid>
```

### Save/Load Pattern (from item-planner)
```jsx
// localStorage persistence
const handleExport = () => {
  const data = localStorage.getItem('plannerKey');
  downloadFile(data, 'filename.json');
}

const handleImport = async (fileContent) => {
  const content = tryToParse(fileContent);
  dispatch({ type: 'dataType', data: content });
}
```

### Modal Pattern
```jsx
// Standard modal structure
<Dialog open={open} onClose={handleClose}>
  <DialogTitle>Title</DialogTitle>
  <DialogContent>Content</DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleSave}>Save</Button>
  </DialogActions>
</Dialog>
```

## Data Integration Patterns

### Item Availability System
```jsx
// From sampling-companion Equipment.jsx
const isEquipped = character?.[windowName]?.some(({ rawName: rName }) => rName === rawName);
let owners;
if (!isEquipped) {
  owners = allAccountItems.filter(({ rawName: rName }) => rName === rawName).map(({ owner }) => owner);
}
```

### Item Parsing Integration
```jsx
// Standard data flow
const equippedItems = useMemo(() => addEquippedItems(state?.characters, true), []);
const totalItems = useMemo(() => getAllItems(state?.characters, state?.account), [state?.characters, state?.account]);
const items = useMemo(() => mergeItemsByOwner(equippedItems, totalItems), [equippedItems, totalItems]);
```

## Component Relationships

### Sampling Companion Structure (Template for Loadouts)
```
SamplingCompanion (Page)
├── Character Selector
├── Setup Selector  
└── AutoGrid
    ├── Equipment Component
    ├── Cards Component
    ├── Chips Component
    ├── Prayers Component
    ├── Obols Component
    └── StarSigns Component
```

### Proposed Loadout System Structure
```
GearLoadouts (Page)
├── Loadout Selector (Save/Load)
├── Character Selector
└── LoadoutDisplay
    ├── Equipment Slots (clickable)
    ├── Cards Slots (clickable)
    ├── Chips Slots (clickable)
    ├── Prayers Slots (clickable)
    └── Obols Slots (clickable)
```

## Authentication & Data Access

### Firebase Integration
- **Auth Domain**: `idlemmo.firebaseapp.com` (game's official Firebase)
- **Data Access**: Direct connection to game's database
- **User Data**: Retrieved via `subscribe()` function in firebase/index.js
- **Character Data**: Parsed through parsers/index.js

### Data Security
- Uses game's existing security rules
- OAuth authentication (Google/Apple)
- No additional authentication layer needed 