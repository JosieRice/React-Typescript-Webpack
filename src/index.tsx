import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import init from './init';
import Router from './Router';

/** everything that should be initialized globally on load goes here */
init();

/** global react entry point for wrappers that affect the whole app */
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
    <StrictMode>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </StrictMode>
);
