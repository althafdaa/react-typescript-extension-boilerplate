import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './Options.css';

const Options = <div>Hello from options</div>;

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(Options);
