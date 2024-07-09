import { UserValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addUserApi, getInfoApi, updateUserApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp, databseDate } from '@lib/helper';
import { useAuthContext } from '@context/AuthContext';
import { DropdownForm, InputForm } from '@components/core';
import { MultiRadio, UploadImage } from '@components/shared';
import { genders, roles } from '@constant';

const defaultValues = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  role: '',
  role: 'user',
  gender: 1
};

const DetailUser = (props) => {
  const { userInfo, setUserInfo } = useAuthContext();
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
    resolver: yupResolver(UserValidation),
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
    if (newData.birthday && newData.birthday !== new Date(item?.birthday)) newData.birthday = databseDate(newData.birthday);
    else newData.birthday = undefined;
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: open };
    else return newData;
  };

  const onSuccess = async () => {
    if (open === userInfo._id) {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
      } else localStorage.removeItem('token');
    }
  };

  return (
    <FormDetail
      title="người dùng"
      open={open}
      setOpen={() => {
        setOpen(false);
        setAvatar(null);
        reset();
      }}
      isUpdate={isUpdate}
      createApi={addUserApi}
      updateApi={updateUserApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
      onSuccess={onSuccess}
    >
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-4/12">
          <UploadImage label="Ảnh đại diện" data={avatar} setData={setAvatar} />
        </div>
        <div className="w-full lg:w-8/12">
          <div className="flex flex-wrap">
            <DropdownForm
              id="role"
              label="Quyền (*)"
              options={roles}
              errors={errors}
              watch={watch}
              setValue={setValue}
              className="!w-full"
            />
            <InputForm id="fullName" label="Họ tên (*)" errors={errors} register={register} className="!w-full" />
            <InputForm id="email" label="Email (*)" errors={errors} register={register} className="!w-full" />
            <InputForm id="password" label="Mật khẩu (*)" type="password" errors={errors} register={register} className="!w-full" />
            <InputForm id="phone" label="Số điện thoại" errors={errors} register={register} className="!w-full" />
            <MultiRadio
              id="gender"
              label="Giới tính:"
              options={genders}
              value={watch('gender')}
              setValue={(e) => setValue('gender', e)}
              className="w-full lg:w-8/12"
            />
          </div>
        </div>
      </div>
    </FormDetail>
  );
};

export default DetailUser;
