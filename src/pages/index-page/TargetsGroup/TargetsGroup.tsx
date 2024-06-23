import { Target } from 'entities/target/api/target-api.ts';
import { TargetItem } from 'pages/index-page/Target/TargetItem.tsx';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from 'shared/ui/components/ui/accordion.tsx';

interface TargetsGroupProps {
    name: string | null;
    targets: Target[];
    color: string;
}

export const TargetsGroup = ({
    name,
    targets,
    color,
}: TargetsGroupProps) => {
    return (
        <>
            {name ? (
                <Accordion type="multiple" className="w-full mb-3">
                    <AccordionItem value="data">
                        <AccordionTrigger className="text-lg">
                            <div>
                                Группа мишеней:
                                <span
                                    className="font-bold"
                                    style={{ color: color }}>
                                    {' '}
                                    {name}
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            {targets.length
                                ? targets.map(target => (
                                      <TargetItem target={target} />
                                  ))
                                : 'Мишенней нет '}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ) : (
                targets.map(target => <TargetItem target={target} />)
            )}
        </>
    );
};
