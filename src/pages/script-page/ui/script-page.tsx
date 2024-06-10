import { useGate, useUnit } from 'effector-react';
import { BanIcon } from 'lucide-react';
import { scriptPageGate } from 'pages/script-page/model/script-page-model.ts';
import { ReactFlowProvider } from 'reactflow';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from 'shared/ui/components/ui/resizable.tsx';
import { ScriptActions } from 'widgets/script-actions';
import { $selectedScript } from 'widgets/script-actions/model/script-action.ts';
import { ScriptMap } from 'widgets/script-map/ui/script-map.tsx';
import { ScriptTimeline } from 'widgets/script-timeline/ui/script-timeline.tsx';
import styles from './script-page.module.scss';

export const ScriptPage = () => {
    const selectedScript = useUnit($selectedScript);

    useGate(scriptPageGate);

    return (
        <div className={styles.wrapper}>
            <ScriptActions />
            {selectedScript ? (
                <ResizablePanelGroup
                    direction="vertical"
                    className={`border-0 ${styles.panel}`}>
                    <ResizablePanel defaultSize={60}>
                        <ReactFlowProvider>
                            <ScriptMap />
                        </ReactFlowProvider>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel
                        defaultSize={40}
                        minSize={24}
                        className={'pt-7'}>
                        <ScriptTimeline />
                    </ResizablePanel>
                </ResizablePanelGroup>
            ) : (
                <div className="h-80 w-full flex justify-center items-center rounded bg-green">
                    <div className="flex flex-col items-center space-y-3">
                        <div>
                            <BanIcon />
                        </div>
                        <div className="font-semibold">
                            Выберите сценарий для редактирования.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
