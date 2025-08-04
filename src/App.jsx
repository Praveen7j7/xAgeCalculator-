import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [errors, setErrors] = useState({});
  const [age, setAge] = useState({ years: '--', months: '--', days: '--' });

  const validate = () => {
    const errs = {};
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (!day) {
      errs.day = "This field is required";
    } else if (dayNum < 1 || dayNum > 31) {
      errs.day = "Must be a valid day";
    }

    if (!month) {
      errs.month = "This field is required";
    } else if (monthNum < 1 || monthNum > 12) {
      errs.month = "Must be a valid month";
    }

    const inputDate = new Date(`${year}-${month}-${day}`);
      const today = new Date();
    if (!year) {
      errs.year = "This field is required";
    }
    else if(inputDate>today)
    {
      errs.year="Must be in past";
    }
    

    if (day && month && year) {
      const inputDate = new Date(`${year}-${month}-${day}`);
      const today = new Date();

      if (isNaN(inputDate.getTime()) || inputDate.getDate() !== dayNum) {
        errs.day = "Must be a valid date"; // Only override day field
      } else if (inputDate > today) {
        errs.year = "Must be in past"; // You can also assign to `errs.date` if you prefer
      }
    }

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
    <>
      <div className="container">
        <div className="content">
          <div className="input-group">
            <div className="input-field">
              <label htmlFor="dayIn">DAY</label>
              <input id="dayIn" type="number" placeholder="DD" value={day} onChange={(e) => setDay(e.target.value)} />
              {errors.day && <span className="error">{errors.day}</span>}
            </div>
            <div className="input-field">
              <label htmlFor="monthIn">MONTH</label>
              <input id="monthIn" type="number" placeholder="MM" value={month} onChange={(e) => setMonth(e.target.value)} />
              {errors.month && <span className="error">{errors.month}</span>}
            </div>
            <div className="input-field">
              <label htmlFor="yearIn">YEAR</label>
              <input id="yearIn" type="number" placeholder="YYYY" value={year} onChange={(e) => setYear(e.target.value)} />
              {errors.year && <span className="error">{errors.year}</span>}
            </div>
          </div>

          {errors.date && <p className="date-error">{errors.date}</p>}

          <div className="calculate-btn">
            <button id="calculateBtn" onClick={handleCalculate}>↓</button>
          </div>

          <div className="results">
            <p><span id="yearOut">{age.years}</span>years</p>
            <p><span id="monthOut">{age.months}</span>months</p>
            <p><span id="dayOut">{age.days}</span>days</p>
          </div>
        </div>
      </div>

    </>
  );
}
