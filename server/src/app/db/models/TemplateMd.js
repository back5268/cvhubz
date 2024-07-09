import { ModelBase } from '@config';

class TemplateMd extends ModelBase {}

TemplateMd.init('Template', {
  name: { type: String, required: true },
  avatar: { type: String },
  file: { type: String },
  price: { type: Number, min: 0 },
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const getListTemplateMd = (where, page, limit, populates, sort, attr) => {
  return TemplateMd.find({ where, page, limit, sort, attr, populates });
};

export const countListTemplateMd = (where) => {
  return TemplateMd.count({ where });
};

export const getDetailTemplateMd = (where, populates, attr) => {
  return TemplateMd.findOne({ where, attr, populates });
};

export const addTemplateMd = (attr) => {
  return TemplateMd.create({ attr });
};

export const updateTemplateMd = (where, attr) => {
  return TemplateMd.update({ where, attr });
};

export const deleteTemplateMd = (where) => {
  return TemplateMd.delete({ where });
};
