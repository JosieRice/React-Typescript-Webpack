import { screen } from '@testing-library/dom';
import { render, waitFor } from 'jestTestUtils';
import Index from './Index';

test('404 page renders when given a bad route', async () => {
    render(<Index />);

    await waitFor(() => expect(screen.getByRole('heading', { name: /react signin page/i })));
});
