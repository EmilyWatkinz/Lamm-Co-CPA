import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Reviews from './Reviews';

beforeEach(() => {
  window.localStorage.clear();
  window.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('renders home page heading', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const heading = screen.getByText(/Lamm & Company CPA/i);
  expect(heading).toBeInTheDocument();
});

test('filters out Jane Doe and Sarah Smith reviews', async () => {
  window.localStorage.setItem(
    'lammUserReviews',
    JSON.stringify([
      { quote: 'Great experience', author: 'Jane Doe', userSubmitted: true },
      { quote: 'Helpful team', author: 'Sarah Smith', userSubmitted: true },
      { quote: 'Loved the service', author: 'Pamela Vasquez', userSubmitted: true },
    ])
  );

  render(
    <MemoryRouter>
      <Reviews />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.queryAllByText(/Jane Doe/i)).toHaveLength(0);
    expect(screen.queryAllByText(/Sarah Smith/i)).toHaveLength(0);
  });

  expect(screen.getAllByText(/Pamela Vasquez/i).length).toBeGreaterThan(0);
});
