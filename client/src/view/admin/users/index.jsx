import { deleteUserApi, getListUserApi, resetPasswordApi, updateUserApi } from '@api';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Buttonz, Dialogz, Dropdownz, Hrz, Imagez, Inputz } from '@components/core';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import DetailUser from './Detail';
import { useConfirmState, useToastState } from '@store';

const Users = () => {
  const { showConfirm } = useConfirmState();
  const { showToast } = useToastState();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(null);
  const { isLoading, data } = useGetApi(getListUserApi, params, 'users');

  const columns = [
    { label: 'Họ tên', field: 'fullName' },
    { label: 'Ảnh đại diện', body: e => <div className='flex justify-center'><Imagez isZoom src={e.avatar} className="h-24 w-24" /></div> },
    { label: 'Email', field: 'email' },
    { label: 'Số điện thoại', field: 'phone' },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) },
    { label: 'Lần đăng nhập cuối', body: (item) => TimeBody(item.lastLogin) },
  ];

  const onResetPassword = (item) => {
    showConfirm({
      title: `Bạn có chắc chắn muốn đổi mật khẩu tài khoản ${item.email}`,
      action: async () => {
        const response = await resetPasswordApi({ _id: item._id });
        if (response) {
          showToast({ title: 'Đổi mật khẩu thành công!', severity: 'success' });
          setPassword(response);
        }
      }
    });
  };

  return (
    <FormList title="Danh sách người dùng">
      <Dialogz title="CV Hub" open={Boolean(password)} setOpen={setPassword} className="w-[500px]">
        <div className="p-6 text-left">
          Đổi mật khẩu thành công, mật khẩu mới là <b>{password}</b>
        </div>
        <Hrz />
        <div className="flex gap-4 justify-end mt-4">
          <Buttonz label="Xác nhận" onClick={async () => setPassword(false)} />
        </div>
      </Dialogz>
      <DetailUser open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter}>
        <Inputz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tên"
        />
        <Inputz
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
          label="Tìm kiếm theo email, số điện thoại"
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
          deleteApi: deleteUserApi,
          moreActions: [
            {
              icon: ArrowPathIcon,
              onClick: (item) => onResetPassword(item)
            }
          ]
        }}
        statusInfo={{ changeStatusApi: updateUserApi }}
        headerInfo={{ onCreate: () => setOpen(true) }}
      />
    </FormList>
  );
};

export default Users;
