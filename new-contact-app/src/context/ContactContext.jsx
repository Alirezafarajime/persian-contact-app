import React, { createContext, useReducer, useEffect } from 'react';

const API_URL = 'http://localhost:5000/contacts';

const ContactContext = createContext();

const ACTIONS = {
    SET_CONTACTS: 'set-contacts',
    ADD_CONTACT: 'add-contact',
    UPDATE_CONTACT: 'update-contact',
    DELETE_CONTACTS: 'delete-contacts',
    SET_LOADING: 'set-loading',
    SET_ERROR: 'set-error',
};

const reducer = (state, action) => {
    switch (action.type) {
case ACTIONS.SET_LOADING:
    return { ...state, loading: action.payload };
case ACTIONS.SET_CONTACTS:
    return { ...state, contacts: action.payload, loading: false };
case ACTIONS.ADD_CONTACT:
    return { ...state, contacts: [...state.contacts, action.payload] };
case ACTIONS.UPDATE_CONTACT:
return {
...state,
contacts: state.contacts.map(c =>
c.id === action.payload.id ? action.payload : c
),
};
case ACTIONS.DELETE_CONTACTS:
return {
...state,
contacts: state.contacts.filter(c => !action.payload.includes(c.id)),
};
case ACTIONS.SET_ERROR:
return { ...state, error: action.payload, loading: false };
default:
return state;
}
};


const ContactProvider = ({ children }) => {
const initialState = {
contacts: [],
loading: true,
error: null,
};
const [state, dispatch] = useReducer(reducer, initialState);

useEffect(() => {
const fetchContacts = async () => {
try {
dispatch({ type: ACTIONS.SET_LOADING, payload: true });
const res = await fetch(API_URL);
const data = await res.json();
dispatch({ type: ACTIONS.SET_CONTACTS, payload: data });
} catch (err) {
dispatch({ type: ACTIONS.SET_ERROR, payload: 'خطا در دریافت اطلاعات' });
}};
fetchContacts();
},[]);

    
    const saveContact = async (formData, contactToEdit) => {
if (contactToEdit) {
    const res = await fetch(`${API_URL}/${contactToEdit.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    });
    const updatedContact = await res.json();
    dispatch({ type: ACTIONS.UPDATE_CONTACT, payload: updatedContact });
} else { 
    const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    });
    const newContact = await res.json();
    dispatch({ type: ACTIONS.ADD_CONTACT, payload: newContact });
}};

const deleteContacts = async (ids) => {
await Promise.all(ids.map(id => 
fetch(`${API_URL}/${id}`, { method: 'DELETE' })
));
dispatch({ type: ACTIONS.DELETE_CONTACTS, payload: ids });
};

return (
<ContactContext.Provider value={{ ...state, saveContact, deleteContacts }}>
{children}
</ContactContext.Provider>
    );};
export { ContactProvider, ContactContext };