import { getListCompanyWebApi } from '@api';
import DataFilter from '@components/base/DataFilter';
import { Cardz, Hrz, Inputz } from '@components/core';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { CardCompany } from '../shared';

const Companies = () => {
  const [params, setParams] = useState({});
  const [filter, setFilter] = useState({});
  const { data } = useGetApi(getListCompanyWebApi, params, 'companyweb');

  return (
    <div className="container flex flex-col gap-10 mt-24 text-center">
      <Cardz className="p-4">
        <div className="flex flex-col gap-2">
          <h2 className="uppercase text-left font-bold text-xl text-orange-800">Danh sách công ty</h2>
          <Hrz />
          <p className="text-left">Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho bạn</p>
          <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
            <Inputz
              className="lg:w-6/12"
              value={filter.keySearch}
              onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
              label="Tìm kiếm theo tên công ty"
            />
          </DataFilter>
        </div>

        <Hrz />
        <div className="flex flex-wrap mt-4">
          {data?.map((item, index) => (
            <div key={index} className="w-full md:w-6/12 lg:w-4/12">
              <CardCompany item={item} />
            </div>
          ))}
        </div>
      </Cardz>
    </div>
  );
};

export default Companies;
