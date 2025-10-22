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
    content: () => componentRef.current,
  });

  return (
    <div className="flex flex-col items-center p-6 pt-0">
      {/* Outer container with 5px padding */}
      <div className="p-[5px] bg-white">
        <div
          ref={componentRef}
          id="print-area"
          className="w-[3.8in] h-[5.5in] border-2 border-black flex flex-col justify-between bg-white"
        >
          {/* Table Section */}
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
                  <td
                    className="border-2 border-black p-1 w-[40%] font-medium text-[28px] leading-snug tracking-wide"
                    style={{
                      paddingLeft: "10px",
                      fontStretch: "condensed",
                      letterSpacing: "0.5px",
                      fontWeight: "700",
                      textAlign: "left",
                      verticalAlign: "middle",
                    }}
                  >
                    {field.label}
                  </td>
                  <td className="border-2 border-black p-1 w-[60%]">
                    <input
                      ref={(el) => (inputRefs.current[i] = el)}
                      type="text"
                      name={field.key}
                      value={formData[field.key]}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className="w-full outline-none uppercase font-medium text-[28px] leading-snug tracking-wide"
                      style={{
                        paddingLeft: "10px",
                        fontStretch: "condensed",
                        fontWeight: "700",
                        letterSpacing: "0.5px",
                        textAlign: "left",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Barcode Section */}
          <div className="flex flex-col items-center justify-center mb-6">
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
              className="mt-1 text-[22px] font-medium uppercase"
              style={{
                letterSpacing: "0.5px",
                fontStretch: "semi-condensed",
              }}
            >
              {formData.rollNo}
            </div>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Print
      </button>
    </div>
  );
};

export default LabelForm;
