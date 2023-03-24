import { render, screen } from '@testing-library/react';
import Login from '../components/Login';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { store } from '../store';
import { BrowserRouter } from 'react-router-dom';

it('Login',() => {
  // const initialState = {output: 10};
  // const mockStore = configureStore({reducer});
  // let store;

  const { debug } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
  debug(screen.queryByLabelText('password'));
  debug(screen.queryByLabelText('e-mail'));

  // const labelElement = screen.getByLabelText(/password/i);
  // expect(labelElement).toBeInTheDocument();
});