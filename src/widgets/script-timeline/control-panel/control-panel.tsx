import {Button} from 'shared/ui/components/ui/button.tsx';
import {IconLeft, IconRight} from 'react-day-picker';
import {twMerge} from 'tailwind-merge';
import {useUnit} from 'effector-react/effector-react.umd';
import {
    $activeInterval,
    DEFAULT_TIMEFRAME,
} from 'widgets/script-timeline/model/script-timeline.ts';
import {Relevance, Timeframe, useTimelineContext} from 'dnd-timeline';
import {
    millisecondsInDay,
    millisecondsInHour,
    millisecondsInMinute,
    millisecondsInSecond,
    minutesInDay,
} from 'date-fns/constants';
import {
    hoursToMilliseconds,
    millisecondsToSeconds,
    minutesToMilliseconds,
    secondsToMilliseconds,
} from 'date-fns';
import {ClockIcon, MinusIcon, PlusIcon} from '@radix-ui/react-icons';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from 'shared/ui/components/ui/tooltip.tsx';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from 'shared/ui/components/ui/popover.tsx';
import {Input} from 'shared/ui/components/ui/input.tsx';
import {SubmitHandler, useForm} from 'react-hook-form';
import {usePopover} from '@chakra-ui/react';
import {Dispatch, SetStateAction} from 'react';

interface ControlPanelProps {
    setTimeframe: Dispatch<SetStateAction<Relevance>>;
}

type Inputs = {
    hours: string;
    minutes: string;
    seconds: string;
};

export const ControlPanel = ({setTimeframe}: ControlPanelProps) => {
    const {timeframe, getDateFromScreenX} = useTimelineContext();

    const timeframeSize = timeframe.end.getTime() - timeframe.start.getTime();

    const step = secondsToMilliseconds(
        millisecondsToSeconds(timeframeSize / 10)
    );

    const isCanMove =
        timeframe.start.getTime() - step >= DEFAULT_TIMEFRAME.start.getTime();

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm<Inputs>({
        defaultValues: {
            seconds: '0',
            minutes: '0',
            hours: '0',
        },
    });

    const handleMinuteClick = () => {
        setTimeframe((prev: Timeframe) => {
            return {
                start: prev.start,
                end: new Date(
                    DEFAULT_TIMEFRAME.start.getTime() + millisecondsInHour
                ),
            };
        });
    };

    const handleSecondsClick = () => {
        setTimeframe((prev: Timeframe) => {
            return {
                start: prev.start,
                end: new Date(
                    DEFAULT_TIMEFRAME.start.getTime() + millisecondsInMinute
                ),
            };
        });
    };

    const handleHoursClick = () => {
        setTimeframe((prev: Timeframe) => {
            return {
                start: prev.start,
                end: new Date(
                    DEFAULT_TIMEFRAME.start.getTime() + millisecondsInDay
                ),
            };
        });
    };

    const handleLeftIconCLick = () => {
        setTimeframe((prev: Timeframe) => {
            if (isCanMove)
                return {
                    end: new Date(prev.end.getTime() - step),
                    start: new Date(prev.start.getTime() - step),
                };

            const finalStep =
                prev.start.getTime() - DEFAULT_TIMEFRAME.start.getTime();

            return {
                end: new Date(prev.end.getTime() - finalStep),
                start: new Date(prev.start.getTime() - finalStep),
            };
        });
    };

    const handleRightIconClick = () => {
        setTimeframe((prev: Timeframe) => {
            return {
                end: new Date(prev.end.getTime() + step),
                start: new Date(prev.start.getTime() + step),
            };
        });
    };

    const handlePlusIconClick = () => {
        setTimeframe((prev: Timeframe) => {
            return {
                end: new Date(prev.end.getTime() - step),
                start: prev.start,
            };
        });
    };

    const handleMinusIconClick = () => {
        setTimeframe((prev: Timeframe) => {
            return {
                end: new Date(prev.end.getTime() + step),
                start: prev.start,
            };
        });
    };

    const onSubmit: SubmitHandler<Inputs> = data => {
        reset();
        setTimeframe((prev: Timeframe) => {
            const start = new Date(
                DEFAULT_TIMEFRAME.start.getTime() +
                    secondsToMilliseconds(+data.seconds) +
                    minutesToMilliseconds(+data.minutes) +
                    hoursToMilliseconds(+data.hours)
            );

            return {
                start,
                end: new Date(start.getTime() + timeframeSize),
            };
        });
    };

    return (
        <div className="flex h-[60px] mt-2 rounded justify-between items-center border border-[#18181b] ml-[208px] p-3">
            <Button
                size="icon"
                disabled={
                    timeframe.start.getTime() ===
                    DEFAULT_TIMEFRAME.start.getTime()
                }
                onClick={handleLeftIconCLick}>
                <IconLeft />
            </Button>
            <div className="flex gap-4 items-center">
                <Button
                    className={twMerge(
                        timeframeSize >= millisecondsInHour * 2 &&
                            timeframeSize < millisecondsInDay * 2 &&
                            'bg-[#a5c8ca] text-black font-bold'
                    )}
                    size="icon"
                    onClick={handleMinusIconClick}>
                    <MinusIcon />
                </Button>
                <Button
                    className={twMerge(
                        timeframeSize >= millisecondsInHour * 2 &&
                            timeframeSize < millisecondsInDay * 2 &&
                            'bg-[#a5c8ca] text-black font-bold'
                    )}
                    size="icon"
                    onClick={handlePlusIconClick}>
                    <PlusIcon />
                </Button>
                <TooltipProvider>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="gap-3">
                                Переместиться на
                                <ClockIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-3 bg-[#18181b] border-0 text-white">
                            <div className="mb-3">
                                Введите время для отображения.
                            </div>
                            <form action="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex gap-3 mb-3">
                                    <div>
                                        <label>Часы</label>
                                        <Input
                                            id="width"
                                            defaultValue="100%"
                                            type={'number'}
                                            className="col-span-2 h-8"
                                            {...register('hours', {
                                                min: {
                                                    value: 0,
                                                    message:
                                                        'Минимальное значение 0 час.',
                                                },
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <label>Минуты</label>
                                        <Input
                                            id="width"
                                            defaultValue="100%"
                                            type={'number'}
                                            className="col-span-2 h-8"
                                            {...register('minutes', {
                                                min: {
                                                    value: 0,
                                                    message:
                                                        'Минимальное значение 0',
                                                },
                                                max: {
                                                    value: 59,
                                                    message:
                                                        'Максимальное значение 59 мин.',
                                                },
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <label>Секунды</label>
                                        <Input
                                            id="width"
                                            type={'number'}
                                            defaultValue="100%"
                                            className={twMerge(
                                                'col-span-2 h-8',
                                                errors?.seconds?.message &&
                                                    'border border-red-700'
                                            )}
                                            {...register('seconds', {
                                                min: {
                                                    value: 0,
                                                    message:
                                                        'Минимальное значение 0',
                                                },
                                                max: {
                                                    value: 59,
                                                    message:
                                                        'Максимальное значение 59 сек.',
                                                },
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="text-center mb-3 text-red-800">
                                    <p>{errors?.hours?.message}</p>
                                    <p>{errors?.minutes?.message}</p>
                                    <p>{errors?.seconds?.message}</p>
                                </div>
                                <Button type="submit">Перейти</Button>
                            </form>
                        </PopoverContent>
                    </Popover>
                </TooltipProvider>
            </div>
            <Button size="icon" onClick={handleRightIconClick}>
                <IconRight />
            </Button>
        </div>
    );
};
