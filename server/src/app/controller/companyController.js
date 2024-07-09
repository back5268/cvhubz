import { uploadFileToFirebase } from '@lib/firebase';
import { addCompanyMd, countListCompanyMd, deleteCompanyMd, getDetailCompanyMd, getListCompanyMd, updateCompanyMd } from '@models';

export const getListCompany = async (req, res) => {
  try {
    const { page, limit, keySearch, address, status } = req.query;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    if (address) where.$or = [{ address: { $regex: address, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await getListCompanyMd(where, page, limit);
    const total = await countListCompanyMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListCompanyWeb = async (req, res) => {
  try {
    const { keySearch } = req.query;
    const where = { status: 1 };
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    const data = await getListCompanyMd(where);
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListCompanyInfo = async (req, res) => {
  try {
    const data = await getListCompanyMd({});
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailCompany = async (req, res) => {
  try {
    const { _id } = req.query;
    const data = await getDetailCompanyMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Công ty không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await deleteCompanyMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Công ty không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addCompany = async (req, res) => {
  try {
    let { name, email, phone, website, address, description, member, avatar } = req.body;
    if (website) {
      const checkWebsite = await getDetailCompanyMd({ website });
      if (checkWebsite) return res.status(400).json({ status: false, mess: 'Website đã tồn tại!' });
    }
    if (req.file) {
      avatar = await uploadFileToFirebase(req.file);
    }
    const data = await addCompanyMd({ name, email, phone, website, address, description, member, avatar });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateCompany = async (req, res) => {
  try {
    let { _id, name, email, phone, website, address, description, member, status, avatar } = req.body;
    const Company = await getDetailCompanyMd({ _id });
    if (!Company) return res.status(400).json({ status: false, mess: 'Công ty không tồn tại!' });
    if (website) {
      const checkWebsite = await getDetailCompanyMd({ website });
      if (checkWebsite) return res.status(400).json({ status: false, mess: 'Website đã tồn tại!' });
    }
    if (req.file) {
      avatar = await uploadFileToFirebase(req.file);
    }
    const data = await updateCompanyMd({ _id }, { name, email, phone, website, address, description, member, status, avatar });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
