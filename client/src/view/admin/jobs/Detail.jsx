import { JobValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addJobApi, updateJobApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { DropdownForm, InputForm, TextAreaz } from '@components/core';
import { experiences } from '@constant';

const defaultValues = {
  name: '',
  company: '',
  category: '',
  location: '',
  min: '',
  max: '',
  quantity: '',
  experience: '',
  required: '',
  description: ''
};

const DetailJob = (props) => {
  const { open, setOpen, setParams, data, companies, categories, locations } = props;
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
    resolver: yupResolver(JobValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
      if (item?.required && Array.isArray(item.required)) item.required = item?.required?.join('; ');
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const required = data.required?.split(';') || [];
    const newData = { ...data, required };
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: open };
    else return newData;
  };

  return (
    <FormDetail
      title="công việc"
      open={open}
      setOpen={() => {
        setOpen(false);
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
        <InputForm id="name" label="Tên công việc (*)" errors={errors} register={register} />
        <InputForm id="min" type="number" min="0" label="Mức lương tối thiểu (*)" errors={errors} register={register} />
        <InputForm id="max" type="number" min="0" label="Mức lương tối đa (*)" errors={errors} register={register} />
        <InputForm id="quantity" type="number" min="0" label="Số lượng tuyển dụng (*)" errors={errors} register={register} />
        <DropdownForm
          id="company"
          label="Công ty (*)"
          options={companies}
          optionLabel="name"
          optionValue="_id"
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        <DropdownForm
          id="category"
          label="Danh mục (*)"
          options={categories}
          optionLabel="name"
          optionValue="_id"
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        <DropdownForm
          id="location"
          label="Vị trí (*)"
          options={locations}
          optionLabel="name"
          optionValue="_id"
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        <DropdownForm id="experience" label="Kinh nghiệm (*)" options={experiences} errors={errors} watch={watch} setValue={setValue} />
        <TextAreaz id="required" label="Yêu cầu" value={watch('required')} setValue={(e) => setValue('required', e)} />
        <Editorz id="description" label="Mô tả" errors={errors} data={watch('description')} setData={(e) => setValue('description', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailJob;
