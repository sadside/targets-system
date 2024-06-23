import { useUnit } from 'effector-react';
import {
    $createModalIsVisible,
    $groupColor,
    $groupName,
    formSubmitted,
    inputChanged,
    inputColorChanged,
    modalVisibleChanged,
} from 'pages/groups-page/model/create-group-model.ts';
import { Button } from 'shared/ui/components/ui/button.tsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from 'shared/ui/components/ui/dialog.tsx';
import { Input } from 'shared/ui/components/ui/input.tsx';

export const CreateGroupModal = () => {
    const isVisible = useUnit($createModalIsVisible);
    const value = useUnit($groupName);
    const color = useUnit($groupColor);

    return (
        <Dialog
            open={isVisible}
            onOpenChange={state => modalVisibleChanged(state)}>
            <DialogContent className="bg-sidebarBg border-0">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Создание Группы
                    </DialogTitle>
                    <DialogDescription className="text-white">
                        <p className="text-lg mb-3">
                            Заполните все необходимые поля для
                            создания сценария.
                        </p>
                        <p className="text-base mb-2">
                            Название группы:
                        </p>
                        <Input
                            placeholder="Введите название сценария."
                            className="mb-4"
                            value={value}
                            onChange={e =>
                                inputChanged(e.target.value)
                            }
                            id="name"
                        />
                        <p className="text-base mb-2">Цвет группы:</p>
                        <input
                            type="color"
                            className="rounded border-none mb-3"
                            value={color}
                            onChange={e =>
                                inputColorChanged(e.target.value)
                            }
                        />
                        <div className="flex gap-3">
                            <Button
                                onClick={() =>
                                    modalVisibleChanged(false)
                                }>
                                Отмена
                            </Button>
                            <Button
                                variant="secondary"
                                disabled={!value}
                                onClick={() => formSubmitted()}>
                                Создать
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
