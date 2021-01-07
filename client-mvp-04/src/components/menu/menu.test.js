import React from 'react';
import 'react-redux';
import { fireEvent, screen } from '@testing-library/react';
import Menu from '../menu/menu';
import { useSelector } from 'react-redux';
import {
  userAuthSuccessMockState,
  userAuthFailMockState,
} from '../../utils/testUtils/mocks/authMock';
import {
  history,
  testRender,
  createTestStore,
} from '../../utils/testUtils/testUtils';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Should display Menu if user authorized in app', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => {
      return callback(userAuthSuccessMockState);
    });

    const store = createTestStore();
    testRender(<Menu />, { store });
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  test('Should display Menu if user logged in', () => {
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  test('Should display 5 menu items for accessLevel: "user" and redirect to dummy page', () => {
    expect(screen.getByTestId('menu-dashboard-item')).toBeInTheDocument();
    expect(screen.getByTestId('menu-dashboard-item')).toHaveAttribute(
      'href',
      '/dashboard'
    );
    expect(screen.getByTestId('menu-profile-item')).toBeInTheDocument();
    expect(screen.getByTestId('menu-profile-item')).toHaveAttribute(
      'href',
      '/page'
    );
    expect(screen.getByTestId('menu-projects-item')).toBeInTheDocument();
    expect(screen.getByTestId('menu-projects-item')).toHaveAttribute(
      'href',
      '/page'
    );
    expect(screen.getByTestId('menu-community-item')).toBeInTheDocument();
    expect(screen.getByTestId('menu-community-item')).toHaveAttribute(
      'href',
      '/page'
    );
    expect(screen.getByTestId('menu-logout-item')).toBeInTheDocument();
    expect(screen.getByTestId('menu-logout-item')).toHaveAttribute(
      'href',
      '/page'
    );
  });

  test('Should not display "Admin Tools" menu item for accessLevel: "user"', () => {
    expect(screen.queryByTestId('menu-admin-tools-item')).toBeFalsy();
  });

  test('Menu item should contain icon', () => {
    expect(screen.getByTestId('menu-dashboard-item')).toContainElement(
      screen.getByTestId('menu-icon')
    );
  });

  test('Should redirect to dashboard page if click on "Dashboard" menu item', () => {
    expect(history.location.pathname).toBe('/');
    expect(screen.getByTestId('menu-dashboard-item')).toHaveAttribute(
      'href',
      '/dashboard'
    );
    fireEvent.click(screen.getByTestId('menu-dashboard-item'));
    expect(history.location.pathname).toBe('/dashboard');
  });

  test('Should redirect to dummy page if click on "Profile" menu item', () => {
    expect(history.location.pathname).toBe('/dashboard');
    expect(screen.getByTestId('menu-profile-item')).toHaveAttribute(
      'href',
      '/page'
    );
    fireEvent.click(screen.getByTestId('menu-profile-item'));
    expect(history.location.pathname).toBe('/page');
  });
});

describe('Should not display Menu', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => {
      return callback(userAuthFailMockState);
    });

    const store = createTestStore();
    testRender(<Menu />, { store });
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  test('Should not display Menu if user not authorized in app', () => {
    expect(screen.queryByTestId('menu')).toBeFalsy();
  });
});
