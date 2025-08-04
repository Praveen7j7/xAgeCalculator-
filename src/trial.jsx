//Via Tailswind Method 

import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getDaysInMonth = (month, year) => {
  const daysInMonths = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonths[month - 1];
};

export default function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [dayError, setDayError] = useState('');
  const [monthError, setMonthError] = useState('');
  const [yearError, setYearError] = useState('');

  const [yearsOut, setYearsOut] = useState('--');
  const [monthsOut, setMonthsOut] = useState('--');
  const [daysOut, setDaysOut] = useState('--');

  const calculateAge = () => {
    let hasError = false;

    // Reset errors and results
    setDayError('');
    setMonthError('');
    setYearError('');
    setYearsOut('--');
    setMonthsOut('--');
    setDaysOut('--');

    // Validation
    if (!day) {
      setDayError('This field is required');
      hasError = true;
    } else if (parseInt(day) < 1 || parseInt(day) > 31) {
      setDayError('Must be a valid day');
      hasError = true;
    }

    if (!month) {
      setMonthError('This field is required');
      hasError = true;
    } else if (parseInt(month) < 1 || parseInt(month) > 12) {
      setMonthError('Must be a valid month');
      hasError = true;
    }

    const currentYear = new Date().getFullYear();
    if (!year) {
      setYearError('This field is required');
      hasError = true;
    } else if (parseInt(year) > currentYear) {
      setYearError('Must be in past');
      hasError = true;
    }

    // Check for a valid date after individual field checks
    if (day && month && year && !hasError) {
      const inputDate = new Date(year, month - 1, day);
      const today = new Date();

      if (inputDate > today) {
        setYearError('Must be in past');
        hasError = true;
      }
      
      const dayInt = parseInt(day);
      const monthInt = parseInt(month);
      const yearInt = parseInt(year);

      // Check for invalid day in a given month
      if (dayInt > getDaysInMonth(monthInt, yearInt)) {
        setDayError('Must be a valid day');
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    // Age calculation logic
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += getDaysInMonth(today.getMonth(), today.getFullYear());
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setYearsOut(years);
    setMonthsOut(months);
    setDaysOut(days);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4 font-poppins">
      <div className="content flex w-full max-w-[750px] flex-col gap-8 rounded-3xl rounded-br-[10rem] bg-white p-6 md:max-w-[750px] md:p-12">
        <div className="input flex w-full gap-4 md:gap-8">
          <div className="flex w-1/3 flex-col gap-1">
            <label htmlFor="dayIn" className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Day
            </label>
            <input
              id="dayIn"
              className={`w-full rounded-md border p-2 text-xl font-bold transition-colors focus:border-purple-600 focus:outline-none md:p-4 md:text-3xl ${dayError ? 'border-red-500' : 'border-gray-300'}`}
              type="number"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              onBlur={calculateAge}
            />
            {dayError && <div className="error text-xs italic text-red-500">{dayError}</div>}
          </div>
          <div className="flex w-1/3 flex-col gap-1">
            <label htmlFor="monthIn" className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Month
            </label>
            <input
              id="monthIn"
              className={`w-full rounded-md border p-2 text-xl font-bold transition-colors focus:border-purple-600 focus:outline-none md:p-4 md:text-3xl ${monthError ? 'border-red-500' : 'border-gray-300'}`}
              type="number"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              onBlur={calculateAge}
            />
            {monthError && <div className="error text-xs italic text-red-500">{monthError}</div>}
          </div>
          <div className="flex w-1/3 flex-col gap-1">
            <label htmlFor="yearIn" className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Year
            </label>
            <input
              id="yearIn"
              className={`w-full rounded-md border p-2 text-xl font-bold transition-colors focus:border-purple-600 focus:outline-none md:p-4 md:text-3xl ${yearError ? 'border-red-500' : 'border-gray-300'}`}
              type="number"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              onBlur={calculateAge}
            />
            {yearError && <div className="error text-xs italic text-red-500">{yearError}</div>}
          </div>
        </div>

        <div className="relative my-8">
          <div className="h-[1px] w-full bg-gray-300" />
          <button
            id="calculateBtn"
            className="absolute -top-1/2 right-0 flex h-16 w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-purple-600 transition-colors hover:bg-zinc-950 md:h-24 md:w-24"
            onClick={calculateAge}
          >
            <ArrowDown className="h-8 w-8 text-white md:h-12 md:w-12" />
          </button>
        </div>

        <div>
          <div className="flex items-center gap-2 text-5xl font-extrabold italic md:text-8xl">
            <p id="yearOut" className="text-purple-600">
              {yearsOut}
            </p>
            <span className="text-zinc-950">years</span>
          </div>
          <div className="flex items-center gap-2 text-5xl font-extrabold italic md:text-8xl">
            <p id="monthOut" className="text-purple-600">
              {monthsOut}
            </p>
            <span className="text-zinc-950">months</span>
          </div>
          <div className="flex items-center gap-2 text-5xl font-extrabold italic md:text-8xl">
            <p id="dayOut" className="text-purple-600">
              {daysOut}
            </p>
            <span className="text-zinc-950">days</span>
          </div>
        </div>
      </div>
    </div>
  );
}