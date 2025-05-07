import React from 'react';

import { Text } from '../Text/styles';
import { CardSkillsProps } from '../../types/CardSkillsProps';
import { CardBox } from './styles';

export default function CardSkills({ icon, title, description, delay }: CardSkillsProps) {
  return (
    <CardBox delay={delay}>
      <div className="e-card playing">
        <div className="image" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="infotop">
          {React.createElement(icon)}
          <br />
          <Text as="h2" $variant="h2">
            {title}
          </Text>
          <br />
          <Text $variant="p">{description}</Text>
        </div>
      </div>
    </CardBox>
  );
}
