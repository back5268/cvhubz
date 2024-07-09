import { getListCategoryInfoApi, getListCompanyInfoApi, getListJobRegisterApi } from '@api';
import { DataTable, FormList, TimeBody } from '@components/base';
import { Imagez } from '@components/core';
import { experiences } from '@constant';
import { useGetParams } from '@hook';
import { formatNumber } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';

const JobRegister = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const { isLoading, data } = useGetApi(getListJobRegisterApi, params, 'JobRegister');
  const { data: companies } = useGetApi(getListCompanyInfoApi, params, 'companiyinfo');
  const { data: categories } = useGetApi(getListCategoryInfoApi, params, 'categoryinfo');

  const columns = [
    {
      label: 'Công việc',
      body: (e) => (
        <div className="flex gap-3">
          <Imagez isZoom src={e.job?.avatar} className="h-24 w-24" />
          <div className="flex flex-col gap-1">
            <span>
              Tên công việc: <b>{e.job?.name}</b>
            </span>
            <span>
              Mức lương:{' '}
              <b>
                {formatNumber(e.job?.min)} - {formatNumber(e.job?.max)}
              </b>
            </span>
            <span>
              Công ty: <b>{companies?.find((c) => c._id === e.job?.company)?.name}</b>
            </span>
            <span>
              Lĩnh vực: <b>{categories?.find((c) => c._id === e.job?.category)?.name}</b>
            </span>
            <span>
              Kinh nghiệm: <b>{experiences?.find((e) => e.key === e.job?.experience)?.label}</b>
            </span>
          </div>
        </div>
      )
    },
    {
      label: 'Người ứng tuyển',
      body: (e) => (
        <div className="flex gap-3">
          <Imagez isZoom src={e.user?.avatar} className="h-24 w-24" />
          <div className="flex flex-col gap-1">
            <span>
              Họ tên: <b>{e.user?.fullName}</b>
            </span>
            <span>
              Email: <b>{e.user?.email}</b>
            </span>
            <span>
              Số điện thoại: <b>{e.user?.phone}</b>
            </span>
          </div>
        </div>
      )
    },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) }
  ];

  return (
    <FormList title="Danh sách ứng tuyển">
      <DataTable isLoading={isLoading} data={data?.documents} total={data?.total} columns={columns} params={params} setParams={setParams} />
    </FormList>
  );
};

export default JobRegister;
