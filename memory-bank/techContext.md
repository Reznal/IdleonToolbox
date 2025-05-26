# Technical Context: Development Environment & Dependencies

## Technology Stack

### Core Framework
- **React**: 18.2.0 (with Hooks, Context API)
- **Next.js**: 13.x (Pages Router, not App Router)
- **Node.js**: 16+ required
- **TypeScript**: Partial adoption (some .tsx files)

### UI & Styling
- **Material-UI (MUI)**: v5 (@mui/material, @mui/icons-material)
- **Emotion**: Styled components (@emotion/styled, @emotion/react)
- **Responsive Design**: Built-in MUI breakpoints

### Authentication & Database
- **Firebase**: v9 SDK
  - Authentication (Google, Apple, Email/Password)
  - Realtime Database
  - Firestore
- **OAuth Providers**: Google, Apple

### Development Tools
- **ESLint**: Code linting
- **Jest**: Testing framework
- **Husky**: Git hooks
- **Sentry**: Error tracking

## Package Dependencies

### Key Dependencies (from package.json)
```json
{
  "@emotion/react": "^11.x",
  "@emotion/styled": "^11.x",
  "@mui/icons-material": "^5.x",
  "@mui/material": "^5.x",
  "firebase": "^9.x",
  "next": "^13.x",
  "react": "^18.x",
  "react-dom": "^18.x"
}
```

### Development Dependencies
```json
{
  "eslint": "^8.x",
  "jest": "^29.x",
  "@types/react": "^18.x"
}
```

## Development Setup

### Environment Requirements
- **Node.js**: 16.x or higher
- **npm**: 8.x or higher
- **Git**: For version control

### Local Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint
```

### Environment Variables
- **Firebase Config**: Hardcoded in `firebase/config.js`
- **No .env files**: Configuration is public (client-side Firebase)

## Build & Deployment

### Build Process
- **Next.js Build**: Static generation + server-side rendering
- **Output**: `.next/` directory with optimized bundles
- **Assets**: Public assets served from `/public/`

### Deployment Targets
- **Vercel**: Recommended (seamless Next.js integration)
- **Netlify**: Alternative static hosting
- **Custom Server**: Node.js server deployment

### Deployment Configuration
```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  // Additional optimizations
}
```

## Code Organization Standards

### File Naming Conventions
- **Pages**: `kebab-case.jsx` (e.g., `gear-loadouts.jsx`)
- **Components**: `PascalCase.jsx` (e.g., `LoadoutDisplay.jsx`)
- **Utilities**: `camelCase.js` (e.g., `itemHelpers.js`)

### Import Patterns
```javascript
// External libraries first
import React from 'react';
import { Box, Card } from '@mui/material';

// Internal imports with aliases
import { AppContext } from '@components/common/context/AppProvider';
import { prefix } from '@utility/helpers';
import ItemDisplay from '@components/common/ItemDisplay';
```

### Component Structure
```jsx
// Standard component template
import React, { useContext, useState, useMemo } from 'react';
import { NextSeo } from 'next-seo';

const ComponentName = () => {
  const { state } = useContext(AppContext);
  const [localState, setLocalState] = useState();
  
  const memoizedValue = useMemo(() => {
    // Expensive calculations
  }, [dependencies]);

  return (
    <>
      <NextSeo title="Page Title | Idleon Toolbox" />
      {/* Component JSX */}
    </>
  );
};

export default ComponentName;
```

## Performance Considerations

### Optimization Patterns
- **useMemo**: For expensive calculations (item parsing)
- **useCallback**: For event handlers passed to children
- **React.memo**: For pure components
- **Dynamic Imports**: For large components

### Data Loading
- **Client-side**: Firebase real-time subscriptions
- **Caching**: Browser localStorage for persistence
- **Error Handling**: Try-catch with user feedback

## Testing Strategy

### Current Testing
- **Jest**: Unit testing framework
- **Test Files**: Located in `__test__/` directory
- **Coverage**: Partial coverage of utility functions

### Testing Patterns
```javascript
// Example test structure
describe('Component Name', () => {
  test('should render correctly', () => {
    // Test implementation
  });
});
```

## Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **ES6+ Features**: Supported via Next.js transpilation
- **Mobile**: Responsive design for mobile browsers

## Security Considerations
- **Firebase Rules**: Managed by game developers
- **Client-side Auth**: OAuth tokens handled by Firebase SDK
- **No Sensitive Data**: All configuration is public
- **CORS**: Handled by Firebase and Next.js 