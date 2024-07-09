import { CompanyValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addCompanyApi, updateCompanyApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { InputForm } from '@components/core';
import { UploadImage } from '@components/shared';
import Editorz from '@components/core/Editorz';

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  member: '',
  description: '',
  website: '',
};

const DetailCompany = (props) => {
  const { open, setOpen, setParams, data } = props;
  const [avatar, setAvatar] = useState(null);
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(CompanyValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
      if (item.avatar) setAvatar(item.avatar);
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data };
    if (avatar) newData.formData = { avatar };
    else if (item.avatar) newData.avatar = '';
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: open };
    else return newData;
  };

  return (
    <FormDetail
      title="công ty"
      open={open}
      setOpen={() => {
        setOpen(false);
        setAvatar(null);
        reset();
      }}
      isUpdate={isUpdate}
      createApi={addCompanyApi}
      updateApi={updateCompanyApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-4/12">
          <UploadImage label="Logo" data={avatar} setData={setAvatar} />
        </div>
        <div className="w-full lg:w-8/12">
          <div className="flex flex-wrap">
            <InputForm id="name" label="Tên công ty (*)" errors={errors} register={register} className="!w-full" />
            <InputForm id="email" label="Email liên hệ (*)" errors={errors} register={register} className="!w-full" />
            <InputForm id="phone" label="Số điện thoại liên hệ (*)" errors={errors} register={register} className="!w-full" />
            <InputForm id="address" label="Địa chỉ (*)" errors={errors} register={register} className="!w-full" />
            <InputForm id="website" label="Website" errors={errors} register={register} className="!w-full" />
            <InputForm id="member" label="Số nhân sự (*)" type="number" min="0" errors={errors} register={register} className="!w-full" />
          </div>
        </div>
      </div>
      <Editorz id="description" label="Mô tả" errors={errors} data={watch('description')} setData={(e) => setValue('description', e)} />
    </FormDetail>
  );
};

export default DetailCompany;
