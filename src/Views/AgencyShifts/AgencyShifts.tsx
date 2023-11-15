import React, { Fragment, useContext, useEffect, useState } from 'react';
import { SettingsError, Shift, ShiftListItem } from '../../Models';
import { SettingsContentRender } from '../SettingsContentRender';
import { ListManagment } from '../../Components/ListManagment/ListManagment';
import { ApiContext } from '../../Context';
import { getShift, getShifts } from '../../Services';
import { ShiftList } from './ShiftList/ShiftList';
import { ShiftFormModal } from './ShiftFormModal/ShiftFormModal';

function sortShifts(groups: ShiftListItem[]): ShiftListItem[] {
  return groups.sort((a: ShiftListItem, b: ShiftListItem): number =>
    a.name.localeCompare(b.name)
  );
}

function getFilteredShifts(
  shifts: ShiftListItem[],
  filter: string
): ShiftListItem[] {
  if (filter.length < 3) {
    return shifts;
  } else {
    const filterLower = filter.toLowerCase();
    return shifts.filter((s: ShiftListItem) =>
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
  const apiBaseUrl = useContext(ApiContext).shifts;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shifts, setShifts] = useState<ShiftListItem[]>([]);
  const [selected, setSelected] = useState<Shift | undefined>();
  const [isLoadingShift, setIsLoadingShift] = useState<boolean>(false);
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

  const onUpdate = async () => {
    setIsLoading(true);
    try {
      const shifts = await getShifts(apiBaseUrl);
      setShifts(sortShifts(shifts));
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
      onError(e);
    }
  };

  const onCreate = () => {
    setSelected(undefined);
    setIsCreateModalOpen(true);
  };

  const onInfo = (shiftPreview: ShiftListItem) => {
    //TODO
  };
  const onDelete = (shiftPreview: ShiftListItem) => {
    //TODO
  };

  const onEdit = async (shiftPreview: ShiftListItem) => {
    try {
      setIsLoadingShift(true);
      setIsCreateModalOpen(true);
      const shift = await getShift(apiBaseUrl, shiftPreview.id);
      setSelected(shift);
      setIsLoadingShift(false);
    } catch (e: any) {
      setIsLoadingShift(false);
      onError(e);
    }
  };

  const onRestore = (shiftPreview: ShiftListItem) => {
    //TODO
  };
  const onViewHistory = (shiftPreview: ShiftListItem) => {
    //TODO
  };

  return (
    <SettingsContentRender
      renderContent={() => (
        <Fragment>
          <ShiftFormModal
            shift={selected}
            isOpen={isCreateModalOpen}
            isLoading={isLoadingShift}
            onError={onError}
            onSave={onUpdate}
            onClose={() => setIsCreateModalOpen(false)}
          />

          <ListManagment
            label="Shift"
            labelPlural="shifts"
            list={shifts}
            isLoading={isLoading}
            filter={getFilteredShifts}
            onCreate={onCreate}
            renderList={(list: ShiftListItem[]) => (
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
