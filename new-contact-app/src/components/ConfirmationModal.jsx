import React, { useState, useEffect } from 'react';

const AddEditContactModal = ({ isOpen, onClose, onSave, contactToEdit }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contactToEdit) {
      setFormData({ name: contactToEdit.name, email: contactToEdit.email });
    } else {
      setFormData({ name: '', email: '' });
    }
    setErrors({});
  }, [contactToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "نام نمی‌تواند خالی باشد.";
    if (!formData.email.trim()) {
        newErrors.email = "ایمیل نمی‌تواند خالی باشد.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "فرمت ایمیل نامعتبر است.";
    }
    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h2>{contactToEdit ? 'ویرایش مخاطب' : 'افزودن مخاطب جدید'}</h2>
            <button type="button" onClick={onClose} className="close-btn">&times;</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="name">نام و نام خانوادگی</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">ایمیل</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>
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