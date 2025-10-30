import React from 'react';
import ContactItem from './ContactItem.jsx';
const ContactList = ({
  contacts,
  onEdit,
  selectedIds,
  setSelectedIds,
}) => {
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = contacts.map((c) => c.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  
  if (contacts.length === 0) {
      return <p className="no-contacts">مخاطبی یافت نشد.</p>
  }

  return (
    <div className="contact-list">
      <div className="contact-list-header">
        <input
          type="checkbox"
          onChange={handleSelectAll}
          checked={contacts.length > 0 && selectedIds.length === contacts.length}
        />
        <span className="header-name">نام</span>
        <span className="header-email">ایمیل</span>
        <span className="header-actions">عملیات</span>
      </div>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
         
          isSelected={selectedIds.includes(contact.id)}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default ContactList;