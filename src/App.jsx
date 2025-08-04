import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { tv } from 'tailwind-variants';

const container = tv({
  base: 'flex min-h-screen items-center justify-center bg-zinc-100 p-4 font-poppins',
});

const content = tv({
  base: 'flex w-full flex-col gap-8 rounded-3xl rounded-br-[10rem] bg-white p-6 md:p-12',
  variants: {
    size: {
      mobile: 'max-w-[300px]',
      desktop: 'max-w-[750px]',
    },
  },
});

const inputContainer = tv({
  base: 'flex w-full gap-4 md:gap-8',
});

const inputWrapper = tv({
  base: 'flex w-1/3 flex-col gap-1',
});

const label = tv({
  base: 'text-sm font-bold uppercase tracking-wider text-gray-500',
});

const input = tv({
  base: 'w-full rounded-md border border-gray-300 p-2 text-xl font-bold transition-colors focus:border-purple-600 focus:outline-none md:p-4 md:text-3xl',
  variants: {
    hasError: {
      true: 'border-red-500',
    },
  },
});

const error = tv({
  base: 'text-xs text-red-500 italic',
});

const divider = tv({
  base: 'relative my-8',
});

const line = tv({
  base: 'h-[1px] w-full bg-gray-300',
});

const button = tv({
  base: 'absolute -top-1/2 right-0 flex h-16 w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-purple-600 transition-colors hover:bg-zinc-950 md:h-24 md:w-24',
});

const arrowIcon = tv({
  base: 'h-8 w-8 text-white md:h-12 md:w-12',
});

const resultItem = tv({
  base: 'flex items-center gap-2 text-5xl font-extrabold italic md:text-8xl',
});

const resultValue = tv({
  base: 'text-purple-600',
});

const resultLabel = tv({
  base: 'text-zinc-950',
});

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
    <div className={container()}>
      <div className={content({ size: 'desktop' })}>
        <div className={inputContainer({ class: 'input' })}>
          <div className={inputWrapper()}>
            <label htmlFor="dayIn" className={label()}>
              Day
            </label>
            <input
              id="dayIn"
              className={input({ hasError: !!dayError })}
              type="number"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              onBlur={calculateAge}
            />
            {dayError && <div className={error()}>{dayError}</div>}
          </div>
          <div className={inputWrapper()}>
            <label htmlFor="monthIn" className={label()}>
              Month
            </label>
            <input
              id="monthIn"
              className={input({ hasError: !!monthError })}
              type="number"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              onBlur={calculateAge}
            />
            {monthError && <div className={error()}>{monthError}</div>}
          </div>
          <div className={inputWrapper()}>
            <label htmlFor="yearIn" className={label()}>
              Year
            </label>
            <input
              id="yearIn"
              className={input({ hasError: !!yearError })}
              type="number"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              onBlur={calculateAge}
            />
            {yearError && <div className={error()}>{yearError}</div>}
          </div>
        </div>

        <div className={divider()}>
          <div className={line()} />
          <button
            id="calculateBtn"
            className={button()}
            onClick={calculateAge}
          >
            <ArrowDown className={arrowIcon()} />
          </button>
        </div>

        <div>
          <div className={resultItem()}>
            <p id="yearOut" className={resultValue()}>
              {yearsOut}
            </p>
            <span className={resultLabel()}>years</span>
          </div>
          <div className={resultItem()}>
            <p id="monthOut" className={resultValue()}>
              {monthsOut}
            </p>
            <span className={resultLabel()}>months</span>
          </div>
          <div className={resultItem()}>
            <p id="dayOut" className={resultValue()}>
              {daysOut}
            </p>
            <span className={resultLabel()}>days</span>
          </div>
        </div>
      </div>
    </div>
  );
}