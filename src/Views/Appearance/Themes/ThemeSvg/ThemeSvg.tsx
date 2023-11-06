import React from 'react';
import styles from './ThemeSvg.module.scss';
import DMTheme from '../../../../Images/DMTheme';
import NMTheme from '../../../../Images/NMTheme';

export interface ThemeSvgProps {
  type: 'dayMode' | 'nightMode';
}

const ThemeSvg = (props: ThemeSvgProps): React.ReactElement<ThemeSvgProps> => {
  return (
    <div className={`${styles.themeSvg} `}>
      <img
        alt="theme"
        src={`data:image/svg+xml;utf8,${encodeURIComponent(
          props.type === 'dayMode' ? DMTheme : NMTheme
        )}`}
      />
    </div>
  );
};

export default ThemeSvg;
