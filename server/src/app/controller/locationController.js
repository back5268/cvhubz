import { addLocationMd, countListLocationMd, getDetailLocationMd, getListLocationMd, updateLocationMd } from '@models';

export const getListLocation = async (req, res) => {
  try {
    const { page, limit, keySearch, status } = req.query;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await getListLocationMd(where, page, limit);
    const total = await countListLocationMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListLocationInfo = async (req, res) => {
  try {
    const data = await getListLocationMd({});
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailLocation = async (req, res) => {
  try {
    const { _id } = req.query;
    const data = await getDetailLocationMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Vị trí không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addLocation = async (req, res) => {
  try {
    let { name } = req.body;
    if (name) {
      const checkName = await getDetailLocationMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên vị trí đã tồn tại!' });
    }
    const data = await addLocationMd({ name });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateLocation = async (req, res) => {
  try {
    let { _id, name, status } = req.body;
    const Location = await getDetailLocationMd({ _id });
    if (!Location) return res.status(400).json({ status: false, mess: 'Vị trí không tồn tại!' });
    if (name) {
      const checkName = await getDetailLocationMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên vị trí đã tồn tại!' });
    }
    const data = await updateLocationMd({ _id }, { name, status });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
