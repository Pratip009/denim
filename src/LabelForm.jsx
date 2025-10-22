import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import barcode from "./assets/barcode.png";

const LabelForm = () => {
  const componentRef = useRef();
  const inputRefs = useRef([]);

  const [formData, setFormData] = useState({
    sortNo: "",
    grade: "",
    rollNo: "",
    length: "",
    width: "",
    grossWt: "",
    noOfPcs: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) nextInput.focus();
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  return (
    <div className="flex flex-col items-center p-6">
      {/* Printable Label */}
      <div
        ref={componentRef}
        id="print-area"
        className="w-[4in] h-[5.5in] pl-0 pr-0 border-2 border-black flex flex-col justify-between"
      >
        {/* Data Table */}
        <table className="w-full border-collapse border-2 border-black text-[22px] flex-grow">
          <tbody>
            {[
              { key: "sortNo", label: "Sort No" },
              { key: "grade", label: "Grade" },
              { key: "rollNo", label: "Roll No" },
              { key: "length", label: "Length" },
              { key: "width", label: "Width" },
              { key: "grossWt", label: "Gross Wt." },
              { key: "noOfPcs", label: "No Of Pcs" },
            ].map((field, i) => (
              <tr key={field.key}>
                <td className="border-2 border-black p-1 font-semibold w-1/3 text-center leading-tight">
                  {field.label}
                </td>
                <td className="border-2 border-black p-1 w-2/3">
                  <input
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="w-full text-center outline-none uppercase font-medium text-[28px] leading-snug tracking-wide"
                    style={{
                      fontStretch: "condensed", // ✅ makes text taller/narrower
                      fontWeight: 700,           // ✅ less bold
                      letterSpacing: "0.5px",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Barcode Section */}
        <div className="flex flex-col items-center justify-center mt-3">
          <img
            src={barcode}
            alt="Barcode"
            style={{
              height: "70px",
              width: "100%",
              objectFit: "fill",
              display: "block",
            }}
          />
          <div
            className="mt-1 text-[18px] font-medium uppercase"
            style={{
              letterSpacing: "0.5px",
              fontStretch: "semi-condensed",
            }}
          >
            {formData.rollNo}
          </div>
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

export default LabelForm;
