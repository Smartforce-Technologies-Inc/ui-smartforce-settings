import React from 'react';
import { SettingsContentRender } from '../SettingsContentRender';
import { SettingsError } from '../../Models/Error';
import { AgencyEvent } from '../../Models/AgencyEvents';
import { AgencyEventsContext } from '../../Context';
import { ListManagment } from '../../Components/ListManagment/ListManagment';
import { AgencyEventsList } from './AgencyEventsList/AgencyEventsList';

export interface AgencyEventsProps {
  onClose: () => void;
  onError: (e: SettingsError) => void;
}

export const AgencyEvents = ({
  onClose,
  onError
}: AgencyEventsProps): React.ReactElement<AgencyEventsProps> => {
  const { events } = React.useContext(AgencyEventsContext);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onEdit = (event: AgencyEvent) => {
    // TODO
  };

  const onDelete = (event: AgencyEvent) => {
    // TODO
  };

  const onView = (event: AgencyEvent) => {
    // TODO
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

  const getFilteredValues = (
    list: AgencyEvent[],
    filter: string
  ): AgencyEvent[] => {
    return list.filter((l) =>
      l.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

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
            onCreate={onFinish}
            renderList={(list: AgencyEvent[]) => (
              <AgencyEventsList
                events={list}
                onView={onView}
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
