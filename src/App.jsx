import React, { useEffect, useState } from 'react';
import PatientCard from './components/PatientCard';
import PatientModal from './components/PatientModal';
import AddPatientForm from './components/AddPatientForm';

const randomAge = () => Math.floor(Math.random() * 60) + 18;

export default function App() {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    if (!query) return setFiltered(patients);
    const q = query.toLowerCase();
    setFiltered(patients.filter(p => p.name.toLowerCase().includes(q)));
  }, [query, patients]);

  async function fetchPatients() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const mapped = data.map(u => ({
        id: u.id,
        name: u.name,
        age: randomAge(),
        contact: u.phone,
        email: u.email,
        address: `${u.address.suite}, ${u.address.street}, ${u.address.city}`,
        company: u.company.name
      }));
      setPatients(mapped);
      setFiltered(mapped);
    } catch (err) {
      console.error(err);
      setError('Unable to load patients. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  function handleAddPatient(newPatient) {
    const withId = { ...newPatient, id: Date.now() };
    setPatients(prev => [withId, ...prev]);
    setQuery('');
  }

  return (
    <div className="app-root">
      <header className="header">
        <div className="brand">Jarurat Care</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#patients">Patients</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <section className="controls">
          <input
            type="text"
            placeholder="Search patients..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </section>

        <AddPatientForm onAdd={handleAddPatient} />

        {loading && <p>Loading patients...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div className="patient-grid">
            {filtered.map(p => (
              <PatientCard
                key={p.id}
                patient={p}
                onSelect={() => setSelected(p)}
              />
            ))}
          </div>
        )}
      </main>

      {selected && (
        <PatientModal
          patient={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
