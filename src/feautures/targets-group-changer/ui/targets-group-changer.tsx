import { useUnit } from 'effector-react';
import styles from './targets-group-changer.module.scss';

import { $freeTargets } from '@/feautures/targets-group-changer';
import { $currentGroup } from 'pages/groups-page/model/groups-page.ts';
import { TargetOrBlockItem } from './target-or-block-item/ui/target-or-block-item.tsx';

interface GroupChangeBlockProps {}

export const TargetsGroupChanger = ({}: GroupChangeBlockProps) => {
    const currentGroup = useUnit($currentGroup);
    const freeTargets = useUnit($freeTargets);

    return (
        <div className={styles.wrapper}>
            <div className="flex gap-10">
                <div className={styles.block}>
                    <h2 className="text-lg font-bold mb-2">
                        Свободные мишени
                    </h2>
                    {freeTargets?.map(item => (
                        <TargetOrBlockItem
                            name={item.name}
                            id={item.id}
                            key={item.id}
                            free={true}
                        />
                    ))}
                </div>
                {/*<div className="flex items-center h-full">*/}
                {/*    <div className="flex flex-col gap-2">*/}
                {/*        <Button*/}
                {/*            variant="default"*/}
                {/*            disabled={true}*/}
                {/*            className="p-3 hover:bg-green bg-green">*/}
                {/*            <PaperPlaneIcon className="h-5 w-5" />*/}
                {/*        </Button>*/}
                {/*        <Button*/}
                {/*            variant="default"*/}
                {/*            className="p-3 hover:bg-green bg-green rotate-180">*/}
                {/*            <PaperPlaneIcon className="h-5 w-5" />*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={styles.block}>
                    <h2 className="text-lg font-bold mb-2">
                        Мишени, относящиеся к группе{' '}
                        {currentGroup?.name}
                    </h2>
                    {currentGroup?.targets.map(item => (
                        <TargetOrBlockItem
                            name={item.name}
                            id={item.id}
                            key={item.id}
                            free={false}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
