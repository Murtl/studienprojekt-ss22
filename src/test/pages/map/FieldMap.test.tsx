import React from "react";
import FieldMap from "../../../pages/map/FieldMap";
import {render} from "@testing-library/react";

test('renders FieldMap', () => {
     const {baseElement} = render(<FieldMap/>)
    expect(baseElement).toBeDefined();
})
