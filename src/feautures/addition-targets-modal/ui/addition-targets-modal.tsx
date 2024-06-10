import {
    $isVisible,
    modalStateChanged,
} from '@/feautures/addition-targets-modal/ui/model/addition-target-model.ts';
import { PlusIcon, TargetIcon } from '@radix-ui/react-icons';
import { useUnit } from 'effector-react';
import { Target } from 'entities/target';
import { useState } from 'react';
import { Button } from 'shared/ui/components/ui/button.tsx';
import {
    Dialog,
    DialogContent,
} from 'shared/ui/components/ui/dialog.tsx';

interface AdditionTargetsModalProps {
    targets: Target[];
}

export const AdditionTargetsModal = ({
    targets,
}: AdditionTargetsModalProps) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const groups = Object.groupBy(targets, ({ group }) => {
        if (!group) return 'Без группы';
        else return group.name;
    });

    const isVisible = useUnit($isVisible);

    const [activeGroup, setActiveGroup] = useState(
        Object.keys(groups)[0],
    );

    return (
        <Dialog
            open={isVisible}
            onOpenChange={state => modalStateChanged(state)}>
            <DialogContent className="bg-black border h-[800px] border-sidebarHoverColor w-[900px]">
                <div className="flex gap-5">
                    <div>
                        <h2 className="text-lg mb-3 text-green font-bold">
                            Группы
                        </h2>
                        {Object.keys(groups).map(groupName => {
                            return (
                                <div className="bg-primary flex items-center p-5 rounded mb-5 text-[16px] justify-between gap-2">
                                    <span
                                        className="cursor-pointer"
                                        onClick={() =>
                                            setActiveGroup(groupName)
                                        }>
                                        {groupName}
                                    </span>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() =>
                                                setActiveGroup(
                                                    groupName,
                                                )
                                            }
                                            size="icon">
                                            <TargetIcon />
                                        </Button>
                                        <Button size="icon">
                                            <PlusIcon />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <h2 className="text-lg mb-3 text-green font-bold">
                            Мишени группы
                        </h2>
                        {groups[activeGroup].map((item: Target) => (
                            <div className="bg-primary flex items-center p-5 rounded mb-5 text-[16px] justify-between gap-2">
                                <span className="cursor-pointer">
                                    {item?.name || 'name'}
                                </span>
                                <div className="flex gap-2">
                                    <Button size="icon">
                                        <PlusIcon />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
