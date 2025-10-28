import React from 'react';

const ContactItem = ({ contact, onEdit, onDelete, isSelected, onSelect }) => {
  return (
    <div className="contact-item">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(contact.id)}
      />
      <div className="contact-info">
        <span className="name">{contact.name}</span>
        <span className="email">{contact.email}</span>
      </div>
      <div className="contact-actions">
        <button className="edit-btn" onClick={() => onEdit(contact)} title="ویرایش">
          ✏️
        </button>
        <button className="delete-btn" onClick={() => onDelete(contact.id)} title="حذف">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ContactItem;