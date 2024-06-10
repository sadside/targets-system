'use client';

import {
    $selectedRelief,
    getAllReliefsQuery,
    reliefGate,
    reliefSelected,
} from '@/feautures/relief-select/model/relief-select.ts';
import { useGate, useUnit } from 'effector-react';
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    Select as SelectShad,
    SelectTrigger,
    SelectValue,
} from 'shared/ui/components/ui/select.tsx';

interface SelectProps {
    className?: string;
}

export const ReliefSelect = ({ className }: SelectProps) => {
    const selectedItem = useUnit($selectedRelief);

    const { data: items, pending } = useUnit(getAllReliefsQuery);

    useGate(reliefGate);

    const triggerText = pending
        ? 'Загрузка'
        : selectedItem
          ? selectedItem.name
          : 'Выберите рельеф';

    return (
        <SelectShad
            value={JSON.stringify(selectedItem)}
            onValueChange={value =>
                reliefSelected(JSON.parse(value))
            }>
            <SelectTrigger className={className} disabled={pending}>
                <SelectValue>{triggerText}</SelectValue>
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Элементы рельефа:</SelectLabel>
                    {items &&
                        items?.map(reliefItem => {
                            return (
                                <SelectItem
                                    key={selectedItem?.id}
                                    value={JSON.stringify(reliefItem)}
                                    className="text-[14px]">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`h-5 w-6`}
                                            style={{
                                                backgroundColor:
                                                    reliefItem.color,
                                            }}></div>
                                        <div>{reliefItem.name}</div>
                                    </div>
                                </SelectItem>
                            );
                        })}
                </SelectGroup>
            </SelectContent>
        </SelectShad>
    );
};
