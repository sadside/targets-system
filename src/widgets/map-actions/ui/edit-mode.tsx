import { ReliefSelect } from '@/feautures/relief-select';
import { useUnit } from 'effector-react';
import { IconLeft } from 'react-day-picker';
import { Button } from 'shared/ui/components/ui/button.tsx';
import { Select } from 'shared/ui/select/ui/select.tsx';
import {
    mapModeReseted,
    mapSelect,
    targetsForMapSelect,
} from 'widgets/map-actions/model/map-actions.ts';

export const EditMode = () => {
    const goBack = useUnit(mapModeReseted);

    const selectedMap = useUnit(mapSelect.$selectedItem);

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
                        <div className="flex gap-3">
                            <Select
                                model={targetsForMapSelect}
                                placeholder="Выберите мишень"
                                label="Мишени"
                                className="h-11 w-[174px]"
                            />
                            <Button className="h-11 bg-green border-none hover:bg-green">
                                Добавить на карту
                            </Button>
                        </div>
                        <div className="flex gap-3 mt-2">
                            <ReliefSelect className="h-11 w-[174px]" />
                            <Button className="h-11 bg-green border-none hover:bg-green">
                                Добавить на карту
                            </Button>
                        </div>
                        <div>
                            <Button className="h-11 bg-green border-none hover:bg-green">
                                Сохранить изменения
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
