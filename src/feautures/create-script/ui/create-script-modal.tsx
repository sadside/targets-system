import {
    $isModalVisible,
    $scriptName,
    formSubmitted,
    inputChanged,
    modalChanged,
    modalClosed,
} from '@/feautures/create-script/model/create-script-model.ts';
import { useUnit } from 'effector-react';
import { Button } from 'shared/ui/components/ui/button.tsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from 'shared/ui/components/ui/dialog.tsx';
import { Input } from 'shared/ui/components/ui/input.tsx';

export const CreateScriptModal = () => {
    const isOpen = useUnit($isModalVisible);
    const value = useUnit($scriptName);

    return (
        <Dialog
            onOpenChange={state => modalChanged(state)}
            open={isOpen}>
            <DialogContent className="bg-sidebarBg border-0">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Создание сценария.
                    </DialogTitle>
                    <DialogDescription className="text-white">
                        <p className="text-lg mb-3">
                            Заполните все необходимые поля для
                            создания сценария.
                        </p>
                        <p className="text-base mb-2">
                            Название сценария:
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
                        <div className="flex gap-3">
                            <Button onClick={() => modalClosed()}>
                                Отмена
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => formSubmitted()}
                                disabled={!value}>
                                Создать
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
