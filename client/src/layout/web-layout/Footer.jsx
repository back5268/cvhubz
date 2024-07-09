import { Logo } from '@components/base';
import { Hrz } from '@components/core';
import { policies, productType } from '@constant';
import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const socials = [
  {
    to: 'https://www.facebook.com/decorstar.since2024',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    )
  },
  {
    to: 'https://mail.google.com/mail/u/0/?pli=1#inbox?compose=new',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  },
  {
    to: 'https://www.instagram.com/decor.star/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  }
];

const contacts = [
  {
    label: 'Phúc Tiến, Bình Yên, Thạch Thất, Hà Nội',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-5 w-5  text-[#ff7c08]">
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
      </svg>
    )
  },
  {
    label: 'decordayvn@gmail.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-5 w-5  text-[#ff7c08]">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
    )
  },
  {
    label: '09 688 442 85',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-5 w-5  text-[#ff7c08]">
        <path
          fillRule="evenodd"
          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
          clipRule="evenodd"
        />
      </svg>
    )
  }
];

const Footer = () => {
  return (
    <footer className="text-center lg:text-left !text-[#dfdddd]">
      <div className="text-center relative md:text-left bg-cover bg-top-1/4 z-0" style={{ backgroundImage: 'url(/images/bg.jpg)' }}>
        <div className='bg-[#231f40e0] opacity-90'>
          <motion.div
            initial={{ y: 12, opacity: 0.5 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center border-border p-6 lg:justify-between"
          >
            <div className="mr-12 hidden lg:block">
              <span className="text-lg">Kết nối với chúng tôi tại:</span>
            </div>
            <div className="flex gap-6 items-center justify-center">
              {socials.map((social, index) => (
                <a href={social?.to} target="_blank" key={index} className="rounded-full hover:text-[#ff7c08] hover:bg-white p-2 bg-[#ff7c08] cursor-pointer">
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
          <Hrz />
          <div className="relative z-10 grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-5 py-20">
            <motion.div
              initial={{ y: 12, opacity: 0.5 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="md:min-w-64 md:col-span-2 flex flex-col items-center justify-center gap-8"
            >
              <Logo classNameImg="md:h-32 h-12" />
            </motion.div>
            <div className="flex flex-col gap-3">
              <motion.h6
                initial={{ y: 12, opacity: 0.5 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4 flex justify-center font-semibold uppercase md:justify-start text-lg"
              >
                Sản phẩm
              </motion.h6>
              {productType.map((product, index) => (
                <motion.div
                  initial={{ y: 12, opacity: 0.5 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={index}
                  className="flex gap-2 md:justify-start justify-center my-2"
                >
                  <CheckIcon className="w-6 h-6 stroke-2 text-[#ff7c08]" />
                  <span key={product.key}>{product.label}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <motion.h6
                initial={{ y: 12, opacity: 0.5 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4 flex justify-center font-semibold uppercase md:justify-start text-lg"
              >
                Chính sách
              </motion.h6>
              {policies.map((policy, index) => (
                <motion.div
                  initial={{ y: 12, opacity: 0.5 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={index}
                  className="flex gap-2 md:justify-start justify-center my-2"
                >
                  <CheckIcon className="w-6 h-6 stroke-2 text-[#ff7c08]" />
                  <span key={policy.key}>{policy.label}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <motion.h6
                initial={{ y: 12, opacity: 0.5 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4 flex justify-center font-semibold uppercase md:justify-start text-lg"
              >
                Liên hệ
              </motion.h6>
              {contacts.map((contact, index) => (
                <motion.div
                  initial={{ y: 12, opacity: 0.5 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={index}
                  className="flex gap-1 md:justify-start justify-center my-2"
                >
                  {contact.icon}
                  <span>{contact.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Hrz />
      <div className="p-6 text-center text-lg  bg-[#ff7c08]">
        <span>Copyright ©</span>
        <a className="font-semibold">Decor Star</a> 2024: All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
