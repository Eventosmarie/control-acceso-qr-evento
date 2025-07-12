import React, { useState } from 'react';

// Datos de invitados de ejemplo. ¡Aquí es donde podrás cambiarlos después!
const initialGuests = [
  { code: 'LORENZO123', name: 'Lorenzo Puerra', checkedIn: false },
  { code: 'CAMILA456', name: 'Camila Rojas', checkedIn: false },
  { code: 'DANIEL789', name: 'Daniel Soto', checkedIn: false },
  { code: 'SOFIA012', name: 'Sofía Morales', checkedIn: false },
  { code: 'VALENTINA345', name: 'Valentina Díaz', checkedIn: false },
  { code: 'IGNACIO678', name: 'Ignacio Gómez', checkedIn: false },
];

function App() {
  const [guests, setGuests] = useState(initialGuests);
  const [scanCode, setScanCode] = useState('');
  const [lastResult, setLastResult] = useState(null); // Para mostrar el resultado del último escaneo

  const handleScan = () => {
    if (!scanCode.trim()) { // Si el campo está vacío, no hacer nada
      setLastResult(null); // Limpiar mensaje si no hay código
      return;
    }

    let found = false;
    const updatedGuests = guests.map((guest) => {
      if (guest.code.toUpperCase() === scanCode.toUpperCase()) {
        found = true;
        if (guest.checkedIn) {
          setLastResult({ success: false, name: guest.name }); // Ya estaba ingresado
        } else {
          setLastResult({ success: true, name: guest.name }); // Ingreso exitoso
          return { ...guest, checkedIn: true }; // Marcar como ingresado
        }
      }
      return guest;
    });

    if (!found) {
        setLastResult({ success: false, name: `Código ${scanCode} no encontrado` });
    }

    setGuests(updatedGuests);
    setScanCode(''); // Limpiar el campo de escaneo después de procesar
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {/* Aquí puedes reemplazar la URL de la imagen si tienes un logo propio en un servicio de alojamiento de imágenes */}
        <img src="https://i.ibb.co/hK7Jg8N/home-security.png" alt="Logo Seguridad" style={styles.logo} />
        <h1 style={styles.title}>Control de Acceso a Eventos – Lorenzo Puerra</h1>
      </div>

      <div style={styles.scanSection}>
        <input
          type="text"
          placeholder="Escanea o escribe el código QR"
          value={scanCode}
          onChange={(e) => setScanCode(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleScan()}
          style={styles.input}
        />
        <button onClick={handleScan} style={styles.button}>
          Registrar Ingreso
        </button>
      </div>

      {lastResult && (
        <div style={{ ...styles.resultMessage, ...(lastResult.success ? styles.successMessage : styles.errorMessage) }}>
          {lastResult.success ? '✅' : '❌'} {lastResult.name} {lastResult.success ? 'ha ingresado.' : (lastResult.name.includes("no encontrado") ? '' : 'ya había ingresado.')}
        </div>
      )}

      <h2 style={styles.guestsTitle}>Listado de Invitados</h2>
      <div style={styles.guestsGrid}>
        {guests.map((guest) => (
          <div key={guest.code} style={styles.guestCard}>
            {/* Generación del QR usando un servicio externo. No necesitas instalar nada. */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=${guest.code}`}
              alt={`QR de ${guest.name}`}
              style={styles.qrCodeImage}
            />
            <div style={styles.guestInfo}>
              <p style={styles.guestName}>{guest.name}</p>
              <p style={styles.guestCode}>Código: {guest.code}</p>
              <p style={{ ...styles.guestStatus, ...(guest.checkedIn ? styles.statusCheckedIn : styles.statusPending) }}>
                {guest.checkedIn ? 'Ingresado' : 'Pendiente'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Estos son los estilos para que la aplicación se vea bien.
// Están definidos directamente en el código para simplificar.
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '700px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  header: {
    marginBottom: '30px',
  },
  logo: {
    width: '80px',
    height: '80px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '2em',
    color: '#333',
    marginBottom: '20px',
  },
  scanSection: {
    marginBottom: '30px',
  },
  input: {
    padding: '10px 15px',
    fontSize: '1.1em',
    width: 'calc(100% - 130px)',
    marginRight: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.1em',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: { // Este estilo no se aplica automáticamente con React sin más código, es un ejemplo.
    backgroundColor: '#45a049',
  },
  resultMessage: {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #badbcc',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
  guestsTitle: {
    fontSize: '1.8em',
    color: '#333',
    marginTop: '40px',
    marginBottom: '20px',
  },
  guestsGrid: {
    display: 'grid',
    gap: '15px',
  },
  guestCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '10px 15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 5px rgba(0,0,0,0.08)',
    textAlign: 'left',
  },
  qrCodeImage: {
    width: '64px',
    height: '64px',
    border: '1px solid #eee',
    borderRadius: '4px',
  },
  guestInfo: {
    flex: '1',
  },
  guestName: {
    fontWeight: 'bold',
    fontSize: '1.1em',
    margin: '0 0 5px 0',
    color: '#333',
  },
  guestCode: {
    fontSize: '0.9em',
    color: '#666',
    margin: '0 0 5px 0',
  },
  guestStatus: {
    fontWeight: 'bold',
    fontSize: '1em',
    margin: '0',
  },
  statusCheckedIn: {
    color: '#28a745', // Verde
  },
  statusPending: {
    color: '#ffc107', // Amarillo/Naranja
  },
};

export default App;
