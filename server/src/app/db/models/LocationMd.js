import { ModelBase } from '@config';

class LocationMd extends ModelBase {}

LocationMd.init('Location', {
  name: { type: String, required: true },
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const getListLocationMd = (where, page, limit, populates, sort, attr) => {
  return LocationMd.find({ where, page, limit, sort, attr, populates });
};

export const countListLocationMd = (where) => {
  return LocationMd.count({ where });
};

export const getDetailLocationMd = (where, populates, attr) => {
  return LocationMd.findOne({ where, attr, populates });
};

export const addLocationMd = (attr) => {
  return LocationMd.create({ attr });
};

export const updateLocationMd = (where, attr) => {
  return LocationMd.update({ where, attr });
};

export const deleteLocationMd = (where) => {
  return LocationMd.delete({ where });
};
