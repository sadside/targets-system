// import styles from './groups-block.module.scss'
import { TrashIcon } from '@radix-ui/react-icons';

import {
    groupDeleteBtnClicked,
    groupSaveBtnClicked,
    groupSelectModel,
} from '@/feautures/target-group-actions/model/target-group-actions.ts';
import { useGate } from 'effector-react';
import { groupsGate } from 'entities/target-group';
import { modalVisibleChanged } from 'pages/groups-page/model/create-group-model.ts';
import { Button } from 'shared/ui/components/ui/button.tsx';
import { Select } from 'shared/ui/select/ui/select.tsx';

interface TargetGroupsActionsProps {}

export const TargetGroupsActions = ({}: TargetGroupsActionsProps) => {
    useGate(groupsGate);

    return (
        <div className="bg-primary flex items-center p-4 justify-between mb-12 rounded">
            <div className="font-normal mr-4">Выберите группу:</div>
            <Select
                model={groupSelectModel}
                placeholder="Выберите групу"
                className="w-[200px]"
                label="Группы"
            />
            <Button
                size="icon"
                onClick={() => groupDeleteBtnClicked()}>
                <TrashIcon height={20} width={20} />
            </Button>

            <Button
                className="h-9"
                onClick={() => groupSaveBtnClicked()}>
                Сохранить
            </Button>
            <Button
                className="h-9"
                onClick={() => modalVisibleChanged(true)}>
                Создать группу
            </Button>
        </div>
    );
};
