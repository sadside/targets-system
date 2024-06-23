import { useNavigate } from '@tanstack/react-router';
import { useGate, useUnit } from 'effector-react';
import { BanIcon } from 'lucide-react';
import {
    $currentScript,
    SCRIPT_STATUSES,
} from 'pages/index-page/model/index-page-model.ts';
import { scriptPageGate } from 'pages/script-page/model/script-page-model.ts';
import { useEffect, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from 'shared/ui/components/ui/resizable.tsx';
import { ScriptActions } from 'widgets/script-actions';
import { selectScriptModel } from 'widgets/script-actions/model/script-action.ts';
import { ScriptMap } from 'widgets/script-map/ui/script-map.tsx';
import { DEFAULT_TIMEFRAME } from 'widgets/script-timeline/model/script-timeline.ts';
import { ScriptTimeline } from 'widgets/script-timeline/ui/script-timeline.tsx';
import styles from './script-page.module.scss';

export const ScriptPage = () => {
    const selectedScript = useUnit(selectScriptModel.$selectedItem);
    const [timeframe, setTimeframe] = useState(DEFAULT_TIMEFRAME);
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

    useGate(scriptPageGate);

    return (
        <div className={styles.wrapper}>
            <ScriptActions />
            {selectedScript ? (
                <>
                    <ResizablePanelGroup
                        direction="vertical"
                        className={`border-0 ${styles.panel}`}>
                        <ResizablePanel defaultSize={50}>
                            <ReactFlowProvider>
                                <ScriptMap />
                            </ReactFlowProvider>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel
                            defaultSize={50}
                            minSize={24}
                            className={'pt-7'}>
                            <div>
                                <ScriptTimeline
                                    timeframe={timeframe}
                                    setTimeframe={setTimeframe}
                                />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                    {/*<ControlPanel setTimeframe={setTimeframe} />*/}
                </>
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
