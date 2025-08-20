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

  const [barcodeData, setBarcodeData] = useState({
    sortNo: "",
    grade: "",
    rollNo: "",
    refNo: "",
    length: "",
    width: "",
    grossWt: "",
    noOfPcs1: "",
    noOfPcs2: "",
  });

  const [displayOption, setDisplayOption] = useState("logo");

  const componentRef = useRef();
  const inputRefs = useRef([]);
  const barcodeInputRefs = useRef([]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.toUpperCase() });
  };

  const handleBarcodeChange = (e) => {
    setBarcodeData({
      ...barcodeData,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleKeyDown = (e, index, isBarcode = false) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const refs = isBarcode ? barcodeInputRefs : inputRefs;
      const nextInput = refs.current[index + 1];
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
      {/* Toggle Option */}
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

      {/* Print Area */}
      <div
        ref={componentRef}
        id="print-area"
        className="w-[4in] h-[5.5in] p-2 border border-black flex flex-col justify-between"
      >
        {displayOption === "logo" ? (
          <>
            {/* Table for Logo Mode */}
            <table className="w-full border-collapse border border-black text-lg flex-grow">
              <tbody>
                {[
                  "sortNo",
                  "grade",
                  "rollNo",
                  "length",
                  "width",
                  "grossWt",
                ].map((field, i) => (
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
                        className="w-full text-center outline-none print:border-none uppercase font-bold text-3xl print:text-3xl"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Logo */}
            <div className="flex items-center justify-center mt-2">
              <img src={logo} alt="ONE DENIM" className="h-12 object-contain" />
            </div>
          </>
        ) : (
          <>
            {/* Table for Barcode Mode */}
            <table className="w-full border-collapse border border-black text-lg flex-grow">
              <tbody>
                {[
                  "sortNo",
                  "grade",
                  "rollNo",
                  "refNo",
                  "length",
                  "width",
                  "grossWt",
                ].map((field, i) => (
                  <tr key={i}>
                    <td className="border border-black p-1 font-extrabold w-1/3 text-center">
                      {field === "sortNo"
                        ? "Sort No"
                        : field === "refNo"
                        ? "Ref No"
                        : field === "grossWt"
                        ? "Gross Wt."
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </td>
                    {/* ✅ input spans across 2 columns for consistency */}
                    <td
                      colSpan={2}
                      className="border border-black p-1 text-center"
                    >
                      <input
                        ref={(el) => (barcodeInputRefs.current[i] = el)}
                        type="text"
                        name={field}
                        value={barcodeData[field]}
                        onChange={handleBarcodeChange}
                        onKeyDown={(e) => handleKeyDown(e, i, true)}
                        className="w-full text-center outline-none print:border-none uppercase font-bold text-3xl print:text-3xl"
                      />
                    </td>
                  </tr>
                ))}

                {/* ✅ Special Row: No of Pcs with 2 inputs */}
                <tr>
                  <td className="border border-black p-1 font-extrabold w-1/3 text-center">
                    No of Pcs
                  </td>
                  <td className="border border-black p-1">
                    <input
                      ref={(el) => (barcodeInputRefs.current[7] = el)}
                      type="text"
                      name="noOfPcs1"
                      value={barcodeData.noOfPcs1}
                      onChange={handleBarcodeChange}
                      onKeyDown={(e) => handleKeyDown(e, 7, true)}
                      className="w-full text-center outline-none print:border-none uppercase font-bold text-3xl print:text-3xl"
                    />
                  </td>
                  <td className="border border-black p-1">
                    <input
                      ref={(el) => (barcodeInputRefs.current[8] = el)}
                      type="text"
                      name="noOfPcs2"
                      value={barcodeData.noOfPcs2}
                      onChange={handleBarcodeChange}
                      onKeyDown={(e) => handleKeyDown(e, 8, true)}
                      className="w-full text-center outline-none print:border-none uppercase font-bold text-3xl print:text-3xl"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Barcode + Roll No below */}
            <div className="flex flex-col items-center mt-2">
              <img
                src={barcode}
                alt="Barcode"
                style={{ height: "48px", width: "150px", display: "block" }}
              />
              <span
                className="mt-1 font-normal text-base"
                style={{
                  letterSpacing: "0.5em",
                  textTransform: "uppercase",
                }}
              >
                {barcodeData.rollNo}
              </span>
            </div>
          </>
        )}
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
