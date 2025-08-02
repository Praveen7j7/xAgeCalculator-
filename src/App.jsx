import React, { useState } from 'react';
// import './App.css';

export default function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [errors, setErrors] = useState({});
  const [age, setAge] = useState({ years: '--', months: '--', days: '--' });

  const validate = () => {
    const errs = {};
    if (!day) errs.day = 'This field is required';
    if (!month) errs.month = 'This field is required';
    if (!year) errs.year = 'This field is required';

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (month && (monthNum < 1 || monthNum > 12)) errs.month = 'Must be a valid month';
    if (day && (dayNum < 1 || dayNum > 31)) errs.day = 'Must be a valid day';

    const inputDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    if (inputDate > today) errs.date = 'Must be in past';
    if (isNaN(inputDate.getTime()) || inputDate.getDate() !== dayNum) errs.date = 'Must be a valid date';

    return errs;
  };

  const handleCalculate = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setAge({ years: '--', months: '--', days: '--' });
      return;
    }

    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    let y = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let d = today.getDate() - birthDate.getDate();

    if (d < 0) {
      m--;
      d += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (m < 0) {
      y--;
      m += 12;
    }

    setAge({ years: y, months: m, days: d });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="content bg-white p-6 rounded-2xl w-[300px] lg:w-[750px] shadow-md">
        <div className="input flex gap-4 mb-4 text-sm font-bold tracking-widest">
          <div className="flex flex-col">
            <label htmlFor="dayIn" className="text-red-400">DAY</label>
            <input id="dayIn" type="number" placeholder="DD" value={day} onChange={(e) => setDay(e.target.value)} className="border p-2 w-20 rounded-md" />
            {errors.day && <span className="error text-red-500 text-xs">{errors.day}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="monthIn" className="text-red-400">MONTH</label>
            <input id="monthIn" type="number" placeholder="MM" value={month} onChange={(e) => setMonth(e.target.value)} className="border p-2 w-20 rounded-md" />
            {errors.month && <span className="error text-red-500 text-xs">{errors.month}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="yearIn" className="text-red-400">YEAR</label>
            <input id="yearIn" type="number" placeholder="YYYY" value={year} onChange={(e) => setYear(e.target.value)} className="border p-2 w-28 rounded-md" />
            {errors.year && <span className="error text-red-500 text-xs">{errors.year}</span>}
          </div>
        </div>

        {errors.date && <p className="error text-red-500 text-xs mb-2">{errors.date}</p>}

        <div className="flex justify-end">
          <button
            id="calculateBtn"
            onClick={handleCalculate}
            className="bg-purple-600 text-white p-4 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2"
          >
            ↓
          </button>
        </div>

        <div className="results mt-6 text-4xl font-black italic">
          <p><span id="yearOut" className="text-purple-600">{age.years}</span> years</p>
          <p><span id="monthOut" className="text-purple-600">{age.months}</span> months</p>
          <p><span id="dayOut" className="text-purple-600">{age.days}</span> days</p>
        </div>
      </div>
    </div>
  );
}
