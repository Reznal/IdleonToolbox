import React, { useContext, useState, useMemo, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Box, Card, CardContent, Stack, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AppContext } from '@components/common/context/AppProvider';
import DataLoadingWrapper from '@components/common/DataLoadingWrapper';
import AutoGrid from '@components/common/AutoGrid';
import { addEquippedItems, getAllItems, mergeItemsByOwner } from '@parsers/items';
import { itemsArray } from 'data/website-data';
import LoadoutDisplay from '@components/tools/gear-loadouts/LoadoutDisplay';
import LoadoutManager from '@components/tools/gear-loadouts/LoadoutManager';
import GearSlotModal from '@components/tools/gear-loadouts/GearSlotModal';

const GearLoadouts = () => {
  const { state } = useContext(AppContext);
  const [currentLoadout, setCurrentLoadout] = useState({
    equipment: Array(32).fill(null),
    cards: [],
    chips: [],
    prayers: [],
    obols: []
  });
  const [savedLoadouts, setSavedLoadouts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({ type: '', index: 0, slotType: '' });

  const allOwnedItems = useMemo(() => getAllItems(state?.characters, state?.account), [state?.characters, state?.account]);
  const equippedItems = useMemo(() => addEquippedItems(state?.characters, true), [state?.characters]);
  const ownedItems = useMemo(() => mergeItemsByOwner([...allOwnedItems, ...equippedItems]), [allOwnedItems, equippedItems]);

  // Create a map of owned items for quick lookup
  const ownedItemsMap = useMemo(() => {
    const map = new Map();
    ownedItems?.forEach(item => {
      const key = item.rawName;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(item);
    });
    return map;
  }, [ownedItems]);

  // Enhance all game items with ownership information
  const enhancedItems = useMemo(() => {
    return itemsArray?.map(gameItem => {
      const ownedVersions = ownedItemsMap.get(gameItem.rawName) || [];
      
      if (ownedVersions.length > 0) {
        // Return the first owned version with enhanced data
        return {
          ...gameItem,
          ...ownedVersions[0],
          displayName: gameItem.displayName,
          allOwners: ownedVersions.map(item => item.owner),
          totalAmount: ownedVersions.reduce((sum, item) => sum + (item.amount || 1), 0)
        };
      } else {
        // Return the game item with no ownership
        return {
          ...gameItem,
          owner: 'none',
          amount: 0,
          allOwners: [],
          totalAmount: 0
        };
      }
    }) || [];
  }, [ownedItemsMap]);

  // Remove duplicates and filter out invalid items
  const uniqueItems = useMemo(() => {
    const seen = new Set();
    return enhancedItems?.filter(item => {
      if (!item.rawName || item.rawName === 'Blank') return false;
      if (seen.has(item.rawName)) return false;
      seen.add(item.rawName);
      return true;
    }) || [];
  }, [enhancedItems]);

  // Load saved loadouts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gear-loadouts');
    if (saved) {
      try {
        setSavedLoadouts(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved loadouts:', e);
      }
    }
  }, []);

  // Save loadouts to localStorage
  useEffect(() => {
    localStorage.setItem('gear-loadouts', JSON.stringify(savedLoadouts));
  }, [savedLoadouts]);

  const handleSlotClick = (slotType, slotIndex, equipmentSlotType) => {
    setSelectedSlot({ type: slotType, index: slotIndex, slotType: equipmentSlotType });
    setModalOpen(true);
  };

  const handleItemSelect = (slotType, slotIndex, item) => {
    setCurrentLoadout(prev => ({
      ...prev,
      [slotType]: prev[slotType].map((slot, index) => 
        index === slotIndex ? item : slot
      )
    }));
  };

  const handleSaveLoadout = (loadout) => {
    setSavedLoadouts(prev => [...prev, loadout]);
  };

  const handleLoadLoadout = (loadout) => {
    setCurrentLoadout(loadout);
  };

  const handleDeleteLoadout = (loadout) => {
    setSavedLoadouts(prev => prev.filter(l => l !== loadout));
  };

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
        
        {/* Loadout Manager */}
        <LoadoutManager
          currentLoadout={currentLoadout}
          savedLoadouts={savedLoadouts}
          onSaveLoadout={handleSaveLoadout}
          onLoadLoadout={handleLoadLoadout}
          onDeleteLoadout={handleDeleteLoadout}
        />

        {/* Loadout Display */}
        <AutoGrid>
          <LoadoutDisplay
            loadout={currentLoadout}
            character={state?.characters?.[0] || {}}
            account={state?.account}
            allAccountItems={ownedItems}
            onSlotClick={handleSlotClick}
          />
        </AutoGrid>

        {/* Item Selection Modal */}
        <GearSlotModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          slotType={selectedSlot.type}
          slotIndex={selectedSlot.index}
          equipmentSlotType={selectedSlot.slotType}
          availableItems={uniqueItems}
          character={state?.characters?.[0] || {}}
          account={state?.account}
          onItemSelect={handleItemSelect}
        />
      </Stack>
    </>
  );
};

export default GearLoadouts; 