import { render, screen } from '@testing-library/react';
import App from './App';
import {HashRouter} from "react-router-dom";

test('renders start screen text', () => {
  render(<HashRouter><App /></HashRouter>);
  const linkElement = screen.getByText(/start screen/i);
  expect(linkElement).toBeInTheDocument();
});
