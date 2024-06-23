import classNames from 'classnames/bind';
import { useUnit } from 'effector-react';
import { TargetItem } from 'pages/index-page/Target/TargetItem.tsx';
import { TargetsGroup } from 'pages/index-page/TargetsGroup/TargetsGroup.tsx';
import {
    getCurrentScript,
    getFreeTargets,
    getScriptGroupsQuery,
    getScriptTargetsWithoutGroup,
    postSelectedScript,
} from 'pages/index-page/model/index-page-model.ts';
import { ScrollArea } from 'shared/ui/components/ui/scroll-area.tsx';
import { Skeleton } from 'shared/ui/components/ui/skeleton.tsx';
import styles from './TargetsList.module.scss';

const cx = classNames.bind(styles);

export const TargetsList = () => {
    const wrapperClassname = cx({
        wrapper: true,
    });

    const { pending, data: targetsGroups } = useUnit(
        getScriptGroupsQuery,
    );
    const { pending: loading, data: targetsWithoutGroup } = useUnit(
        getScriptTargetsWithoutGroup,
    );
    const { pending: load, data: freeTargets } =
        useUnit(getFreeTargets);

    const { pending: scriptLoading } = useUnit(getCurrentScript);
    const { pending: loadingScript } = useUnit(postSelectedScript);

    if (pending || loading || load || scriptLoading || loadingScript)
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
            {targetsGroups ? (
                <>
                    <h1 className="text-xl font-semibold">
                        Группы мишеней, в сценарии
                    </h1>
                    {targetsGroups?.map(group => {
                        return (
                            <TargetsGroup
                                name={group.name}
                                targets={group.targets}
                                color={group.colour}
                            />
                        );
                    })}
                </>
            ) : (
                <h1 className="text-xl my-5 font-semibold bg-primary rounded p-3">
                    Группы мишеней отсутствуют.
                </h1>
            )}

            {targetsWithoutGroup ? (
                <>
                    <h1 className="text-xl my-5 font-semibold">
                        Мишени сценария, без группы
                    </h1>
                    {targetsWithoutGroup?.map(target => (
                        <TargetItem key={target.id} target={target} />
                    ))}
                </>
            ) : (
                <h1 className="text-xl my-5 font-semibold bg-primary rounded p-3">
                    Мишени сценария, без группы отсутствуют.
                </h1>
            )}

            {freeTargets ? (
                <>
                    <h1 className="text-xl my-5 font-semibold">
                        Свободные мишени
                    </h1>
                    {freeTargets?.map(target => (
                        <TargetItem key={target.id} target={target} />
                    ))}
                </>
            ) : (
                <h1 className="text-xl my-5 font-semibold bg-primary rounded p-3">
                    Свободные мишени отсутствуют.
                </h1>
            )}
        </ScrollArea>
    );
};
