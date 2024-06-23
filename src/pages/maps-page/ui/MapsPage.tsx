import { useNavigate } from '@tanstack/react-router';
import { useUnit } from 'effector-react';
import {
    $currentScript,
    SCRIPT_STATUSES,
} from 'pages/index-page/model/index-page-model.ts';
import styles from 'pages/result-page/ui/result-page.module.scss';
import { useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { EditorMap } from 'widgets/editor-map/ui/editor-map.tsx';
import { $mapEditMode } from 'widgets/map-actions/model/map-actions.ts';
import { MapActions } from 'widgets/map-actions/ui/map-actions';

export const MapsPage = () => {
    const activeMap = useUnit($mapEditMode);

    const currentScript = useUnit($currentScript);
    const navigate = useNavigate();

    useEffect(() => {
        if (
            currentScript &&
            currentScript?.status !== SCRIPT_STATUSES.STOPPED
        ) {
            navigate({
                to: '/',
            });
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <MapActions />
            {activeMap !== null && (
                <div className="h-[600px] mt-5">
                    <ReactFlowProvider>
                        <EditorMap />
                    </ReactFlowProvider>
                </div>
            )}
        </div>
    );
};
