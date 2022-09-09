import React from "react";
import '@testing-library/jest-dom'
import {render, screen} from "@testing-library/react";

test('NameInputField should be Defined', () => {
    const input = screen.findAllByPlaceholderText("Name...")
    expect(input).toBeDefined()
})

test('TypeofUse should be Defined', () => {
    const input = screen.findAllByPlaceholderText("Nutzungsart...")
    expect(input).toBeDefined()
})

