// __tests__/Signup.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../src/app/signup/page.js';
import { useSession, signIn } from 'next-auth/react';
import '@testing-library/jest-dom'

jest.mock('next-auth/react');
jest.mock('next/link', () => ({ children }) => children);

describe('Signup Component', () => {
  beforeEach(() => {
    useSession.mockReturnValue({ data: null, status: 'unauthenticated' });
  });

  it('renders without crashing', () => {
    render(<Signup />);
    expect(screen.getAllByText('Sign Up').length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });

  it('displays error if passwords do not match', async () => {
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password124' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    expect(await screen.findByText('Passwords do not match')).toBeInTheDocument();
  });

  it('displays success message on successful signup', async () => {
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    signIn.mockReturnValue(Promise.resolve({ ok: true }));

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    expect(await screen.findByText('User registered successfully.')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('/api/signup', expect.anything());
    expect(signIn).toHaveBeenCalledWith('credentials', expect.anything());
  });

  it('displays error message on signup failure', async () => {
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Signup failed' }),
      })
    );

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    expect(await screen.findByText('Signup failed')).toBeInTheDocument();
  });

  it('calls signIn on OAuth button click', async () => {
    render(<Signup />);

    signIn.mockReturnValue(Promise.resolve({ error: null }));

    fireEvent.click(screen.getAllByRole('button')[1]); // Assuming the first button is the signup button and the second is the Google button

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('google', { redirect: false });
    });

    fireEvent.click(screen.getAllByRole('button')[2]); // Assuming the third button is the GitHub button

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('github', { redirect: false });
    });
  });

  it('applies correct styles on mount and cleans up on unmount', () => {
    const { unmount } = render(<Signup />);
    const bodyStyles = document.body.style;

    expect(bodyStyles.fontFamily).toBe("'Poppins', sans-serif");
    expect(bodyStyles.display).toBe('flex');
    expect(bodyStyles.justifyContent).toBe('center');
    expect(bodyStyles.alignItems).toBe('center');
    expect(bodyStyles.minHeight).toBe('100vh');
    expect(bodyStyles.backgroundImage).toBe('url(https://getwallpapers.com/wallpaper/full/2/8/f/537844.jpg)');
    expect(bodyStyles.backgroundRepeat).toBe('no-repeat');
    expect(bodyStyles.backgroundSize).toBe('cover');
    expect(bodyStyles.backgroundPosition).toBe('center');

    unmount();

    expect(bodyStyles.fontFamily).toBe('');
    expect(bodyStyles.display).toBe('');
    expect(bodyStyles.justifyContent).toBe('');
    expect(bodyStyles.alignItems).toBe('');
    expect(bodyStyles.minHeight).toBe('');
    expect(bodyStyles.backgroundImage).toBe('');
    expect(bodyStyles.backgroundRepeat).toBe('repeat');
    expect(bodyStyles.backgroundSize).toBe('auto');
    expect(bodyStyles.backgroundPosition).toBe('0% 0%');
  });
});


