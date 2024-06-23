import { useUnit } from 'effector-react';
import {
    $mapEditMode,
    MAP_EDIT_MODE,
    mapSelect,
} from 'widgets/map-actions/model/map-actions.ts';
import { CreateMode } from 'widgets/map-actions/ui/create-mode.tsx';
import { ModeNotSelected } from 'widgets/map-actions/ui/mode-not-selected.tsx';

export const MapActions = () => {
    const [mapEditMode] = useUnit([
        $mapEditMode,
        mapSelect.$selectedItem,
    ]);

    return (
        <div className="rounded bg-primary flex items-center p-4 justify-between">
            {!mapEditMode && <ModeNotSelected />}
            {mapEditMode == MAP_EDIT_MODE.CREATE && <CreateMode />}
            {/*{mapEditMode == MAP_EDIT_MODE.EDIT && <EditMode />}*/}
        </div>
    );
};
