import React, { Fragment, useState } from 'react';
import styles from './GroupInfoMembers.module.scss';
import { SFButton, SFScrollable, SFSearch, SFText } from 'sfui';
import { Divider } from '../../../../Components/Divider/Divider';
import { GroupMember } from '../../../../Models';
import { MemberList } from './MemberList/MemberList';

const MEMBERS_LIMIT = 10;

function getFilteredMembers(
  members: GroupMember[],
  filter: string
): GroupMember[] {
  if (filter.length < 3) {
    return members;
  } else {
    const filterLower = filter.toLowerCase();
    return members.filter((m: GroupMember) =>
      m.name.toLowerCase().includes(filterLower)
    );
  }
}

export interface GroupInfoMembersProps {
  isActive: boolean;
  members: GroupMember[];
  onAdd: () => void;
  onRemove: (member: GroupMember) => void;
}

export const GroupInfoMembers = ({
  isActive,
  members,
  onAdd,
  onRemove
}: GroupInfoMembersProps): React.ReactElement<GroupInfoMembersProps> => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [limit, setLimit] = useState<number>(MEMBERS_LIMIT);

  const filteredMembers: GroupMember[] = getFilteredMembers(
    members,
    searchValue
  );

  const visibleMembers: GroupMember[] = filteredMembers.slice(0, limit);
  const refSearchValueLength = React.useRef<number>(searchValue.length);

  React.useEffect(() => {
    if (searchValue.length > 2 || refSearchValueLength.current > 2) {
      setLimit(MEMBERS_LIMIT);
    }

    refSearchValueLength.current = searchValue.length;
  }, [searchValue]);

  const isEmpty: boolean = members.length === 0;

  return (
    <SFScrollable containerClassName={styles.groupInfoMembers}>
      <div className={styles.addMember}>
        <SFText type="component-1">{members.length} group members</SFText>
        <SFButton
          disabled={!isActive}
          fullWidth
          variant="outlined"
          sfColor="blue"
          size="medium"
          onClick={onAdd}
        >
          Add Members
        </SFButton>
      </div>

      {!isEmpty && (
        <div className={styles.search}>
          <SFSearch
            label="Search member"
            value={searchValue}
            onChange={(value: string) => setSearchValue(value)}
          />
        </div>
      )}

      <Divider size={2} />

      {isEmpty && (
        <SFText className={styles.emptyMsg} type="component-2">
          There are no members added.
        </SFText>
      )}

      {!isEmpty && (
        <Fragment>
          <MemberList
            isActive={isActive}
            members={visibleMembers}
            onRemove={onRemove}
          />

          {limit < filteredMembers.length && (
            <SFButton
              fullWidth
              sfColor="grey"
              size="medium"
              variant="text"
              onClick={() => setLimit((limit) => limit + MEMBERS_LIMIT)}
            >
              See More
            </SFButton>
          )}

          {visibleMembers.length === members.length &&
            limit > MEMBERS_LIMIT && (
              <SFButton
                fullWidth
                sfColor="grey"
                size="medium"
                variant="text"
                onClick={() => setLimit(MEMBERS_LIMIT)}
              >
                See Less
              </SFButton>
            )}
        </Fragment>
      )}
    </SFScrollable>
  );
};
