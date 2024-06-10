import { useUnit } from 'effector-react';
import styles from 'pages/result-page/ui/result-page.module.scss';
import { ReactFlowProvider } from 'reactflow';
import { $activeEditorMap } from 'widgets/editor-map/model/editor-map-model.ts';
import { EditorMap } from 'widgets/editor-map/ui/editor-map.tsx';
import { MapActions } from 'widgets/map-actions/ui/map-actions';

export const MapsPage = () => {
    const activeMap = useUnit($activeEditorMap);

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
