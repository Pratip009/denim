import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "./assets/denim.png";
import barcode from "./assets/bar.jpg";

const Bill = () => {
  // Separate state for each form type
  const [logoData, setLogoData] = useState({
    sortNo: "",
    grade: "",
    rollNo: "",
    length: "",
    width: "",
    grossWt: "",
  });

  const [format1Data, setFormat1Data] = useState({
    sortNo: "",
    grade: "",
    rollNo: "",
    length: "",
    width: "",
    grossWt: "",
    noOfPcs: "",
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
  const [editableLogoText, setEditableLogoText] = useState("APELLO");

  const componentRef = useRef();
  const inputRefs = useRef([]);
  const format1Refs = useRef([]);
  const barcodeInputRefs = useRef([]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  // Separate handlers for each form
  const handleLogoChange = (e) => {
    setLogoData({ ...logoData, [e.target.name]: e.target.value.toUpperCase() });
  };

  const handleFormat1Change = (e) => {
    setFormat1Data({
      ...format1Data,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleBarcodeChange = (e) => {
    setBarcodeData({
      ...barcodeData,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  // Enter key navigation handler
  const handleKeyDown = (e, index, refs) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextInput = refs.current[index + 1];
      if (nextInput) nextInput.focus();
    }
  };

  const handleDisplayChange = (e) => setDisplayOption(e.target.value);

  return (
    <div className="flex flex-col items-center p-6">
      {/* Dropdown */}
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
          <option value="format1">Format 1</option>
          <option value="format2">Format 2</option>
        </select>
      </div>

      {/* Print Area */}
      <div
        ref={componentRef}
        id="print-area"
        className={`${
          displayOption === "format2" ? "w-[6in] h-[4in]" : "w-[4in] h-[5.5in]"
        } p-2 border-4 border-black flex flex-col justify-between`}
      >
        {/* ✅ Logo Mode */}
        {displayOption === "logo" && (
          <>
            <table className="w-full border-collapse border-4 border-black text-[22px] flex-grow">
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
                    <td className="border-4 border-black p-1 font-extrabold w-1/3 text-center">
                      {field === "sortNo"
                        ? "Sort No"
                        : field === "grossWt"
                        ? "Gross Wt."
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </td>
                    <td className="border-4 border-black p-1 w-2/3">
                      <input
                        ref={(el) => (inputRefs.current[i] = el)}
                        type="text"
                        name={field}
                        value={logoData[field]}
                        onChange={handleLogoChange}
                        onKeyDown={(e) => handleKeyDown(e, i, inputRefs)}
                        className="w-full text-center outline-none uppercase font-bold text-3xl"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-center mt-2">
              <img src={logo} alt="ONE DENIM" className="h-12 object-contain" />
            </div>
          </>
        )}

        {/* ✅ Barcode Mode */}
      {displayOption === "barcode" && (
  <table
    className="w-full border border-black border-collapse text-lg"
    style={{
      borderSpacing: 0,
      margin: 0,
      padding: 0,
      tableLayout: "fixed",
    }}
  >
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
          <td
            className="border border-black font-extrabold text-center align-middle"
            style={{
              width: "33%",
              padding: "2px",
              height: "48px", // consistent row height
            }}
          >
            {field === "sortNo"
              ? "Sort No"
              : field === "refNo"
              ? "Ref No"
              : field === "grossWt"
              ? "Gross Wt."
              : field.charAt(0).toUpperCase() + field.slice(1)}
          </td>
          <td
            colSpan={2}
            className="border border-black text-center align-middle"
            style={{
              padding: "2px",
              height: "48px",
            }}
          >
            <input
              ref={(el) => (barcodeInputRefs.current[i] = el)}
              type="text"
              name={field}
              value={barcodeData[field]}
              onChange={handleBarcodeChange}
              onKeyDown={(e) => handleKeyDown(e, i, barcodeInputRefs)}
              className="w-full text-center outline-none uppercase font-bold text-3xl"
              style={{
                height: "100%",
                padding: "0",
                border: "none",
                margin: 0,
              }}
            />
          </td>
        </tr>
      ))}

      {/* Row for No of Pcs */}
      <tr>
        <td
          className="border border-black font-extrabold text-center align-middle"
          style={{
            padding: "2px",
            height: "48px",
          }}
        >
          No of Pcs
        </td>
        <td
          className="border border-black text-center align-middle"
          style={{
            padding: "2px",
            height: "48px",
          }}
        >
          <input
            type="text"
            name="noOfPcs1"
            value={barcodeData.noOfPcs1}
            onChange={handleBarcodeChange}
            className="w-full text-center outline-none uppercase font-bold text-3xl"
            style={{
              height: "100%",
              padding: "0",
              border: "none",
              margin: 0,
            }}
          />
        </td>
        <td
          className="border border-black text-center align-middle"
          style={{
            padding: "2px",
            height: "48px",
          }}
        >
          <input
            type="text"
            name="noOfPcs2"
            value={barcodeData.noOfPcs2}
            onChange={handleBarcodeChange}
            className="w-full text-center outline-none uppercase font-bold text-3xl"
            style={{
              height: "100%",
              padding: "0",
              border: "none",
              margin: 0,
            }}
          />
        </td>
      </tr>

      {/* Barcode inside same border */}
      <tr>
        <td
          colSpan={3}
          className="border border-black text-center align-middle"
          style={{
            padding: "2px 0 0 0",
            height: "85px",
            verticalAlign: "middle",
          }}
        >
          <div
            className="flex flex-col justify-center items-center w-full"
            style={{
              margin: 0,
              padding: 0,
              lineHeight: 1,
            }}
          >
            <img
              src={barcode}
              alt="Barcode"
              style={{
                height: "55px",
                width: "190px",
                margin: 0,
                padding: 0,
                display: "block",
              }}
            />
            <span
              className="font-normal text-base"
              style={{
                letterSpacing: "0.5em",
                marginTop: "2px",
                lineHeight: 1,
              }}
            >
              {barcodeData.rollNo}
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
)}



        {/* ✅ Format 1 (DOBBY Style) */}
        {displayOption === "format1" && (
          <>
            <table className="w-full border-collapse border border-black text-lg flex-grow">
              <tbody>
                {[
                  "sortNo",
                  "grade",
                  "rollNo",
                  "length",
                  "width",
                  "grossWt",
                  "noOfPcs",
                ].map((field, i) => (
                  <tr key={i}>
                    <td className="border border-black p-1 font-bold w-1/3 text-center">
                      {field === "sortNo"
                        ? "Sort No"
                        : field === "grossWt"
                        ? "Gross Wt."
                        : field === "noOfPcs"
                        ? "No of Pcs"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </td>
                    <td className="border border-black p-1 w-2/3 text-center">
                      <input
                        ref={(el) => (format1Refs.current[i] = el)}
                        type="text"
                        name={field}
                        value={format1Data[field]}
                        onChange={handleFormat1Change}
                        onKeyDown={(e) => handleKeyDown(e, i, format1Refs)}
                        className="w-full text-center outline-none uppercase font-bold text-2xl"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col items-center mt-2">
              <img
                src={barcode}
                alt="Barcode"
                style={{ height: "45px", width: "160px" }}
              />
              <span
                className="mt-1 font-normal text-lg"
                style={{ letterSpacing: "0.3em" }}
              >
                {format1Data.rollNo}
              </span>
            </div>
          </>
        )}

        {/* ✅ Format 2 (Editable Logo Style 6x4) */}
        {displayOption === "format2" && (
          <div
            id="logo-print-area-container"
            className="flex flex-col items-center justify-start h-screen p-0"
            style={{
              gap: "2px", // minimal spacing between boxes
              fontFamily: '"Bebas Neue", sans-serif', // apply globally within the container
            }}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-full border-2 border-gray-800"
                style={{
                  flex: 1,
                  margin: 0,
                }}
              >
                <input
                  type="text"
                  value={editableLogoText}
                  onChange={(e) =>
                    setEditableLogoText(e.target.value.toUpperCase())
                  }
                  className="font-bold text-center uppercase outline-none bg-transparent w-full"
                  style={{
                    height: "100%",
                    fontSize: "50pt",
                    lineHeight: "1",
                    border: "none",
                    fontFamily: '"Bebas Neue", sans-serif',
                  }}
                />
              </div>
            ))}

            {/* Font Import and Print Optimization */}
            <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

      @media print {
        #logo-print-area-container input {
          font-size: 85pt !important;
          font-family: "Bebas Neue", sans-serif !important;
          transform: scaleY(1.75);
        }
        @page {
          margin: 0;
        }
      }
    `}</style>
          </div>
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
