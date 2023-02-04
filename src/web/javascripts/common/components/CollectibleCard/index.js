import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../../../../stylesheets/common/sass/components/_achievement-card.scss';

const CollectibleCard = ({
  // collectible,
  rarity,
  className = '',
}) => <div className={`achievement-card collectible-card ${className}`}>
    <img src='../../../../../images/collectibles/collectible1.png' className='collectible-icon' alt='collectible-card' />
    <span className={`rarity-indicator overline ${rarity.toLowerCase()}`}>
      <FormattedMessage
        defaultMessage={'{rarity}'}
        description='rarity descriptor'
        values={{
          rarity,
        }}
      />
    </span>
  </div>;

export default CollectibleCard;
