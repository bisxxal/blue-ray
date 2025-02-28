'use client'

import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';  
import { FaDownload } from "react-icons/fa";

type textType<T>  ={
  text:T;
}
function Dowload <T extends string | React.ReactNode> ({text}:textType<T>)  {
  const downloadReceipt = () => {
    const element = document.getElementById('receipt');
    if (element) {
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
        doc.addImage(imgData, 'PNG', 0, 2, imgWidth * ratio, imgHeight * ratio);
        if (imgHeight * ratio > pageHeight) {
          let yOffset = pageHeight - 10;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 10, yOffset, imgWidth * ratio, imgHeight * ratio);
        }
        doc.save(`${text}.pdf`);
      });
    }
  };
  return (
    <div>
       <button
          onClick={downloadReceipt}
          className="mt-4 px-6 py-3 buttonbg text-white flex items-center gap-3 font-bold rounded-lg"
        >
          Download {text} as PDF <FaDownload />
        </button>
    </div>
  )
}

export default Dowload