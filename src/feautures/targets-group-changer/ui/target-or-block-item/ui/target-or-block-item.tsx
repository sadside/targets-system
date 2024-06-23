import {
    targetAdded,
    targetRemoved,
} from 'pages/groups-page/model/groups-page.ts';
import { Button } from 'shared/ui/components/ui/button.tsx';

export interface TargetOrBlockItemProps {
    id: number;
    name: string;
    free: boolean;
}

export const TargetOrBlockItem = ({
    id,
    name,
    free,
}: TargetOrBlockItemProps) => {
    return (
        <div className="bg-black flex items-center justify-between p-2 mb-2">
            <div className="font-bold text-lg">
                {id}. {name}
            </div>
            {free ? (
                <Button onClick={() => targetAdded(id)}>
                    Добавить в группу
                </Button>
            ) : (
                <Button onClick={() => targetRemoved(id)}>
                    Удалить из группы
                </Button>
            )}
        </div>
    );
};
