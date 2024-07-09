import { REGEX } from '@constant';
import * as yup from 'yup';

export const UserValidation = yup.object({
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  fullName: yup.string().required('Tài khoản không được bỏ trống!'),
  password: yup.string().min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!').required()
});

export const CompanyValidation = yup.object({
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  name: yup.string().required('Tên công ty không được bỏ trống!'),
  address: yup.string().required('Địa chỉ không được bỏ trống!'),
  phone: yup.string().matches(REGEX.C_PHONE, 'Mật khẩu cần chứa cả số và chữ cái!').required('Số điện thoại không được bỏ trống'),
  member: yup.string().required('Số nhân sự không được bỏ trống'),
});

export const CategoryValidation = yup.object({
  name: yup.string().required('Tên danh mục không được bỏ trống!'),
});

export const JobValidation = yup.object({
  name: yup.string().required('Tên công việc không được bỏ trống!'),
  company: yup.string().required('Công ty không được bỏ trống!'),
  category: yup.string().required('Danh mục không được bỏ trống!'),
  location: yup.string().required('Vị trí không được bỏ trống!'),
  min: yup.string().required('Mức lương tối thiểu không được bỏ trống!'),
  max: yup.string().required('Mức lương tối đa không được bỏ trống!'),
  quantity: yup.string().required('Số lượng tuyển dụng không được bỏ trống!'),
});

export const TemplateValidation = yup.object({
  name: yup.string().required('Tên nẫu CV không được bỏ trống!'),
});
