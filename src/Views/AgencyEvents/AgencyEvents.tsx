import React from 'react';
import { SettingsContentRender } from '../SettingsContentRender';
import { SettingsError } from '../../Models/Error';
import { AgencyEvent } from '../../Models/AgencyEvents';
import { ListManagment } from '../../Components/ListManagment/ListManagment';
import { AgencyEventsList } from './AgencyEventsList/AgencyEventsList';

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

  const onDelete = (event: AgencyEvent) => {
    // TODO add event deletion logic
  };

  const onEdit = (event: AgencyEvent) => {
    // TODO add event edition logic
  };

  const onCreate = () => {
    // TODO add event creation logic
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
      <SettingsContentRender
        renderContent={() => (
          <ListManagment
            label="Event Type"
            labelPlural="events"
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
