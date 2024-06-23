import { useUnit } from 'effector-react';
import {
    $editModalVisible,
    $sensorSensitivity,
    followTheScript,
    getTargetById,
    isHeater,
    isImitatesFire,
    isIndicatesGoals,
    isMotionSensor,
    modalVisibleChanged,
    selectTargetGroupModel,
    selectTargetMusicModel,
    selectTargetTypeModel,
    sensorSensitivityValueChanged,
    shotsToDestroyInput,
    targetSaveBtnClicked,
    useGlonass,
} from 'pages/index-page/model/edit-target-modal.ts';
import { CustomCheckbox } from 'shared/ui/components/checkbox';
import { NumberPicker } from 'shared/ui/components/number-picker';
import { Button } from 'shared/ui/components/ui/button.tsx';
import { CounterInput } from 'shared/ui/components/ui/counter-input.tsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from 'shared/ui/components/ui/dialog.tsx';
import { Loader } from 'shared/ui/loader/loader.tsx';
import { Select } from 'shared/ui/select/ui/select.tsx';

interface Props {}

export const EditTargetModal = ({}: Props) => {
    const [isVisible, setVisible] = useUnit([
        $editModalVisible,
        modalVisibleChanged,
    ]);

    const { pending, data: target } = useUnit(getTargetById);

    const sensorSensitivity = useUnit($sensorSensitivity);

    const isHeaterCheckbox = useUnit(isHeater.$value);
    const isImitatesFireCheckbox = useUnit(isImitatesFire.$value);
    const useGlonassCheckbox = useUnit(useGlonass.$value);
    const isIndicatesGoalsCheckbox = useUnit(isIndicatesGoals.$value);
    const isMotionSensorCheckbox = useUnit(isMotionSensor.$value);
    const followTheScriptCheckbox = useUnit(followTheScript.$value);

    const shotsToDestroyValue = useUnit(shotsToDestroyInput.$value);

    return (
        <Dialog
            open={isVisible}
            onOpenChange={state => setVisible(state)}>
            <DialogContent className="bg-sidebarBg border-0 text-lg">
                {pending || !target ? (
                    <Loader />
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-xl">
                                Информация и редактирование мишени.
                            </DialogTitle>
                            <DialogDescription className="text-lg">
                                При изменении параметров мишени, она
                                будет изменена глобально во всех
                                сценариях.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="text-lg">
                            <div className="flex justify-between items-center">
                                <span>Номер мишени:</span>{' '}
                                <span className="w-[300px] font-bold text-xl">
                                    {target.id}
                                </span>
                            </div>
                            <div className="flex gap-4 items-center mb-4 justify-between">
                                <div className="text-nowrap">
                                    Тип мишени:{' '}
                                </div>
                                <Select
                                    model={selectTargetTypeModel}
                                    className="h-10 my-3 w-[300px]"
                                    placeholder="Тип мишени"
                                    label="Типы"
                                />
                            </div>
                            <div className="flex gap-4 items-center mb-4 justify-between">
                                <div className="text-nowrap">
                                    Группа мишени:{' '}
                                </div>
                                <Select
                                    model={selectTargetGroupModel}
                                    className="h-10 my-3 w-[300px]"
                                    placeholder="Группа мишени"
                                    label="Группы"
                                />
                            </div>
                            <div className="flex gap-4 items-center mb-4 justify-between">
                                <div className="text-nowrap">
                                    Звук мишени:{' '}
                                </div>
                                <Select
                                    model={selectTargetMusicModel}
                                    className="h-10 my-3 w-[300px]"
                                    placeholder="Звук"
                                    label="Звуки"
                                />
                            </div>
                            <div className="flex flex-col justify-between space-y-2">
                                <CounterInput
                                    label="Выстрелов на поражение:"
                                    value={shotsToDestroyValue}
                                    onDecrement={
                                        shotsToDestroyInput.decremented
                                    }
                                    onIncrement={
                                        shotsToDestroyInput.incremented
                                    }
                                    handleChange={
                                        shotsToDestroyInput.changed
                                    }
                                    className="mb-4"
                                />
                            </div>
                            <div className="mb-4">
                                <NumberPicker
                                    value={sensorSensitivity}
                                    handleChange={
                                        sensorSensitivityValueChanged
                                    }
                                    label="Чувствительность датчика: "
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <CustomCheckbox
                                    label="Нагреватель"
                                    checked={isHeaterCheckbox}
                                    handleChange={isHeater.changed}
                                />
                                <CustomCheckbox
                                    label="Имитация огня противника"
                                    checked={isImitatesFireCheckbox}
                                    handleChange={
                                        isImitatesFire.changed
                                    }
                                />
                                <CustomCheckbox
                                    label="Указать цели"
                                    checked={isIndicatesGoalsCheckbox}
                                    handleChange={
                                        isIndicatesGoals.changed
                                    }
                                />
                                <CustomCheckbox
                                    label="Датчик движения"
                                    checked={isMotionSensorCheckbox}
                                    handleChange={
                                        isMotionSensor.changed
                                    }
                                />
                                <CustomCheckbox
                                    label="Использовать ГЛОНАСС"
                                    checked={useGlonassCheckbox}
                                    handleChange={useGlonass.changed}
                                />
                                <CustomCheckbox
                                    label="Cледовать сценарию после поражения"
                                    checked={followTheScriptCheckbox}
                                    handleChange={
                                        followTheScript.changed
                                    }
                                />
                            </div>
                            <div className="flex mt-5 justify-between gap-5">
                                <Button
                                    className="w-full bg-red-500"
                                    onClick={() => setVisible(false)}>
                                    Отмена
                                </Button>
                                <Button
                                    className="w-full bg-green"
                                    onClick={() =>
                                        targetSaveBtnClicked()
                                    }>
                                    Сохранить
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};
