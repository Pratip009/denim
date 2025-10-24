import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "./assets/denim.png";
import barcode from "./assets/bar.jpg";

const Bill = () => {
  const [formData, setFormData] = useState({
    sortNo: "", grade: "", rollNo: "", length: "", width: "", grossWt: ""
  });

  const [barcodeData, setBarcodeData] = useState({
    sortNo: "", grade: "", rollNo: "", refNo: "", length: "", width: "",
    grossWt: "", noOfPcs1: "", noOfPcs2: ""
  });

  const [displayOption, setDisplayOption] = useState("logo");

  const componentRef = useRef(null);
  const inputRefs = useRef([]);
  const barcodeInputRefs = useRef([]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Bill Print",
    pageStyle: `@page {size:4in 5.5in;margin:0;}@media print{body *{visibility:hidden}#print-area,#print-area *{visibility:visible;position:absolute;left:0;top:0;width:4in;height:5.5in}input{border:none;background:transparent;color:black}table,td,th{border:4px solid black!important}}`,
    removeAfterPrint: false,
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value.toUpperCase() });
  const handleBarcodeChange = (e) => setBarcodeData({ ...barcodeData, [e.target.name]: e.target.value.toUpperCase() });
  const handleKeyDown = (e, index, isBarcode = false) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const refs = isBarcode ? barcodeInputRefs : inputRefs;
      const nextInput = refs.current[index + 1];
      if (nextInput) nextInput.focus();
    }
  };
  const handleDisplayChange = (e) => setDisplayOption(e.target.value);

  return (
    <div className="flex flex-col items-center p-6">
      <div className="mb-4">
        <label className="mr-2 font-bold">Display:</label>
        <select value={displayOption} onChange={handleDisplayChange} className="border border-gray-300 rounded p-1">
          <option value="logo">Logo</option>
          <option value="barcode">Barcode</option>
        </select>
      </div>

      <div ref={componentRef} id="print-area" className="w-[4in] h-[5.5in] p-2 border-4 border-black flex flex-col justify-between">
        {displayOption === "logo" ? (
          <>
            <table className="w-full border-collapse border-4 border-black text-[22px] flex-grow">
              <tbody>
                {["sortNo", "grade", "rollNo", "length", "width", "grossWt"].map((field, i) => (
                  <tr key={i}>
                    <td className="border-4 border-black p-1 font-extrabold w-1/3 text-start">
                      {field === "sortNo" ? "Sort No" : field === "grossWt" ? "Gross Wt." : field.charAt(0).toUpperCase() + field.slice(1)}
                    </td>
                    <td className="border-4 border-black p-1 w-2/3">
                      <input ref={(el) => (inputRefs.current[i] = el)} type="text" name={field} value={formData[field]} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, i)} className="w-full text-center outline-none uppercase font-bold text-3xl" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-center mt-2">
              <img src={logo} alt="ONE DENIM" className="h-12 object-contain" />
            </div>
          </>
        ) : (
          <>
            <table className="w-full border-collapse border-1 border-black text-lg flex-grow">
              <tbody>
                {["sortNo", "grade", "rollNo", "refNo", "length", "width", "grossWt"].map((field, i) => (
                  <tr key={i}>
                    <td className="border-2 border-black p-1 font-extrabold w-1/3 text-center">
                      {field === "sortNo" ? "Sort No" : field === "refNo" ? "Ref No" : field === "grossWt" ? "Gross Wt." : field.charAt(0).toUpperCase() + field.slice(1)}
                    </td>
                    <td colSpan={2} className="border-2 border-black p-1 text-center">
                      <input ref={(el) => (barcodeInputRefs.current[i] = el)} type="text" name={field} value={barcodeData[field]} onChange={handleBarcodeChange} onKeyDown={(e) => handleKeyDown(e, i, true)} className="w-full text-center outline-none uppercase font-bold text-3xl" />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border-2 border-black p-1 font-extrabold w-1/3 text-center">No of Pcs</td>
                  <td className="border-2 border-black p-1">
                    <input ref={(el) => (barcodeInputRefs.current[7] = el)} type="text" name="noOfPcs1" value={barcodeData.noOfPcs1} onChange={handleBarcodeChange} onKeyDown={(e) => handleKeyDown(e, 7, true)} className="w-full text-center outline-none uppercase font-bold text-3xl" />
                  </td>
                  <td className="border-2 border-black p-1">
                    <input ref={(el) => (barcodeInputRefs.current[8] = el)} type="text" name="noOfPcs2" value={barcodeData.noOfPcs2} onChange={handleBarcodeChange} onKeyDown={(e) => handleKeyDown(e, 8, true)} className="w-full text-center outline-none uppercase font-bold text-3xl" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col items-center mt-2">
              <img src={barcode} alt="Barcode" style={{ height: "48px", width: "150px", display: "block" }} />
              <span className="mt-1 font-normal text-base" style={{ letterSpacing: "0.5em", textTransform: "uppercase" }}>{barcodeData.rollNo}</span>
            </div>
          </>
        )}
      </div>

      <button onClick={handlePrint} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md">Print</button>
    </div>
  );
};

export default Bill;