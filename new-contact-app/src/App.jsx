import React, { useState, useEffect, useContext } from 'react';
import { ContactContext } from './context/ContactContext.jsx';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import ContactList from './components/ContactList.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import AddEditContactModal from './components/AddEditContactModal.jsx';
import './index.css';

function App() {
const { contacts, loading, error, saveContact, deleteContacts } = useContext(ContactContext)
const [searchTerm, setSearchTerm] = useState('');
const [filteredContacts, setFilteredContacts] = useState([]);
const [selectedIds, setSelectedIds] = useState([]);
const [isFormModalOpen, setIsFormModalOpen] = useState(false);
const [contactToEdit, setContactToEdit] = useState(null);
const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

useEffect(() => {
if (contacts) {
 const results = contacts.filter(contact =>
 contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
 contact.email.toLowerCase().includes(searchTerm.toLowerCase()));
setFilteredContacts(results);
}}, [searchTerm, contacts]);

const handleAddContactClick = () => {
setContactToEdit(null);
setIsFormModalOpen(true);
};

const handleEditContact = (contact) => {
setContactToEdit(contact);
setIsFormModalOpen(true);
};

const handleSaveContact = (formData) => {
saveContact(formData, contactToEdit);
setIsFormModalOpen(false);
setContactToEdit(null);
};

const handleBulkDelete = () => {
if (selectedIds.length > 0) {
setIsConfirmModalOpen(true);
}};

const confirmDelete = () => {
deleteContacts(selectedIds);
setSelectedIds([]);
setIsConfirmModalOpen(false);
};
if (loading) {
return <div className="loading-message">در حال بارگذاری اطلاعات...</div>;}
if (error) {
return <div className="error-message">{error}</div>;}
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
<ConfirmModal
isOpen={isConfirmModalOpen}
onClose={() => setIsConfirmModalOpen(false)}
onConfirm={confirmDelete}
title="تایید حذف"
message="آیا از حذف موارد انتخاب شده مطمئن هستید؟"/>
</div>
);
}

export default App;