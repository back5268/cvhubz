import { addJobMd, countListJobMd, deleteJobMd, getDetailJobMd, getListJobMd, updateJobMd } from '@models';

export const getListJob = async (req, res) => {
  try {
    const { page, limit, keySearch, status, company, location, category } = req.query;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (company) where.company = company;
    if (location) where.location = location;
    if (category) where.category = category;
    const documents = await getListJobMd(where, page, limit);
    const total = await countListJobMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailJob = async (req, res) => {
  try {
    const { _id } = req.query;
    const data = await getDetailJobMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Công việc không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await deleteJobMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Công việc không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addJob = async (req, res) => {
  try {
    let { company, category, location, name, min, max, quantity, description, experience, required } = req.body;
    const data = await addJobMd({ company, category, location, name, min, max, quantity, description, experience, required });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateJob = async (req, res) => {
  try {
    let { _id, company, category, location, name, min, max, quantity, description, experience, required, status } = req.body;
    const Job = await getDetailJobMd({ _id });
    if (!Job) return res.status(400).json({ status: false, mess: 'Công việc không tồn tại!' });
    const data = await updateJobMd(
      { _id },
      { company, category, location, name, min, max, quantity, description, experience, required, status }
    );
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
