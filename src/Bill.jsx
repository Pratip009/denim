import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "./assets/denim.png";

const Bill = () => {
  const [formData, setFormData] = useState({
    sortNo: "",
    grade: "",
    rollNo: "",
    length: "",
    width: "",
    grossWt: "",
  });

  const componentRef = useRef();

  // ✅ Use contentRef instead of content (for v3)
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center p-6">
      {/* Bill */}
      <div
        ref={componentRef}
        id="print-area"
        className="w-[4in] h-[5in] p-2 border border-black flex flex-col justify-between"
      >
        <table className="w-full border-collapse border border-black text-lg flex-grow">
          <tbody>
            {["sortNo", "grade", "rollNo", "length", "width", "grossWt"].map(
              (field, i) => (
                <tr key={i}>
                  <td className="border border-black p-1 font-bold">
                    {field === "sortNo"
                      ? "Sort No"
                      : field === "grossWt"
                      ? "Gross Wt."
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </td>
                  <td className="border border-black p-1">
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full text-center outline-none print:border-none uppercase"
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* Logo Row at Bottom */}
        <div className="flex items-center justify-center mt-2">
          <img src={logo} alt="ONE DENIM" className="h-12 object-contain" />
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
