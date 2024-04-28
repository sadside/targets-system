import {TargetImage} from 'shared/ui/components/ui/target-image.tsx';
import {Target} from 'entities/target';
interface TargetNodeProps {
    data: Target;
}

export const TargetNode = ({data}: TargetNodeProps) => {
    return (
        <div className="bg-transparent">
            <>
                <TargetImage type={data.type} />
                <div className="mt-2 font-bold text-white">{`${data.id}. ${data.name}`}</div>
            </>
        </div>
    );
};
