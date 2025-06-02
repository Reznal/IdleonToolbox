import React from 'react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { prefix } from '@utility/helpers';
import Tooltip from '@components/Tooltip';
import ItemDisplay from '@components/common/ItemDisplay';
import { isItemValidForSlot } from './itemSlotUtils';

// Equipment slot type mapping - 32 slots total in 4 pages of 8 slots each (4 rows x 2 columns per page)
// Page 1 (Equipment): Helmet/Weapon, Shirt/Pendant, Pants/Ring, Shoes/Ring
// Page 2 (Premium): Premium Helmet/Keychain, Trophy/Keychain, Cape/Premium Ring, Nametag/Attire  
// Page 3 (Tools): Pickaxe/Fishing Rod, Hatchet/Net, Trap Box/Skull, Splicer/Blank
// Page 4 (Food): 8 food slots
const EQUIPMENT_SLOTS = [
  // Page 1: Equipment (slots 0-7)
  { type: 'helmet', icon: 'EquipmentHats1', name: 'Helmet' },
  { type: 'weapon', icon: 'EquipmentSword1', name: 'Weapon' },
  { type: 'shirt', icon: 'EquipmentShirts1', name: 'Shirt' },
  { type: 'pendant', icon: 'EquipmentPendant1', name: 'Pendant' },
  { type: 'pants', icon: 'EquipmentPants1', name: 'Pants' },
  { type: 'ring', icon: 'EquipmentRings1', name: 'Ring' },
  { type: 'shoes', icon: 'EquipmentShoes1', name: 'Shoes' },
  { type: 'ring', icon: 'EquipmentRings1', name: 'Ring' },
  
  // Page 2: Premium/Special (slots 8-15)
  { type: 'premium-helmet', icon: 'EquipmentHats50', name: 'Premium Helmet' },
  { type: 'keychain', icon: 'EquipmentKeychain1', name: 'Keychain' },
  { type: 'trophy', icon: 'Trophy17', name: 'Trophy' },
  { type: 'keychain', icon: 'EquipmentKeychain1', name: 'Keychain' },
  { type: 'cape', icon: 'EquipmentCape14', name: 'Cape' },
  { type: 'premium-ring', icon: 'EquipmentRingsChat11', name: 'Premium Ring' },
  { type: 'nametag', icon: 'EquipmentNametag1', name: 'Nametag' },
  { type: 'attire', icon: 'EquipmentShirts1', name: 'Attire' },
  
  // Page 3: Tools (slots 16-23)
  { type: 'pickaxe', icon: 'EquipmentTools2', name: 'Pickaxe' },
  { type: 'fishing-rod', icon: 'FishingRod1', name: 'Fishing Rod' },
  { type: 'hatchet', icon: 'EquipmentToolsHatchet1', name: 'Hatchet' },
  { type: 'net', icon: 'CatchingNet1', name: 'Net' },
  { type: 'trap-box', icon: 'TrapBoxSet1', name: 'Trap Box' },
  { type: 'skull', icon: 'WorshipSkull1', name: 'Skull' },
  { type: 'splicer', icon: 'DNAgun1', name: 'Splicer' },
  { type: 'blank', icon: 'Blank', name: 'Blank' },
  
  // Page 4: Food (slots 24-31)
  { type: 'food', icon: 'FoodHealth1', name: 'Food' },
  { type: 'food', icon: 'FoodHealth1', name: 'Food' },
  { type: 'food', icon: 'FoodHealth1', name: 'Food' },
  { type: 'food', icon: 'FoodHealth1', name: 'Food' },
  { type: 'food', icon: 'FoodHealth1', name: 'Food' },
  { type: 'food', icon: 'FoodHealth1', name: 'Food' },
  { type: 'food', icon: 'FoodHealth1', name: 'Food' },
  { type: 'food', icon: 'FoodHealth1', name: 'Food' }
];

const LoadoutEquipment = ({ 
  equipment = [], 
  character, 
  account, 
  allAccountItems, 
  onSlotClick 
}) => {
  const renderSlot = (item, slotInfo, index) => {
    const { rawName = 'Blank', displayName } = item || {};
    
    const isEquipped = character?.equipment?.some(({ rawName: rName }) => rName === rawName);
    let owners = [];
    if (!isEquipped && rawName !== 'Blank') {
      owners = allAccountItems.filter(({ rawName: rName }) => rName === rawName).map(({ owner }) => owner);
    }

    // Check if the item is valid for this slot
    const isValidItem = isItemValidForSlot(item, slotInfo.type);

    return (
      <Card
        key={index}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 80,
          cursor: 'pointer',
          position: 'relative',
          border: !isValidItem ? '2px solid red' : undefined,
          '&:hover': { backgroundColor: 'action.hover' }
        }}
        variant="outlined"
        onClick={() => onSlotClick('equipment', index, slotInfo.type)}
      >
        {/* Slot type icon in background */}
        <SlotTypeIcon 
          src={`${prefix}data/${slotInfo.icon}.png`} 
          alt={slotInfo.name}
          title={`${slotInfo.name} Slot`}
        />
        
        <CardContent sx={{ '&:last-child': { padding: 0 }, position: 'relative', zIndex: 1 }}>
          <Stack alignItems="center" justifyContent="center" sx={{ opacity: isEquipped ? 1 : 0.5 }}>
            <Tooltip
              title={
                displayName && displayName !== 'ERROR'
                  ? <ItemDisplay {...item} character={character} account={account} owners={owners}/>
                  : `${slotInfo.name} Slot`
              }
            >
              <ItemIcon src={`${prefix}data/${rawName}.png`} alt={rawName}/>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>
    );
  };

  return (
    <Stack>
      <Typography variant="h6">Equipment</Typography>
      <Stack 
        mt={2} 
        direction={'row'} 
        gap={4} 
        sx={{
          flexWrap: 'nowrap'
        }}
      >
        {/* Equipment Page 1 (slots 0-7) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, minWidth: 'fit-content' }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'primary.main',
              fontSize: '0.9rem',
              mb: 0.5,
              backgroundColor: 'background.paper',
              padding: '4px 8px',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              whiteSpace: 'nowrap'
            }}
          >
            Basic Equipment
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 80px)',
              gridTemplateRows: 'repeat(4, 80px)',
              gap: '4px'
            }}
          >
            {Array.from({ length: 8 }, (_, index) => {
              const item = equipment[index];
              const slotInfo = EQUIPMENT_SLOTS[index];
              return renderSlot(item, slotInfo, index);
            })}
          </Box>
        </Box>

        {/* Equipment Page 2 (slots 8-15) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, minWidth: 'fit-content' }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'primary.main',
              fontSize: '0.9rem',
              mb: 0.5,
              backgroundColor: 'background.paper',
              padding: '4px 8px',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              whiteSpace: 'nowrap'
            }}
          >
            Premium & Special
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 80px)',
              gridTemplateRows: 'repeat(4, 80px)',
              gap: '4px'
            }}
          >
            {Array.from({ length: 8 }, (_, index) => {
              const actualIndex = index + 8;
              const item = equipment[actualIndex];
              const slotInfo = EQUIPMENT_SLOTS[actualIndex];
              return renderSlot(item, slotInfo, actualIndex);
            })}
          </Box>
        </Box>

        {/* Tools Page (slots 16-23) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, minWidth: 'fit-content' }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'primary.main',
              fontSize: '0.9rem',
              mb: 0.5,
              backgroundColor: 'background.paper',
              padding: '4px 8px',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              whiteSpace: 'nowrap'
            }}
          >
            Tools
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 80px)',
              gridTemplateRows: 'repeat(4, 80px)',
              gap: '4px'
            }}
          >
            {Array.from({ length: 8 }, (_, index) => {
              const actualIndex = index + 16;
              const item = equipment[actualIndex];
              const slotInfo = EQUIPMENT_SLOTS[actualIndex];
              return renderSlot(item, slotInfo, actualIndex);
            })}
          </Box>
        </Box>

        {/* Food Page (slots 24-31) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, minWidth: 'fit-content' }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'primary.main',
              fontSize: '0.9rem',
              mb: 0.5,
              backgroundColor: 'background.paper',
              padding: '4px 8px',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              whiteSpace: 'nowrap'
            }}
          >
            Food
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 80px)',
              gridTemplateRows: 'repeat(4, 80px)',
              gap: '4px'
            }}
          >
            {Array.from({ length: 8 }, (_, index) => {
              const actualIndex = index + 24;
              const item = equipment[actualIndex];
              const slotInfo = EQUIPMENT_SLOTS[actualIndex];
              return renderSlot(item, slotInfo, actualIndex);
            })}
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

const ItemIcon = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const SlotTypeIcon = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0.2;
  object-fit: contain;
  z-index: 0;
`;

export default LoadoutEquipment; 