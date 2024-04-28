import {useUnit} from 'effector-react';
import {$selectedGroup} from 'entities/target-group';
import {Title} from 'shared/ui/components/title';
import styles from './groups-page.module.scss';
import {TargetGroupsActions} from '@/feautures/target-group-actions';
import {TargetGroupInfo} from '@/feautures/target-group-info';
import {TargetsGroupChanger} from '@/feautures/targets-group-changer';

export const GroupsPage = () => {
    const selectedGroup = useUnit($selectedGroup);

    return (
        <div className={styles.wrapper}>
            <TargetGroupsActions />
            {selectedGroup?.name ? (
                <>
                    <Title classname="mb-12">
                        Редактирование мишеней группы {selectedGroup?.name}
                    </Title>
                    <TargetGroupInfo />
                    <Title classname="mb-12">Изменение мишеней группы</Title>
                    <TargetsGroupChanger />
                </>
            ) : (
                <div className="flex items-center justify-center w-full mt-12">
                    <div>Выберите группу для редактирования.</div>
                </div>
            )}
        </div>
    );
};
