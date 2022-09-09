import React from "react";
import '@testing-library/jest-dom'
import {screen} from "@testing-library/react";

test('Shortdescription should be Defined', () => {
    const input = screen.findByPlaceholderText("Kurzbeschreibung...")
    expect(input).toBeDefined()
})

test('OderDescription should be Defined', () => {
    const input = screen.findByPlaceholderText("Tätigskeitsbeschreibung...")
    expect(input).toBeDefined()
})

test('Deadline should be Defined', () => {
    const input = screen.findByPlaceholderText("Zeitraum...")
    expect(input).toBeDefined()
})

test('Fields which are inside an orderschedule should be Defined', () => {
    const input = screen.findAllByPlaceholderText("Tätigskeitsbeschreibung...")
    expect(input).toBeDefined()
})
