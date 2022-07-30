import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfViewer(props) {
  const { pdf } = props;

  const [state, setState] = useState({
    numPages: 0,
  });

  function onDocumentLoadSuccess({ numPages }) {
    setState(numPages);
  }

  const saveFile = () => {
    saveAs(pdf, "example.pdf");
  };

  return (
    <div className="flex relative items-center justify-center w-full px-4 sm:px-1">
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "30px",
          "z-index": "1",
        }}
      >
        <a href={pdf} download>
          <DownloadForOfflineIcon
            style={{ fontSize: "3.5rem" }}
            color="action"
          />
        </a>
      </div>
      <div className="w-full px-2">
        <Document
          file={pdf}
          options={{ workerSrc: "/pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(state), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </div>
  );
}
