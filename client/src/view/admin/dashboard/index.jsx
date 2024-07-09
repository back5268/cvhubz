import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { Cardz, Hrz, Imagez, InputCalendarz } from '@components/core';
import { useGetApi } from '@lib/react-query';
import { getSummaryApi } from '@api';
import { databseDate } from '@lib/helper';
import moment from 'moment';

const Ticket = (props) => {
  const { image, amount, label } = props;

  return (
    <div className="">
      <div className="card flex gap-8 items-center justify-center">
        <Imagez src={image} className="w-20 h-20" />
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl">{amount}</h2>
          <span className="font-medium text-sm">{label}</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [items, setItems] = useState([
    { image: '/images/logo.png', amount: 0, label: 'Đơn hàng' },
    { image: 'https://storage.googleapis.com/cv-hub-2002.appspot.com/1717135770707.png', amount: 0, label: 'Đèn ngủ DIY' },
    { image: 'https://storage.googleapis.com/cv-hub-2002.appspot.com/1717136671298.png', amount: 0, label: 'Đèn ngủ 3D' },
    { image: 'https://storage.googleapis.com/cv-hub-2002.appspot.com/1717136539874.png', amount: 0, label: 'Tranh DIY' }
  ]);
  const [params, setParams] = useState(() => {
    const date = new Date();
    const toDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    const fromDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7, 0, 0, 0);
    return { fromDate, toDate };
  });
  const { data } = useGetApi(
    getSummaryApi,
    { ...params, fromDate: databseDate(params.fromDate), toDate: databseDate(params.toDate) },
    'summary'
  );
  useEffect(() => {
    if (data) {
      setItems((pre) =>
        pre.map((p, index) => {
          if (index === 0) p.amount = data.number;
          if (index === 1) p.amount = data.numberDiy;
          if (index === 2) p.amount = data.number3D;
          if (index === 3) p.amount = data.numberTdiy;
          return p;
        })
      );
    }
  }, [JSON.stringify(data)]);

  return (
    <div className="flex flex-col px-2">
      
    </div>
  );
};

export default Dashboard;
