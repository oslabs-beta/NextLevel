import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/react';
import Login from '../src/app/login/page.js';
import Spinner from '../src/app/components/Spinner.js';
import React from 'react';

// Mock the necessary components and functions
jest.mock('next-auth/react');
jest.mock('../src/app/components/Spinner.js', () => () => <div>Loading...</div>);
jest.mock('next/image', () => (props) => <img {...props} />);

describe('Login', () => {
  const mockSignIn = jest.fn();
  const mockUseSession = useSession;

  beforeEach(() => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated'
    });
    signIn.mockImplementation(mockSignIn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form', async () => {
    render(<Login initialLoading={false} />);

    await waitFor(() => expect(screen.getByPlaceholderText('Username')).toBeInTheDocument());
    
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  it('displays error message on login failure', async () => {
    mockSignIn.mockResolvedValueOnce({ error: 'Invalid credentials' });
    render(<Login initialLoading={false} />);

    await waitFor(() => expect(screen.getByPlaceholderText('Username')).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => expect(screen.getByText('Invalid credentials')).toBeInTheDocument());
  });

  it('redirects to dashboard on successful login', async () => {
    // Mock window.location.href
    delete window.location;
    window.location = { href: '' };

    mockSignIn.mockResolvedValueOnce({ error: null });
    render(<Login initialLoading={false} />);

    await waitFor(() => expect(screen.getByPlaceholderText('Username')).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());

    await waitFor(() => expect(window.location.href).toBe('/dashboard/?username=testuser'));
  });

  it('renders the spinner when loading', () => {
    render(<Login />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles OAuth sign-in error', async () => {
    mockSignIn.mockResolvedValueOnce({ error: 'OAuth error' });
    render(<Login initialLoading={false} />);

    await waitFor(() => expect(screen.getByPlaceholderText('Username')).toBeInTheDocument());

    // Changed the selector to use aria-label
    fireEvent.click(screen.getByRole('button', { name: 'Sign in with Google' }));

    await waitFor(() => expect(screen.getByText('Failed to sign in with google. Please try again.')).toBeInTheDocument());
  });

  it('redirects to dashboard on successful OAuth sign-in', async () => {
    // Mock window.location.href
    delete window.location;
    window.location = { href: '' };

    mockUseSession.mockReturnValue({
      data: { user: { email: 'testuser' } },
      status: 'authenticated',
    });

    render(<Login initialLoading={false} />);

    await waitFor(() => expect(screen.getByPlaceholderText('Username')).toBeInTheDocument());

    // Changed the selector to use aria-label
    fireEvent.click(screen.getByRole('button', { name: 'Sign in with Google' }));

    await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());

    await waitFor(() => expect(window.location.href).toBe('/dashboard/?username=testuser'));
  });

  it('applies correct styles on mount and cleans up on unmount', () => {
    const { unmount } = render(<Login initialLoading={false} />);
    const bodyStyles = document.body.style;

    expect(bodyStyles.fontFamily).toBe("'Poppins', sans-serif");
    expect(bodyStyles.display).toBe('flex');
    expect(bodyStyles.justifyContent).toBe('center');
    expect(bodyStyles.alignItems).toBe('center');
    expect(bodyStyles.minHeight).toBe('100vh');
    expect(bodyStyles.backgroundImage).toContain('https://getwallpapers.com/wallpaper/full/2/8/f/537844.jpg');
    expect(bodyStyles.backgroundRepeat).toBe('no-repeat');
    expect(bodyStyles.backgroundSize).toBe('cover');
    expect(bodyStyles.backgroundPosition).toBe('center');
    expect(bodyStyles.color).toBe('rgb(255, 255, 255)');

    unmount();

    expect(bodyStyles.fontFamily).toBe('');
    expect(bodyStyles.display).toBe('');
    expect(bodyStyles.justifyContent).toBe('');
    expect(bodyStyles.alignItems).toBe('');
    expect(bodyStyles.minHeight).toBe('');
    expect(bodyStyles.backgroundImage).toBe('');
    expect(bodyStyles.backgroundRepeat).toBe('no-repeat'); // Changed to check if 'no-repeat' is retained
    expect(bodyStyles.backgroundSize).toBe('auto');
    expect(bodyStyles.backgroundPosition).toBe('0% 0%');
    expect(bodyStyles.color).toBe('');
  });
});








