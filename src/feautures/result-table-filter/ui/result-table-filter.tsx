// import styles from './result-table-filter.module.scss';
import {CalendarIcon} from '@radix-ui/react-icons';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale/ru';
import {useGate, useUnit} from 'effector-react';
import {$filterSelectDate, $selectedGroup} from 'entities/result-table';
import {$groups, getGroupsFx, groupsGate} from 'entities/target-group';
import {Button} from 'shared/ui/components/ui/button.tsx';
import {Calendar} from 'shared/ui/components/ui/calendar.tsx';
import {Input} from 'shared/ui/components/ui/input.tsx';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from 'shared/ui/components/ui/popover.tsx';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from 'shared/ui/components/ui/select.tsx';
import {cn} from 'shared/utils/utils.ts';
import {dateSelected, groupSelected} from '../model/filter-mode';

interface ResultTableFilterProps {}

export const ResultTableFilter = ({}: ResultTableFilterProps) => {
    const selectedGroup = useUnit($selectedGroup);
    const selectedDate = useUnit($filterSelectDate);

    const groups = useUnit($groups);
    const loading = useUnit(getGroupsFx.pending);
    useGate(groupsGate);

    const selectPlaceholder = loading ? 'Загрузка груп...' : 'Выберите группу';
    const disableSelect = !groups || loading;

    return (
        <div className="bg-primary flex items-center p-4 justify-between mb-12 rounded">
            <div className="flex items-center gap-3">
                <div className="font-normal mr-4">Выберите дату:</div>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'outline'}
                            className={cn(
                                'w-[200px] py-3 text-left font-normal h-9 flex justify-between',
                                !selectedDate && 'text-muted-foreground'
                            )}>
                            {selectedDate ? (
                                format(selectedDate, 'd MMMM yyyy', {
                                    locale: ru,
                                })
                            ) : (
                                <span>Выберите дату</span>
                            )}
                            <CalendarIcon className=" h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            locale={ru}
                            selected={selectedDate || new Date()}
                            onSelect={value => dateSelected(value || null)}
                            disabled={date =>
                                date > new Date() ||
                                date < new Date('1900-01-01')
                            }
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex gap-3 items-center">
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
                                    <SelectItem
                                        value={group.name}
                                        key={group.id}>
                                        {group.name}
                                    </SelectItem>
                                ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex gap-3 items-center">
                <div className="w-[250px]">Введите временной промежуток</div>
                <Input placeholder="20:00-23:45" className="w-[150px]" />
            </div>
        </div>
    );
};
