// interface Props {}

import Compact from '@uiw/react-color-compact';
import {useState} from 'react';
import {Button} from 'shared/ui/components/ui/button.tsx';
import {Select} from 'shared/ui/select/ui/select.tsx';
import {
    targetSelect,
    terrainElementSelect,
} from '@/feautures/map-actions/model/model-actions-model.ts';

export const MapActions = () => {
    const [hex, setHex] = useState('#d29c9c53');

    return (
        <div className="rounded bg-primary flex items-center p-4 justify-between">
            <div className="flex flex-col items-center justify-between">
                <div className="mb-3 text-center font-semibold">
                    Загрузите карту
                </div>
                <Button className="h-11 bg-green border-none hover:bg-green">
                    Загрузить
                </Button>
            </div>
            <div className="flex gap-3">
                <Select
                    model={targetSelect}
                    placeholder="Выберите мишень"
                    className="h-11 w-[174px]"
                />
                <Button className="h-11 bg-green border-none hover:bg-green">
                    Добавить
                </Button>
            </div>
            <div className="flex gap-3">
                <Select
                    model={terrainElementSelect}
                    placeholder="Выберите эл.местности"
                    className="h-11 w-[174px]"
                />
                <Button className="h-11 bg-green border-none hover:bg-green">
                    Добавить
                </Button>
            </div>
            <div>
                <>
                    <Compact
                        color={hex}
                        style={{
                            boxShadow:
                                'rgb(0 0 0 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 15%) 0px 8px 16px',
                            backgroundColor: '#0d0d0d',
                        }}
                        onChange={color => {
                            setHex(color.hex);
                        }}
                    />
                </>
            </div>
        </div>
    );
};
