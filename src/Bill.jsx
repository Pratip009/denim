// Bill.jsx
import React, { useState } from "react";
import logo from "./assets/denim.png"; // import logo

const Bill = () => {
  const [formData, setFormData] = useState({
    sortNo: "",
    grade: "",
    rollNo: "",
    length: "",
    width: "",
    grossWt: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center p-6">
      {/* Bill */}
      <div
        id="print-area"
        className="w-[4in] h-[5in] p-2 border border-black flex flex-col justify-between"
      >
        <table className="w-full border-collapse border border-black text-lg flex-grow">
          <tbody>
            <tr>
              <td className="border border-black p-1 font-bold">Sort No</td>
              <td className="border border-black p-1">
                <input
                  type="text"
                  name="sortNo"
                  value={formData.sortNo}
                  onChange={handleChange}
                  className="w-full outline-none print:border-none"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Grade</td>
              <td className="border border-black p-1">
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full outline-none print:border-none"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Roll No</td>
              <td className="border border-black p-1">
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  className="w-full outline-none print:border-none"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Length</td>
              <td className="border border-black p-1">
                <input
                  type="text"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  className="w-full outline-none print:border-none"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Width</td>
              <td className="border border-black p-1">
                <input
                  type="text"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  className="w-full outline-none print:border-none"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Gross Wt.</td>
              <td className="border border-black p-1">
                <input
                  type="text"
                  name="grossWt"
                  value={formData.grossWt}
                  onChange={handleChange}
                  className="w-full outline-none print:border-none"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Logo Row at Bottom */}
        <div className="flex items-center justify-center mt-2">
          <img
            src={logo}
            alt="ONE DENIM"
            className="h-12 object-contain"
          />
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md"
      >
        Print
      </button>
    </div>
  );
};

export default Bill;
