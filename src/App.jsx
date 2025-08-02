import React, { useState, useEffect } from "react";

export default function App() {
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [isValid, setIsValid] = useState(null);
  const [ageResult, setAgeResult] = useState("");

  function calculateAge(birthDate) {
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      ageDays += prevMonth.getDate();
    }

    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    return `${ageYears} years, ${ageMonths} months, ${ageDays} days`;
  }

  useEffect(() => {
    if (years && months && days) {
      const birthDate = new Date(years, months - 1, days); // month - 1 because JS months are 0-indexed
      if (!isNaN(birthDate.getTime()) && birthDate <= new Date()) {
        setIsValid(true);
        setAgeResult(calculateAge(birthDate));
      } else {
        setIsValid(false);
        setAgeResult("");
      }
    }
  }, [years, months, days]);

  return (
    <>
      <h1 className="text-xl font-bold m-4">Age Calculator</h1>

      {/* <div className="flex-row gap-4 w-4/5 p-6 border-2 sm:flex-col flex-wrap rounded-2xl "> */}
      <div className="flex flex-col sm:flex-col lg:flex-row flex-wrap gap-4 w-4/5 p-6 border-2 rounded-2xl">

        <input
          type="number"
          className="border-2 m-2 rounded p-1"
          placeholder="Year"
          min="1900"
          max={new Date().getFullYear()}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 1900 && value <= new Date().getFullYear()) {
              setYears(value);
            }
          }}
          required
        />

        <input
          type="number"
          className="border-2 m-2 rounded p-1"
          placeholder="Month"
          min="1"
          max="12"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 1 && value <= 12) {
              setMonths(value);
            }
          }}
          required
        />

        <input
          type="number"
          className="border-2 m-2 rounded p-1"
          placeholder="Day"
          min="1"
          max="31"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 1 && value <= 31) {
              setDays(value);
            }
          }}
          required
        />
      </div>

      <div className="m-4">
        {isValid === true && (
          <h1 className="text-green-600 font-semibold">Your Age: {ageResult}</h1>
        )}
        {isValid === false && (
          <h1 className="text-red-600 font-semibold">Invalid Date!</h1>
        )}
      </div>
    </>
  );
}
