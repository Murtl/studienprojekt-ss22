import React from "react";
import Toolbar from "../../components/Toolbar";
import {render, screen} from "@testing-library/react";
import {db} from "../../firebase";

test('render Toolbar if authorized', () => {
    db.app
    const rendered = render(<Toolbar title={"Titel"}/>)
    expect(rendered).toBeDefined()

})

test('Logo Image should be defined', () => {
    const input = screen.findAllByText("img")
    expect(input).toBeDefined()
})






