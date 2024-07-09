import { cancelJobRegisterApi, detailJobWebApi, getListJobRegisterWebApi } from '@api';
import { Buttonz, Cardz, Hrz, Imagez } from '@components/core';
import { useGetApi } from '@lib/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CurrencyDollarIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { experiences } from '@constant';
import { formatNumber } from '@lib/helper';
import { useAuthContext } from '@context/AuthContext';
import { useConfirmState, useToastState } from '@store';
import Register from './Register';

const Box = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="flex gap-4 items-center">
      <div className="p-2 rounded-full bg-orange-400">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex flex-col gap-1">
        <span>{item.title}</span>
        <b>{item.subtitle}</b>
      </div>
    </div>
  );
};

const icons = { CurrencyDollarIcon, MapPinIcon, ClockIcon, UserGroupIcon, BuildingOfficeIcon };
const Job = () => {
  const { showConfirm } = useConfirmState();
  const { showToast } = useToastState();
  const { isAuthenticated, userInfo } = useAuthContext();
  const navigate = useNavigate();
  const [params, setParams] = useState({ render: false });
  const [checkRegister, setCheckRegister] = useState({ render: false });
  const { slug } = useParams();
  const { data } = useGetApi(detailJobWebApi, { slug, ...params }, 'job');
  const [open, setOpen] = useState(false);
  const { data: jobRegister } = useGetApi(getListJobRegisterWebApi, { ...params }, 'jobregister');

  useEffect(() => {
    if (jobRegister?.length > 0) {
      const item = jobRegister.find((j) => (String(j.job) === String(data?._id) && String(j.user) === String(userInfo?._id)));
      if (item) setCheckRegister(true);
      else setCheckRegister(false);
    } else setCheckRegister(false);
  }, [JSON.stringify(jobRegister), JSON.stringify(data), JSON.stringify(userInfo)]);

  const items = [
    { icon: icons.CurrencyDollarIcon, title: 'Mức lương', subtitle: `${formatNumber(data?.min)} - ${formatNumber(data?.max)}` },
    { icon: icons.MapPinIcon, title: 'Vị trí', subtitle: data?.location?.name },
    { icon: icons.ClockIcon, title: 'Kinh nghiệm', subtitle: experiences.find((e) => e.key === data?.experience)?.label },
    { icon: icons.BuildingOfficeIcon, title: 'Lĩnh vực', subtitle: data?.category?.name },
    { icon: icons.UserGroupIcon, title: 'Số lượng tuyển', subtitle: data?.quantity }
  ];

  const onWarning = async () => {
    showConfirm({
      title: 'Vui lòng đăng nhập để tiếp tục!',
      action: () => navigate('/auth/signin')
    });
  };

  const onRegister = async () => {
    if (!isAuthenticated) return onWarning();
    if (checkRegister) {
      const response = await cancelJobRegisterApi({ job: data?._id });
      if (response) {
        showToast({ title: 'Hủy ứng tuyển thành công!', severity: 'success' });
        setParams((pre) => ({ ...pre, render: !pre.render }));
      }
    } else setOpen(true);
  };

  return (
    <div className="container flex flex-wrap mt-24">
      <Register open={open} setOpen={setOpen} setParams={setParams} job={data?._id}  />
      <div className="lg:w-8/12 w-full px-6">
        <Cardz className="p-4 w-full">
          <div className="flex flex-col w-full">
            <h2 className="uppercase text-left font-bold text-xl text-orange-800 mb-4">{data?.name}</h2>
            <Hrz />
            <div className="flex flex-wrap w-full py-4 px-8">
              {items?.map((item, index) => (
                <div key={index} className="lg:w-6/12 w-full p-2">
                  <Box item={item} />
                </div>
              ))}
            </div>
          </div>
          <Hrz />
          <div className="w-full flex flex-col mt-4">
            <Buttonz color={checkRegister ? 'red' : 'orange'} onClick={() => onRegister()}>
              <div className="flex gap-2 justify-center items-center">
                <PaperAirplaneIcon className="h-4 w-4 stroke-2" />
                {checkRegister ? 'Hủy ứng tuyển' : 'Ứng tuyển ngay'}
              </div>
            </Buttonz>
          </div>
          <h2 className="uppercase font-bold mt-16 mb-4">Chi tiết tuyển dụng</h2>
          <Hrz />
          <div className="mt-4 leading-6">
            <div className="leading-6" dangerouslySetInnerHTML={{ __html: data?.description }} />
          </div>
        </Cardz>
      </div>
      <div className="lg:w-4/12 w-full px-6">
        <Cardz className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-8">
              <div className="h-32 overflow-hidden">
                <Imagez
                  isZoom
                  src={data?.company?.avatar}
                  alt="Ảnh mô tả"
                  className="h-full w-full transition-transform duration-500 ease-in-out transform"
                />
              </div>
              <h2 className="uppercase font-bold">{data?.company?.name}</h2>
            </div>
            <Hrz />
            <span>
              <b>Email:</b> {data?.company?.email}
            </span>
            <span>
              <b>Số điện thoại:</b> {data?.company?.phone}
            </span>
            <span>
              <b>Website:</b> {data?.company?.website}
            </span>
            <span>
              <b>Quy mô:</b> {data?.company?.member}
            </span>
            <span>
              <b>Địa chỉ:</b> {data?.company?.addres}
            </span>
          </div>
        </Cardz>
      </div>
    </div>
  );
};

export default Job;
