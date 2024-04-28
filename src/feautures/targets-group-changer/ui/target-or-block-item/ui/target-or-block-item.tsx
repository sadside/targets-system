import {Checkbox} from 'shared/ui/components/ui/checkbox.tsx';

export interface TargetOrBlockItemProps {
    id: number;
    name: string;
}

export const TargetOrBlockItem = ({id, name}: TargetOrBlockItemProps) => {
    return (
        <div className="bg-black h-10 flex items-center justify-between px-4 mb-2">
            <div className="font-bold">
                {id}. {name}
            </div>
            <Checkbox className="h-5 w-5" />
        </div>
    );
};
