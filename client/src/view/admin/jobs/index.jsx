import { deleteJobApi, getListCategoryInfoApi, getListCompanyInfoApi, getListJobApi, getListLocationInfoApi, updateJobApi } from '@api';
import { DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, Inputz } from '@components/core';
import { experiences, statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import DetailJob from './Detail';
import { formatNumber } from '@lib/helper';

const Jobs = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListJobApi, params, 'Jobs');
  const { data: companies } = useGetApi(getListCompanyInfoApi, params, 'companies');
  const { data: locations } = useGetApi(getListLocationInfoApi, params, 'locations');
  const { data: categories } = useGetApi(getListCategoryInfoApi, params, 'categories');

  const columns = [
    { label: 'Tên công việc', field: 'name' },
    { label: 'Công ty', body: (e) => companies.find((c) => c._id === e.company)?.name },
    { label: 'Danh mục', body: (e) => categories.find((c) => c._id === e.category)?.name },
    { label: 'Vị trí', body: (e) => locations.find((c) => c._id === e.location)?.name },
    {
      label: 'Mức lương',
      body: (e) => (
        <span>
          {formatNumber(e.min)} - {formatNumber(e.max)}
        </span>
      )
    },
    {
      label: 'Kinh nghiệm',
      body: (e) => experiences.find((ex) => e.experience === ex.key)?.key
    },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) }
  ];

  return (
    <FormList title="Danh sách công việc">
      <DetailJob
        open={open}
        setOpen={setOpen}
        setParams={setParams}
        data={data?.documents}
        companies={companies}
        locations={locations}
        categories={categories}
      />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-9/12">
        <Inputz value={filter.keySearch} onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })} label="Tìm kiếm theo tên" />
        <Dropdownz
          value={filter.company}
          onChange={(e) => setFilter({ ...filter, company: e })}
          optionLabel="name"
          optionValue="_id"
          options={companies}
          label="Công ty"
        />
        <Dropdownz
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e })}
          optionLabel="name"
          optionValue="_id"
          options={categories}
          label="Danh mục"
        />
        <Dropdownz
          value={filter.location}
          onChange={(e) => setFilter({ ...filter, location: e })}
          optionLabel="name"
          optionValue="_id"
          options={locations}
          label="Vị trí"
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
          deleteApi: deleteJobApi
        }}
        statusInfo={{ changeStatusApi: updateJobApi }}
        headerInfo={{ onCreate: () => setOpen(true) }}
      />
    </FormList>
  );
};

export default Jobs;
