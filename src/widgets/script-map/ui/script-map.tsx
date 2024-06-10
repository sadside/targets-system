import { Target } from 'entities/target';
import { UseClearMap } from 'shared/utils/hooks';

interface StaticMapProps {}

export const targetsMock: Target[] = [
    {
        type: 'TargetNode',
        id: 1,
        position: { x: 0, y: 0 },
        data: {
            type: '24',
            name: 'Дуб2',
            group: null,
        },
    },
    {
        id: 2,
        type: 'TargetNode',
        position: { x: 550, y: 700 },
        data: {
            type: '24',
            name: 'Т-34',
            group: {
                name: 'Танки',
                id: 1,
            },
        },
    },
    {
        id: 3,
        type: 'TargetNode',
        position: { x: 250, y: 400 },
        data: {
            type: '24',
            name: 'Т-224',
            group: {
                name: 'Танки',
                id: 1,
            },
        },
    },
    {
        id: 4,
        type: 'TargetNode',
        position: { x: 350, y: 100 },
        data: {
            type: '24',
            name: 'Т-44',
            group: null,
        },
    },
    {
        id: 5,
        type: 'TargetNode',
        position: { x: 550, y: 700 },
        data: {
            type: '24',
            name: 'БОИНГ',
            group: {
                name: 'Самолеты',
                id: 2,
            },
        },
    },
    {
        id: 6,
        type: 'TargetNode',
        position: { x: 444, y: 333 },
        data: {
            type: '24',
            name: 'СУ-32',
            group: {
                name: 'Самолеты',
                id: 2,
            },
        },
    },
    {
        id: 7,
        type: 'TargetNode',
        position: { x: 600, y: 100 },
        data: {
            type: '24',
            name: 'Крейсер',
            group: {
                name: 'Корабли',
                id: 3,
            },
        },
    },
    {
        id: 8,
        type: 'TargetNode',
        position: { x: 700, y: 700 },
        data: {
            type: '24',
            name: 'Уазик)',
            group: {
                name: 'Транспортеры',
                id: 5,
            },
        },
    },
    {
        id: 9,
        type: 'TargetNode',
        position: { x: 500, y: 500 },
        data: {
            type: '24',
            name: 'Беспилотник',
            group: {
                name: 'Дроны',
                id: 4,
            },
        },
    },
];

// const nodeTypes = { TargetNode };

export const ScriptMap = ({}: StaticMapProps) => {
    UseClearMap();

    // const targets = useUnit($targets);

    // const initialNodes = useMemo(() => {
    //     if (targets) {
    //         return getNodesToRender(targets);
    //     }
    // }, [targets]);

    // const [nodes, _, onNodesChange] = useNodesState(
    //     getNodesToRender(targetsMock),
    // );

    // const { zoomIn, zoomOut, getZoom } = useReactFlow();

    // const handlePlusClick = () => {
    //     zoomIn({ duration: 600 });
    // };
    //
    // const handleMinusClick = () => {
    //     zoomOut({ duration: 600 });
    // };

    // const zoom = getZoom();

    return (
        <>
            <div className="text-lg mb-3">
                {/*Масштаб: <span className="font-semibold">{zoom}</span>*/}
            </div>
            {/*<ReactFlow*/}
            {/*    nodes={nodes || []}*/}
            {/*    className={styles.map}*/}
            {/*    onNodesChange={onNodesChange}*/}
            {/*    nodeTypes={nodeTypes}*/}
            {/*    minZoom={1}*/}
            {/*    translateExtent={[*/}
            {/*        [0, 0],*/}
            {/*        [10000, 10000],*/}
            {/*    ]}*/}
            {/*    nodeExtent={[*/}
            {/*        [0, 0],*/}
            {/*        [10000, 10000],*/}
            {/*    ]}>*/}
            {/*    <Background*/}
            {/*        color="#fff"*/}
            {/*        variant={BackgroundVariant.Dots}*/}
            {/*    />*/}

            {/*    <div className="absolute bottom-2 right-2 h-20 w-10 flex justify-between">*/}
            {/*        <Panel*/}
            {/*            position="top-right"*/}
            {/*            className={styles.controls}>*/}
            {/*            <div className="absolute flex right-3 gap-3">*/}
            {/*                <Button*/}
            {/*                    variant="default"*/}
            {/*                    size="icon"*/}
            {/*                    className=" bg-green font-bold h-8"*/}
            {/*                    onClick={handlePlusClick}>*/}
            {/*                    <PlusIcon />*/}
            {/*                </Button>*/}
            {/*                <Button*/}
            {/*                    variant="default"*/}
            {/*                    size="icon"*/}
            {/*                    className=" bg-green font-bold h-8"*/}
            {/*                    onClick={handleMinusClick}>*/}
            {/*                    <MinusIcon />*/}
            {/*                </Button>*/}
            {/*            </div>*/}
            {/*        </Panel>*/}
            {/*    </div>*/}
            {/*</ReactFlow>*/}
        </>
    );
};
