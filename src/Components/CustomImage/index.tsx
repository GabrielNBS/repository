import React, { useState } from 'react';
import styled from 'styled-components';
import { FloatAnimation } from '../../keyframes/FloatAnimation';
import { shimmer } from '../../keyframes/Shimmer';

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholder?: string; // não mais utilizado com skeleton, mas mantido para compatibilidade
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 100%;
`;

const Skeleton = styled.div`
  width: 100%;
  height: 600px;
  border-radius: 8px;
  background: linear-gradient(90deg, #eeeeee 25%, #dddddd 50%, #eeeeee 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  @media ${({ theme }) => theme.device.mobile} {
    min-width: 300px;
    max-width: 350px;
  }
`;

const RealImg = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: 600px;
  object-fit: contain;
  ${FloatAnimation}

  @media ${({ theme }) => theme.device.mobile} {
    min-width: 300px;
    max-width: 350px;
  }

  opacity: ${(props) => (props.$loaded ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  z-index: 2;
  position: relative;
`;

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Wrapper>
      {!loaded && <Skeleton />}
      <RealImg
        {...rest}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        $loaded={loaded}
      />
    </Wrapper>
  );
};

export default CustomImage;
