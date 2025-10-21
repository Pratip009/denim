import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const SmallLabel = () => {
  const printRef = useRef();
  const [labelText, setLabelText] = useState("");

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Small Label",
    pageStyle: `
      @page { size: 4in 2in; margin: 0; }
      @media print {
        body * { visibility: hidden; }
        .print-label, .print-label * { visibility: visible; }
        .print-label { 
          position: absolute; left: 0; top: 0; 
          width: 4in !important; 
          height: 2in !important; 
        }
      }
    `,
    removeAfterPrint: false,  // ✅ ADDED
  });

  return (
    <div className="flex flex-col items-center p-6">
      {/* Input - SAME */}
      <div className="mb-4 flex items-center gap-3">
        <label className="font-semibold text-lg">Label Name:</label>
        <input
          type="text"
          value={labelText}
          onChange={(e) => setLabelText(e.target.value.toUpperCase())}
          placeholder="Enter label text"
          className="border-2 border-gray-400 rounded-md px-3 py-1 text-lg text-center uppercase font-bold"
        />
      </div>

      {/* ✅ FIXED: Added print-label class */}
      <div ref={printRef}>
        <div
          className="print-label border-4 border-black flex items-center justify-center"
          style={{
            width: "4in",
            height: "2in",
            pageBreakInside: "avoid",
          }}
        >
          <div className="text-5xl font-extrabold tracking-wide text-center">
            {labelText || "LABEL"}
          </div>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md"
      >
        🖨️ Print Label
      </button>
    </div>
  );
};

export default SmallLabel;