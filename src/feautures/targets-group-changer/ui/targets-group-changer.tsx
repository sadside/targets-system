import styles from './targets-group-changer.module.scss';
import {useUnit} from 'effector-react';

import {$selectedGroup} from 'entities/target-group';
import {PaperPlaneIcon} from '@radix-ui/react-icons';
import {Button} from 'shared/ui/components/ui/button.tsx';
import {
    $freeTargets,
    $selectedGroupTargets,
} from '../model/group-change-model.ts';
import {TargetOrBlockItem} from './target-or-block-item/ui/target-or-block-item.tsx';

interface GroupChangeBlockProps {}

export const TargetsGroupChanger = ({}: GroupChangeBlockProps) => {
    const selectedGroupTargets = useUnit($selectedGroupTargets);
    const freeTargets = useUnit($freeTargets);
    const selectedGroup = useUnit($selectedGroup);

    return (
        <div className={styles.wrapper}>
            <div className="flex gap-10">
                <div className={styles.block}>
                    <h2 className="text-lg font-bold mb-2">Свободные мишени</h2>
                    {freeTargets?.map(item => (
                        <TargetOrBlockItem
                            name={item.name}
                            id={item.id}
                            key={item.id}
                        />
                    ))}
                </div>
                <div className="flex items-center h-full">
                    <div className="flex flex-col gap-2">
                        <Button
                            variant="default"
                            disabled={true}
                            className="p-3 hover:bg-green bg-green">
                            <PaperPlaneIcon className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="default"
                            className="p-3 hover:bg-green bg-green rotate-180">
                            <PaperPlaneIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className={styles.block}>
                    <h2 className="text-lg font-bold mb-2">
                        Мишени, относящиеся к группе {selectedGroup?.name}
                    </h2>
                    {selectedGroupTargets.map(item => (
                        <TargetOrBlockItem
                            name={item.name}
                            id={item.id}
                            key={item.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
