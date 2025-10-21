import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import barcode from "./assets/barcode.png"; // ✅ Local barcode image

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
      {/* Printable area - same height as Bill */}
      <div
        ref={componentRef}
        id="print-area"
        className="w-[4in] h-[5.5in] p-2 border-4 border-black flex flex-col justify-between"
      >
        {/* Data Table */}
        <table className="w-full border-collapse border-4 border-black text-[22px] flex-grow">
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
                <td className="border-4 border-black p-1 font-extrabold w-1/3 text-center">
                  {field.label}
                </td>
                <td className="border-4 border-black p-1 w-2/3">
                  <input
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="w-full text-center outline-none uppercase font-bold text-3xl"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Barcode Section (Full width) */}
        <div className="flex flex-col items-center justify-center mt-3">
          <img
            src={barcode}
            alt="Barcode"
            style={{
              height: "70px",         // a bit taller for clarity
              width: "100%",          // ✅ Full width
              objectFit: "fill",      // ✅ Stretches horizontally
              display: "block",
            }}
          />
          <div
            className="mt-1 text-base font-normal uppercase"
            style={{ letterSpacing: "normal" }}
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
