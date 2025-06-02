import React from 'react';
import { Stack, Typography, Card, CardContent } from '@mui/material';

const LoadoutObols = ({ 
  obols, 
  character, 
  account, 
  onSlotClick 
}) => {
  return (
    <Stack>
      <Typography variant="h6">Obols</Typography>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Obol loadout system will be implemented here
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default LoadoutObols; 