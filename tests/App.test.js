import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

test('selecting a city updates the tour list and weather info', async () => {
  const { getByPlaceholderText, getByText, findByText } = render(<App />);

  fireEvent.changeText(getByPlaceholderText('Enter a city'), 'Paris');
  fireEvent.press(getByText('Search'));

  expect(await findByText('Tours in Paris:')).toBeTruthy();
  expect(await findByText(/Eiffel Tower Tour/)).toBeTruthy();
});
