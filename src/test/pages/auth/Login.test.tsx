import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from '../../../App'
import Login from "../../../pages/auth/Login";

// @ts-ignore
import defaultOptions = module

test('renders without crashing', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeDefined();
});

test('find Login Button', () => {
    const baseElement  = render(<Login history={defaultOptions} location={defaultOptions} match={defaultOptions}/>);
    const button = baseElement.getByText("Login")
    fireEvent.click(button)
    expect(button).toBeDefined()
    expect(baseElement).toBeDefined()
});

test('find Password input', () => {
    const input = screen.findByTestId("password")
    expect(input).toBeDefined()
});

test('find email input', () => {
    const input = screen.findByTestId("email")
    expect(input).toBeDefined()
});

test('find Login Label', () => {
    const label = screen.findByTestId("loginlabel")
    expect(label).toBeDefined()
});



