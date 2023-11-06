import React from 'react';
import styles from './SettingsContentRender.module.scss';
import { SFScrollable } from 'sfui';
import { MediaContext } from '../Context/Media';

export interface SettingsContentRenderProps {
  renderContent: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
}

export const SettingsContentRender = ({
  renderContent,
  renderFooter
}: SettingsContentRenderProps): React.ReactElement<SettingsContentRenderProps> => {
  const { isPhone } = React.useContext(MediaContext);

  return (
    <React.Fragment>
      {isPhone && (
        <SFScrollable
          className={styles.scrollable}
          containerClassName={styles.content}
        >
          {renderContent()}
        </SFScrollable>
      )}

      {!isPhone && renderContent()}

      {renderFooter && (
        <footer className={styles.footer}>{renderFooter()}</footer>
      )}
    </React.Fragment>
  );
};
