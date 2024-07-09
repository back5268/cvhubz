import { getListTemplateWebApi } from '@api';
import DataFilter from '@components/base/DataFilter';
import { Buttonz, Cardz, Hrz, Imagez, Inputz } from '@components/core';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { ArrowDownTrayIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline';

const Templates = () => {
  const [params, setParams] = useState({});
  const [filter, setFilter] = useState({});
  const { data } = useGetApi(getListTemplateWebApi, params, 'templateweb');

  const handleDownload = ({ url, filename }) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank'
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container flex flex-col gap-10 mt-24 text-center">
      <div className="lg:w-9/12 w-full">
        <Cardz className="p-4">
          <div className="flex flex-col gap-2">
            <h2 className="uppercase text-left font-bold text-xl text-orange-800">Danh sách mẫu CV</h2>
            <Hrz />
            <p className="text-left">Công cụ tạo dấu ấn cá nhân, gây ấn tượng với nhà tuyển dụng</p>
            <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
              <Inputz
                className="lg:w-6/12"
                value={filter.keySearch}
                onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
                label="Tìm kiếm theo tên"
              />
            </DataFilter>
          </div>

          <Hrz />
          <div className="flex flex-wrap mt-4">
            {data?.map((item, index) => (
              <div key={index} className="w-full">
                <div className="w-full p-4">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-4 items-start">
                      <h2 className="font-medium">{item.name}</h2>
                      <div className="flex gap-2 items-center">
                        <Buttonz onClick={() => handleDownload({ url: item.file, filename: item.name })} variant="outlined">
                          <div className="flex gap-2 items-center">
                            <ViewfinderCircleIcon className="h-4 w-4 stroke-2" />
                            Xem trước
                          </div>
                        </Buttonz>
                        <Buttonz onClick={() => handleDownload({ url: item.file, filename: item.name })}>
                          <div className="flex gap-2 items-center">
                            <ArrowDownTrayIcon className="h-4 w-4 stroke-2" />
                            Tải file mẫu
                          </div>
                        </Buttonz>
                      </div>
                    </div>
                    <div className="w-80 h-48 overflow-hidden">
                      <Imagez
                        isZoom
                        src={item.avatar}
                        alt="Ảnh mô tả"
                        className="h-full w-full transition-transform duration-500 ease-in-out transform"
                      />
                    </div>
                  </div>
                </div>
                <Hrz />
              </div>
            ))}
          </div>
        </Cardz>
      </div>
    </div>
  );
};

export default Templates;
