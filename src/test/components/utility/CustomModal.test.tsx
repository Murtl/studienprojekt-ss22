import React from "react";
import CustomModal from "../../../components/utility/CustomModal";
import {render} from "@testing-library/react";

// @ts-ignore
import defaultOptions = module


test('render CustomModal', () => {
    const {baseElement} =render(<CustomModal title={"Titel"}
                                             onDismiss={defaultOptions}
                                             onFinish={defaultOptions}
                                             setInvalidMessage={() => {return "";}}/>)
    expect(baseElement).toBeDefined();

})


