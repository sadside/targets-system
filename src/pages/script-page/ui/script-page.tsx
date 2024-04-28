import {ReactFlowProvider} from 'reactflow';
import {ScriptMap} from 'widgets/script-map/ui/script-map.tsx';
import {ScriptTimeline} from 'widgets/script-timeline/ui/script-timeline.tsx';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from 'shared/ui/components/ui/resizable.tsx';
import styles from './script-page.module.scss';
import {ScriptActions} from '@/feautures/script-actions';

export const ScriptPage = () => {
    return (
        <div className={styles.wrapper}>
            <ScriptActions />
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
            {/*<div className={styles.mapWrapper}>*/}
            {/*</div>*/}
        </div>
    );
};
