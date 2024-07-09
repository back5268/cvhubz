import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addJobRegisterApi } from '@api';
import { FormDetail } from '@components/base';
import { UploadFiles } from '@components/shared';

const Register = (props) => {
  const { open, setOpen, setParams, job } = props;
  const [file, setFile] = useState([]);

  const { handleSubmit } = useForm();

  const handleData = (data) => {
    const newData = { ...data, job };
    if (file?.[0]) newData.formData = { file: file[0] };
    else return 'Vui lòng thêm CV';
    return newData;
  };

  return (
    <FormDetail
      title="CV"
      open={open}
      setOpen={() => {
        setOpen(false);
        setFile([]);
      }}
      isUpdate={false}
      createApi={addJobRegisterApi}
      updateApi={() => {}}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <UploadFiles label="CV (Vui lòng chọn file PDF)" type="application/pdf" files={file} setFiles={setFile} max={1} />
    </FormDetail>
  );
};

export default Register;
