import { JobValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addJobApi, updateJobApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { DropdownForm, InputForm, TextAreaz } from '@components/core';
import { experiences } from '@constant';
import Editorz from '@components/core/Editorz';
import { UploadImage } from '@components/shared';

const defaultValues = {
  name: '',
  company: '',
  category: '',
  location: '',
  min: '',
  max: '',
  quantity: '',
  experience: '',
  description: ''
};

const DetailJob = (props) => {
  const { open, setOpen, setParams, data, companies = [], categories = [], locations = [] } = props;
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};
  const [avatar, setAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(JobValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
      if (item.avatar) setAvatar(item.avatar);
      if (item?.required && Array.isArray(item.required)) item.required = item?.required?.join('; ');
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    if (Number(data.min) > Number(data.max)) return 'Mức lương tối thiểu không thể lớn hơn mức lương tối đa';
    const newData = { ...data };
    if (avatar) newData.formData = { avatar };
    else if (item.avatar) newData.avatar = '';
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: open };
    else return newData;
  };

  return (
    <FormDetail
      title="công việc"
      open={open}
      setOpen={() => {
        setOpen(false);
        setAvatar(null);
        reset();
      }}
      isUpdate={isUpdate}
      createApi={addJobApi}
      updateApi={updateJobApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap">
        <div className="w-full lg:w-4/12">
          <UploadImage label="Logo" data={avatar} setData={setAvatar} />
        </div>
        <div className="w-full lg:w-8/12">
          <div className="flex flex-wrap">
            <InputForm id="name" label="Tên công việc (*)" errors={errors} register={register} />
            <InputForm id="min" type="number" min="0" label="Mức lương tối thiểu (*)" errors={errors} register={register} />
            <InputForm id="max" type="number" min="0" label="Mức lương tối đa (*)" errors={errors} register={register} />
            <InputForm id="quantity" type="number" min="0" label="Số lượng tuyển dụng (*)" errors={errors} register={register} />
            <DropdownForm
              id="company"
              label="Công ty (*)"
              options={companies || []}
              optionLabel="name"
              optionValue="_id"
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            <DropdownForm
              id="category"
              label="Danh mục (*)"
              options={categories || []}
              optionLabel="name"
              optionValue="_id"
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            <DropdownForm
              id="location"
              label="Vị trí (*)"
              options={locations || []}
              optionLabel="name"
              optionValue="_id"
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            <DropdownForm id="experience" label="Kinh nghiệm (*)" options={experiences} errors={errors} watch={watch} setValue={setValue} />
          </div>
        </div>
        <Editorz id="description" label="Mô tả" errors={errors} data={watch('description')} setData={(e) => setValue('description', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailJob;
