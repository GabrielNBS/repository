import React from 'react';
import { StyledWrapper } from './styles';

interface PdfArchiveLinkProps {
  fileUrl: string; // URL do arquivo PDF
  fileName?: string; // Nome opcional para exibição
}

const PdfArchiveLink: React.FC<PdfArchiveLinkProps> = ({ fileUrl, fileName }) => {
  return (
    <StyledWrapper>
      <a
        href={fileUrl}
        download={fileName || 'file.pdf'}
        className="learn-more"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="circle" aria-hidden="true">
          <span className="icon arrow" />
        </span>
        <span className="link-text">{fileName || 'Currículo'}</span>
      </a>
    </StyledWrapper>
  );
};

export default PdfArchiveLink;
