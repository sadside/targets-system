import styles from './number-picker.module.scss';
import ReactSlider from 'react-slider';
import {DetailedHTMLProps, HTMLAttributes} from 'react';
import classNames from 'classnames';

interface NumberPickerProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    min?: number;
    max?: number;
    label?: string;
    value: number;
    handleChange: (value: number) => void;
}

export const NumberPicker = ({
    value,
    min = 1,
    max = 10,
    handleChange,
    label,
    className,
    ...otherProps
}: NumberPickerProps) => {
    return (
        <div {...otherProps} className={classNames('flex', className)}>
            {label && <label className="w-36 text-base">{label}</label>}
            <ReactSlider
                className={styles.numberPicker}
                value={value}
                marks
                markClassName={styles.marks}
                renderThumb={(props, state) => (
                    <div
                        {...props}
                        className="h-8 w-8 rounded-full bg-primary flex justify-center items-center cursor-pointer outline-0 font-bold">
                        {state.valueNow}
                    </div>
                )}
                max={max}
                min={min}
                onChange={value => handleChange(value)}
            />
        </div>
    );
};
