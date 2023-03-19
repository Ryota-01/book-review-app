import { render, screen } from '@testing-library/react';
import Login from "../components/Login";

test('テスト', () => {
  render(<Login />)
  screen.debug()
})