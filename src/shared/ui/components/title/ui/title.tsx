import {ReactNode} from 'react';
import classNames from 'classnames';
import styles from './title.module.scss';

export interface TitleProps {
    classname?: string;
    children: ReactNode;
}

export const Title = ({classname, children}: TitleProps) => {
    return (
        <div className={classNames('flex items-center gap-1', classname)}>
            <h2 className="text-xl font-bold text-center w-full">{children}</h2>
        </div>
    );
};
