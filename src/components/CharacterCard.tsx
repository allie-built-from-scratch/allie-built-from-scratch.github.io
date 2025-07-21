import React from 'react';
import StatBar from './StatBar';

interface CharacterStat {
  name: string;
  value: number;
  maxValue: number;
}

interface CharacterCardProps {
  name: string;
  imageUrl: string | any; // Allow for imported images
  description?: string; // Optional character description
  stats: CharacterStat[];
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  imageUrl,
  description,
  stats
}) => {
  return (
    <div className="container">
      <h1 className="title">SELECT YOUR ALLIE</h1>

      <div className="character-selection">
        <div className="character-image">
          {typeof imageUrl === 'string' ? (
            <img src={imageUrl} alt={name} />
          ) : (
            <img src={String(imageUrl)} alt={name} />
          )}
        </div>

        <div className="character-stats">
          <h2 className="character-name">{name}</h2>

          {description && <p className="character-description">{description}</p>}

          {stats.map((stat, index) => (
            <StatBar
              key={index}
              name={stat.name}
              value={stat.value}
              maxValue={stat.maxValue}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
