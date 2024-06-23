import { useUnit } from 'effector-react';
import { Button } from 'shared/ui/components/ui/button.tsx';
import {
    MAP_EDIT_MODE,
    mapModeSelected,
} from 'widgets/map-actions/model/map-actions.ts';

export const ModeNotSelected = () => {
    const mapModeClicked = useUnit(mapModeSelected);

    return (
        <div className="flex items-center justify-center w-full">
            <div>
                <h2 className="text-center font-semibold text-[16px] mb-2">
                    Выберите режим
                </h2>
                <div className="flex items-center gap-3">
                    <Button
                        className="h-11 bg-green border-none hover:bg-green"
                        onClick={() =>
                            mapModeClicked(MAP_EDIT_MODE.CREATE)
                        }>
                        Создать карту
                    </Button>
                    <Button
                        className="h-11 border-none hover:bg-green"
                        variant="secondary"
                        onClick={() =>
                            mapModeClicked(MAP_EDIT_MODE.EDIT)
                        }
                        disabled={true}>
                        Редактировать карту
                    </Button>
                </div>
            </div>
        </div>
    );
};
