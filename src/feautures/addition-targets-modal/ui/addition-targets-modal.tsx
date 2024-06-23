import {
    $isVisible,
    buttonClicked,
    groupsSelectModel,
    modalStateChanged,
    targetsSelectModel,
} from '@/feautures/addition-targets-modal/ui/model/addition-target-model.ts';
import { useUnit } from 'effector-react';
import { Button } from 'shared/ui/components/ui/button.tsx';
import {
    Dialog,
    DialogContent,
} from 'shared/ui/components/ui/dialog.tsx';
import { Select } from 'shared/ui/select/ui/select.tsx';

interface AdditionTargetsModalProps {}

export const AdditionTargetsModal =
    ({}: AdditionTargetsModalProps) => {
        const isVisible = useUnit($isVisible);

        const [selectedTarget, selectedGroup] = useUnit([
            targetsSelectModel.$selectedItem,
            groupsSelectModel.$selectedItem,
        ]);
        const itemNotSelected =
            selectedTarget == null && selectedGroup == null;

        return (
            <Dialog
                open={isVisible}
                onOpenChange={state => modalStateChanged(state)}>
                <DialogContent className="bg-black border border-sidebarHoverColor">
                    <div className="w-full">
                        <h1 className="mb-3 font-bold text-center text-lg">
                            Для добавления выберите либо мишень, либо
                            группу.
                        </h1>
                        <div className="flex justify-between">
                            <Select
                                model={targetsSelectModel}
                                className="w-[200px] h-10"
                                placeholder="Выберите мишень"
                                label="Мишени"
                            />
                            <Select
                                model={groupsSelectModel}
                                className="w-[200px] h-10"
                                placeholder="Выберите группу"
                                label="Группы"
                            />
                        </div>
                        <Button
                            className="mt-4 w-full"
                            disabled={itemNotSelected}
                            onClick={() => buttonClicked()}>
                            Добавить
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    };
