import React, { useState } from 'react';
import * as S from './styles';
import { AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa6';

interface LinkPreviewProps {
  children: React.ReactNode;
  image?: string;
  url?: string;
  title?: string;
  type: 'github' | 'deploy';
  alt?: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ children, image, url, title, type, alt }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <S.Container onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <AnimatePresence>
        {isHovered && (
          <S.PreviewBox
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            transition={{ duration: 0.2 }}
          >
            {type === 'deploy' ? (
              url ? (
                <>
                  {isLoading && (
                    <S.LoadingContainer $bgImage={image}>
                      {title && <h4>{title}</h4>}
                      <p>Loading preview...</p>
                    </S.LoadingContainer>
                  )}
                  <S.StyledIframe
                    src={url}
                    title="Project Preview"
                    loading="lazy"
                    onLoad={() => setIsLoading(false)}
                    style={{ display: isLoading ? 'none' : 'block' }}
                  />
                </>
              ) : image ? (
                <S.PreviewImage src={image} alt={alt || 'Project Preview'} />
              ) : null
            ) : (
              <S.GithubCard>
                <FaGithub />
                <div>
                  <span>View Repository</span>
                  <p>Check out the source code</p>
                </div>
              </S.GithubCard>
            )}
          </S.PreviewBox>
        )}
      </AnimatePresence>
      {children}
    </S.Container>
  );
};

export default LinkPreview;
