import {MinusIcon, PlusIcon} from '@radix-ui/react-icons';
import {
    Background,
    BackgroundVariant,
    Panel,
    ReactFlow,
    useNodesState,
    useReactFlow,
} from 'reactflow';
import {Target} from 'entities/target';
import {TargetNode} from 'shared/ui/components/targets/target-node/target-node.tsx';
import {Button} from 'shared/ui/components/ui/button.tsx';
import {UseClearMap} from 'shared/utils/hooks';
import styles from './script-map.module.scss';
import {getNodesToRender} from 'shared/utils/getNodesToRender.tsx';
import {targets} from 'pages/index-page/mock.ts';

interface StaticMapProps {}

export const targetsMock: Target[] = [
    {
        id: 1,
        position: {x: 0, y: 0},
        type: '24',
        name: 'Дуб2',
        group: null,
    },
    {
        id: 2,
        type: '24',
        name: 'Т-34',
        position: {x: 550, y: 700},
        group: {
            name: 'Танки',
            id: 1,
        },
    },
    {
        id: 3,
        type: '24',
        name: 'Т-224',
        position: {x: 250, y: 400},
        group: {
            name: 'Танки',
            id: 1,
        },
    },
    {
        id: 4,
        type: '24',
        name: 'Т-44',
        position: {x: 350, y: 100},
        group: null,
    },
    {
        id: 5,
        type: '24',
        name: 'БОИНГ',
        position: {x: 550, y: 700},
        group: {
            name: 'Самолеты',
            id: 2,
        },
    },
    {
        id: 6,
        type: '24',
        name: 'СУ-32',
        position: {x: 444, y: 333},
        group: {
            name: 'Самолеты',
            id: 2,
        },
    },
    {
        id: 7,
        type: '24',
        name: 'Крейсер',
        position: {x: 600, y: 100},
        group: {
            name: 'Корабли',
            id: 3,
        },
    },
    {
        id: 8,
        type: '24',
        name: 'Уазик)',
        position: {x: 700, y: 700},
        group: {
            name: 'Транспортеры',
            id: 5,
        },
    },
    {
        id: 9,
        type: '24',
        name: 'Беспилотник',
        position: {x: 500, y: 500},
        group: {
            name: 'Дроны',
            id: 4,
        },
    },
    {
        id: 2,
        type: '24',
        name: 'Бейби уазик)',
        position: {x: 800, y: 700},
        group: {
            name: 'Транспортеры',
            id: 5,
        },
    },
];

const nodeTypes = {customTargetNode: TargetNode};

export const ScriptMap = ({}: StaticMapProps) => {
    UseClearMap();

    // const targets = useUnit($targets);

    // const initialNodes = useMemo(() => {
    //     if (targets) {
    //         return getNodesToRender(targets);
    //     }
    // }, [targets]);

    const [nodes, setNodes, onNodesChange] = useNodesState(
        getNodesToRender(targetsMock)
    );

    const {zoomIn, zoomOut, getZoom} = useReactFlow();

    const handlePlusClick = () => {
        zoomIn({duration: 600});
    };

    const handleMinusClick = () => {
        zoomOut({duration: 600});
    };

    const zoom = getZoom();

    return (
        <>
            <div className="text-lg mb-3">
                Масштаб: <span className="font-semibold">{zoom}</span>
            </div>
            <ReactFlow
                nodes={nodes || []}
                className={styles.map}
                onNodesChange={onNodesChange}
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

                <div className="absolute bottom-2 right-2 h-20 w-10 flex justify-between">
                    <Panel position="top-right" className={styles.controls}>
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
