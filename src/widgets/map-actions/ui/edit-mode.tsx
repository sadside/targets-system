import { ReliefSelect } from '@/feautures/relief-select';
import { $selectedRelief } from '@/feautures/relief-select/model/relief-select.ts';
import { useUnit } from 'effector-react';
import { IconLeft } from 'react-day-picker';
import { Button } from 'shared/ui/components/ui/button.tsx';
import { Select } from 'shared/ui/select/ui/select.tsx';
import { FIGURE_TYPES } from 'widgets/editor-map/model/editor-map-model.ts';
import {
    mapModeReseted,
    mapSaved,
    mapSelect,
    reliefAddBtnClicked,
} from 'widgets/map-actions/model/map-actions.ts';

export const EditMode = () => {
    const goBack = useUnit(mapModeReseted);

    const selectedMap = useUnit(mapSelect.$selectedItem);
    const selectedRelief = useUnit($selectedRelief);

    const { addReliefToMap } = useUnit({
        addReliefToMap: reliefAddBtnClicked,
    });

    return (
        <div className="w-full">
            <h2 className="text-center font-semibold text-[16px] mb-2 w-full">
                Редактирование карты
            </h2>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-between gap-4">
                    <Button size="icon" onClick={goBack}>
                        <IconLeft />
                    </Button>
                    <Select
                        model={mapSelect}
                        placeholder="Выберите карту для редактировния"
                        label="Карты"
                        className="h-11"
                    />
                </div>
                {selectedMap && (
                    <>
                        {/*<div className="flex gap-3">*/}
                        {/*    <Select*/}
                        {/*        model={targetsForMapSelect}*/}
                        {/*        placeholder="Выберите мишень"*/}
                        {/*        label="Мишени"*/}
                        {/*        className="h-11 w-[174px]"*/}
                        {/*    />*/}
                        {/*    <Button className="h-11 bg-green border-none hover:bg-green">*/}
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
                        </div>
                        <div>
                            <Button
                                className="h-11 bg-green border-none hover:bg-green"
                                onClick={() => mapSaved()}>
                                Сохранить изменения
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
