import { addTemplateMd, countListTemplateMd, deleteTemplateMd, getDetailTemplateMd, getListTemplateMd, updateTemplateMd } from '@models';
import { uploadFileToFirebase } from '@lib/firebase';

export const getListTemplate = async (req, res) => {
  try {
    const { page, limit, keySearch, status } = req.query;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await getListTemplateMd(where, page, limit);
    const total = await countListTemplateMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailTemplate = async (req, res) => {
  try {
    const { _id } = req.query;
    const data = await getDetailTemplateMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Mẫu CV không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await deleteTemplateMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Mẫu CV không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addTemplate = async (req, res) => {
  try {
    let { name, price, avatar, file } = req.body;
    const checkName = await getDetailTemplateMd({ name });
    if (checkName) return res.status(400).json({ status: false, mess: 'Tên mẫu CV đã tồn tại!' });
    if (req.files?.['avatar']?.[0]) {
      avatar = await uploadFileToFirebase(req.files['avatar'][0]);
    }
    if (req.files?.['file']?.[0]) {
      avatar = await uploadFileToFirebase(req.files['file'][0]);
    }
    const data = await addTemplateMd({ name, price, avatar, file });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    let { _id, name, price, avatar, file, status } = req.body;
    const Template = await getDetailTemplateMd({ _id });
    if (!Template) return res.status(400).json({ status: false, mess: 'Mẫu CV không tồn tại!' });
    if (name) {
      const checkName = await getDetailTemplateMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên mẫu CV đã tồn tại!' });
    }
    if (req.files?.['avatar']?.[0]) {
      avatar = await uploadFileToFirebase(req.files['avatar'][0]);
    }
    if (req.files?.['file']?.[0]) {
      file = await uploadFileToFirebase(req.files['file'][0]);
    }
    const data = await updateTemplateMd({ _id }, { name, price, avatar, file, status });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
