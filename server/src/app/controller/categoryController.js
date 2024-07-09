import { addCategoryMd, countListCategoryMd, deleteCategoryMd, getDetailCategoryMd, getListCategoryMd, updateCategoryMd } from '@models';

export const getListCategory = async (req, res) => {
  try {
    const { page, limit, keySearch, status } = req.query;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await getListCategoryMd(where, page, limit);
    const total = await countListCategoryMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListCategoryInfo = async (req, res) => {
  try {
    const data = await getListCategoryMd({});
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailCategory = async (req, res) => {
  try {
    const { _id } = req.query;
    const data = await getDetailCategoryMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Danh mục không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await deleteCategoryMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Danh mục không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addCategory = async (req, res) => {
  try {
    let { name, description } = req.body;
    if (name) {
      const checkName = await getDetailCategoryMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên danh mục đã tồn tại!' });
    }
    const data = await addCategoryMd({ name });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateCategory = async (req, res) => {
  try {
    let { _id, name, status, description } = req.body;
    const Category = await getDetailCategoryMd({ _id });
    if (!Category) return res.status(400).json({ status: false, mess: 'Danh mục không tồn tại!' });
    if (name) {
      const checkName = await getDetailCategoryMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên danh mục đã tồn tại!' });
    }
    const data = await updateCategoryMd({ _id }, { name, status });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
