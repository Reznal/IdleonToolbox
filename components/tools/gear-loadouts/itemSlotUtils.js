// Shared utility function for checking if an item matches a slot type
export const isItemValidForSlot = (item, slotType) => {
  if (!item || item.rawName === 'Blank') return true;
  
  const itemType = item.Type || '';
  
  switch (slotType) {
    case 'helmet':
      return itemType === 'HELMET';
    case 'premium-helmet':
      return itemType === 'PREMIUM_HELMET';
    case 'weapon':
      return ['SPEAR', 'BOW', 'WAND', 'FISTICUFF', 'SWORD'].includes(itemType);
    case 'shirt':
      return itemType === 'SHIRT';
    case 'attire':
      return itemType === 'ATTIRE';
    case 'pendant':
      return itemType === 'PENDANT';
    case 'pants':
      return itemType === 'PANTS';
    case 'ring':
      return itemType === 'RING';
    case 'premium-ring':
      return itemType === 'CHAT_RING';
    case 'shoes':
      return itemType === 'SHOES';
    case 'keychain':
      return itemType === 'KEYCHAIN';
    case 'trophy':
      return itemType === 'TROPHY';
    case 'cape':
      return itemType === 'CAPE';
    case 'nametag':
      return itemType === 'NAMETAG';
    case 'pickaxe':
      return itemType === 'PICKAXE';
    case 'hatchet':
      return itemType === 'HATCHET';
    case 'fishing-rod':
      return itemType === 'FISHING_ROD';
    case 'net':
      return itemType === 'BUG_CATCHING_NET';
    case 'trap-box':
      return itemType === 'TRAP_BOX_SET';
    case 'skull':
      return itemType === 'WORSHIP_SKULL';
    case 'splicer':
      return itemType === 'DNA_SPLICER';
    case 'food':
      return itemType === 'BOOST_FOOD' || itemType === 'FOOD';
    case 'blank':
      return true; // Blank slot can hold anything or nothing
    default:
      return true;
  }
}; 