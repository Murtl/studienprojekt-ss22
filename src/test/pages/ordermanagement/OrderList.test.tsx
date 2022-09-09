import {OrderList} from "../../../pages/ordermanagement/OrderList";
import {render} from "@testing-library/react";


test('renders correct', () => {
        const rendered = render(<OrderList/>)
        const item = rendered.findAllByRole("buttonsOrderList")
        expect(item).toBeDefined()
        expect(rendered).toBeDefined()
})


