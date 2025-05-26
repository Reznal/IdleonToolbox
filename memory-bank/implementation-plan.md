# Implementation Plan: Gear Loadouts System

## Phase 1: Development Environment Setup

### Step 1.1: Install Dependencies
```bash
cd /path/to/IdleOnToolbox
npm install
```

### Step 1.2: Verify Development Server
```bash
npm run dev
# Should start on http://localhost:3000
```

### Step 1.3: Test Authentication
- Navigate to localhost:3000
- Attempt login with your Idleon account
- Verify character data loads correctly

## Phase 2: Core Page Structure

### Step 2.1: Create Main Page File
**File**: `pages/tools/gear-loadouts.jsx`

```jsx
import React, { useContext, useState, useMemo } from 'react';
import { NextSeo } from 'next-seo';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { AppContext } from '@components/common/context/AppProvider';
import DataLoadingWrapper from '@components/common/DataLoadingWrapper';
import AutoGrid from '@components/common/AutoGrid';
import { addEquippedItems, getAllItems, mergeItemsByOwner } from '@parsers/items';

const GearLoadouts = () => {
  const { state } = useContext(AppContext);
  const [selectedChar, setSelectedChar] = useState(state?.characters?.[0] || {});
  const [currentLoadout, setCurrentLoadout] = useState(null);

  const equippedItems = useMemo(() => addEquippedItems(state?.characters, true), []);
  const totalItems = useMemo(() => getAllItems(state?.characters, state?.account), [state?.characters, state?.account]);
  const items = useMemo(() => mergeItemsByOwner(equippedItems, totalItems), [equippedItems, totalItems]);

  if (!state?.characters) {
    return <DataLoadingWrapper/>
  }

  return (
    <>
      <NextSeo
        title="Gear Loadouts | Idleon Toolbox"
        description="Create and manage custom gear loadouts for your Idleon characters"
      />
      
      <Stack spacing={2}>
        <Typography variant="h4">Gear Loadouts</Typography>
        
        {/* Character Selector */}
        <Card sx={{ width: 'fit-content' }}>
          <CardContent>
            {/* Character selection UI */}
          </CardContent>
        </Card>

        {/* Loadout Display */}
        <AutoGrid withBorder>
          {/* Loadout components will go here */}
        </AutoGrid>
      </Stack>
    </>
  );
};

export default GearLoadouts;
```

### Step 2.2: Add to Navigation
**File**: `pages/tools/index.jsx`

Add gear-loadouts to the tools list:
```jsx
// Add to existing tools array
const tools = [
  // ... existing tools
  {
    name: 'Gear Loadouts',
    description: 'Create and manage custom gear configurations',
    href: '/tools/gear-loadouts'
  }
];
```

## Phase 3: Component Structure

### Step 3.1: Create Component Directory
```bash
mkdir components/tools/gear-loadouts
```

### Step 3.2: LoadoutDisplay Component
**File**: `components/tools/gear-loadouts/LoadoutDisplay.jsx`

```jsx
import React from 'react';
import { Stack, Typography } from '@mui/material';
import LoadoutEquipment from './LoadoutEquipment';
import LoadoutCards from './LoadoutCards';
import LoadoutChips from './LoadoutChips';
import LoadoutPrayers from './LoadoutPrayers';
import LoadoutObols from './LoadoutObols';

const LoadoutDisplay = ({ 
  loadout, 
  character, 
  account, 
  allAccountItems, 
  onSlotClick 
}) => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Current Loadout</Typography>
      
      <LoadoutEquipment
        equipment={loadout?.equipment}
        character={character}
        account={account}
        allAccountItems={allAccountItems}
        onSlotClick={onSlotClick}
      />
      
      <LoadoutCards
        cards={loadout?.cards}
        character={character}
        account={account}
        onSlotClick={onSlotClick}
      />
      
      <LoadoutChips
        chips={loadout?.chips}
        character={character}
        account={account}
        onSlotClick={onSlotClick}
      />
      
      <LoadoutPrayers
        prayers={loadout?.prayers}
        character={character}
        account={account}
        onSlotClick={onSlotClick}
      />
      
      <LoadoutObols
        obols={loadout?.obols}
        character={character}
        account={account}
        onSlotClick={onSlotClick}
      />
    </Stack>
  );
};

export default LoadoutDisplay;
```

### Step 3.3: LoadoutEquipment Component
**File**: `components/tools/gear-loadouts/LoadoutEquipment.jsx`

```jsx
import React from 'react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { prefix } from '@utility/helpers';
import Tooltip from '@components/Tooltip';
import ItemDisplay from '@components/common/ItemDisplay';

const LoadoutEquipment = ({ 
  equipment = [], 
  character, 
  account, 
  allAccountItems, 
  onSlotClick 
}) => {
  return (
    <Stack>
      <Typography variant="h6">Equipment</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 60px)',
          gap: 1,
          justifyContent: 'center'
        }}
      >
        {Array.from({ length: 16 }, (_, index) => {
          const item = equipment[index];
          const { rawName = 'Blank', displayName } = item || {};
          
          const isEquipped = character?.equipment?.some(({ rawName: rName }) => rName === rawName);
          let owners = [];
          if (!isEquipped && rawName !== 'Blank') {
            owners = allAccountItems.filter(({ rawName: rName }) => rName === rawName).map(({ owner }) => owner);
          }

          return (
            <Card
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 76,
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
              variant="outlined"
              onClick={() => onSlotClick('equipment', index)}
            >
              <CardContent sx={{ '&:last-child': { padding: 0 } }}>
                <Stack alignItems="center" justifyContent="center" sx={{ opacity: isEquipped ? 1 : 0.5 }}>
                  <Tooltip
                    title={
                      displayName && displayName !== 'ERROR'
                        ? <ItemDisplay {...item} character={character} account={account} owners={owners}/>
                        : ''
                    }
                  >
                    <ItemIcon src={`${prefix}data/${rawName}.png`} alt={rawName}/>
                  </Tooltip>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Stack>
  );
};

const ItemIcon = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

export default LoadoutEquipment;
```

## Phase 4: Item Selection Modal

### Step 4.1: GearSlotModal Component
**File**: `components/tools/gear-loadouts/GearSlotModal.jsx`

```jsx
import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Typography
} from '@mui/material';
import styled from '@emotion/styled';
import { prefix } from '@utility/helpers';
import Tooltip from '@components/Tooltip';
import ItemDisplay from '@components/common/ItemDisplay';

const GearSlotModal = ({ 
  open, 
  onClose, 
  slotType, 
  slotIndex, 
  availableItems, 
  character, 
  account, 
  onItemSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  const filteredItems = useMemo(() => {
    let items = availableItems.filter(item => {
      // Filter by search term
      if (searchTerm && !item.displayName?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filter by type/category
      if (filterBy !== 'all') {
        // Add filtering logic based on item type
      }
      
      return true;
    });

    // Sort items
    items.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.displayName || '').localeCompare(b.displayName || '');
        case 'power':
          return (b.Weapon_Power || 0) - (a.Weapon_Power || 0);
        case 'defence':
          return (b.Defence || 0) - (a.Defence || 0);
        default:
          return 0;
      }
    });

    return items;
  }, [availableItems, searchTerm, sortBy, filterBy]);

  const handleItemClick = (item) => {
    onItemSelect(slotType, slotIndex, item);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Select Item for {slotType} Slot {slotIndex + 1}
      </DialogTitle>
      
      <DialogContent>
        <Stack spacing={2} sx={{ mb: 2 }}>
          <TextField
            label="Search Items"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
          
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="power">Power</MenuItem>
                <MenuItem value="defence">Defence</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Filter</InputLabel>
              <Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                <MenuItem value="all">All Items</MenuItem>
                <MenuItem value="owned">Owned Only</MenuItem>
                <MenuItem value="equipped">Equipped</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <Grid container spacing={1}>
          {filteredItems.map((item, index) => (
            <Grid item key={index}>
              <Card
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'action.hover' }
                }}
                onClick={() => handleItemClick(item)}
              >
                <CardContent sx={{ padding: 1, '&:last-child': { padding: 1 } }}>
                  <Tooltip
                    title={<ItemDisplay {...item} character={character} account={account}/>}
                  >
                    <ItemIcon src={`${prefix}data/${item.rawName}.png`} alt={item.rawName}/>
                  </Tooltip>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

const ItemIcon = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

export default GearSlotModal;
```

## Phase 5: Save/Load System

### Step 5.1: LoadoutManager Component
**File**: `components/tools/gear-loadouts/LoadoutManager.jsx`

```jsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  IconButton
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { downloadFile, tryToParse } from '@utility/helpers';

const LoadoutManager = ({ 
  currentLoadout, 
  savedLoadouts, 
  onSaveLoadout, 
  onLoadLoadout, 
  onDeleteLoadout 
}) => {
  const [loadoutName, setLoadoutName] = useState('');
  const [selectedLoadout, setSelectedLoadout] = useState('');

  const handleSave = () => {
    if (!loadoutName.trim()) return;
    
    const loadout = {
      name: loadoutName,
      ...currentLoadout,
      savedAt: new Date().toISOString()
    };
    
    onSaveLoadout(loadout);
    setLoadoutName('');
  };

  const handleLoad = () => {
    if (!selectedLoadout) return;
    onLoadLoadout(selectedLoadout);
  };

  const handleExport = () => {
    const data = JSON.stringify(savedLoadouts, null, 2);
    downloadFile(data, 'gear-loadouts.json');
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const content = await file.text();
    const loadouts = tryToParse(content);
    
    if (Array.isArray(loadouts)) {
      loadouts.forEach(loadout => onSaveLoadout(loadout));
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">Loadout Management</Typography>
          
          {/* Save New Loadout */}
          <Stack direction="row" spacing={1}>
            <TextField
              label="Loadout Name"
              value={loadoutName}
              onChange={(e) => setLoadoutName(e.target.value)}
              size="small"
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={!loadoutName.trim()}
            >
              Save
            </Button>
          </Stack>
          
          {/* Load Existing Loadout */}
          <Stack direction="row" spacing={1}>
            <FormControl size="small" sx={{ flexGrow: 1 }}>
              <InputLabel>Saved Loadouts</InputLabel>
              <Select
                value={selectedLoadout}
                onChange={(e) => setSelectedLoadout(e.target.value)}
              >
                {savedLoadouts.map((loadout, index) => (
                  <MenuItem key={index} value={loadout}>
                    {loadout.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={handleLoad}
              disabled={!selectedLoadout}
            >
              Load
            </Button>
            <IconButton
              color="error"
              onClick={() => onDeleteLoadout(selectedLoadout)}
              disabled={!selectedLoadout}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
          
          {/* Import/Export */}
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<GetAppIcon />}
              onClick={handleExport}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              startIcon={<FileUploadIcon />}
              component="label"
            >
              Import
              <input
                type="file"
                accept=".json"
                hidden
                onChange={handleImport}
              />
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LoadoutManager;
```

## Phase 6: Integration Steps

### Step 6.1: Update Main Page with All Components
Integrate all components into the main gear-loadouts page

### Step 6.2: Add localStorage Persistence
Implement save/load functionality using localStorage

### Step 6.3: Test with Real Data
Verify functionality with actual account data

### Step 6.4: Performance Optimization
Optimize rendering and data processing

## Testing Checklist

- [ ] Page loads without errors
- [ ] Character selection works
- [ ] Gear slots are clickable
- [ ] Modal opens with available items
- [ ] Item selection updates loadout
- [ ] Save/load functionality works
- [ ] Import/export works
- [ ] Performance is acceptable
- [ ] UI matches existing design 