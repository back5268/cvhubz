import { removeVietnameseTones } from '@utils';

export const generateVietQrLink = (amount, description, accountName = 'CV Hub') => {
  return `https://img.vietqr.io/image/VCB-1040358684-compact2.png?amount=${amount}&addInfo=${encodeURI(description)}&accountName=${encodeURI(removeVietnameseTones(accountName))}`;
};
