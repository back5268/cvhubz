import {deleteCompanyApi, getListCompanyApi, updateCompanyApi} from '@api';
import { DataTable, FormList } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, Imagez, Inputz } from '@components/core';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import DetailCompany from './Detail';

const Companies = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListCompanyApi, params, 'companies');

  const columns = [
    { label: 'Tên công ty', field: 'name' },
    {
      label: 'Logo',
      body: (e) => (
        <div className="flex justify-center">
          <Imagez isZoom src={e.avatar} className="h-24 w-24" />
        </div>
      )
    },
    { label: 'Email', field: 'email' },
    { label: 'Số điện thoại', field: 'phone' },
    { label: 'Địa chỉ', field: 'address' },
    { label: 'Website', field: 'website' },
  ];

  return (
    <FormList title="Danh sách công ty">
      <DetailCompany open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter}>
        <Inputz value={filter.keySearch} onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })} label="Tìm kiếm theo tên" />
        <Inputz
          value={filter.address}
          onChange={(e) => setFilter({ ...filter, address: e.target.value })}
          label="Tìm kiếm theo địa chỉ"
        />
        <Dropdownz value={filter.status} onChange={(e) => setFilter({ ...filter, status: e })} options={statuses} label="Trạng thái" />
      </DataFilter>
      <Hrz />
      <DataTable
        isLoading={isLoading}
        data={data?.documents}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail', 'delete']}
        setShow={setOpen}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id),
          deleteApi: deleteCompanyApi,
        }}
        statusInfo={{ changeStatusApi: updateCompanyApi }}
        headerInfo={{ onCreate: () => setOpen(true) }}
      />
    </FormList>
  );
};

export default Companies;
