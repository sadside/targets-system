import classNames from 'classnames/bind';
import {TargetsGroup} from 'pages/index-page/TargetsGroup/TargetsGroup.tsx';
import {ScrollArea} from 'shared/ui/components/ui/scroll-area.tsx';
import {targets} from '../mock';
import styles from './TargetsList.module.scss';

const cx = classNames.bind(styles);

export const TargetsList = () => {
    const wrapperClassname = cx({
        wrapper: true,
    });

    return (
        <ScrollArea className={wrapperClassname}>
            {targets.map(group => {
                return (
                    <TargetsGroup name={group.name} targets={group.targets} />
                );
            })}
            div
        </ScrollArea>
    );
};
