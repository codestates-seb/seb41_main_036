import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import axios from "../utils/axiosinstance";

// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 }
// ];

const COLORS = ["#96bbdb", "#86ccbf", "#efafaf", "#e7ff88"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  userData
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  console.log('되나',userData);
  return (
    <text
      // x={x}
      // y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${userData}`}
    </text>
  );
};

const ChartInfo = styled.div`
  width:270px;
  height: 400px;
  background-color: red;
  margin-left: 450px;
  margin-top: -340px;
`

const Charts = ({userData}:{userData:any}) => {
  // 나의 post 데이터들로 파이차트 구성 
  console.log(userData.posts)
  return (
    <>
    <PieChart width={400} height={400}>
      <Pie
        data={userData.posts}
        cx={210}
        cy={230}
        labelLine={true}
        label={renderCustomizedLabel}
        outerRadius={150}
        fill="#8884d8"
        dataKey="postId"
      >
        {userData.posts.map((entry:any, index:any) => (
          <Cell key={`cell-${entry.postTitle}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    <ChartInfo>이거</ChartInfo>
    </>
  );
}

export default Charts;
