import { ReliefSelect } from '@/feautures/relief-select';
import { $selectedRelief } from '@/feautures/relief-select/model/relief-select.ts';
import { useUnit } from 'effector-react';
import { IconLeft } from 'react-day-picker';
import { Button } from 'shared/ui/components/ui/button.tsx';
import { Input } from 'shared/ui/components/ui/input.tsx';
import { FIGURE_TYPES } from 'widgets/editor-map/model/editor-map-model.ts';
import {
    $mapName,
    mapCreateBtnClicked,
    mapModeReseted,
    mapNameInputChanged,
    postMapQuery,
    reliefAddBtnClicked,
    targetAddBtnClicked,
} from 'widgets/map-actions/model/map-actions.ts';

export const CreateMode = () => {
    const { value, inputValueChanged, addReliefToMap } = useUnit({
        value: $mapName,
        inputValueChanged: mapNameInputChanged,
        addTargetToMap: targetAddBtnClicked,
        addReliefToMap: reliefAddBtnClicked,
    });

    const goBack = useUnit(mapModeReseted);
    const selectedRelief = useUnit($selectedRelief);
    const { pending } = useUnit(postMapQuery);

    return (
        <div className="w-full">
            <h2 className="text-center font-semibold text-[16px] mb-2 w-full">
                Создание новой карты
            </h2>
            <div className="flex items-center justify-between w-full">
                <div className="flex gap-4">
                    <Button size="icon" onClick={goBack}>
                        <IconLeft />
                    </Button>
                    <Input
                        placeholder="Название карты"
                        id="name"
                        value={value}
                        onChange={e =>
                            inputValueChanged(e.target.value)
                        }
                    />
                </div>
                {/*<div className="flex gap-3">*/}
                {/*    <Select*/}
                {/*        model={allTargetsSelect}*/}
                {/*        placeholder="Выберите мишень"*/}
                {/*        label="Мишени"*/}
                {/*        className="h-11 w-[174px]"*/}
                {/*    />*/}
                {/*    <Button*/}
                {/*        className="h-11 bg-green border-none hover:bg-green"*/}
                {/*        onClick={addTargetToMap}>*/}
                {/*        Добавить на карту*/}
                {/*    </Button>*/}
                {/*</div>*/}
                <div className="flex gap-5 mt-2 items-center">
                    <ReliefSelect className="h-11 w-[174px]" />
                    {selectedRelief && (
                        <div className="grid grid-cols-3 gap-3">
                            <div
                                style={{
                                    backgroundColor:
                                        selectedRelief.color,
                                }}
                                className="h-8 w-10 cursor-pointer border border-gray-500"
                                onClick={() =>
                                    addReliefToMap(
                                        FIGURE_TYPES.RECTANGLE,
                                    )
                                }></div>
                            {/*<div*/}
                            {/*    style={{*/}
                            {/*        width: 0,*/}
                            {/*        height: 0,*/}
                            {/*        borderLeft:*/}
                            {/*            '20px solid transparent',*/}
                            {/*        borderRight:*/}
                            {/*            '20px solid transparent',*/}
                            {/*        borderBottom:*/}
                            {/*            '30px solid ' +*/}
                            {/*            selectedRelief.color,*/}
                            {/*    }}*/}
                            {/*    onClick={() =>*/}
                            {/*        addReliefToMap(*/}
                            {/*            FIGURE_TYPES.TRIANGLE,*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*    className="cursor-pointer"></div>*/}

                            <div
                                style={{
                                    backgroundColor:
                                        selectedRelief.color,
                                }}
                                onClick={() =>
                                    addReliefToMap(
                                        FIGURE_TYPES.CIRCLE,
                                    )
                                }
                                className="w-8 h-8 rounded-full cursor-pointer border border-gray-500"></div>
                        </div>
                    )}
                    {/*<Button className="h-11 bg-green border-none hover:bg-green">*/}
                    {/*    Добавить на карту*/}
                    {/*</Button>*/}
                </div>
                <div>
                    <Button
                        className="h-11 bg-green border-none hover:bg-green"
                        // onClick={() => mapCreated()}
                        onClick={() => mapCreateBtnClicked()}
                        disabled={!value || pending}>
                        Создать карту
                    </Button>
                </div>
            </div>
        </div>
    );
};
