import React from 'react';
import styles from './InnerViews.module.scss';

import { SectionItemValue } from '../../SFSettings';
import { MediaContext } from '../../Context/Media';

export interface InnerViewsProps {
  views: SectionItemValue[];
  isBusinessCard?: boolean;
}

const InnerViews = ({
  views,
  isBusinessCard
}: InnerViewsProps): React.ReactElement<InnerViewsProps> => {
  const { isPhone } = React.useContext(MediaContext);

  return (
    <div
      className={`${styles.innerView} ${
        isBusinessCard ? styles.isBusinessCard : ''
      }`}
    >
      {views.map((view: SectionItemValue) => (
        <div className={styles.view} key={`view-${view.name}`}>
          {!isBusinessCard && (
            <div className={styles.textContainer}>
              <h2 className={styles.title}>{view.viewTitle}</h2>
              {!isPhone && (
                <h5 className={styles.description}>{view.description}</h5>
              )}
            </div>
          )}
          {view.component}
        </div>
      ))}
    </div>
  );
};

export default InnerViews;
