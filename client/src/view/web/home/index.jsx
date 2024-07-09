import React, { useEffect, useState } from 'react';
import { Carousel, IconButton } from '@material-tailwind/react';
import { Buttonz, Cardz, Dropdownz, Hrz, Inputz } from '@components/core';
import { getListCategoryInfoApi, getListJobWebApi, getListLocationInfoApi } from '@api';
import { useGetApi, useInfinityApi } from '@lib/react-query';
import DataFilter from '@components/base/DataFilter';
import { CardProduct, Title } from '../shared';

const Home = () => {
  const [params, setParams] = useState({});
  const [filter, setFilter] = useState({});
  const [jobs, setJobs] = useState([]);
  const { data: locations } = useGetApi(getListLocationInfoApi, params, 'locationinfo');
  const { data: categories } = useGetApi(getListCategoryInfoApi, params, 'categoryinfo');
  const { data, fetchNextPage, hasNextPage, refetch } = useInfinityApi((p) => getListJobWebApi({ ...p, ...params   }), 'jobweb', 5);

  useEffect(() => {
    if (data?.pages) {
      let newData = [];
      data.pages.forEach((d) => {
        const documents = d?.documents;
        if (Array.isArray(documents)) newData = [...newData, ...documents];
      });
      setJobs(newData);
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    refetch();
  }, [JSON.stringify(params)]);

  useEffect(() => {
    if (data?.pages) {
      let newData = [];
      data.pages.forEach((d) => {
        const documents = d?.documents;
        if (Array.isArray(documents)) newData = [...newData, ...documents];
      });
      setJobs(newData);
    }
  }, [JSON.stringify(data)]);

  return (
    <div>
      <div className="relative">
        <Carousel
          loop={true}
          autoplay={true}
          autoplayDelay={3000}
          className="sm:h-[600px] h-64"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 flex -translate-x-2/4 gap-2">
              {new Array(length).fill('').map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          prevArrow={({ handlePrev }) => (
            <IconButton variant="text" color="white" size="lg" onClick={handlePrev} className="!absolute top-2/4 left-4 -translate-y-2/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton variant="text" color="white" size="lg" onClick={handleNext} className="!absolute top-2/4 !right-4 -translate-y-2/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </IconButton>
          )}
        >
          <img src="/images/home1.png" className="h-full w-full object-cover" />
          <img src="/images/home2.png" className="h-full w-full object-cover" />
          <img src="/images/home3.png" className="h-full w-full object-cover" />
        </Carousel>
      </div>

      <div className="container flex flex-col gap-10 mt-20 text-center">
        <div>
          <Title className="!p-0 text-orange-800" label="Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc."></Title>
          <span>
            Tiếp cận <b>40,000+</b> tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam
          </span>
        </div>
        <Cardz className="px-4">
          <DataFilter setParams={setParams} filter={filter} setFilter={setFilter}>
            <Inputz value={filter.keySearch} onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })} label="Từ khóa" />
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
          </DataFilter>
        </Cardz>

        <div className="mt-4">
          <h2 className="uppercase text-left font-bold text-xl text-orange-800">Việc làm tốt nhất</h2>
          <Hrz />
          <div className="flex flex-wrap mt-4">
            {jobs?.map((job, index) => (
              <div key={index} className="w--full md:w-6/12 lg:w-3/12">
                <CardProduct item={job} locations={locations} />
              </div>
            ))}
          </div>
          <Buttonz label="Xem thêm" variant="outlined" className="mt-8" disabled={!hasNextPage} onClick={() => fetchNextPage()} />
        </div>
      </div>
    </div>
  );
};

export default Home;
