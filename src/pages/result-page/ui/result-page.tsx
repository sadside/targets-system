import styles from './result-page.module.scss';
import {ResultTable} from 'widgets/result-table';
export const ResultPage = () => {
    return (
        <div className={styles.wrapper}>
            <ResultTable />
        </div>
    );
};
