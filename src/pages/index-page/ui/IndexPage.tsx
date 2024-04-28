import styles from './IndexPage.module.scss';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from 'shared/ui/components/ui/resizable.tsx';
import {Button} from 'shared/ui/components/ui/button.tsx';
import {
    ArrowDownIcon,
    ArrowUpIcon,
    PauseIcon,
    ReloadIcon,
} from '@radix-ui/react-icons';
import {TargetsList} from 'pages/index-page/TargetsList/TargetsList.tsx';
import {ReactFlowProvider} from 'reactflow';
import {StaticMap} from 'widgets/static-map';

export const IndexPage = () => {
    return (
        <div className={styles.wrapper}>
            <ResizablePanelGroup
                direction="horizontal"
                className="bg-background-button-outline">
                <ResizablePanel maxSize={45} minSize={20} defaultSize={25}>
                    <div className={styles.leftBlock}>
                        <div className="flex justify-between mx-4 my-6">
                            <Button
                                variant="default"
                                className="p-3 hover:bg-green">
                                <ReloadIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="default"
                                className="p-3 hover:bg-green">
                                <ArrowDownIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="default"
                                className="p-3 hover:bg-green">
                                <ArrowUpIcon className="h-5 w-5" />
                            </Button>
                        </div>
                        <TargetsList />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle className="bg-primary" />
                <ResizablePanel>
                    <div className="p-7">
                        <h1 className="text-lg font-bold mb-6">
                            Карта выполнения сценария
                        </h1>
                        <div className={styles.mapWrapper}>
                            <ReactFlowProvider>
                                <StaticMap />
                            </ReactFlowProvider>
                        </div>
                        <div className="h-20 rounded w-full bg-primary mt-6 flex p-3 items-center">
                            <div className="flex justify-between flex-1">
                                <Button
                                    variant="default"
                                    className="bg-green hover:bg-cyan-700 font-bold">
                                    Выбор карты
                                </Button>
                                <Button
                                    variant="default"
                                    className="bg-green hover:bg-cyan-700 font-bold">
                                    Выбор сценария
                                </Button>
                                <Button
                                    variant="default"
                                    size="icon"
                                    className=" bg-green hover:bg-cyan-700 font-bold h-10">
                                    R
                                </Button>
                                <Button
                                    variant="default"
                                    size="icon"
                                    className=" bg-green hover:bg-cyan-700 font-bold h-10">
                                    {'>'}
                                </Button>
                                <Button
                                    variant="default"
                                    size="icon"
                                    className=" bg-green hover:bg-cyan-700 font-bold h-10">
                                    <PauseIcon />
                                </Button>
                            </div>
                            <div className="ml-6 w-72">
                                <div className="flex justify-between">
                                    <div>Текущее время:</div>
                                    <div>00:00:00</div>
                                </div>
                                <div className="flex justify-between">
                                    <div>Максимальное время:</div>
                                    <div>00:00:00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};
