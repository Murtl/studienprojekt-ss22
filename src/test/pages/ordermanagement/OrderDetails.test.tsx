import React from 'react';
import {render} from '@testing-library/react';
import OrderDetails from "../../../pages/ordermanagement/OrderDetails";
// @ts-ignore
import defaultOptions = module

test('renders without crashing', () => {
    const { baseElement } = render(<OrderDetails history={defaultOptions} location={defaultOptions} match={defaultOptions} />);
    expect(baseElement).toBeDefined();
});