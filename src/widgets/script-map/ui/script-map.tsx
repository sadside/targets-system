import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { useUnit } from 'effector-react';
import {
    Background,
    BackgroundVariant,
    Panel,
    ReactFlow,
    useReactFlow,
} from 'reactflow';
import { Button } from 'shared/ui/components/ui/button.tsx';
import { UseClearMap } from 'shared/utils/hooks';
import { ResizableNode } from 'widgets/editor-map/ui/resizable-node.tsx';
import {
    $reliefItems,
    $targets,
    onNodesChange,
    setNodes,
} from 'widgets/script-map/model/script-map-model.ts';
import { ScriptNode } from 'widgets/script-map/ui/script-node.tsx';
import styles from './script-map.module.scss';

interface StaticMapProps {}

const nodeTypes = { target: ScriptNode, relief: ResizableNode };

export const ScriptMap = ({}: StaticMapProps) => {
    UseClearMap();

    // useEffect(() => {
    //     getAllTargetsQuery.refresh();
    // }, []);

    const [nodes, nodeChangedHandler] = useUnit([
        $targets,
        onNodesChange,
        setNodes,
    ]);

    const reliefItems = useUnit($reliefItems);

    const { zoomIn, zoomOut, getZoom } = useReactFlow();

    const handlePlusClick = () => {
        zoomIn({ duration: 600 });
    };

    const handleMinusClick = () => {
        zoomOut({ duration: 600 });
    };

    const zoom = getZoom();

    return (
        <>
            <div className="text-lg mb-3">
                Масштаб: <span className="font-semibold">{zoom}</span>
            </div>
            <ReactFlow
                nodes={[...nodes, ...reliefItems] || []}
                className={styles.map}
                onNodesChange={nodeChangedHandler}
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
                <Background
                    color="#fff"
                    variant={BackgroundVariant.Dots}
                />

                <div className="absolute bottom-2 right-2 h-20 w-10 flex justify-between">
                    <Panel
                        position="top-right"
                        className={styles.controls}>
                        <div className="absolute flex right-3 gap-3">
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
        </>
    );
};
