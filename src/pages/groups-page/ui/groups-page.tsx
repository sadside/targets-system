import { TargetGroupsActions } from '@/feautures/target-group-actions';
import {
    groupSelectModel,
    saveGroupQuery,
} from '@/feautures/target-group-actions/model/target-group-actions.ts';
import { TargetGroupInfo } from '@/feautures/target-group-info';
import { TargetsGroupChanger } from '@/feautures/targets-group-changer';
import { useNavigate } from '@tanstack/react-router';
import { useUnit } from 'effector-react';
import { getGroupByIdQuery } from 'pages/groups-page/model/groups-page.ts';
import { CreateGroupModal } from 'pages/groups-page/ui/create-group-modal.tsx';
import {
    $currentScript,
    SCRIPT_STATUSES,
} from 'pages/index-page/model/index-page-model.ts';
import { useEffect } from 'react';
import { Title } from 'shared/ui/components/title';
import { Loader } from 'shared/ui/loader/loader.tsx';
import styles from './groups-page.module.scss';

export const GroupsPage = () => {
    const selectedGroup = useUnit(groupSelectModel.$selectedItem);
    const { pending } = useUnit(getGroupByIdQuery);
    const { pending: loading } = useUnit(saveGroupQuery);

    const currentScript = useUnit($currentScript);
    const navigate = useNavigate();

    useEffect(() => {
        if (
            currentScript &&
            currentScript?.status !== SCRIPT_STATUSES.STOPPED
        ) {
            navigate({
                to: '/',
            });
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <CreateGroupModal />
            <TargetGroupsActions />
            {selectedGroup?.name ? (
                <>
                    {pending || loading ? (
                        <div className="w-full h-96 flex items-center justify-center">
                            <Loader className="w-10" />
                        </div>
                    ) : (
                        <>
                            <Title classname="mb-12">
                                Редактирование мишеней группы{' '}
                                {selectedGroup?.name}
                            </Title>
                            <TargetGroupInfo />
                            <Title classname="mb-12">
                                Изменение мишеней группы
                            </Title>
                            <TargetsGroupChanger />
                        </>
                    )}
                </>
            ) : (
                <div className="flex items-center justify-center w-full mt-12">
                    <div>Выберите группу для редактирования.</div>
                </div>
            )}
        </div>
    );
};
