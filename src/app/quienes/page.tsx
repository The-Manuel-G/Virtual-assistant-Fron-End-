import React from 'react';
import EmployeeCard from '../../components/EmployeeCard';

const employees = [
  { name: 'Ariel Naranjo', title: 'Lider Desarrollador', image: 'public/icono.jpg' },
  { name: 'Raynier Zorrilla', title: 'Desarrollador', image: '/public/Raynier.jpg' },
  { name: 'Marcos', title: 'Desarrollador', image: '/images/esther.jpg' },
  { name: 'Dayely Santana', title: 'Vocero', image: '/images/jenny.jpg' },
  { name: 'Laura ', title: 'Vocero', image: '/images/kristin.jpg' },
 
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Nuestro equipo</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {employees.map((employee, index) => (
          <EmployeeCard key={index} {...employee} />
        ))}
      </div>
    </div>
  );
}