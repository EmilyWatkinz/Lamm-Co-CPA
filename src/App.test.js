import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Reviews from './Reviews';
import PayBill from './PayBill';
import SecureUpload from './SecureUpload';
import EmployeePortal from './EmployeePortal';

jest.mock('./firebaseUpload', () => ({
  isFirebaseUploadConfigured: () => true,
  uploadFilesAndSendNotification: jest.fn(),
}));

beforeEach(() => {
  window.localStorage.clear();
  window.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { href: '' },
    writable: true,
  });
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

test('requires employee login before showing time off and announcements', () => {
  render(
    <MemoryRouter initialEntries={['/employee-portal']}>
      <Routes>
        <Route path="/employee-portal" element={<EmployeePortal />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /employee portal/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /request time off/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /view employee documents/i })).not.toBeInTheDocument();
  expect(screen.queryByText(/employee updates & announcements/i)).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/employee email/i), { target: { value: 'ewatkins@lammcocpa.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secure-password' } });
  fireEvent.click(screen.getByRole('button', { name: /log in/i }));

  expect(screen.getByRole('button', { name: /request time off/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /view employee documents/i })).toBeInTheDocument();
  expect(screen.getByText(/employee updates & announcements/i)).toBeInTheDocument();
});

test('sends time off requests to the internal recipient through the backend API', async () => {
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ message: 'Time off request sent.' }),
  });

  render(
    <MemoryRouter initialEntries={['/employee-portal']}>
      <Routes>
        <Route path="/employee-portal" element={<EmployeePortal />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/employee email/i), { target: { value: 'ewatkins@lammcocpa.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secure-password' } });
  fireEvent.click(screen.getByRole('button', { name: /log in/i }));

  fireEvent.change(screen.getByLabelText(/hours requested/i), { target: { value: '16' } });
  fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: '2026-12-10' } });
  fireEvent.change(screen.getByLabelText(/end date/i), { target: { value: '2026-12-12' } });
  fireEvent.change(screen.getByLabelText(/reason/i), { target: { value: 'Family vacation' } });
  fireEvent.click(screen.getByRole('button', { name: /request time off/i }));

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock.mock.calls[0][0]).toContain('/api/employee-timeoff');
    expect(fetchMock.mock.calls[0][1]).toEqual(expect.objectContaining({ method: 'POST' }));
  });

  fetchMock.mockRestore();
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

test('creates a payment link request email for ar@lammcocpa.com', () => {
  render(
    <MemoryRouter>
      <PayBill />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Smith' } });
  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'jane@example.com' } });
  fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '208-555-0133' } });
  fireEvent.change(screen.getByLabelText(/business or client name/i), { target: { value: 'Smith Consulting' } });
  fireEvent.change(screen.getByLabelText(/amount due/i), { target: { value: '$500' } });
  fireEvent.change(screen.getByLabelText(/additional notes/i), { target: { value: 'Need a secure payment link.' } });

  fireEvent.click(screen.getByRole('button', { name: /request link for payment/i }));

  expect(window.location.href).toContain('mailto:ar@lammcocpa.com');
  expect(window.location.href).toContain('Jane%20Smith');
});

test('sends secure uploads to the backend email API instead of Firebase', async () => {
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ message: 'Documents emailed to ar@lammcocpa.com.' }),
  });

  render(
    <MemoryRouter>
      <SecureUpload />
    </MemoryRouter>
  );

  const file = new File(['hello'], 'test.pdf', { type: 'application/pdf' });
  fireEvent.change(screen.getByLabelText(/choose documents/i), { target: { files: [file] } });
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Smith' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
  fireEvent.change(screen.getByLabelText(/notes/i), { target: { value: 'Please review' } });
  fireEvent.click(screen.getByRole('button', { name: /send documents/i }));

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock.mock.calls[0][0]).toContain('/api/secure-upload');
    expect(fetchMock.mock.calls[0][1]).toEqual(expect.objectContaining({ method: 'POST' }));
  });

  fetchMock.mockRestore();
});
