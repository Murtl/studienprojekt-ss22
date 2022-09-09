import React from 'react';
import {screen} from '@testing-library/react';

test('find Logout Button', () => {
    const button = screen.findByTestId("logout")
    expect(button).toBeDefined()
});



