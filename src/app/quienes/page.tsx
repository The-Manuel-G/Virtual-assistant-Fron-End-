import React from 'react';
import EmployeeCard from '../../components/EmployeeCard';

const employees = [
  { name: 'Ariel Naranjo', title: 'Lider Desarrollador', image: '/images/Ariel2.jpg', email: 'arielnaranjoi829@gmail.com', portfolio: 'https://full-stack-developer2025.netlify.app/#', github: 'https://github.com/The-Manuel-G', linkedin: 'https://www.linkedin.com/in/ariel-naranjo-281623232/' },
  { name: 'Raynier Zorrilla', title: 'Desarrollador', image: '/images/Raynier.jpg', email: 'Zorrillaraynier2003@gmail.com', portfolio: 'https://idem-interrelation.000webhostapp.com', github: 'https://github.com/RaynierZorrilla', linkedin: 'https://www.linkedin.com/in/raynier-zorrilla-770145247/' },
  { name: 'Dayely Maria Santana', title: 'Vocera/Colaborador', image: '/images/dayelyfoto.jpeg', email: 'dayelymariasantana.m@gmail.com', portfolio: 'https://portafoliodayely.netlify.app/', github: 'https://github.com/daysant14', linkedin: 'https://www.linkedin.com/in/dayely-maria-santana-3b36372b7/' },
  { name: 'Marcos Reyes', title: 'Desarrollador', image: '/images/MarcosFoto.jpeg', email: 'marcosreyes24@hotmail.com', portfolio: 'https://jennyportfolio.com', github: 'https://github.com/Marck2524', linkedin: 'https://linkedin.com/in/jennywilson' },
  { name: 'Laura Esther Ramírez', title: 'Vocera/Colaborador', image: '/images/laurafoto.jpeg', email: 'lauramenual@gmail.com', portfolio: 'https://kristinportfolio.com', github: 'https://github.com/lauraesth-00', linkedin: 'www.linkedin.com/in/laura-ramírez-data-analyst' },
 
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {employees.map((employee, index) => (
          <EmployeeCard key={index} {...employee} />
        ))}
      </div>
    </div>
  );
}
