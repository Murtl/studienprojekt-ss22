import React from 'react';
import {screen} from '@testing-library/react';



test( 'find registerButton', () => {
    const RegisterButton = screen.findByTestId("registerButton");
    expect(RegisterButton).toBeDefined();
})

test('find email input by Id', () => {
    const emailInput = screen.findByTestId("email")
    expect(emailInput).toBeDefined()
});

test('find email by placeholder', () => {
    const emailInput = screen.findAllByPlaceholderText("Email")
    expect(emailInput).toBeDefined()
})

test('find password input by Id', () => {
    const passwordInput = screen.findByTestId("password")
    expect(passwordInput).toBeDefined()
});

test('find password by placeholder', () => {
    const passwordInput = screen.findAllByPlaceholderText("Passwort")
    expect(passwordInput).toBeDefined()
})

test('find controll password input by Id', () => {
    const cpasswordInput = screen.findByTestId("cpassword")
    expect(cpasswordInput).toBeDefined()
});

test('find email by placeholder', () => {
    const cpasswordInput = screen.findAllByPlaceholderText("Passwort wiederholen")
    expect(cpasswordInput).toBeDefined()
})

