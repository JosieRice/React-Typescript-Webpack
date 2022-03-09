import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import init from './init';

/** everything that should be initialized globally on load goes here */
init();

/** global react entry point for wrappers that affect the whole app */
ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
);
