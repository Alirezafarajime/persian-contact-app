import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import ContactList from './components/ContactList.jsx';
import ConfirmationModal from './components/ConfirmationModal.jsx';
import AddEditContactModal from './components/AddEditContactModal.jsx';
import './index.css';

const initialContacts = [
    { id: 1, name: 'سینا', email: 'sina.gh@gmail.com' },
    { id: 2, name: 'محمد', email: 'mohammad.1388@gmail.com' },
    { id: 3, name: 'سهراب', email: 'sohrab.rezakhsh@gmail.com' },
    { id: 4, name: 'پژمان جمشیدی', email: 'alcatrazd@gmail.com' },
    { id: 5, name: 'صادق', email: 'truth.sadegh@gmail.com' },
    { id: 6, name: 'کیوان مرادی', email: 'keivan.moradi@gmail.com' },
    { id: 7, name: 'پور مخبر', email: 'json.server@gmail.com' },
];

function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const [selectedIds, setSelectedIds] = useState([]);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState(null);

  useEffect(() => {
    const results = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(results);
  }, [searchTerm, contacts]);

  const handleAddContactClick = () => {
    setContactToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleEditContact = (contact) => {
    setContactToEdit(contact);
    setIsFormModalOpen(true);
  };

  const handleSaveContact = (formData) => {
    if (contactToEdit) {
      setContacts(contacts.map(c => c.id === contactToEdit.id ? { ...c, ...formData } : c));
    } else {
      const newContact = { id: Date.now(), ...formData };
      setContacts([...contacts, newContact]);
    }
    setIsFormModalOpen(false);
    setContactToEdit(null);
  };


  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setDeleteAction(() => () => {
      setContacts(contacts.filter(c => !selectedIds.includes(c.id)));
      setSelectedIds([]);
      setIsConfirmModalOpen(false);
    });
    setIsConfirmModalOpen(true);
  };

  return (
    <div className="app-container">
      <Header />
      
<div className="top-bar">
  <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
  {selectedIds.length > 0 ? (
    <button onClick={handleBulkDelete} className="btn btn-danger">
      حذف ({selectedIds.length}) مورد
    </button>
  ) : (
    <button onClick={handleAddContactClick} className="btn btn-primary">
      افزودن مخاطب
    </button>
  )}

</div>

      <ContactList
        contacts={filteredContacts}
        onEdit={handleEditContact}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
      
      <AddEditContactModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveContact}
        contactToEdit={contactToEdit}
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={deleteAction}
        title="تایید حذف"
        message="آیا از حذف موارد انتخاب شده مطمئن هستید؟ این عملیات غیرقابل بازگشت است."
      />
    </div>
  );
}

export default App;