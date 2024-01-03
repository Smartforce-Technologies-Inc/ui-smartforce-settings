import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  SettingsError,
  Shift,
  ShiftHistory,
  ShiftListItem
} from '../../Models';
import { SettingsContentRender } from '../SettingsContentRender';
import { ListManagment } from '../../Components/ListManagment/ListManagment';
import { ApiContext } from '../../Context';
import { getShift, getShiftHistory, getShifts } from '../../Services';
import { ShiftFormModal } from './ShiftFormModal/ShiftFormModal';
import { ShiftInfoModal } from './ShiftInfoModal/ShiftInfoModal';
import { AgencyShiftItem } from './AgencyShiftItem/AgencyShiftItem';
import { SFChip } from 'sfui';
import { ShiftHistoryModal } from './ShiftHistoryModal/ShiftHistoryModal';

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
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isShiftHistoryModalOpen, setIsShiftHistoryModalOpen] =
    useState<boolean>(false);
  const [isLoadingShiftHistory, setIsLoadingShiftHistory] =
    useState<boolean>(false);
  const [shiftHistory, setShiftHistory] = useState<ShiftHistory[]>([]);
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

  const onInfo = async (shiftPreview: ShiftListItem) => {
    try {
      setIsLoadingShift(true);
      setIsViewModalOpen(true);
      const shift = await getShift(apiBaseUrl, shiftPreview.id);
      setModalValue(shift);
      setIsLoadingShift(false);
    } catch (e: any) {
      setIsLoadingShift(false);
      onError(e);
    }
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

  const onHistory = async (shiftId: string) => {
    setIsShiftHistoryModalOpen(true);
    setIsLoadingShiftHistory(true);

    try {
      const response = await getShiftHistory(apiBaseUrl, shiftId);
      setShiftHistory(response);
      setIsLoadingShiftHistory(false);
    } catch (e: any) {
      setIsLoadingShiftHistory(false);
      onError(e);
    }
  };

  return (
    <SettingsContentRender
      renderContent={() => (
        <Fragment>
          <ShiftHistoryModal
            isOpen={isShiftHistoryModalOpen}
            isLoading={isLoadingShiftHistory}
            history={shiftHistory}
            onClose={() => {
              setIsShiftHistoryModalOpen(false);
              onClose();
            }}
            onBack={() => setIsShiftHistoryModalOpen(false)}
          />
          <ShiftFormModal
            shift={selected}
            isOpen={isCreateModalOpen}
            isLoading={isLoadingShift}
            onBack={() => setIsCreateModalOpen(false)}
            onError={onError}
            onSave={onUpdate}
            onClose={() => {
              onClose();
              setIsCreateModalOpen(false);
            }}
          />
          <ShiftInfoModal
            isOpen={isViewModalOpen}
            isLoading={isLoadingShift}
            onClose={() => {
              onClose();
              setIsViewModalOpen(false);
            }}
            onBack={() => setIsViewModalOpen(false)}
            onError={onError}
            shift={modalValue}
          />
          <ListManagment<ShiftListItem>
            actionButtonLabel="Create Shift"
            emptyMessage="There are no shifts created yet."
            label="Shift"
            list={shifts}
            isLoading={isLoading}
            filter={getFilteredShifts}
            onCreate={onCreate}
            onClick={onInfo}
            options={[
              {
                label: 'See shift information',
                onClick: onInfo
              },
              {
                label: 'Edit shift',
                onClick: onEdit
              },
              {
                label: 'View history',
                onClick: (item: ShiftListItem) => onHistory(item.id)
              },
              {
                label: 'Delete',
                disabled: true,
                onClick: () => {},
                chip: (
                  <SFChip size="small" sfColor="default" label="Coming Soon" />
                )
              }
            ]}
            renderItem={(item) => <AgencyShiftItem shift={item} />}
          />
        </Fragment>
      )}
    />
  );
};
