import classNames from 'classnames/bind';
import { useUnit } from 'effector-react';
import { getAllTargetsQuery } from 'entities/target/model/target.ts';
import { ScrollArea } from 'shared/ui/components/ui/scroll-area.tsx';
import { Skeleton } from 'shared/ui/components/ui/skeleton.tsx';
import styles from './TargetsList.module.scss';

const cx = classNames.bind(styles);

export const TargetsList = () => {
    const wrapperClassname = cx({
        wrapper: true,
    });

    const { pending } = useUnit(getAllTargetsQuery);

    if (pending)
        return (
            <div className="space-y-3">
                <Skeleton className="h-[60px] rounded bg-[#18181B] m-4" />
                <Skeleton className="h-[60px] rounded bg-[#18181B] m-4" />
                <Skeleton className="h-[60px] rounded bg-[#18181B] m-4" />
                <Skeleton className="h-[60px] rounded bg-[#18181B] m-4" />
                <Skeleton className="h-[60px] rounded bg-[#18181B] m-4" />
            </div>
        );

    return (
        <ScrollArea className={wrapperClassname}>
            {/*{targets?.map(target => {*/}
            {/*    return (*/}
            {/*        <TargetsGroup*/}
            {/*            name={target.name}*/}
            {/*            targets={target.targets}*/}
            {/*        />*/}
            {/*    );*/}
            {/*})}*/}
        </ScrollArea>
    );
};
