import React from 'react';
import { AppsPopoverContent } from './AppsPopoverContent/AppsPopoverContent';
import { SFPopover, SFPopoverProps } from 'sfui';

export interface AppsPopoverProps extends Pick<SFPopoverProps, 'anchorEl'> {
  onClose: () => void;
}

export const AppsPopover = ({
  anchorEl,
  onClose
}: AppsPopoverProps): React.ReactElement<AppsPopoverProps> => {
  return (
    <SFPopover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={onClose}
    >
      <AppsPopoverContent onClose={onClose} />
    </SFPopover>
  );
};
