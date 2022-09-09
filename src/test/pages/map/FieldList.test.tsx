import React from "react";
import FieldList from "../../../pages/map/FieldList";
import {render, screen} from "@testing-library/react";
import handleDelete from "../../../pages/map/FieldList";
import handleValidate from "../../../pages/map/FieldList";
import handleDismiss from "../../../pages/map/FieldList";
import handleFinish from "../../../pages/map/FieldList";



test('render Fieldlist', () => {
   const {baseElement} =  render(<FieldList/>)
    expect(baseElement).toBeDefined()
})

test('IonList should be Defined', () => {
    const ionList = screen.findAllByRole("buttondesign")
    expect(ionList).toBeDefined()
})

test('find searchbar by placeholder', () => {
    const input = screen.findAllByPlaceholderText("Feld oder Nutzungsart eingeben...")
    expect(input).toBeDefined()
})

test('functions should be defined', () => {
    expect(handleDelete).toBeDefined();
    expect(handleValidate).toBeDefined()
    expect(handleFinish).toBeDefined();
    expect(handleDismiss).toBeDefined()
})

