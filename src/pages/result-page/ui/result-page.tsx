import { useNavigate } from '@tanstack/react-router';
import { useUnit } from 'effector-react';
import {
    $currentScript,
    SCRIPT_STATUSES,
} from 'pages/index-page/model/index-page-model.ts';
import { AdditionalInfoModal } from 'pages/result-page/ui/additional-info-modal.tsx';
import { useEffect } from 'react';
import { ResultTable } from 'widgets/result-table';
import styles from './result-page.module.scss';

export const ResultPage = () => {
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
            <AdditionalInfoModal />
            <ResultTable />
        </div>
    );
};
