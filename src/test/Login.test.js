import { render, screen } from "@testing-library/react";
import Login from "../components/Login";

describe('Login', () => {
  it('label elements', () => {
    render(<Login />);
    const labelElement = screen.getByLabelText('password');
    expect(labelElement).toBeInTheDocument()
  });
});