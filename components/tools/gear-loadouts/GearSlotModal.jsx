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
  Typography,
  Chip,
  Switch,
  FormControlLabel,
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  RadioGroup,
  Radio
} from '@mui/material';
import styled from '@emotion/styled';
import { prefix } from '@utility/helpers';
import Tooltip from '@components/Tooltip';
import ItemDisplay from '@components/common/ItemDisplay';
import { isItemValidForSlot } from './itemSlotUtils';

// Function to get item location description
const getItemLocation = (item) => {
  if (!item || item.rawName === 'Blank') return '';
  
  if (item.totalAmount === 0) {
    return 'Not owned';
  }
  
  if (item.allOwners && item.allOwners.length > 0) {
    const locations = item.allOwners.filter(owner => owner && owner !== 'none');
    if (locations.length === 0) {
      return 'Storage';
    } else if (locations.length === 1) {
      return locations[0];
    } else {
      return `${locations.slice(0, -1).join(', ')} and ${locations[locations.length - 1]}`;
    }
  }
  
  return item.owner && item.owner !== 'none' ? item.owner : 'Storage';
};

// Function to get all available stats from items
const getAvailableStats = (items) => {
  const stats = new Set();
  
  // Stats to exclude from filtering
  const excludedStats = ['lvReqToEquip', 'Upgrade_Slots_Left'];
  
  items.forEach(item => {
    // Basic stats
    if (item.STR > 0) stats.add('STR');
    if (item.AGI > 0) stats.add('AGI');
    if (item.WIS > 0) stats.add('WIS');
    if (item.LUK > 0) stats.add('LUK');
    if (item.Defence > 0) stats.add('Defence');
    if (item.Weapon_Power > 0) stats.add('Weapon_Power');
    if (item.Speed !== 0) stats.add('Speed');
    if (item.Reach > 0) stats.add('Reach');
    
    // Unique bonuses (excluding unwanted ones)
    if (item.UQ1txt && item.UQ1txt !== 0 && item.UQ1val > 0) {
      const statName = item.UQ1txt;
      // Exclude stats that contain "follow engineer", "% family", or other unwanted patterns
      if (!statName.toLowerCase().includes('follow engineer') && 
          !statName.toLowerCase().includes('% family') &&
          !statName.toLowerCase().includes('%family') &&
          !excludedStats.includes(statName)) {
        stats.add(statName);
      }
    }
    if (item.UQ2txt && item.UQ2txt !== 0 && item.UQ2val > 0) {
      const statName = item.UQ2txt;
      // Exclude stats that contain "follow engineer", "% family", or other unwanted patterns
      if (!statName.toLowerCase().includes('follow engineer') && 
          !statName.toLowerCase().includes('% family') &&
          !statName.toLowerCase().includes('%family') &&
          !excludedStats.includes(statName)) {
        stats.add(statName);
      }
    }
  });
  
  return Array.from(stats).sort();
};

// Function to get stat value from item
const getStatValue = (item, stat) => {
  if (stat === 'UQ1txt' && item.UQ1txt && item.UQ1txt !== 0) {
    return item.UQ1val || 0;
  }
  if (stat === 'UQ2txt' && item.UQ2txt && item.UQ2txt !== 0) {
    return item.UQ2val || 0;
  }
  if (stat === item.UQ1txt) {
    return item.UQ1val || 0;
  }
  if (stat === item.UQ2txt) {
    return item.UQ2val || 0;
  }
  return item[stat] || 0;
};

const GearSlotModal = ({ 
  open, 
  onClose, 
  slotType, 
  slotIndex, 
  equipmentSlotType,
  availableItems, 
  character, 
  account, 
  onItemSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('owned');
  const [showSelected, setShowSelected] = useState(true);
  const [selectedStats, setSelectedStats] = useState([]);
  const [statFilterMode, setStatFilterMode] = useState('AND'); // 'AND' or 'OR'

  // Reset filters when modal opens or slot type changes
  React.useEffect(() => {
    if (open) {
      setSearchTerm('');
      setFilterBy('owned');
      setSortBy('name');
      setShowSelected(true);
      setSelectedStats([]);
      setStatFilterMode('AND');
    }
  }, [open, equipmentSlotType]);

  // Get slot-specific items first
  const slotSpecificItems = useMemo(() => {
    let items = availableItems;
    
    // Always filter by equipment slot type first if specified
    if (equipmentSlotType) {
      items = items.filter(item => isItemValidForSlot(item, equipmentSlotType));
    }
    
    return items;
  }, [availableItems, equipmentSlotType]);

  // Get available stats for this slot type
  const availableStats = useMemo(() => {
    return getAvailableStats(slotSpecificItems);
  }, [slotSpecificItems]);

  // Get available sort options
  const sortOptions = useMemo(() => {
    const options = [
      { value: 'name', label: 'Name' },
      { value: 'totalAmount', label: 'Amount Owned' }
    ];
    
    // Add stat-based sorting options
    if (availableStats.includes('Weapon_Power')) options.push({ value: 'Weapon_Power', label: 'Weapon Power' });
    if (availableStats.includes('Defence')) options.push({ value: 'Defence', label: 'Defence' });
    if (availableStats.includes('STR')) options.push({ value: 'STR', label: 'Strength' });
    if (availableStats.includes('AGI')) options.push({ value: 'AGI', label: 'Agility' });
    if (availableStats.includes('WIS')) options.push({ value: 'WIS', label: 'Wisdom' });
    if (availableStats.includes('LUK')) options.push({ value: 'LUK', label: 'Luck' });
    if (availableStats.includes('Speed')) options.push({ value: 'Speed', label: 'Speed' });
    if (availableStats.includes('Reach')) options.push({ value: 'Reach', label: 'Reach' });
    
    return options;
  }, [availableStats]);

  const filteredItems = useMemo(() => {
    let items = slotSpecificItems;
    
    // Filter by search term
    if (searchTerm) {
      items = items.filter(item => 
        item.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by ownership/availability
    if (filterBy === 'owned') {
      items = items.filter(item => item.totalAmount > 0 || (item.owner && item.owner !== 'none'));
    }
    
    // Apply stat filters
    if (selectedStats.length > 0) {
      items = items.filter(item => {
        const itemHasStats = selectedStats.map(stat => getStatValue(item, stat) > 0);
        
        if (showSelected) {
          // Show items WITH the selected stats
          return statFilterMode === 'AND' 
            ? itemHasStats.every(hasIt => hasIt)  // Item must have ALL selected stats
            : itemHasStats.some(hasIt => hasIt);   // Item must have ANY selected stat
        } else {
          // Show items WITHOUT the selected stats
          return statFilterMode === 'AND'
            ? itemHasStats.every(hasIt => !hasIt) // Item must have NONE of the selected stats
            : itemHasStats.some(hasIt => !hasIt); // Item must be missing AT LEAST ONE selected stat
        }
      });
    }

    // Sort items
    items.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.displayName || '').localeCompare(b.displayName || '');
        case 'totalAmount':
          return (b.totalAmount || 0) - (a.totalAmount || 0);
        default:
          // Stat-based sorting (descending)
          return getStatValue(b, sortBy) - getStatValue(a, sortBy);
      }
    });

    return items;
  }, [slotSpecificItems, searchTerm, sortBy, filterBy, selectedStats, statFilterMode, showSelected]);

  const handleItemClick = (item) => {
    onItemSelect(slotType, slotIndex, item);
    onClose();
  };

  const handleStatToggle = (stat) => {
    setSelectedStats(prev => 
      prev.includes(stat) 
        ? prev.filter(s => s !== stat)
        : [...prev, stat]
    );
  };

  const clearStatFilters = () => {
    setSelectedStats([]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        Select {equipmentSlotType ? equipmentSlotType.charAt(0).toUpperCase() + equipmentSlotType.slice(1).replace('-', ' ') : 'Item'}
      </DialogTitle>
      
      <DialogContent>
        <Stack spacing={2} sx={{ mb: 2 }}>
          {/* Search and basic filters */}
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Search Items"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            
            <FormControl sx={{ minWidth: 140 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                {sortOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Filter</InputLabel>
              <Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                <MenuItem value="owned">Owned Only</MenuItem>
                <MenuItem value="all">All Items</MenuItem>
              </Select>
            </FormControl>
            

          </Stack>

          {/* Stat filters */}
          {availableStats.length > 0 && (
            <Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Stat Filters:</Typography>
                
                {/* Show With/Without Stats Toggle */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={showSelected}
                      onChange={(e) => setShowSelected(e.target.checked)}
                      size="small"
                    />
                  }
                  label={showSelected ? "Show With Stats" : "Show Without Stats"}
                />
                
                {/* AND/OR Toggle */}
                <FormControl>
                  <RadioGroup
                    row
                    value={statFilterMode}
                    onChange={(e) => setStatFilterMode(e.target.value)}
                  >
                    <FormControlLabel value="AND" control={<Radio size="small" />} label="AND" />
                    <FormControlLabel value="OR" control={<Radio size="small" />} label="OR" />
                  </RadioGroup>
                </FormControl>
                
                <Button size="small" onClick={clearStatFilters}>Clear All</Button>
                
                {selectedStats.length > 0 && (
                  <Typography variant="caption" color="primary">
                    {selectedStats.length} stat{selectedStats.length !== 1 ? 's' : ''} selected
                  </Typography>
                )}
              </Stack>
              
              {/* Stat buttons in multiple rows */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: '100%' }}>
                {availableStats.map(stat => (
                  <ToggleButton
                    key={stat}
                    value={stat}
                    selected={selectedStats.includes(stat)}
                    onChange={() => handleStatToggle(stat)}
                    size="small"
                    sx={{ 
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      minWidth: 'auto',
                      px: 1.5,
                      py: 0.5
                    }}
                  >
                    {stat.replace(/_/g, ' ')}
                  </ToggleButton>
                ))}
              </Box>
              
              {/* Filter explanation */}
              {selectedStats.length > 0 && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {showSelected ? 'Showing' : 'Hiding'} items that have{' '}
                  <strong>{statFilterMode === 'AND' ? 'ALL' : 'ANY'}</strong> of the selected stats:{' '}
                  {selectedStats.map(stat => stat.replace(/_/g, ' ')).join(', ')}
                </Typography>
              )}
            </Box>
          )}

          <Divider />
          
          <Typography variant="body2" color="text.secondary">
            Found {filteredItems.length} items
          </Typography>
        </Stack>

        <Grid container spacing={1}>
          {/* Clear Slot Option */}
          {showSelected && (
            <Grid item>
              <Card
                sx={{
                  cursor: 'pointer',
                  border: '2px dashed #ccc',
                  '&:hover': { backgroundColor: 'action.hover' }
                }}
                onClick={() => handleItemClick({ rawName: 'Blank', displayName: 'Empty' })}
              >
                <CardContent sx={{ padding: 1, '&:last-child': { padding: 1 } }}>
                  <Stack alignItems="center" spacing={0.5}>
                    <Tooltip title="Clear this slot">
                      <ItemIcon src={`${prefix}data/Blank.png`} alt="Clear Slot"/>
                    </Tooltip>
                    <Typography variant="caption" align="center">
                      Clear Slot
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )}
          
          {filteredItems.map((item, index) => {
            const location = getItemLocation(item);
            const isOwned = item.totalAmount > 0;
            
            return (
              <Grid item key={index}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'action.hover' },
                    border: isOwned ? '1px solid #4caf50' : '1px solid transparent',
                    opacity: isOwned ? 1 : 0.7
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  <CardContent sx={{ padding: 1, '&:last-child': { padding: 1 } }}>
                    <Stack alignItems="center" spacing={0.5}>
                      <Tooltip
                        title={
                          <Stack spacing={1}>
                            <ItemDisplay {...item} character={character} account={account}/>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Location:</strong> {location}
                            </Typography>
                          </Stack>
                        }
                      >
                        <ItemIcon src={`${prefix}data/${item.rawName}.png`} alt={item.rawName}/>
                      </Tooltip>
                      
                      {/* Item name */}
                      <Typography variant="caption" align="center" sx={{ maxWidth: 60, fontSize: '0.7rem' }}>
                        {item.displayName}
                      </Typography>
                      
                      {/* Amount owned */}
                      {isOwned && (
                        <Chip 
                          label={`×${item.totalAmount}`} 
                          size="small" 
                          color="success"
                          sx={{ height: 16, fontSize: '0.6rem' }}
                        />
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
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