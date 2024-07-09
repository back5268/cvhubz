import { TemplateValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addTemplateApi, updateTemplateApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { InputForm } from '@components/core';
import { UploadFiles, UploadImage } from '@components/shared';

const defaultValues = {
  name: '',
  price: ''
};

const DetailTemplate = (props) => {
  const { open, setOpen, setParams, data } = props;
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState([]);
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(TemplateValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
      if (item.avatar) setAvatar(item.avatar);
      if (item.file) setFile([item.file]);
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data };
    if (avatar) newData.formData = { avatar };
    else if (item.avatar) newData.avatar = '';
    if (file?.[0]) {
      if (newData.formData) newData.formData.file = file[0];
      else newData.formData = { file: file[0] };
    } else if (item.file) newData.file = '';
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: open };
    else return newData;
  };

  return (
    <FormDetail
      title="mẫu CV"
      open={open}
      setOpen={() => {
        setOpen(false);
        setAvatar(null);
        setFile([]);
        reset();
      }}
      isUpdate={isUpdate}
      createApi={addTemplateApi}
      updateApi={updateTemplateApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-4/12">
          <UploadImage label="Hình ảnh" data={avatar} setData={setAvatar} />
        </div>
        <div className="w-full lg:w-8/12">
          <div className="flex flex-wrap">
            <InputForm id="name" label="Tên mẫu CV (*)" errors={errors} register={register} className="!w-full" />
            <InputForm id="price" label="Giá tiền (*)" type="number" min="0" errors={errors} register={register} className="!w-full" />
          </div>
        </div>
      </div>
      <UploadFiles label="File đính kèm (Vui lòng chọn file PDF)" type="pdf" files={file} setFiles={setFile} max={1} />
    </FormDetail>
  );
};

export default DetailTemplate;
