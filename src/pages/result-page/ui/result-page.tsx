import {ResultTable} from 'widgets/result-table';
import styles from './result-page.module.scss';
export const ResultPage = () => {
    return (
        <div className={styles.wrapper}>
            <ResultTable />
        </div>
    );
};
