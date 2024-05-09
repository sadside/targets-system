import {ReactNode} from 'react';
import {Button} from 'shared/ui/components/ui/button.tsx';
import {Pencil1Icon, PlusIcon, TrashIcon} from '@radix-ui/react-icons';
import {twMerge} from 'tailwind-merge';
import {modalStateChanged} from '@/feautures/addition-targets-modal/ui/model/addition-target-model.ts';

interface SidebarItemsProps {
    id?: number;
    name?: string;
    children: ReactNode;
    ruler?: boolean;
}

export const SidebarItem = ({children, ruler = false}: SidebarItemsProps) => {
    const handleAddTargetClick = () => {
        modalStateChanged(true);
    };

    return (
        <div
            className={twMerge(
                'w-52 flex justify-between items-center gap-3 p-3 bg-[#18181b] rounded-l h-[60px]',
                ruler && 'h-[40px] bg-sidebarBg border border-[#18181b]'
            )}>
            {ruler ? (
                <div className="flex items-center justify-between gap-4">
                    <h1 className="font-bold text-lg text-light">
                        Редактор событий
                    </h1>
                    <Button
                        size="icon"
                        className="h-6 w-6"
                        onClick={handleAddTargetClick}>
                        <PlusIcon className="h-3 w-3" />
                    </Button>
                </div>
            ) : (
                <div>{children}</div>
            )}
            {!ruler && (
                <div className="flex gap-3">
                    <Button size="icon">
                        <TrashIcon />
                    </Button>
                    <Button size="icon">
                        <Pencil1Icon />
                    </Button>
                </div>
            )}
        </div>
    );
};
