'use client';

import {useGate, useUnit} from 'effector-react';

import {
    Select as SelectShad,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from 'shared/ui/components/ui/select.tsx';
import {SelectModel} from '../model/select-model';

interface SelectProps {
    model: SelectModel<any, any>;
    className?: string;
    placeholder: string;
}

export function Select({model, placeholder, className}: SelectProps) {
    const {
        // $selectIsVisible,
        // visibleChanged,
        $selectedItem,
        $items,
        itemSelected,
        res,
        gate,
    } = model;

    // const isVisible = useUnit($selectIsVisible);
    const selectedItem = useUnit($selectedItem);
    const items = useUnit($items);

    useGate(gate);

    return (
        <SelectShad
            value={JSON.stringify(selectedItem)}
            onValueChange={value => itemSelected(JSON.parse(value))}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder}>
                    {selectedItem ? selectedItem[res] : placeholder}
                </SelectValue>
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Мишени:</SelectLabel>
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
