import React from 'react';

export default function PatientModal({ patient, onClose }) {
  if (!patient) return null; 

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose} 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 1000
      }}
    >
      <div 
        className="modal"
        onClick={(e) => e.stopPropagation()} 
        style={{
          background: 'white',
          borderRadius: '10px',
          maxWidth: '400px',
          width: '100%',
          padding: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          position: 'relative'
        }}
      >
        <div 
          className="modal-header"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <h3>{patient.name}</h3>
          <button 
            onClick={onClose} 
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        <div className="modal-body" style={{ marginTop: '10px' }}>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Contact:</strong> {patient.contact}</p>
          {patient.email && <p><strong>Email:</strong> {patient.email}</p>}
          {patient.address && <p><strong>Address:</strong> {patient.address}</p>}
          {patient.company && <p><strong>Company:</strong> {patient.company}</p>}
        </div>


        <div className="modal-footer" style={{ textAlign: 'right', marginTop: '10px' }}>
          <button 
            onClick={onClose} 
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#2563eb',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
