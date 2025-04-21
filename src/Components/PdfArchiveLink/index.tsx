import React from 'react';

interface PdfArchiveLinkProps {
  fileUrl: string; // URL do arquivo PDF
  fileName?: string; // Nome opcional para exibição
}

const PdfArchiveLink: React.FC<PdfArchiveLinkProps> = ({ fileUrl, fileName }) => {
  return (
    <a href={fileUrl} download={fileName || 'file.pdf'} target="_blank" rel="noopener noreferrer">
      {fileName || 'Download PDF'}
    </a>
  );
};

export default PdfArchiveLink;
