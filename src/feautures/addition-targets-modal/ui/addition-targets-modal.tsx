import {Target} from 'entities/target';
import {Dialog, DialogContent} from 'shared/ui/components/ui/dialog.tsx';
import {useState} from 'react';
import {Button} from 'shared/ui/components/ui/button.tsx';
import {PlusIcon, TargetIcon} from '@radix-ui/react-icons';

interface AdditionTargetsModalProps {
    targets: Target[];
}

export const AdditionTargetsModal = ({targets}: AdditionTargetsModalProps) => {
    const groups = Object.groupBy(targets, ({group}) => {
        if (!group) return 'Без группы';
        else return group.name;
    });

    console.log(groups);

    const [activeGroup, setActiveGroup] = useState(Object.keys(groups)[0]);

    return (
        <Dialog defaultOpen={true}>
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
                                                setActiveGroup(groupName)
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
                                    {item.name}
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