'use client';

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
import { SelectModel } from '../model/select-model';

interface SelectProps {
    model: SelectModel<any, any>;
    className?: string;
    placeholder: string;
    label: string;
    loading?: boolean;
}

export function Select({
    model,
    placeholder,
    label,
    className,
}: SelectProps) {
    const {
        // $selectIsVisible,
        // visibleChanged,
        $selectedItem,
        $items,
        itemSelected,
        res,
        gate,
        $loading,
    } = model;

    // const isVisible = useUnit($selectIsVisible);
    const selectedItem = useUnit($selectedItem);
    const items = useUnit($items);

    const loading = useUnit($loading);

    useGate(gate);

    return (
        <SelectShad
            value={JSON.stringify(selectedItem)}
            onValueChange={value => itemSelected(JSON.parse(value))}
            disabled={loading}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder}>
                    {loading
                        ? 'Загрузка'
                        : selectedItem
                          ? selectedItem[res]
                          : placeholder}
                </SelectValue>
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}:</SelectLabel>
                    {items &&
                        items?.map(item => (
                            <SelectItem
                                key={item?.[res]}
                                value={JSON.stringify(item)}
                                className="text-[14px]">
                                {item?.[res]}
                            </SelectItem>
                        ))}
                </SelectGroup>
            </SelectContent>
        </SelectShad>
    );
}
