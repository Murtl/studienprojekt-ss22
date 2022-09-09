import {render} from "@testing-library/react";
import OrderManagement from "../../../pages/ordermanagement/OrderManagement";

// @ts-ignore
import defaultOptions = module

test('render component', () => {
    const rendered = render(<OrderManagement history={defaultOptions} location={defaultOptions} match={defaultOptions}/>)
    expect(rendered).toBeDefined()
})
