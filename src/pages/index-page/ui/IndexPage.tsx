import {
    ArrowDownIcon,
    ArrowUpIcon,
    ReloadIcon,
} from '@radix-ui/react-icons';
import { useGate, useUnit } from 'effector-react';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { EditTargetModal } from 'pages/index-page/Target/edit-target-modal.tsx';
import { TargetsList } from 'pages/index-page/TargetsList/TargetsList.tsx';
import {
    $currentScript,
    SCRIPT_STATUSES,
    downAllTargets,
    getCurrentScript,
    indexGate,
    postSelectedScript,
    scriptContinued,
    scriptPaused,
    scriptRestarted,
    scriptStarted,
    scriptStopped,
    scriptSubmitted,
    selectMapModel,
    selectScriptModel,
    targetsReloaded,
    upAllTargets,
} from 'pages/index-page/model/index-page-model.ts';
import { ReactFlowProvider } from 'reactflow';
import { Button } from 'shared/ui/components/ui/button.tsx';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from 'shared/ui/components/ui/resizable.tsx';
import { Loader } from 'shared/ui/loader/loader.tsx';
import { Select } from 'shared/ui/select/ui/select.tsx';
import { StaticMap } from 'widgets/static-map';
import '../model/index-page-model.ts';
import styles from './IndexPage.module.scss';

export const IndexPage = () => {
    const [currentScript, reloadTargets] = useUnit([
        $currentScript,
        targetsReloaded,
    ]);
    const { pending } = useUnit(getCurrentScript);
    const { pending: loadingScript } = useUnit(postSelectedScript);
    const { start: downTargets } = useUnit(downAllTargets);
    const { start: upTargets } = useUnit(upAllTargets);

    useGate(indexGate);

    const [stopScript, startScript, pauseScript, continueScript] =
        useUnit([
            scriptStopped,
            scriptStarted,
            scriptPaused,
            scriptContinued,
        ]);

    const scriptSent = useUnit(scriptSubmitted);

    const handleStartClick = () => {
        if (currentScript?.status === SCRIPT_STATUSES.STARTED) {
            stopScript();
        }
        if (currentScript?.status === SCRIPT_STATUSES.STOPPED) {
            startScript();
        }
    };

    const handlePauseClick = () => {
        if (currentScript?.status === SCRIPT_STATUSES.PAUSED) {
            continueScript();
        } else {
            pauseScript();
        }
    };

    const timerValue =
        currentScript?.currentTime && currentScript.startTime
            ? currentScript.currentTime.getTime() -
              currentScript.startTime.getTime()
            : 0;

    const timerDate = new Date(timerValue);

    return (
        <div className={styles.wrapper}>
            <EditTargetModal />
            <ResizablePanelGroup
                direction="horizontal"
                className="bg-background-button-outline">
                <ResizablePanel
                    maxSize={45}
                    minSize={20}
                    defaultSize={25}>
                    <div className={styles.leftBlock}>
                        <div className="flex justify-between mx-4 my-6">
                            <Button
                                variant="default"
                                className="p-3 hover:bg-green"
                                onClick={reloadTargets}>
                                <ReloadIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="default"
                                className="p-3 hover:bg-green"
                                onClick={downTargets}>
                                <ArrowDownIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="default"
                                className="p-3 hover:bg-green"
                                onClick={upTargets}>
                                <ArrowUpIcon className="h-5 w-5" />
                            </Button>
                        </div>
                        <TargetsList />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle className="bg-primary" />
                <ResizablePanel>
                    {pending || loadingScript ? (
                        <div className="flex h-full w-full justify-center items-center">
                            <Loader className="h-10 w-10" />
                        </div>
                    ) : null}
                    {currentScript && (
                        <>
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
                                        <Select
                                            model={selectScriptModel}
                                            className="w-[200px] h-10"
                                            placeholder="Выбор сценария"
                                            label="Сценарии"
                                        />
                                        <Select
                                            model={selectMapModel}
                                            className="w-[200px] h-10"
                                            placeholder="Выбор карты"
                                            label="Карты"
                                        />
                                        <Button
                                            variant="default"
                                            size="icon"
                                            className=" bg-green hover:bg-cyan-700 font-bold h-10"
                                            onClick={() =>
                                                scriptRestarted()
                                            }>
                                            R
                                        </Button>
                                        <Button
                                            variant="default"
                                            className=" bg-green hover:bg-cyan-700 font-bold h-10"
                                            onClick={handleStartClick}
                                            disabled={
                                                currentScript?.status ===
                                                SCRIPT_STATUSES.PAUSED
                                            }>
                                            {currentScript?.status ===
                                            SCRIPT_STATUSES.STARTED
                                                ? 'Завершить сценарий'
                                                : 'Запустить сценарий'}
                                        </Button>
                                        <Button
                                            variant="default"
                                            size="icon"
                                            className=" bg-green hover:bg-cyan-700 font-bold h-10"
                                            onClick={handlePauseClick}
                                            disabled={
                                                !(
                                                    currentScript?.status ===
                                                        SCRIPT_STATUSES.STARTED ||
                                                    currentScript?.status ===
                                                        SCRIPT_STATUSES.PAUSED
                                                )
                                            }>
                                            {currentScript?.status ===
                                            SCRIPT_STATUSES.PAUSED ? (
                                                <PlayIcon />
                                            ) : (
                                                <PauseIcon />
                                            )}
                                        </Button>
                                    </div>
                                    <div className="ml-6 w-72">
                                        <div className="flex justify-between">
                                            <div>Текущее время:</div>
                                            <div>
                                                {timerDate.getHours() -
                                                    7}
                                                :
                                                {timerDate.getMinutes()}
                                                :
                                                {timerDate.getSeconds()}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                Максимальное время:
                                            </div>
                                            <div>00:00:00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {!currentScript && !pending && !loadingScript ? (
                        <div className="flex h-full w-full justify-center items-center">
                            <div className="text-xl my-5 font-semibold bg-primary rounded p-3 flex gap-5 items-center">
                                <h1>
                                    Активный сценарий не выбран,{' '}
                                    <br />
                                    выберите активный сценарий для
                                    запуска.
                                </h1>
                                <Select
                                    model={selectScriptModel}
                                    className="w-[200px] h-10"
                                    placeholder="Выбор сценария"
                                    label="Сценарии"
                                />
                                <Button
                                    className="h-11 bg-green border-none hover:bg-green"
                                    onClick={scriptSent}>
                                    Загрузить
                                </Button>
                            </div>
                        </div>
                    ) : null}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};
