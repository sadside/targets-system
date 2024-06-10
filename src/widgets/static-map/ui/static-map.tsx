import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { useGate, useUnit } from 'effector-react';
import { getAllTargetsQuery } from 'entities/target/model/target.ts';
import {
    $nodesFromTargets,
    indexGate,
} from 'pages/index-page/model/index-page-model.ts';
import {
    Background,
    BackgroundVariant,
    Panel,
    ReactFlow,
    useReactFlow,
} from 'reactflow';
import { TargetNode } from 'shared/ui/components/targets/target-node/target-node.tsx';
import { Button } from 'shared/ui/components/ui/button.tsx';
import { Loader } from 'shared/ui/loader/loader.tsx';
import { UseClearMap } from 'shared/utils/hooks';
import styles from './static-map.module.scss';

interface StaticMapProps {}

const nodeTypes = { TargetNode };

export const StaticMap = ({}: StaticMapProps) => {
    const { error, pending } = useUnit(getAllTargetsQuery);

    useGate(indexGate);

    const targetsToRender = useUnit($nodesFromTargets);

    UseClearMap();

    const { zoomIn, zoomOut } = useReactFlow();

    const handlePlusClick = () => {
        zoomIn({ duration: 600 });
    };

    const handleMinusClick = () => {
        zoomOut({ duration: 600 });
    };

    if (pending && !error) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader className="h-10" />
            </div>
        );
    }

    return (
        <ReactFlow
            nodesDraggable={false}
            nodes={targetsToRender || []}
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
