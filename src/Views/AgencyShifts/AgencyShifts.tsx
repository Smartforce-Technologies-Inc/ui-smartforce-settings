import React, { Fragment, useContext, useEffect, useState } from 'react';
import { SettingsError, Shift } from '../../Models';
import { SettingsContentRender } from '../SettingsContentRender';
import { ListManagment } from '../../Components/ListManagment/ListManagment';
import { ApiContext } from '../../SFSettings';
import { getShifts } from '../../Services';
import { ShiftList } from './ShiftList/ShiftList';
import { ShiftFormModal } from './ShiftFormModal/ShiftFormModal';

function sortShifts(groups: Shift[]): Shift[] {
  return groups.sort((a: Shift, b: Shift): number =>
    a.name.localeCompare(b.name)
  );
}

function getFilteredShifts(shifts: Shift[], filter: string): Shift[] {
  if (filter.length < 3) {
    return shifts;
  } else {
    const filterLower = filter.toLowerCase();
    return shifts.filter((s: Shift) =>
      s.name.toLowerCase().includes(filterLower)
    );
  }
}

export interface AgencyShiftsProps {
  onClose: () => void;
  onError: (e: SettingsError) => void;
}

export const AgencyShifts = ({
  onError,
  onClose
}: AgencyShiftsProps): React.ReactElement<AgencyShiftsProps> => {
  const apiBaseUrl = useContext(ApiContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let isSubscribed: boolean = true;

    const init = async () => {
      setIsLoading(true);
      try {
        const shifts = await getShifts(apiBaseUrl);

        if (isSubscribed) {
          setShifts(sortShifts(shifts));
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

  const onInfo = (shift: Shift) => {
    //TODO
  };
  const onDelete = (shift: Shift) => {
    //TODO
  };
  const onEdit = (shift: Shift) => {
    //TODO
  };
  const onRestore = (shift: Shift) => {
    //TODO
  };
  const onViewHistory = (shift: Shift) => {
    //TODO
  };

  return (
    <SettingsContentRender
      renderContent={() => (
        <Fragment>
          <ShiftFormModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />

          <ListManagment
            label="Shift"
            labelPlural="shifts"
            list={shifts}
            isLoading={isLoading}
            filter={getFilteredShifts}
            onCreate={() => setIsCreateModalOpen(true)}
            renderList={(list: Shift[]) => (
              <ShiftList
                shifts={list}
                onInfo={onInfo}
                onDelete={onDelete}
                onEdit={onEdit}
                onRestore={onRestore}
                onViewHistory={onViewHistory}
              />
            )}
          />
        </Fragment>
      )}
    />
  );
};
