import { uploadFileToFirebase } from '@lib/firebase';
import {
  addJobRegisterMd,
  countListJobRegisterMd,
  deleteJobRegisterMd,
  getDetailJobMd,
  getDetailJobRegisterMd,
  getListJobRegisterMd,
  updateJobRegisterMd
} from '@models';

export const getListJobRegister = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const where = {};
    const documents = await getListJobRegisterMd(where, page, limit, [{ path: 'user' }, { path: 'job' }]);
    const total = await countListJobRegisterMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListJobRegisterWeb = async (req, res) => {
  try {
    const where = {};
    const data = await getListJobRegisterMd(where);
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addJobRegister = async (req, res) => {
  try {
    let { job, file } = req.body;
    const checkJob = await getDetailJobMd({ _id: job });
    if (!checkJob) return res.status(400).json({ status: false, mess: 'Công việc không tồn tại!' });
    if (req.file) {
      file = await uploadFileToFirebase(req.file);
    }
    res.json({ status: true, data: await addJobRegisterMd({ user: req.userInfo?._id, job, file }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const cancelJobRegister = async (req, res) => {
  try {
    let { job } = req.body;
    const checkJobRe = await getDetailJobRegisterMd({ job, user: req.userInfo?._id });
    if (!checkJobRe) return res.status(400).json({ status: false, mess: 'Bạn chưa ứng tuyển công việc này!' });
    res.status(201).json({ status: true, data: await deleteJobRegisterMd({ job, user: req.userInfo?._id }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
