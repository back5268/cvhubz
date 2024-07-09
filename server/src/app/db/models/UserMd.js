import { ModelBase } from '@config';

class UserMd extends ModelBase {}

UserMd.init('User', {
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  password: { type: String },
  avatar: { type: String },
  gender: { type: Number, enum: [1, 2], description: '1: Name, 2: Nữ' },
  role: { type: String, default: 'customer' },
  lastLogin: { type: Date },
  token: { type: String },
  typeLogin: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const getListUserMd = (where, page, limit, populates, sort, attr) => {
  return UserMd.find({ where, page, limit, sort, attr, populates });
};

export const countListUserMd = (where) => {
  return UserMd.count({ where });
};

export const getDetailUserMd = (where, populates, attr) => {
  return UserMd.findOne({ where, attr, populates });
};

export const addUserMd = (attr) => {
  return UserMd.create({ attr });
};

export const updateUserMd = (where, attr) => {
  return UserMd.update({ where, attr });
};

export const deleteUserMd = (where) => {
  return UserMd.delete({ where });
};
