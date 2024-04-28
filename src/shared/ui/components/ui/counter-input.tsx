import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {Input} from 'shared/ui/components/ui/input.tsx';
import {Button} from 'shared/ui/components/ui/button.tsx';
import {MinusIcon, PlusIcon} from '@radix-ui/react-icons';

interface CounterInputProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    label?: string;
    value: number;
    handleChange: (value: string) => void;
    onDecrement: () => void;
    onIncrement: () => void;
}

export const CounterInput = ({
    label,
    handleChange,
    onIncrement,
    onDecrement,
    value,
    ...otherProps
}: CounterInputProps) => {
    return (
        <div {...otherProps}>
            <div className="flex items-center gap-3 w-[350px]">
                <div className="flex gap-3 items-center justify-between flex-1">
                    {label && <label className="text-base">{label}</label>}

                    <Input
                        type="number"
                        className="w-32 text-base"
                        onChange={e => handleChange(e.target.value)}
                        value={String(value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="font-bold h-6 w-6"
                        onClick={onIncrement}>
                        <PlusIcon height={10} width={10} />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="font-bold h-6 w-6 disabled:cursor-not-allowed"
                        onClick={onDecrement}
                        disabled={value === 0}>
                        <MinusIcon height={10} width={10} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
