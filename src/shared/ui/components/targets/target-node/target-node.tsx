import { TargetData } from 'entities/target/api/target-api.ts';
import { TargetImage } from 'shared/ui/components/ui/target-image.tsx';

interface TargetNodeProps {
    data: TargetData;
}

export const TargetNode = ({ data }: TargetNodeProps) => {
    return (
        <>
            <TargetImage type={'24'} />
            <div className="mt-2 font-bold text-white">{`${data.name}`}</div>
        </>
    );
};
