import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {Checkbox} from 'shared/ui/components/ui/checkbox.tsx';
import classNames from 'classnames';

interface CheckboxProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    label: string;
    checked: boolean;
    handleChange: () => void;
    disabled?: boolean;
}

export const CustomCheckbox = ({
    label,
    className,
    checked,
    disabled,
    handleChange,
    ...otherProps
}: CheckboxProps) => {
    return (
        <div
            {...otherProps}
            className={classNames('flex items-center space-x-2', className)}>
            <Checkbox
                className="h-5 w-5"
                checked={checked}
                disabled={disabled}
                onClick={() => handleChange()}
            />
            <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
            </label>
        </div>
    );
};
