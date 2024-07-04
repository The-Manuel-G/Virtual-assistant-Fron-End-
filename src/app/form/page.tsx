"use client";

import { useState } from 'react';
import Step1 from '../../components/Step1';
import Step2 from '../../components/Step2';
import Step3 from '../../components/Step3';
import Step4 from '../../components/Step4';

export default function Form() {
  const [step, setStep] = useState(1);
  const [sueldo, setSueldo] = useState('');
  const [compromisos, setCompromisos] = useState('');
  const [deudas, setDeudas] = useState([{ nombre: '', cantidad: '' }]);
  const [deseos, setDeseos] = useState([]);
  const [nuevoDeseo, setNuevoDeseo] = useState({ nombre: '', costo: '' });

  const handleNext = () => {
    if (step === 1 && sueldo) setStep(step + 1);
    if (step === 2 && compromisos) setStep(step + 1);
    if (step === 3 && deudas.every(d => d.nombre && d.cantidad)) setStep(step + 1);
    if (step === 4 && nuevoDeseo.nombre && nuevoDeseo.costo) {
      setDeseos([...deseos, nuevoDeseo]);
      setNuevoDeseo({ nombre: '', costo: '' });
    }
  };

  const handleFinish = () => {
    localStorage.setItem('sueldo', sueldo);
    localStorage.setItem('compromisos', compromisos);
    localStorage.setItem('deudas', JSON.stringify(deudas));
    localStorage.setItem('deseos', JSON.stringify(deseos));
    window.location.href = '/resultado';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {step === 1 && <Step1 sueldo={sueldo} setSueldo={setSueldo} handleNext={handleNext} />}
      {step === 2 && <Step2 compromisos={compromisos} setCompromisos={setCompromisos} handleNext={handleNext} />}
      {step === 3 && <Step3 deudas={deudas} setDeudas={setDeudas} handleNext={handleNext} />}
      {step === 4 && (
        <Step4
          nuevoDeseo={nuevoDeseo}
          setNuevoDeseo={setNuevoDeseo}
          deseos={deseos}
          handleNext={handleNext}
          handleFinish={handleFinish}
        />
      )}
    </div>
  );
}
