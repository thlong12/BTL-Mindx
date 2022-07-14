import React from 'react';

export const Input = ({
  name,
  placeholder,
  type = 'text',
  data,
  handleChange,
  checkPassword,
}) => {
  const { value} = data;
  return (
    <>
      <input
        className={'input__error'}
        id={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
    
      />
      {checkPassword && <span>Mật khẩu phải từ 8 kí tự trở lến</span>}
    </>
  );
};