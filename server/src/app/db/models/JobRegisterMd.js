import { ModelBase } from '@config';
import { Schema } from 'mongoose';

class JobRegisterMd extends ModelBase {}

JobRegisterMd.init('JobRegister', {
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  job: { type: Schema.Types.ObjectId, ref: 'Job' },
  file: { type: String, required: true },
  deletedAt: { type: Date }
});

export const getListJobRegisterMd = (where, page, limit, populates, sort, attr) => {
  return JobRegisterMd.find({ where, page, limit, sort, attr, populates });
};

export const countListJobRegisterMd = (where) => {
  return JobRegisterMd.count({ where });
};

export const getDetailJobRegisterMd = (where, populates, attr) => {
  return JobRegisterMd.findOne({ where, attr, populates });
};

export const addJobRegisterMd = (attr) => {
  return JobRegisterMd.create({ attr });
};

export const updateJobRegisterMd = (where, attr) => {
  return JobRegisterMd.update({ where, attr });
};

export const deleteJobRegisterMd = (where) => {
  return JobRegisterMd.delete({ where });
};
