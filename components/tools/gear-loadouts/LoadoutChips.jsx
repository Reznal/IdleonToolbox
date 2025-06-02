import React from 'react';
import { Stack, Typography, Card, CardContent } from '@mui/material';

const LoadoutChips = ({ 
  chips, 
  character, 
  account, 
  onSlotClick 
}) => {
  return (
    <Stack>
      <Typography variant="h6">Chips</Typography>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Chip loadout system will be implemented here
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default LoadoutChips; 