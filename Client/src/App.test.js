import { render, screen } from '@testing-library/react';
import App from './App';

test('renders user login', () => {
  render(<App />);
  const textElement = screen.getByText("Register");
  expect(textElement).toBeInTheDocument();
});

