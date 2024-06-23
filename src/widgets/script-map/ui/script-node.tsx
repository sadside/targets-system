import { TargetData } from 'entities/target/api/target-api.ts';
import { TargetImage } from 'shared/ui/components/ui/target-image.tsx';

interface TargetNodeProps {
    data: TargetData;
}

export const ScriptNode = ({ data }: TargetNodeProps) => {
    return (
        <div
            style={{
                zIndex: 9999,
            }}
            className="flex flex-col justify-center items-center">
            <div
                style={{
                    width: 'min-content',
                    padding: '2px 0',
                }}
                className="relative">
                <TargetImage type={'24'} />
            </div>
            <div className="mt-2 font-bold max-w-24 text-center">{`${data.name}`}</div>
        </div>
    );
};
