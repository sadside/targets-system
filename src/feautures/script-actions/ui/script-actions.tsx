import {TrashIcon} from '@radix-ui/react-icons';

import {useUnit} from 'effector-react';
import {$scripts} from 'entities/script';
import {Button} from 'shared/ui/components/ui/button.tsx';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from 'shared/ui/components/ui/select.tsx';
import {
    $selectedScript,
    scriptSelected,
} from '@/feautures/script-actions/model/script-action.ts';
import {modalOpened} from '@/feautures/create-script/model/create-script-model.ts';
import {CreateScriptModal} from '@/feautures/create-script';
import {toast} from 'sonner';

interface ScriptActionsProps {}

export const ScriptActions = ({}: ScriptActionsProps) => {
    const scripts = useUnit($scripts);
    // const loading = useUnit(getGroupsFx.pending);
    // useGate(groupsGate);
    const selectedScript = useUnit($selectedScript);

    const selectPlaceholder = 'Выберите сценарий для редактирования. ';
    const disableSelect = !scripts;

    const handleSelectChange = (value: string) => {
        scriptSelected(value);
    };

    const handleCreateScriptClick = () => {
        modalOpened();
    };

    const handleSaveCLick = () => {
        toast('Изменения сохранены');
    };

    return (
        <div className="bg-primary flex items-center p-4 justify-between mb-12 rounded">
            <CreateScriptModal />
            <div className="font-normal mr-4">Название Скрипта:</div>
            <Select
                value={JSON.stringify(selectedScript)}
                onValueChange={handleSelectChange}>
                <SelectTrigger
                    className="w-[180px] mr-4"
                    disabled={disableSelect}>
                    <SelectValue placeholder={selectPlaceholder}>
                        {selectedScript?.name || 'Сценарий'}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Сценарии:</SelectLabel>
                        {scripts &&
                            scripts.map(script => (
                                <SelectItem
                                    value={JSON.stringify(script)}
                                    key={script.id}>
                                    {script.name}
                                </SelectItem>
                            ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button size="icon">
                <TrashIcon height={20} width={20} />
            </Button>

            <Button className="h-9" onClick={handleSaveCLick}>
                Сохранить
            </Button>
            <Button className="h-9">Загрузить карту</Button>
            <Button className="h-9" onClick={handleCreateScriptClick}>
                Создать сценарий
            </Button>
        </div>
    );
};
