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