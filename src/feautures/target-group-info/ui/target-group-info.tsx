// import styles from './target-group-info.module.scss';
import {CounterInput} from 'shared/ui/components/ui/counter-input.tsx';
import {NumberPicker} from 'shared/ui/components/number-picker';
import {CustomCheckbox} from 'shared/ui/components/checkbox';
import {useUnit} from 'effector-react';
import {
    $sensorSensitivity,
    followTheScript,
    isHeater,
    isImitatesFire,
    isIndicatesGoals,
    isMotionSensor,
    sensorSensitivityValueChanged,
    shotsToDestroyInput,
    // timeToDestroyInput,
    useGlonass,
} from '@/feautures/target-group-info';

interface TargetGroupInfoProps {}

export const TargetGroupInfo = ({}: TargetGroupInfoProps) => {
    const shotsToDestroyValue = useUnit(shotsToDestroyInput.$value);
    // const timeToDestroyValue = useUnit(timeToDestroyInput.$value);
    const sensorSensitivity = useUnit($sensorSensitivity);

    const isHeaterCheckbox = useUnit(isHeater.$value);
    const isImitatesFireCheckbox = useUnit(isImitatesFire.$value);
    const useGlonassCheckbox = useUnit(useGlonass.$value);
    const isIndicatesGoalsCheckbox = useUnit(isIndicatesGoals.$value);
    const isMotionSensorCheckbox = useUnit(isMotionSensor.$value);
    const followTheScriptCheckbox = useUnit(followTheScript.$value);

    return (
        <div className="mb-12">
            <div className="flex justify-around pt-8">
                <div className="flex flex-col justify-center space-y-8">
                    <CounterInput
                        label="Выстрелов на поражение:"
                        value={shotsToDestroyValue}
                        onDecrement={shotsToDestroyInput.decremented}
                        onIncrement={shotsToDestroyInput.incremented}
                        handleChange={shotsToDestroyInput.changed}
                        className="mb-4"
                    />
                    {/*<CounterInput*/}
                    {/*    label="Время на поражение:"*/}
                    {/*    value={timeToDestroyValue}*/}
                    {/*    onDecrement={timeToDestroyInput.decremented}*/}
                    {/*    onIncrement={timeToDestroyInput.incremented}*/}
                    {/*    handleChange={timeToDestroyInput.changed}*/}
                    {/*/>*/}
                </div>
                <div className="flex flex-col justify-between space-y-8">
                    <NumberPicker
                        value={sensorSensitivity}
                        handleChange={sensorSensitivityValueChanged}
                        label="Чувствительность датчика: "
                    />
                    <CustomCheckbox
                        label="Нагреватель"
                        checked={isHeaterCheckbox}
                        handleChange={isHeater.changed}
                    />
                    <CustomCheckbox
                        label="Имитация огня противника"
                        checked={isImitatesFireCheckbox}
                        handleChange={isImitatesFire.changed}
                    />
                    <CustomCheckbox
                        label="Указать цели"
                        checked={isIndicatesGoalsCheckbox}
                        handleChange={isIndicatesGoals.changed}
                    />
                    <CustomCheckbox
                        label="Датчик движения"
                        checked={isMotionSensorCheckbox}
                        handleChange={isMotionSensor.changed}
                    />
                    <CustomCheckbox
                        label="Использовать ГЛОНАСС"
                        checked={useGlonassCheckbox}
                        handleChange={useGlonass.changed}
                    />
                    <CustomCheckbox
                        label="Cледовать сценарию после поражения"
                        checked={followTheScriptCheckbox}
                        handleChange={followTheScript.changed}
                    />
                </div>
            </div>
        </div>
    );
};
