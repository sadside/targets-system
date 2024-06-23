import { useUnit } from 'effector-react';
import {
    $showTargetInfoModal,
    modalStateChanged,
} from 'pages/result-page/model/result-page.ts';
import {
    Dialog,
    DialogContent,
} from 'shared/ui/components/ui/dialog.tsx';
import {
    TableHead,
    TableHeader,
    TableRow,
} from 'shared/ui/components/ui/table.tsx';

interface Props {}

export const AdditionalInfoModal = ({}: Props) => {
    const isOpen = useUnit($showTargetInfoModal);

    return (
        <div>
            <Dialog
                onOpenChange={state => modalStateChanged(state)}
                open={isOpen}>
                <DialogContent
                    className="bg-sidebarBg border-0"
                    style={{ width: 1000 }}>
                    <TableHeader className="bg-primary">
                        <TableRow className="text-center">
                            <TableHead className="text-center">
                                Время с момента подъема
                            </TableHead>
                            <TableHead className="text-center">
                                Причина
                            </TableHead>
                            <TableHead className="text-center">
                                Кол-во попаданий {'< 100%'}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};
