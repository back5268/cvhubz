import { addUserMd, countListUserMd, deleteUserMd, getDetailUserMd, getListUserMd, updateUserMd } from '@models';
import { uploadFileToFirebase } from '@lib/firebase';
import bcrypt from 'bcrypt';
import { generateRandomString } from '@utils';

export const getListUser = async (req, res) => {
  try {
    const { page, limit, keySearch, email, type, status } = req.query;
    const where = {};
    if (keySearch) where.$or = [{ fullName: { $regex: keySearch, $options: 'i' } }];
    if (email) where.$or = [{ email: { $regex: email, $options: 'i' } }, { phone: { $regex: email, $options: 'i' } }];
    if (type) where.type = type;
    if (status || status === 0) where.status = status;
    const documents = await getListUserMd(where, page, limit);
    const total = await countListUserMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListUserInfo = async (req, res) => {
  try {
    const data = await getListUserMd();
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailUser = async (req, res) => {
  try {
    const { _id } = req.query;
    const data = await getDetailUserMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await deleteUserMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addUser = async (req, res) => {
  try {
    let { fullName, email, password, gender, phone, avatar, role } = req.body;
    if (req.file) {
      avatar = await uploadFileToFirebase(req.file);
    }
    const data = await addUserMd({ fullName, email, password, gender, phone, avatar, role });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateUser = async (req, res) => {
  try {
    let { _id, fullName, email, password, phone, avatar, gender, status, role } = req.body;
    const user = await getDetailUserMd({ _id });
    if (!user) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });

    if (status === 0) {
      if (user.role === 'admin') return res.status(400).json({ status: false, mess: 'Không thể khóa tài khoản admin' });
    }

    if (email) {
      const checkEmail = await getDetailUserMd({ email });
      if (checkEmail) return res.status(400).json({ status: false, mess: 'Email đã tồn tại!' });
    }

    if (req.file) {
      avatar = await uploadFileToFirebase(req.file);
    }

    const attr = { fullName, email, phone, avatar, gender, status, role };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      attr.password = await bcrypt.hash(password, salt);
    }

    const data = await updateUserMd({ _id }, attr);
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { _id } = req.body
    const newPassword = generateRandomString(8);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    await updateUserMd({ _id }, { password, token: '' });
    res.status(201).json({ status: true, data: newPassword });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
