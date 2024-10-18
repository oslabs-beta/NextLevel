// __tests__/Dashboard.test.js
import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Dashboard from '../src/app/dashboard/page';
import withAuth from '../src/app/components/withAuth';

jest.mock('../src/app/dashboard/components/sidebar', () => () => <div>Mocked SideBar</div>);
jest.mock('../src/app/dashboard/components/APIkey', () => () => <div>Mocked APIKey</div>);
jest.mock('../src/app/dashboard/components/WebVitalsContainer', () => () => <div>Mocked WebVitalsContainer</div>);
jest.mock('../src/app/dashboard/components/buildtimecontainer', () => () => <div>Mocked BuildTimeContainer</div>);

// Mocking withAuth higher-order component
jest.mock('../src/app/components/withAuth', () => (Component) => (props) => <Component {...props} />);

describe('Dashboard Component', () => {
  const props = {
    searchParams: {
      username: 'testuser',
    },
  };

  it('renders without crashing', () => {
    render(<Dashboard {...props} />);
    expect(screen.getByText('Mocked SideBar')).toBeInTheDocument();
    expect(screen.getByText('Mocked APIKey')).toBeInTheDocument();
    expect(screen.getByText('Mocked WebVitalsContainer')).toBeInTheDocument();
    expect(screen.getByText('Mocked BuildTimeContainer')).toBeInTheDocument();
  });

  it('passes the correct username to the SideBar component', () => {
    render(<Dashboard {...props} />);
    const sideBarElement = screen.getByText('Mocked SideBar');
    expect(sideBarElement).toBeInTheDocument();
  });

  it('passes the correct username to the APIKey component', () => {
    render(<Dashboard {...props} />);
    const apiKeyElement = screen.getByText('Mocked APIKey');
    expect(apiKeyElement).toBeInTheDocument();
  });

  it('passes the correct username to the WebVitalsContainer component', () => {
    render(<Dashboard {...props} />);
    const webVitalsElement = screen.getByText('Mocked WebVitalsContainer');
    expect(webVitalsElement).toBeInTheDocument();
  });

  it('passes the correct username to the BuildTimeContainer component', () => {
    render(<Dashboard {...props} />);
    const buildTimeElement = screen.getByText('Mocked BuildTimeContainer');
    expect(buildTimeElement).toBeInTheDocument();
  });
});
