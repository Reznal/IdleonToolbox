# Quick Start Guide: Gear Loadouts Development

## 🚀 Immediate Next Steps

### 1. Verify Environment Setup
```bash
# Check if you're in the right directory
pwd
# Should show: P:\Projects\IdleOnToolbox

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Test Authentication
1. Open http://localhost:3000
2. Login with your Idleon account (Google/Apple/Email)
3. Verify your characters and data load correctly
4. Navigate to existing tools to confirm everything works

### 3. Create Your First Component
```bash
# Create the gear-loadouts directory
mkdir components/tools/gear-loadouts

# Start with the main page
# Create: pages/tools/gear-loadouts.jsx
```

## 📋 Development Checklist

### Phase 1: Environment (Start Here)
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Authentication tested and working
- [ ] Existing tools accessible and functional

### Phase 2: Basic Structure
- [ ] Create `pages/tools/gear-loadouts.jsx`
- [ ] Add to tools navigation in `pages/tools/index.jsx`
- [ ] Create component directory `components/tools/gear-loadouts/`
- [ ] Basic page loads without errors

### Phase 3: Core Components
- [ ] `LoadoutDisplay.jsx` - Main interface
- [ ] `LoadoutEquipment.jsx` - Equipment slots
- [ ] `GearSlotModal.jsx` - Item selection
- [ ] `LoadoutManager.jsx` - Save/load system

## 🔧 Key Files to Reference

### Existing Patterns to Copy
- `pages/tools/sampling-companion.jsx` - Page structure
- `components/tools/sampling-companion/Equipment.jsx` - Slot layout
- `pages/tools/item-planner.jsx` - Save/load patterns
- `components/common/ItemDisplay.jsx` - Item tooltips

### Data Integration Points
- `parsers/items.js` - Item data processing
- `components/common/context/AppProvider.jsx` - Global state
- `firebase/index.js` - Authentication system

## 🎯 Success Milestones

### Milestone 1: Basic Page
- Gear loadouts page accessible via navigation
- Character selector working
- Basic layout matches existing tools

### Milestone 2: Interactive Slots
- Clickable gear slots
- Modal opens with item selection
- Item selection updates display

### Milestone 3: Persistence
- Save loadouts to localStorage
- Load saved loadouts
- Import/export functionality

## 🆘 Troubleshooting

### Common Issues
1. **Import Errors**: Check path aliases in `next.config.js`
2. **Authentication Issues**: Verify Firebase config in `firebase/config.js`
3. **Data Not Loading**: Check AppContext integration
4. **Styling Issues**: Ensure Material-UI theme consistency

### Debug Commands
```bash
# Check for linting errors
npm run lint

# Run tests
npm test

# Build to check for production issues
npm run build
```

## 📚 Documentation Reference

- **Memory Bank**: `memory-bank/` - Complete project documentation
- **Implementation Plan**: `memory-bank/implementation-plan.md` - Detailed code examples
- **System Patterns**: `memory-bank/systemPatterns.md` - Architecture guide
- **Progress Tracking**: `memory-bank/progress.md` - Status monitoring

## 🎮 Testing Strategy

### Manual Testing
1. **Page Load**: Verify page loads without console errors
2. **Authentication**: Test login/logout functionality
3. **Data Display**: Confirm character and item data appears
4. **Interactions**: Test all clickable elements
5. **Persistence**: Verify save/load works across sessions

### Automated Testing
- Follow existing Jest patterns in `__test__/` directory
- Test utility functions and data processing
- Mock Firebase authentication for tests

---

## 🏁 Ready to Start?

1. **Run the environment setup commands above**
2. **Create your first component following the implementation plan**
3. **Reference the memory bank documentation as needed**
4. **Update progress tracking as you complete milestones**

The foundation is set - time to build! 🚀 