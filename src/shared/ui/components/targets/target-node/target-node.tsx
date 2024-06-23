import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import {
    TARGET_STATES,
    TargetData,
} from 'entities/target/api/target-api.ts';
import { TargetImage } from 'shared/ui/components/ui/target-image.tsx';

interface TargetNodeProps {
    data: TargetData;
}

export const TargetNode = ({ data }: TargetNodeProps) => {
    let color = '';

    switch (data.state) {
        case TARGET_STATES.NO_ACTIVE:
            color = 'blue';
            break;

        case TARGET_STATES.ACTIVE:
            color = 'green';
            break;

        case TARGET_STATES.SHOTED:
            color = 'yellow';
            break;

        case TARGET_STATES.NO_CONNECT:
            color = 'gray';
            break;

        case TARGET_STATES.KILLED:
            color = 'red';
            break;

        default:
            color = 'white';
    }

    return (
        <div
            style={{
                zIndex: 9999,
            }}
            className="flex flex-col justify-center items-center">
            <div
                style={{
                    border: `2px solid ${data.color}`,
                    width: 'min-content',
                    padding: '2px 0',
                }}
                className="relative">
                <TargetImage type={'24'} />
                <div className="absolute top-[-15px] right-[-15px]">
                    {data.pos === 'UP' ? (
                        <ArrowDownIcon className="w-4 h-4" />
                    ) : (
                        <ArrowUpIcon className="w-4 h-4" />
                    )}
                </div>
            </div>
            <div
                className="mt-2 font-bold max-w-24 text-center"
                style={{ color }}>{`${data.name}`}</div>
        </div>
    );
};
