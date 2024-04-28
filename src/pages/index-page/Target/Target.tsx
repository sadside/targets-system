import styles from './Target.module.scss';
import {
    TARGET_POSITIONS,
    TARGET_STATUSES,
    TargetType,
} from 'pages/index-page/types.ts';
import classNames from 'classnames/bind';
import {ArrowDownIcon, ArrowUpIcon, Pencil1Icon} from '@radix-ui/react-icons';
import {Progress} from 'shared/ui/components/ui/progress.tsx';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from 'shared/ui/components/ui/tooltip.tsx';
import {Button} from 'shared/ui/components/ui/button.tsx';

const cx = classNames.bind(styles);

export const Target = ({id, status, position, charge}: TargetType) => {
    const circle = cx({
        circle: true,
        'bg-lime-400': status === TARGET_STATUSES.ONLINE_IN_PROGRESS,
        'bg-yellow-400': status === TARGET_STATUSES.ONLINE_IDLE,
        'bg-orange-500': status === TARGET_STATUSES.OFFLINE_IN_PROGRESS,
        'bg-gray-400': status === TARGET_STATUSES.OFFLINE_IDLE,
        'mr-3': true,
    });

    let tooltipText = '';

    switch (status) {
        case TARGET_STATUSES.ONLINE_IN_PROGRESS:
            tooltipText = 'Включена, в работе.';
            break;
        case TARGET_STATUSES.ONLINE_IDLE:
            tooltipText = 'Включена, простаивает.';
            break;
        case TARGET_STATUSES.OFFLINE_IN_PROGRESS:
            tooltipText = 'Выключена, в работе';
            break;
        case TARGET_STATUSES.OFFLINE_IDLE:
            tooltipText = 'Выключена, простаивает';
            break;
    }

    const wrapper = cx({
        wrapper: true,
        'bg-primary': true,
    });

    return (
        <TooltipProvider delayDuration={200}>
            <div className={wrapper}>
                <div className="flex items-center">
                    <Tooltip>
                        <TooltipTrigger>
                            <div className={circle}></div>
                        </TooltipTrigger>
                        <TooltipContent className="text-sm">
                            <p>{tooltipText}</p>
                        </TooltipContent>
                    </Tooltip>
                    <div className={styles.title}>Мишень {id}</div>
                </div>
                <div className={styles.actions}>
                    <div className="flex w-full justify-between mb-2">
                        <div className="cursor-pointer">
                            {position === TARGET_POSITIONS.TOP ? (
                                <Button
                                    variant="default"
                                    size="icon"
                                    className="hover:bg-green bg-black">
                                    <ArrowDownIcon className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    variant="default"
                                    size="icon"
                                    className="hover:bg-green bg-black">
                                    <ArrowUpIcon className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                        <div className={styles.edit}>
                            <Button
                                variant="default"
                                size="icon"
                                className="hover:bg-green bg-black">
                                <Pencil1Icon className="w-4 h-4 cursor-pointer" />
                            </Button>
                        </div>
                    </div>
                    <Progress value={charge} className="w-28 rounded-sm h-1" />
                </div>
            </div>
        </TooltipProvider>
    );
};
