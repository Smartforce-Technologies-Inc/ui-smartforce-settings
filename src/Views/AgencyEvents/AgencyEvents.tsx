import React from 'react';
import { SettingsContentRender } from '../SettingsContentRender';
import { SettingsError } from '../../Models/Error';
import { AgencyEvent } from '../../Models/AgencyEvents';
import { ListManagment } from '../../Components/ListManagment/ListManagment';
import { AgencyEventsList } from './AgencyEventsList/AgencyEventsList';
import { AgencyEventsModal } from './AgencyEventsModal/AgencyEventsModal';
import { AgencyEventsDeleteDialog } from './AgencyEventsDeleteDialog/AgencyEventsDeleteDialog';

export interface AgencyEventsProps {
  onClose: () => void;
  onError: (e: SettingsError) => void;
}

const getFilteredValues = (
  list: AgencyEvent[],
  filter: string
): AgencyEvent[] => {
  return list.filter((l) =>
    l.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export const AgencyEvents = ({
  onClose,
  onError
}: AgencyEventsProps): React.ReactElement<AgencyEventsProps> => {
  const [events, setEvents] = React.useState<AgencyEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [modalValue, setModalValue] = React.useState<AgencyEvent | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);

  const onModalClose = () => {
    setIsModalOpen(false);
    setModalValue(undefined);
  };

  const onEventDelete = (event: AgencyEvent) => {
    setIsDeleteDialogOpen(false);
    setEvents(events.filter((e: AgencyEvent) => e.name === event.name));
  };

  const onDelete = (event: AgencyEvent) => {
    setModalValue(event);
    setIsDeleteDialogOpen(true);
  };

  const onEdit = (event: AgencyEvent) => {
    setModalValue(event);
    setIsModalOpen(true);
  };

  const onCreate = () => {
    setIsModalOpen(true);
  };

  const onFinish = async () => {
    setIsLoading(true);
    try {
      // TODO add BE implementation
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
      console.error('Settings::AgencyEvents', e);
      onError(e);
    }
  };

  React.useEffect(() => {
    // TODO add get events
  }, []);

  return (
    <div>
      <AgencyEventsModal
        value={modalValue}
        isOpen={isModalOpen}
        onClose={() => {
          onClose();
          onModalClose();
        }}
        onBack={onModalClose}
        onError={onError}
        onFinish={onFinish}
      />
      {modalValue && (
        <AgencyEventsDeleteDialog
          value={modalValue}
          isOpen={isDeleteDialogOpen}
          onDelete={onEventDelete}
          onClose={() => setIsDeleteDialogOpen(false)}
        />
      )}
      <SettingsContentRender
        renderContent={() => (
          <ListManagment
            actionButtonLabel="Create Event Type"
            emptyMessage="There are no events created yet."
            label="Event Type"
            list={events}
            isLoading={isLoading}
            filter={getFilteredValues}
            onCreate={onCreate}
            renderList={(list: AgencyEvent[]) => (
              <AgencyEventsList
                events={list}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            )}
          />
        )}
      ></SettingsContentRender>
    </div>
  );
};
