import {
    Background,
    BackgroundVariant,
    Panel,
    ReactFlow,
    useReactFlow,
} from 'reactflow';
import {Button} from 'shared/ui/components/ui/button.tsx';
import styles from './static-map.module.scss';
import {MinusIcon, PlusIcon} from '@radix-ui/react-icons';
import {useMemo} from 'react';
import {getNodesToRender} from 'shared/utils/getNodesToRender.tsx';
import {useUnit} from 'effector-react';
import {TargetNode} from 'shared/ui/components/targets/target-node/target-node.tsx';
import {UseClearMap} from 'shared/utils/hooks';
import {$targets} from 'entities/target';

interface StaticMapProps {}

const nodeTypes = {customTargetNode: TargetNode};

export const StaticMap = ({}: StaticMapProps) => {
    UseClearMap();

    const targets = useUnit($targets);

    const initialNodes = useMemo(() => {
        if (targets) {
            return getNodesToRender(targets);
        }
    }, [targets]);

    const {zoomIn, zoomOut} = useReactFlow();

    const handlePlusClick = () => {
        zoomIn({duration: 600});
    };

    const handleMinusClick = () => {
        zoomOut({duration: 600});
    };

    return (
        <ReactFlow
            nodesDraggable={false}
            nodes={initialNodes || []}
            className={styles.map}
            nodeTypes={nodeTypes}
            minZoom={1}
            translateExtent={[
                [0, 0],
                [10000, 10000],
            ]}
            nodeExtent={[
                [0, 0],
                [10000, 10000],
            ]}>
            <Background color="#fff" variant={BackgroundVariant.Dots} />

            <div className="absolute bottom-2 right-2 h-20 w-96 flex justify-between">
                <Panel position="top-right" className={styles.controls}>
                    <div className="bg-black rounded flex-1 mr-4 p-4 flex justify-between items-center">
                        <div className="flex items-center text-sm">
                            Ожидание датчика
                        </div>
                        <Button
                            variant="default"
                            className="p-3 bg-green hover:bg-cyan-700 font-bold">
                            Принудительный старт
                        </Button>
                    </div>
                    <div className={styles.controlsBtns}>
                        <Button
                            variant="default"
                            size="icon"
                            className=" bg-green font-bold h-8"
                            onClick={handlePlusClick}>
                            <PlusIcon />
                        </Button>
                        <Button
                            variant="default"
                            size="icon"
                            className=" bg-green font-bold h-8"
                            onClick={handleMinusClick}>
                            <MinusIcon />
                        </Button>
                    </div>
                </Panel>
            </div>
        </ReactFlow>
    );
};
