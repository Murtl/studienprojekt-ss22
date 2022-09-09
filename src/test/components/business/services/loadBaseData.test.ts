import { loadBaseData } from "../../../../components/business/services/loadBaseData"

test("checkLoadShouldCallLoadAndSetLoadedToTrue", async () => {
    await loadBaseData.checkLoad();
    expect(loadBaseData.getLoaded()).toEqual(true);
})


test("checkloadAndRenderShouldCallLoadAndRenderFields", async() => {
    await loadBaseData.checkloadAndRender();
    expect(loadBaseData.getLoaded()).toEqual(true);
})
