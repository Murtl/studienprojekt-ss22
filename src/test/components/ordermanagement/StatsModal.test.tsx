import {RenderStatsContent} from "../../../components/ordermanagement/StatsModal";
import {render} from "@testing-library/react";
import {ResponsiveContainer} from "recharts";
// @ts-ignore
import defaultOptions = module


test('should render', () => {
    expect(render(<RenderStatsContent></RenderStatsContent>)).toBeDefined()
    expect(<ResponsiveContainer children={defaultOptions}/>).toBeDefined()
})


