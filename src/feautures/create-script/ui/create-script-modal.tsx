import {useUnit} from 'effector-react';
import {Button} from 'shared/ui/components/ui/button.tsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from 'shared/ui/components/ui/dialog.tsx';
import {Input} from 'shared/ui/components/ui/input.tsx';
import {
    $isModalVisible,
    modalChanged,
    modalClosed,
} from '@/feautures/create-script/model/create-script-model.ts';

export const CreateScriptModal = () => {
    const isOpen = useUnit($isModalVisible);

    return (
        <Dialog onOpenChange={state => modalChanged(state)} open={isOpen}>
            <DialogContent className="bg-sidebarBg border-0">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Создания сценария.
                    </DialogTitle>
                    <DialogDescription className="text-white">
                        <p className="text-lg mb-3">
                            Заполните все необходимые поля для создания
                            сценария.
                        </p>
                        <form action="">
                            <p className="text-base mb-2">Название сценария:</p>
                            <Input
                                placeholder="Введите название сценария."
                                className="mb-4"
                                id="name"
                            />
                            <p className="text-base mb-2">Название сценария:</p>
                            <Input
                                placeholder="Введите название сценария."
                                className="mb-5"
                                id="name"
                            />
                            <div className="flex gap-3">
                                <Button onClick={() => modalClosed()}>
                                    Отмена
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => modalClosed()}>
                                    Создать
                                </Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
