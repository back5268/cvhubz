import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { addUserMd, getDetailUserMd, updateUserMd } from '@models';

export const getInfo = async (req, res) => {
  try {
    res.json({ status: true, data: req.userInfo });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await getDetailUserMd({ email });
    if (!checkEmail) return res.status(400).json({ status: false, mess: 'Không tìm thấy người dùng!' });
    if (checkEmail.status === 0)
      return res.status(400).json({ status: false, mess: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên!' });
    const passLogin = await bcrypt.compare(password, checkEmail.password);
    if (!passLogin) return res.status(400).json({ status: false, mess: 'Mật khẩu không hợp lệ!' });
    const token = jwt.sign({ _id: checkEmail._id }, process.env.JWT_SECRET_TOKEN);
    await updateUserMd({ _id: checkEmail._id }, { token, lastLogin: new Date() });
    res.json({ status: true, data: token });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, phone, gender } = req.body;
    const checkEmail = await getDetailUserMd({ email })
    if (checkEmail) res.status(400).json({ status: false, mess: 'Email đã tồn tại!' });
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const data = await addUserMd({ fullName, email, password: newPassword, phone, gender });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
