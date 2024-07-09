import { ModelBase } from '@config';

class CompanyMd extends ModelBase {}

CompanyMd.init('Company', {
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String },
  address: { type: String },
  description: { type: String },
  member: { type: Number, min: 0 },
  avatar: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const getListCompanyMd = (where, page, limit, populates, sort, attr) => {
  return CompanyMd.find({ where, page, limit, sort, attr, populates });
};

export const countListCompanyMd = (where) => {
  return CompanyMd.count({ where });
};

export const getDetailCompanyMd = (where, populates, attr) => {
  return CompanyMd.findOne({ where, attr, populates });
};

export const addCompanyMd = (attr) => {
  return CompanyMd.create({ attr });
};

export const updateCompanyMd = (where, attr) => {
  return CompanyMd.update({ where, attr });
};

export const deleteCompanyMd = (where) => {
  return CompanyMd.delete({ where });
};
