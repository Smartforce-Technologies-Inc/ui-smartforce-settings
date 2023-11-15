import React, { Fragment, useContext, useEffect, useState } from 'react';
import { SettingsError, Shift } from '../../Models';
import { SettingsContentRender } from '../SettingsContentRender';
import { ListManagment } from '../../Components/ListManagment/ListManagment';
import { ApiContext } from '../../SFSettings';
import { getShifts } from '../../Services';
import { ShiftList } from './ShiftList/ShiftList';
import { ShiftFormModal } from './ShiftFormModal/ShiftFormModal';
import { ShiftInfoModal } from './ShiftInfoModal/ShiftInfoModal';

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
  const [selected, setSelected] = useState<Shift | undefined>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<Shift>();

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
    setModalValue(shift);
    setIsViewModalOpen(true);
  };
  const onDelete = (shift: Shift) => {
    //TODO
  };

  const onEdit = (shift: Shift) => {
    setSelected(shift);
    setIsCreateModalOpen(true);
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
            shift={selected}
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
          {modalValue && (
            <ShiftInfoModal
              isOpen={isViewModalOpen}
              onClose={() => {
                onClose();
                setIsViewModalOpen(false);
              }}
              onBack={() => setIsViewModalOpen(false)}
              shift={modalValue}
            />
          )}
          <ListManagment
            actionButtonLabel="Create Shift"
            emptyMessage="There are no shifts created yet."
            label="Shift"
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
