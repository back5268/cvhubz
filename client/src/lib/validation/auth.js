import * as yup from 'yup';

export const SigninValidation = yup.object({
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .required()
});

export const SignupValidation = yup.object({
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  fullName: yup.string().min(3, 'Họ tên cần dài ít nhất 3 ký tự!').required(),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .required()
});

export const ForgotPasswordValidation = yup.object({
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  username: yup.string().min(3, 'Tài khoản cần dài ít nhất 3 ký tự!').required(),
  otp: yup.string().min(6, 'Mã otp cần dài ít nhất 6 ký tự!').required(),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])/, 'Mật khẩu cần chứa cả số và chữ cái!')
    .required()
});