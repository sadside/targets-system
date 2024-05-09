import styles from 'pages/result-page/ui/result-page.module.scss';
import {MapActions} from '@/feautures/map-actions/ui/map-actions.tsx';
import {StaticMap} from 'widgets/static-map';
import {ReactFlowProvider} from 'reactflow';

export const MapsPage = () => {
    return (
        <div className={styles.wrapper}>
            <MapActions />
            <div className="h-[600px] mt-5">
                <ReactFlowProvider>
                    <StaticMap />
                </ReactFlowProvider>
            </div>
        </div>
    );
};
