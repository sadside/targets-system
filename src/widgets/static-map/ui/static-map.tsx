import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { useUnit } from 'effector-react';
// import { getAllTargetsQuery } from 'entities/target/model/target.ts';
import {
    $allMapObjects,
    $currentScript,
    SCRIPT_STATUSES,
    scriptStarted,
} from 'pages/index-page/model/index-page-model.ts';
import { memo } from 'react';
import {
    Background,
    BackgroundVariant,
    NodeResizer,
    Panel,
    ReactFlow,
    useReactFlow,
} from 'reactflow';
import { TargetNode } from 'shared/ui/components/targets/target-node/target-node.tsx';
import { Button } from 'shared/ui/components/ui/button.tsx';
import { UseClearMap } from 'shared/utils/hooks';
import {
    FIGURE_TYPES,
    ReliefData,
} from 'widgets/editor-map/model/editor-map-model.ts';
import styles from './static-map.module.scss';

interface StaticMapProps {}

interface Props {
    data: ReliefData;
    selected: boolean | undefined;
}

const ResizableNode = memo(({ data, selected }: Props) => {
    let style = {};
    switch (data.figure) {
        case FIGURE_TYPES.RECTANGLE:
            style = {
                backgroundColor: data.color,
            };
            break;
        case FIGURE_TYPES.TRIANGLE:
            style = {
                borderLeft: '50% solid transparent',
                borderRight: '50% solid transparent',
                borderBottom: `100% solid ${data.color}`,
            };
            break;
        case FIGURE_TYPES.CIRCLE:
            style = {
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: data.color,
            };
            break;
        default:
            break;
    }

    return (
        <>
            <NodeResizer
                color="#ff0071"
                isVisible={selected}
                minWidth={100}
                minHeight={30}
            />
            <div
                style={{
                    ...style,
                    width: data.width,
                    height: data.height,
                    padding: 10,
                }}
                className="w-full h-full flex items-center justify-center text-black">
                {data.name}
            </div>
        </>
    );
});

const nodeTypes = { target: TargetNode, relief: ResizableNode };

export const StaticMap = ({}: StaticMapProps) => {
    // const { error, pending } = useUnit(getAllTargetsQuery);

    // const targetsToRender = useUnit($nodesFromTargets);
    // const reliefToRender = useUnit($mapReliefItems);

    const nodes = useUnit($allMapObjects);

    const [currentScript] = useUnit([$currentScript]);

    const startScript = useUnit(scriptStarted);

    UseClearMap();

    const { zoomIn, zoomOut } = useReactFlow();

    const handlePlusClick = () => {
        zoomIn({ duration: 600 });
    };

    const handleMinusClick = () => {
        zoomOut({ duration: 600 });
    };

    // if (pending && !error) {
    //     return (
    //         <div className="w-full h-full flex items-center justify-center">
    //             <Loader className="h-10" />
    //         </div>
    //     );
    // }

    return (
        <ReactFlow
            nodesDraggable={false}
            nodes={nodes ?? []}
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
            <Background
                color="#fff"
                variant={BackgroundVariant.Dots}
            />

            <div className="absolute bottom-2 right-2 h-20 w-96 flex justify-between">
                <Panel
                    position="top-right"
                    className={styles.controls}>
                    <div className="bg-black rounded flex-1 mr-4 p-4 flex justify-between items-center">
                        <div className="flex items-center text-lg font-semibold">
                            {currentScript?.status ||
                                'Сценарий не выбран'}
                        </div>
                        {currentScript?.status ===
                            SCRIPT_STATUSES.STOPPED && (
                            <Button
                                variant="default"
                                className="p-3 bg-green hover:bg-cyan-700 font-bold"
                                onClick={startScript}>
                                Принудительный старт
                            </Button>
                        )}
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
