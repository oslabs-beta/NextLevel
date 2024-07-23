// __tests__/Home.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Home from '../src/app/page';
import '@testing-library/jest-dom';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  };
});

// Mock next/image
jest.mock('next/image', () => {
  return (props) => {
    return <img {...props} />;
  };
});

describe('Home Component', () => {
  beforeEach(() => {
    // Mock the scroll event
    global.scrollY = 0;
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText('Take your application to the')).toBeInTheDocument();
    expect(screen.getByText('STEP ONE')).toBeInTheDocument();
    expect(screen.getByText('STEP TWO')).toBeInTheDocument();
    expect(screen.getByText('STEP THREE')).toBeInTheDocument();
    expect(screen.getByText('Tracked Metrics Include :')).toBeInTheDocument();
  });

  it('adds "show-animate" class on mount', () => {
    const { container } = render(<Home />);
    const section = container.querySelector('.sec-1');
    expect(section).toHaveClass('show-animate');
  });

  it('adds "show-animate" class on scroll', () => {
    const { container } = render(<Home />);
    const sections = container.querySelectorAll('section');

    act(() => {
      window.scrollY = 400;
      window.dispatchEvent(new Event('scroll'));
    });

    sections.forEach((section) => {
      expect(section).toHaveClass('show-animate');
    });
  });

  it('removes event listener on unmount', () => {
    const { unmount } = render(<Home />);
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
