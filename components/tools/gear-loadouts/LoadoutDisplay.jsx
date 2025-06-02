import React from 'react';
import { Stack, Typography, Box, Paper } from '@mui/material';
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
    <Stack spacing={3} sx={{ width: '100%' }}>
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