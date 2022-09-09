import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { orderServiceGlobal } from "../business/services/orderService";


export function RenderStatsContent(): JSX.Element {

  function getData(){
    if(orderServiceGlobal.getOrder() !== undefined){
      return orderServiceGlobal.getOrder().getFormatedStats();
    }
  }

    return (
        <ResponsiveContainer minWidth={undefined} maxHeight={undefined} width="100%" height="100%">
          <BarChart
            width={100}
            height={300}
            data={getData()}
            
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="field" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip  contentStyle={{color: "black"}}/>
            <Legend />
            <Bar yAxisId="left" dataKey="distance" fill="#8884d8" name={"Strecke in Metern"}/>
            <Bar yAxisId="right" dataKey="time" fill="#82ca9d" name={"Zeit in Minuten"}/>
          </BarChart>
        </ResponsiveContainer>
      );

    
}
