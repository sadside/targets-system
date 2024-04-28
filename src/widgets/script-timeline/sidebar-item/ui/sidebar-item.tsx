import {ReactNode} from 'react';
import {Button} from 'shared/ui/components/ui/button.tsx';
import {Pencil1Icon, TrashIcon} from '@radix-ui/react-icons';
import {twMerge} from 'tailwind-merge';

interface SidebarItemsProps {
    id?: number;
    name?: string;
    children: ReactNode;
    ruler?: boolean;
}

export const SidebarItem = ({children, ruler = false}: SidebarItemsProps) => {
    return (
        <div
            className={twMerge(
                'w-52 flex justify-between items-center gap-3 p-3 bg-[#18181b] rounded-l h-[60px]',
                ruler && 'h-[40px] bg-sidebarBg border border-[#18181b]'
            )}>
            {ruler ? (
                <div>
                    <h1 className="font-bold text-lg text-light">
                        Редактор событий
                    </h1>
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
