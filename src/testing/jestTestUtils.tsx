import '@testing-library/jest-dom/extend-expect';
import { render, RenderOptions } from '@testing-library/react';
import { JSXElementConstructor, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

interface RenderOptionsWithRoute extends RenderOptions {
    route: string;
}

interface Props {
    children: ReactElement<any, string | JSXElementConstructor<any>>;
}

const AllTheProviders = ({ children }: Props) => <BrowserRouter>{children}</BrowserRouter>;

const customRender = (ui: ReactElement, options?: Omit<RenderOptionsWithRoute, 'wrapper'>) => {
    window.history.pushState({}, 'Test page', options?.route || '/');
    return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';
export { customRender as render };

