import { TrashIcon } from '@radix-ui/react-icons';

import { CreateScriptModal } from '@/feautures/create-script';
import {
    modalOpened,
    scriptRemoved,
    scriptSaved,
} from '@/feautures/create-script/model/create-script-model.ts';
import { Button } from 'shared/ui/components/ui/button.tsx';

import { Select } from 'shared/ui/select/ui/select.tsx';
import {
    selectMapModel,
    selectScriptModel,
} from 'widgets/script-actions/model/script-action.ts';

interface ScriptActionsProps {}

export const ScriptActions = ({}: ScriptActionsProps) => {
    const handleCreateScriptClick = () => {
        modalOpened();
    };

    const handleSaveCLick = () => {
        scriptSaved();
    };

    return (
        <div className="bg-primary flex items-center p-4 justify-between mb-4 rounded">
            <CreateScriptModal />
            <div className="font-normal mr-4 text-lg">
                Сценарий для редактирования:
            </div>
            <Select
                model={selectScriptModel}
                className="w-[200px] h-10"
                placeholder="Выбор сценария"
                label="Сценарии"
            />
            <Button
                size="icon"
                className="hover:bg-red-500"
                onClick={() => scriptRemoved()}>
                <TrashIcon
                    height={20}
                    width={20}
                    className="hover:fill-white"
                />
            </Button>

            <Button className="h-9" onClick={handleSaveCLick}>
                Сохранить
            </Button>
            <Select
                model={selectMapModel}
                className="w-[200px] h-10"
                placeholder="Выбор карты"
                label="Карты"
            />
            <Button className="h-9" onClick={handleCreateScriptClick}>
                Создать сценарий
            </Button>
        </div>
    );
};
