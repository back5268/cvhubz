import { SignupValidation } from '@lib/validation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormAuth } from '@components/base';
import { signupApi } from '@api';
import { usePostApi } from '@lib/react-query';
import { useNavigate } from 'react-router-dom';
import { useToastState } from '@store';
import { Buttonz, CheckBoxz, InputForm, Linkz } from '@components/core';
import { InputPassword } from '@components/shared';

const SignUp = () => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const { mutateAsync, isPending } = usePostApi(signupApi);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupValidation)
  });

  const onSubmit = async (data) => {
    const response = await mutateAsync(data);
    if (response) {
      showToast({ title: 'Đăng Ký tài khoản thành công', severity: 'success' });
      navigate('/auth/signin');
    }
  };

  console.log(errors);

  return (
    <FormAuth title="Đăng ký tài khoản mới">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <InputForm id="fullName" label="Họ tên (*)" register={register} errors={errors} className="!w-full" />
        <InputForm id="email" label="Email (*)" type="email" register={register} errors={errors} className="!w-full" />
        <InputForm id="phone" label="Số điện thoại" register={register} errors={errors} className="!w-full" />
        <InputPassword id="password" label="Mật khẩu (*)" register={register} errors={errors} className="!w-full" />
        <div className="flex flex-col gap-2 px-2 mb-4">
          <div className="flex items-center justify-between">
            <CheckBoxz id="remember">
              Đồng ý <Linkz to="" label="điều khoản và dịch vụ" className="underline" />
            </CheckBoxz>
          </div>
          <Buttonz type="submit" loading={isPending} label="Đăng ký" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-border after:mt-0.5 after:flex-1 after:border-t after:border-border">
              <p className="mx-4 mb-0 text-center font-semibold">or</p>
            </div>
            <div className="text-center">
              <p className="text-sm">
                Đã có tài khoản, <Linkz to="/auth/signin" label="Đăng nhập" />
              </p>
            </div>
          </div>
        </div>
      </form>
    </FormAuth>
  );
};

export default SignUp;
