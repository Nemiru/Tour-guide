import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CitySearch from './CitySearch';

test('calls onSearch with entered city name', () => {
  const mockFn = jest.fn();
  const { getByPlaceholderText, getByText } = render(<CitySearch onSearch={mockFn} />);

  fireEvent.changeText(getByPlaceholderText('Enter a city'), 'Paris');
  fireEvent.press(getByText('Search'));

  expect(mockFn).toHaveBeenCalledWith('Paris');
});
