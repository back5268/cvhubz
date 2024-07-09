import { ModelBase } from '@config';
import { Schema } from 'mongoose';

class JobMd extends ModelBase {}

JobMd.init('Job', {
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  category: { type: Schema.Types.ObjectId, re: 'Category' },
  location: { type: Schema.Types.ObjectId, re: 'Location' },
  name: { type: String, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  quantity: { type: Number },
  description: { type: String },
  experience: { type: String },
  required: [{ type: String }],
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const getListJobMd = (where, page, limit, populates, sort, attr) => {
  return JobMd.find({ where, page, limit, sort, attr, populates });
};

export const countListJobMd = (where) => {
  return JobMd.count({ where });
};

export const getDetailJobMd = (where, populates, attr) => {
  return JobMd.findOne({ where, attr, populates });
};

export const addJobMd = (attr) => {
  return JobMd.create({ attr });
};

export const updateJobMd = (where, attr) => {
  return JobMd.update({ where, attr });
};

export const deleteJobMd = (where) => {
  return JobMd.delete({ where });
};
