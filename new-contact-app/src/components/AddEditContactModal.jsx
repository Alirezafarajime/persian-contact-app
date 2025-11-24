import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema } from '../utils/validationSchema';
import ReusableInput from './ReusableInput.jsx';
const AddEditContactModal = ({ isOpen, onClose, onSave, contactToEdit }) => {
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  resolver: yupResolver(contactSchema),
});
useEffect(() => {
if (contactToEdit) {
reset(contactToEdit);}
else {
reset({ name: '', email: '' }); }
}, [isOpen, contactToEdit, reset]);

  if (!isOpen) return null;

const onSubmit = (data) => {
  onSave(data);
};

  return (
<div className="modal-backdrop" onClick={onClose}>
<div className="modal-content" onClick={(e) => e.stopPropagation()}>
<form onSubmit={handleSubmit(onSubmit)} noValidate>
<div className="modal-header">
<h2>{contactToEdit ? 'ویرایش مخاطب' : 'افزودن مخاطب جدید'}</h2>
<button type="button" onClick={onClose} className="close-btn">&times;</button>
</div>
<div className="modal-body">
  <ReusableInput
    label="نام و نام خانوادگی"
    name="name"
    register={register}
    error={errors.name}
  />
  <ReusableInput
    label="ایمیل"
    name="email"
    type="email"
    register={register}
    error={errors.email}
  />
</div>
<div className="modal-footer">
<button type="button" onClick={onClose} className="btn btn-secondary">
انصراف
</button>
<button type="submit" className="btn btn-primary">
ذخیره
</button>
</div>
</form>
</div>
</div>
  );
};

export default AddEditContactModal;