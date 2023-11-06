import React, { Fragment, useContext, useEffect, useState } from 'react';
import styles from './AgencyGroups.module.scss';
import { SFButton, SFSearch, SFSpinner, SFText } from 'sfui';
import { CreateGroupModal } from './CreateGroupModal/CreateGroupModal';
import { Divider } from '../../Components/Divider/Divider';
import { Group, GroupMember, SettingsError } from '../../Models';
import { getGroups, restoreGroup } from '../../Services/GroupService';
import { GroupList } from './GroupList/GroupList';
import { SettingsContentRender } from '../SettingsContentRender';
import { EditGroupModal } from './EditGroupModal/EditGroupModal';
import { NoResults } from './NoResults/NoResults';
import { ViewGroupModal } from './ViewGroupModal/ViewGroupModal';
import { DeleteGroupModal } from './DeleteGroupModal/DeleteGroupModal';
import { GroupHistoryModal } from './GroupHistoryModal/GroupHistoryModal';
import { UserContext } from '../../Context';
import { SETTINGS_CUSTOM_EVENT } from '../../Constants/Events';
import { dispatchCustomEvent } from '../../Helpers';
import { ApiContext } from '../../SFSettings';

const GROUPS_LIMIT = 10;

function sortGroups(groups: Group[]): Group[] {
  return groups.sort((a: Group, b: Group): number => {
    if (a.status === 'Inactive' && b.status === 'Active') {
      return -1;
    } else if (a.status === 'Inactive' && b.status === 'Inactive') {
      return (
        new Date(a.updated_at as string).getTime() -
        new Date(b.updated_at as string).getTime()
      );
    } else {
      return a.name.localeCompare(b.name);
    }
  });
}

function getFilteredGroups(groups: Group[], filter: string): Group[] {
  if (filter.length < 3) {
    return groups;
  } else {
    const filterLower = filter.toLowerCase();
    return groups.filter((g: Group) =>
      g.name.toLowerCase().includes(filterLower)
    );
  }
}

function updateGroupInList(list: Group[], group: Group): Group[] {
  const index = list.findIndex((g: Group) => g.id === group.id);
  const newList = [...list.slice(0, index), group, ...list.slice(index + 1)];
  return newList;
}

export interface AgencyGroupsProps {
  onClose: () => void;
  onError: (e: SettingsError) => void;
}

export const AgencyGroups = ({
  onClose,
  onError
}: AgencyGroupsProps): React.ReactElement<AgencyGroupsProps> => {
  const apiBaseUrl = useContext(ApiContext);
  const { user, setUser } = useContext(UserContext);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [isViewHistoryModalOpen, setIsViewHistoryModalOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [groups, setGroups] = useState<Group[]>([]);
  const [limit, setLimit] = useState<number>(GROUPS_LIMIT);
  const [selected, setSelected] = useState<Group | undefined>();
  const [deleteGroup, setDeleteGroup] = useState<Group | undefined>();
  const [searchValue, setSearchValue] = useState<string>('');
  const refSearchValueLength = React.useRef<number>(searchValue.length);

  useEffect(() => {
    let isSubscribed: boolean = true;

    const init = async () => {
      setIsLoading(true);
      try {
        const groups = await getGroups(apiBaseUrl);

        if (isSubscribed) {
          setGroups(sortGroups(groups));
          setIsLoading(false);
        }
      } catch (e: any) {
        onError(e);
      }
    };

    init();

    // Unsuscribed when cleaning up
    return () => {
      isSubscribed = false;
    };
  }, [apiBaseUrl, onError]);

  const onUpdate = async () => {
    setIsLoading(true);
    try {
      const groups = await getGroups(apiBaseUrl);
      setGroups(sortGroups(groups));
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
      onError(e);
    }
  };

  const onRestore = async (group: Group) => {
    try {
      setIsLoading(true);
      await restoreGroup(apiBaseUrl, group.id);
      const isUserInGroup: boolean =
        group.members.find((m: GroupMember) => m.id === user?.id) !== undefined;
      if (user?.groups && isUserInGroup) {
        setUser({
          ...user,
          groups: [
            ...user.groups,
            { id: group.id, name: group.name, acronym: group.acronym }
          ]
        });
      }
      onUpdate();
      dispatchCustomEvent(SETTINGS_CUSTOM_EVENT, {
        message: `The group  “${group.name}” was restored.`
      });
    } catch (e: any) {
      onError(e);
    }
  };

  const isListEmpty = groups.length === 0;

  const filteredGroups = getFilteredGroups(groups, searchValue);
  const visibleGroups: Group[] = filteredGroups.slice(0, limit);

  const onView = (group: Group) => {
    setSelected(group);
    setIsInfoModalOpen(true);
  };

  const onEdit = (group: Group) => {
    setSelected(group);
    setIsEditModalOpen(true);
  };

  const onDelete = (group: Group) => {
    setDeleteGroup(group);
    setSelected(undefined);
    setIsDeleteModalOpen(true);
  };

  const onUpdateGroup = (groupUpdated: Group) => {
    setGroups(updateGroupInList(groups, groupUpdated));
  };

  const onViewHistory = (group: Group) => {
    setSelected(group);
    setIsViewHistoryModalOpen(true);
  };

  React.useEffect(() => {
    if (searchValue.length > 2 || refSearchValueLength.current > 2) {
      setLimit(GROUPS_LIMIT);
    }

    refSearchValueLength.current = searchValue.length;
  }, [searchValue]);

  return (
    <SettingsContentRender
      renderContent={() => (
        <Fragment>
          <CreateGroupModal
            isOpen={isCreateModalOpen}
            onBack={() => setIsCreateModalOpen(false)}
            onClose={() => {
              onClose();
              setIsCreateModalOpen(false);
            }}
            onCreate={onUpdate}
            onError={onError}
          />

          {selected && (
            <Fragment>
              <EditGroupModal
                group={selected}
                isOpen={isEditModalOpen}
                onBack={() => setIsEditModalOpen(false)}
                onClose={() => {
                  onClose();
                  setIsEditModalOpen(false);
                }}
                onError={onError}
                onSave={onUpdate}
              />

              {selected.status === 'Active' && (
                <GroupHistoryModal
                  group={selected}
                  isOpen={isViewHistoryModalOpen}
                  onBack={() => setIsViewHistoryModalOpen(false)}
                  onClose={() => {
                    onClose();
                    setIsViewHistoryModalOpen(false);
                  }}
                  onError={onError}
                />
              )}
            </Fragment>
          )}

          {deleteGroup && (
            <DeleteGroupModal
              group={deleteGroup}
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onDelete={onUpdate}
              onError={onError}
            />
          )}

          <ViewGroupModal
            selected={selected}
            isOpen={isInfoModalOpen}
            onBack={() => setIsInfoModalOpen(false)}
            onClose={() => {
              onClose();
              setIsInfoModalOpen(false);
            }}
            onError={onError}
            onUpdate={onUpdate}
            onRemoveMembers={onUpdateGroup}
          />

          <div className={styles.agencyGroups}>
            <div
              className={`${styles.header} ${
                isListEmpty ? styles.noGroups : ''
              }`}
            >
              <SFButton
                fullWidth
                sfColor="blue"
                variant="outlined"
                size="medium"
                onClick={() => setIsCreateModalOpen(true)}
              >
                Create Group
              </SFButton>

              {!isListEmpty && (
                <div className={styles.searchField}>
                  <SFSearch
                    label="Search group"
                    value={searchValue}
                    onChange={(value: string) => setSearchValue(value)}
                  />
                </div>
              )}

              <div className={styles.divider}>
                <Divider size={2} />
              </div>
            </div>

            <div className={styles.list}>
              {isLoading && (
                <div className={styles.spinner}>
                  <SFSpinner />
                </div>
              )}

              {!isLoading && (
                <Fragment>
                  {isListEmpty && (
                    <SFText className={styles.emptyMsg} type="component-2">
                      There are no groups created yet.
                    </SFText>
                  )}

                  {!isListEmpty && (
                    <Fragment>
                      {filteredGroups.length === 0 && (
                        <NoResults filter={searchValue} />
                      )}

                      {filteredGroups.length > 0 && (
                        <Fragment>
                          <GroupList
                            groups={visibleGroups}
                            onClick={onView}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onRestore={onRestore}
                            onViewHistory={onViewHistory}
                          />

                          {limit < filteredGroups.length && (
                            <SFButton
                              fullWidth
                              sfColor="grey"
                              size="medium"
                              variant="text"
                              onClick={() =>
                                setLimit((limit) => limit + GROUPS_LIMIT)
                              }
                            >
                              See More
                            </SFButton>
                          )}

                          {visibleGroups.length === filteredGroups.length &&
                            limit > GROUPS_LIMIT && (
                              <SFButton
                                fullWidth
                                sfColor="grey"
                                size="medium"
                                variant="text"
                                onClick={() => setLimit(GROUPS_LIMIT)}
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
        </Fragment>
      )}
    />
  );
};
