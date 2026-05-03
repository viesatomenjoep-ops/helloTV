import React from 'react';
import { renderToString } from 'react-dom/server';
import { Dashboard } from './src/app/components/Dashboard';
import { Inventory } from './src/app/components/Inventory';
import { CRM } from './src/app/components/CRM';
import { SalesTracker } from './src/app/components/SalesTracker';
import { Showcase } from './src/app/components/Showcase';

try {
  console.log("Testing Dashboard...");
  renderToString(React.createElement(Dashboard, {}));
  console.log("Testing Inventory...");
  renderToString(React.createElement(Inventory, {}));
  console.log("Testing CRM...");
  renderToString(React.createElement(CRM, {}));
  console.log("Testing SalesTracker...");
  renderToString(React.createElement(SalesTracker, {}));
  console.log("Testing Showcase...");
  renderToString(React.createElement(Showcase, {}));
  console.log("Render successful!");
} catch (error) {
  console.error("RENDER ERROR:", error);
}
