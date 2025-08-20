import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "./assets/denim.png";
import barcode from "./assets/bar.jpg";

const Bill = () => {
  const [formData, setFormData] = useState({
    sortNo: "",
    grade: "",
    rollNo: "",
    length: "",
    width: "",
    grossWt: "",
  });
  const [displayOption, setDisplayOption] = useState("logo");
  const componentRef = useRef();
  const inputRefs = useRef([]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleDisplayChange = (e) => {
    setDisplayOption(e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="mb-4">
        <label htmlFor="displayOption" className="mr-2 font-bold">
          Display:
        </label>
        <select
          id="displayOption"
          value={displayOption}
          onChange={handleDisplayChange}
          className="border border-gray-300 rounded p-1"
        >
          <option value="logo">Logo</option>
          <option value="barcode">Barcode</option>
        </select>
      </div>

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
                  <td className="border border-black p-1 font-extrabold">
                    {field === "sortNo"
                      ? "Sort No"
                      : field === "grossWt"
                      ? "Gross Wt."
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </td>
                  <td className="border border-black p-1">
                    <input
                      ref={(el) => (inputRefs.current[i] = el)}
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className="w-full text-center outline-none print:border-none uppercase font-extrabold"
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-center mt-2">
          {displayOption === "logo" ? (
            <img src={logo} alt="ONE DENIM" className="h-12 object-contain" />
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={barcode}
                alt="Barcode"
                style={{ height: "48px", width: "150px", display: "block" }}
              />

              <span
                className="text-sm font-normal mt-1"
                style={{
                  letterSpacing: ".5em",
                }}
              >
                {formData.rollNo}
              </span>
            </div>
          )}
        </div>
      </div>

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
