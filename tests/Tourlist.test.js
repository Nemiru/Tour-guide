import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TourList from './TourList';
import { useColorScheme } from 'react-native';

jest.mock('react-native/Libraries/Utilities/useColorScheme');
// Mock alert
global.alert = jest.fn();

describe('TourList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correct tours for a known city', () => {
    useColorScheme.mockReturnValue('light');

    const { getByText } = render(<TourList city="Paris" />);

    expect(getByText('Tours in Paris:')).toBeTruthy();
    expect(getByText('Eiffel Tower Tour')).toBeTruthy();
    expect(getByText('Louvre Museum Visit')).toBeTruthy();
  });

  it('renders fallback tour for an unknown city', () => {
    useColorScheme.mockReturnValue('light');

    const { getByText } = render(<TourList city="UnknownCity" />);
    expect(getByText('City Walking Tour')).toBeTruthy();
  });

  it('applies dark mode styles', () => {
    useColorScheme.mockReturnValue('dark');

    const { getByText } = render(<TourList city="Rome" />);
    expect(getByText('Tours in Rome:')).toBeTruthy();
  });

  it('calls alert on "Book Tour" button press', () => {
    useColorScheme.mockReturnValue('light');

    const { getAllByText } = render(<TourList city="Tokyo" />);
    const buttons = getAllByText('Book Tour');

    fireEvent.press(buttons[0]);
    expect(global.alert).toHaveBeenCalledWith('Booked: Mt. Fuji Day Trip');
  });
});
