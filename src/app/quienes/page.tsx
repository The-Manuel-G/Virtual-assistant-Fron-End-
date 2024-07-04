import React from 'react';
import EmployeeCard from '../../components/EmployeeCard';

const employees = [
  { name: 'Ariel Naranjo', title: 'Lider Desarrollador', image: '/images/Ariel2.jpg', email: 'arielnaranjoi829@gmail.com', portfolio: 'https://full-stack-developer2025.netlify.app/#', github: 'https://github.com/The-Manuel-G', linkedin: 'https://www.linkedin.com/in/ariel-naranjo-281623232/' },
  { name: 'Cody Fisher', title: 'Lead Security Associate', image: '/images/Raynier.jpg', email: 'cody.fisher@example.com', portfolio: 'https://codyportfolio.com', github: 'https://github.com/codyfisher', linkedin: 'https://linkedin.com/in/codyfisher' },
  { name: 'Esther Howard', title: 'Assurance Administrator', image: '/images/esther.jpg', email: 'esther.howard@example.com', portfolio: 'https://estherportfolio.com', github: 'https://github.com/estherhoward', linkedin: 'https://linkedin.com/in/estherhoward' },
  { name: 'Jenny Wilson', title: 'Chief Accountability Analyst', image: '/images/jenny.jpg', email: 'jenny.wilson@example.com', portfolio: 'https://jennyportfolio.com', github: 'https://github.com/jennywilson', linkedin: 'https://linkedin.com/in/jennywilson' },
  { name: 'Kristin Watson', title: 'Investor Data Orchestrator', image: '/images/kristin.jpg', email: 'kristin.watson@example.com', portfolio: 'https://kristinportfolio.com', github: 'https://github.com/kristinwatson', linkedin: 'https://linkedin.com/in/kristinwatson' },
  { name: 'Cameron Williamson', title: 'Product Infrastructure Executive', image: '/images/cameron.jpg', email: 'cameron.williamson@example.com', portfolio: 'https://cameronportfolio.com', github: 'https://github.com/cameronwilliamson', linkedin: 'https://linkedin.com/in/cameronwilliamson' },
  { name: 'Courtney Henry', title: 'Investor Factors Associate', image: '/images/courtney.jpg', email: 'courtney.henry@example.com', portfolio: 'https://courtneyportfolio.com', github: 'https://github.com/courtneyhenry', linkedin: 'https://linkedin.com/in/courtneyhenry' },
  { name: 'Theresa Webb', title: 'Global Division Officer', image: '/images/theresa.jpg', email: 'theresa.webb@example.com', portfolio: 'https://theresaportfolio.com', github: 'https://github.com/theresawebb', linkedin: 'https://linkedin.com/in/theresawebb' },
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
