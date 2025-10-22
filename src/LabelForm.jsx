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
          className="w-[3.5in] h-[5.7in] border-4 border-l-0 border-r-0 border-t-0 border-black flex flex-col justify-between bg-white"
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
                    className="border-4 border-black p-1 w-[41%] font-medium text-[24px] leading-snug tracking-wide"
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
                  <td className="border-4 border-black p-1 w-[59%]">
                    <input
                      ref={(el) => (inputRefs.current[i] = el)}
                      type="text"
                      name={field.key}
                      value={formData[field.key]}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className="w-full outline-none uppercase font-medium text-[24px] leading-snug tracking-wide"
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
          <div className="flex flex-col items-center justify-center border-4 border-b-0 border-t-0 border-black">
            <img
              src={barcode}
              alt="Barcode"
              style={{
                height: "60px",
                width: "100%",
                objectFit: "fill",
                display: "block",
                margin: 0, // ✅ no space below image
                padding: 0,
              }}
            />
            <div
              className="text-[22px] font-medium uppercase leading-none" // ✅ no line-height spacing
              style={{
                letterSpacing: "1px",
                fontStretch: "semi-condensed",
                marginTop: "0px",
                marginBottom:"5px", // ✅ remove top gap
                paddingTop: "0px",
                paddingBottom:"5px"
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
