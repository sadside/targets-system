import {Button} from 'shared/ui/components/ui/button.tsx';

export const ResultTableActions = () => {
    return (
        <div className="rounded bg-primary h-20 mt-10 flex items-center justify-end p-4">
            <div className="flex gap-3">
                <Button
                    variant="default"
                    className="bg-green hover:bg-cyan-700 font-bold cursor-pointer">
                    Сохранить
                </Button>
                <Button
                    className="bg-green hover:bg-cyan-700 font-bold cursor-pointer"
                    variant="default">
                    PDF
                </Button>
            </div>
        </div>
    );
};
