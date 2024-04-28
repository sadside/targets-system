import {Target} from 'pages/index-page/Target/Target.tsx';
import {TargetType} from 'pages/index-page/types.ts';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from 'shared/ui/components/ui/accordion.tsx';

interface TargetsGroupProps {
    name: string | null;
    targets: TargetType[];
}

export const TargetsGroup = ({name, targets}: TargetsGroupProps) => {
    return (
        <>
            {name ? (
                <Accordion type="multiple" className="w-full mb-3">
                    <AccordionItem value="data">
                        <AccordionTrigger className="text-lg">
                            <div>
                                Группа мишеней:
                                <span className="font-bold"> {name}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            {targets.length
                                ? targets.map(target => (
                                      <Target
                                          id={target.id}
                                          key={target.id}
                                          status={target.status}
                                          charge={target.charge}
                                          position={target.position}
                                      />
                                  ))
                                : 'Мишенней нет '}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ) : (
                targets.map(target => (
                    <Target
                        id={target.id}
                        key={target.id}
                        status={target.status}
                        charge={target.charge}
                        position={target.position}
                    />
                ))
            )}
        </>
    );
};
