import React from 'react';
import { Stack, Typography, Card, CardContent } from '@mui/material';

const LoadoutCards = ({ 
  cards, 
  character, 
  account, 
  onSlotClick 
}) => {
  return (
    <Stack>
      <Typography variant="h6">Cards</Typography>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Card loadout system will be implemented here
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default LoadoutCards; 