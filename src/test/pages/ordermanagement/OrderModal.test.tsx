import {render, screen} from "@testing-library/react";
import {RenderOrderModificationContent} from "../../../components/ordermanagement/OrderModal";
// @ts-ignore
import defaultOptions = module

test('', () => {
   const rendered =  render(RenderOrderModificationContent(defaultOptions, defaultOptions))
    expect(rendered).toBeDefined()
})
test('Kurzbeschreibung Label rendern', () => {
    const getInput = screen.findAllByPlaceholderText("Kurzbeschreibung...")
    expect(getInput).toBeDefined()
})


test('Tätigkeitsbeschreibung IonLabel rendern', () => {
    const getInput = screen.findAllByPlaceholderText("Tätigkeitsbeschreibung")
    expect(getInput).toBeDefined()
})

test('Geplanter Zeitraum IonLabel rendern', () => {
    const getInput = screen.findAllByPlaceholderText("Zeitraum...")
    expect(getInput).toBeDefined()
})

test('Zu bearbeitende Felder IonLabel rendern', () => {
    const getInput = screen.findAllByPlaceholderText("Felder...")
    expect(getInput).toBeDefined()
})
