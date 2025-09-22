import React, { useState } from 'react';

export default function AddPatientForm({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), age: age ? Number(age) : 30, contact: contact || 'N/A' });
    setName('');
    setAge('');
    setContact('');
    setOpen(false);
  }

  return (
    <div className="add-form">
      {!open ? (
        <button onClick={() => setOpen(true)}>Add New Patient</button>
      ) : (
        <form onSubmit={submit} className="small-form">
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} type="number" />
          <input placeholder="Contact" value={contact} onChange={e => setContact(e.target.value)} />
          <div className="form-actions">
            <button type="submit">Add</button>
            <button type="button" onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
