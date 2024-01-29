import React from 'react';
import styles from './ListItem.module.scss';
import { SFIconButton, SFMenu, SFMenuItem } from 'sfui';

export interface ListManagmentMenuOption<T> {
  label: string;
  disabled?: boolean;
  filter?: (item: T) => boolean;
  onClick: (item: T) => void;
  chip?: React.ReactElement;
}
export interface ListItemProps<T> {
  disabled?: boolean;
  item: T;
  options: ListManagmentMenuOption<T>[];
  renderItem: (item: T) => React.ReactElement;
  onClick?: () => void;
}

export const ListItem = <T,>({
  disabled,
  item,
  options,
  renderItem,
  onClick
}: ListItemProps<T>): React.ReactElement<ListItemProps<T>> => {
  const [menuAnchorElement, setMenuAnchorElement] = React.useState<
    HTMLButtonElement | undefined
  >(undefined);

  const onMenuOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setMenuAnchorElement(e.currentTarget);
  };

  const onMenuClose = () => setMenuAnchorElement(undefined);

  const onOptionClick = (o: ListManagmentMenuOption<T>) => {
    o.onClick(item);
    onMenuClose();
  };

  return (
    <div className={styles.listItem} onClick={onClick}>
      {renderItem(item)}

      <div
        className={styles.menu}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {!disabled && (
          <SFIconButton
            rotate="left"
            sfIcon="Other"
            sfSize="small"
            onClick={onMenuOpen}
          />
        )}

        <SFMenu
          autoFocus={false}
          anchorEl={menuAnchorElement}
          open={Boolean(menuAnchorElement)}
          onClose={onMenuClose}
          variant="menu"
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {options
            .filter(
              (o: ListManagmentMenuOption<T>) => !o.filter || o.filter(item)
            )
            .map((o: ListManagmentMenuOption<T>) => (
              <SFMenuItem
                key={o.label}
                disabled={o.disabled}
                onClick={() => onOptionClick(o)}
              >
                {o.label}
                {o.chip}
              </SFMenuItem>
            ))}
        </SFMenu>
      </div>
    </div>
  );
};
