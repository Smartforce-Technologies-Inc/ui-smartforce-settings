import React, { Fragment, useState } from 'react';
import styles from './ListManagment.module.scss';
import { SFButton, SFSearch, SFSpinner, SFText } from 'sfui';
import { Divider } from '../Divider/Divider';
import { NoResults } from './NoResults/NoResults';

const LIST_LIMIT = 10;

export interface ListManagmentProps<T> {
  actionButtonLabel: string;
  emptyMessage: string;
  label: string;
  list: T[];
  isLoading: boolean;
  filter: (list: T[], filter: string) => T[];
  onCreate: () => void;
  renderList: (list: T[]) => React.ReactElement;
}

export const ListManagment = <T,>(
  props: ListManagmentProps<T>
): React.ReactElement<ListManagmentProps<T>> => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [limit, setLimit] = useState<number>(LIST_LIMIT);
  const refSearchValueLength = React.useRef<number>(searchValue.length);

  React.useEffect(() => {
    if (searchValue.length > 2 || refSearchValueLength.current > 2) {
      setLimit(LIST_LIMIT);
    }

    refSearchValueLength.current = searchValue.length;
  }, [searchValue]);

  const filteredList =
    searchValue.length > 2 ? props.filter(props.list, searchValue) : props.list;
  const visibleList: T[] = filteredList.slice(0, limit);
  const isListEmpty: boolean = props.list.length === 0;

  return (
    <div className={styles.listManagment}>
      <div
        className={`${styles.header} ${isListEmpty ? styles.emptyList : ''}`}
      >
        <SFButton
          fullWidth
          sfColor="blue"
          variant="outlined"
          size="medium"
          onClick={props.onCreate}
        >
          {props.actionButtonLabel}
        </SFButton>

        {!isListEmpty && (
          <div className={styles.searchField}>
            <SFSearch
              label={`Search ${props.label.toLowerCase()}`}
              value={searchValue}
              onChange={(v: string) => setSearchValue(v)}
            />
          </div>
        )}

        <div className={styles.divider}>
          <Divider size={2} />
        </div>
      </div>

      <div className={styles.list}>
        {props.isLoading && (
          <div className={styles.spinner}>
            <SFSpinner />
          </div>
        )}

        {!props.isLoading && (
          <Fragment>
            {isListEmpty && (
              <SFText className={styles.emptyMsg} type="component-2">
                {props.emptyMessage}
              </SFText>
            )}

            {!isListEmpty && (
              <Fragment>
                {filteredList.length === 0 && (
                  <NoResults
                    label={props.label.toLowerCase()}
                    filter={searchValue}
                  />
                )}

                {filteredList.length > 0 && (
                  <Fragment>
                    {props.renderList(visibleList)}

                    {limit < props.list.length && (
                      <SFButton
                        fullWidth
                        sfColor="grey"
                        size="medium"
                        variant="text"
                        onClick={() => setLimit((limit) => limit + LIST_LIMIT)}
                      >
                        See More
                      </SFButton>
                    )}

                    {visibleList.length === props.list.length &&
                      limit > LIST_LIMIT && (
                        <SFButton
                          fullWidth
                          sfColor="grey"
                          size="medium"
                          variant="text"
                          onClick={() => setLimit(LIST_LIMIT)}
                        >
                          See Less
                        </SFButton>
                      )}
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
