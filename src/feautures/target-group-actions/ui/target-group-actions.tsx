// import styles from './groups-block.module.scss'
import {TrashIcon} from '@radix-ui/react-icons';

import {useGate, useUnit} from 'effector-react';
import {
    $groups,
    $selectedGroup,
    getGroupsFx,
    groupSelected,
    groupsGate,
} from 'entities/target-group';
import {Button} from 'shared/ui/components/ui/button.tsx';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from 'shared/ui/components/ui/select.tsx';

interface TargetGroupsActionsProps {}

export const TargetGroupsActions = ({}: TargetGroupsActionsProps) => {
    const groups = useUnit($groups);
    const loading = useUnit(getGroupsFx.pending);
    useGate(groupsGate);
    const selectedGroup = useUnit($selectedGroup);

    const selectPlaceholder = loading ? 'Загрузка групп...' : 'Выберите группу';
    const disableSelect = !groups || loading;

    return (
        <div className="bg-primary flex items-center p-4 justify-between mb-12 rounded">
            <div className="font-normal mr-4">Название группы:</div>
            <Select
                value={selectedGroup?.name}
                onValueChange={name => groupSelected(name)}>
                <SelectTrigger
                    className="w-[180px] mr-4"
                    disabled={disableSelect}>
                    <SelectValue placeholder={selectPlaceholder}>
                        {selectedGroup?.name || 'Группа'}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Группы:</SelectLabel>
                        {groups &&
                            groups.map(group => (
                                <SelectItem value={group.name} key={group.id}>
                                    {group.name}
                                </SelectItem>
                            ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button size="icon">
                <TrashIcon height={20} width={20} />
            </Button>

            <Button className="h-9">Сохранить</Button>
            <Button className="h-9">Создать группу</Button>
        </div>
    );
};
