import React, { useState } from "react";
import Bill from "./Bill";
import LabelForm from "./LabelForm";

const PrintManager = () => {
  const [activeForm, setActiveForm] = useState("bill");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Print Template Manager
      </h1>

      <div className="mb-6">
        <label htmlFor="formSelector" className="mr-3 font-semibold">
          Select Template:
        </label>
        <select
          id="formSelector"
          value={activeForm}
          onChange={(e) => setActiveForm(e.target.value)}
          className="border border-gray-400 rounded-md px-3 py-1 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="bill">Bill (Logo / Barcode)</option>
          <option value="label">Label Form</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-300">
        {activeForm === "bill" ? <Bill /> : <LabelForm />}
      </div>
    </div>
  );
};

export default PrintManager;
