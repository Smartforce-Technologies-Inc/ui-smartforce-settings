import React, { Fragment, useContext, useEffect, useState } from 'react';
import { CreateGroupModal } from './CreateGroupModal/CreateGroupModal';
import { Group, GroupMember, SettingsError, UserGroup } from '../../Models';
import {
  getGroups,
  restoreGroup,
  deleteGroup
} from '../../Services/GroupService';
import { SettingsContentRender } from '../SettingsContentRender';
import { EditGroupModal } from './EditGroupModal/EditGroupModal';
import { ViewGroupModal } from './ViewGroupModal/ViewGroupModal';
import { GroupHistoryModal } from './GroupHistoryModal/GroupHistoryModal';
import { UserContext } from '../../Context';
import { SETTINGS_CUSTOM_EVENT } from '../../Constants/Events';
import { dispatchCustomEvent } from '../../Helpers';
import { ApiContext } from '../../Context';
import { ListManagment } from '../../Components/ListManagment/ListManagment';
import { AgencyGroupsItem } from './AgencyGroupsItem/AgencyGroupsItem';
import { DeleteConfirmNameModal } from '../../Components/DeleteConfirmNameModal/DeleteConfirmNameModal';

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
  const apiBaseUrl = useContext(ApiContext).settings;
  const { user, setUser } = useContext(UserContext);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [isViewHistoryModalOpen, setIsViewHistoryModalOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selected, setSelected] = useState<Group | undefined>();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

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

  const onView = (group: Group) => {
    setSelected(group);
    setIsInfoModalOpen(true);
  };

  const onEdit = (group: Group) => {
    setSelected(group);
    setIsEditModalOpen(true);
  };

  const onUpdateGroup = (groupUpdated: Group) => {
    setGroups(updateGroupInList(groups, groupUpdated));
  };

  const onViewHistory = (group: Group) => {
    setSelected(group);
    setIsViewHistoryModalOpen(true);
  };

  const onOpenDeleteModal = async (group: Group) => {
    setSelected(group);
    setIsDeleteModalOpen(true);
  };

  const onDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteGroup(apiBaseUrl, selected?.id as string);
      // Update user groups
      if (user?.groups) {
        setUser({
          ...user,
          groups: user.groups.filter((g: UserGroup) => g.id !== selected?.id)
        });
      }
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      onUpdate();
    } catch (e: any) {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      onError(e);
    }
  };

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

          <DeleteConfirmNameModal
            label="group"
            isOpen={isDeleteModalOpen}
            name={selected?.name as string}
            isSaving={isDeleting}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={onDelete}
          />

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

          <ListManagment<Group>
            actionButtonLabel="Create Group"
            emptyMessage="There are no groups created yet."
            label="Group"
            list={groups}
            isLoading={isLoading}
            filter={getFilteredGroups}
            onCreate={() => setIsCreateModalOpen(true)}
            onClick={onView}
            options={[
              {
                label: 'See group information',
                onClick: onView
              },
              {
                label: 'Restore group',
                filter: (group: Group) => group.status === 'Inactive',
                onClick: onRestore
              },
              {
                label: 'Edit group',
                filter: (group: Group) => group.status === 'Active',
                onClick: onEdit
              },
              {
                label: 'View history',
                filter: (group: Group) => group.status === 'Active',
                onClick: onViewHistory
              },
              {
                label: 'Delete',
                filter: (group: Group) => group.status === 'Active',
                onClick: onOpenDeleteModal
              }
            ]}
            renderItem={(item: Group) => <AgencyGroupsItem group={item} />}
          />
        </Fragment>
      )}
    />
  );
};
