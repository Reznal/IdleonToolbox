import React from 'react';
import { Stack, Typography, Card, CardContent } from '@mui/material';

const LoadoutPrayers = ({ 
  prayers, 
  character, 
  account, 
  onSlotClick 
}) => {
  return (
    <Stack>
      <Typography variant="h6">Prayers</Typography>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Prayer loadout system will be implemented here
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default LoadoutPrayers; 