import React from 'react';
import nanoid from 'nanoid';
import { Card, Spin } from 'antd';
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

export default ({
  title, data, loading, label = 'name', key = 'count', color = '#1890ff'
}) => {
  const id = `count-${nanoid()}`;

  return (
    <Card title={title}>
      <Spin spinning={loading}>
        <div className="chart">
          <ResponsiveContainer>
            <AreaChart data={data}>
              <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey={key}
                stroke={color}
                fillOpacity={1}
                fill={`url(#${id})`}
              />

              <XAxis dataKey={label} style={{ fontSize: 12 }} />
              <YAxis />

              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Spin>
    </Card>
  );
};
