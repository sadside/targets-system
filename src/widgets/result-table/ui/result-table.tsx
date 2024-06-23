import { ResultTableActions } from '@/feautures/result-table-actions';
import { ResultTableFilter } from '@/feautures/result-table-filter';
import { modalStateChanged } from 'pages/result-page/model/result-page.ts';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'shared/ui/components/ui/table.tsx';
import styles from './result-table.module.scss';

const data = [
    {
        number: 0,
        ups: 10,
        shots_1: 123,
        shots_2: 22,
        correction: 'Пример',
    },
    {
        number: 0,
        ups: 10,
        shots_1: 123,
        shots_2: 22,
        correction: 'Пример',
    },
    {
        number: 0,
        ups: 10,
        shots_1: 123,
        shots_2: 22,
        correction: 'Пример',
    },
    {
        number: 0,
        ups: 10,
        shots_1: 123,
        shots_2: 22,
        correction: 'Пример',
    },
];

export const ResultTable = () => {
    return (
        <div className={styles.wrapper}>
            <ResultTableFilter />
            <h1 className="font-bold text-xl mb-6">
                Название таблицы или пояснение
            </h1>
            <div className={styles.tableWrapper}>
                <div className={styles.test}>
                    <Table className={styles.table}>
                        <TableHeader className="bg-primary">
                            <TableRow className="text-center">
                                <TableHead className="text-center">
                                    № Мишени
                                </TableHead>
                                <TableHead className="text-center">
                                    Кол-во подъемов
                                </TableHead>
                                <TableHead className="text-center">
                                    Кол-во попаданий 100%
                                </TableHead>
                                <TableHead className="text-center">
                                    Кол-во попаданий {'< 100%'}
                                </TableHead>
                                <TableHead className="text-center">
                                    Время поражения (с)
                                </TableHead>
                                <TableHead className="text-center">
                                    ДД
                                </TableHead>
                                <TableHead className="text-center">
                                    Коррекция
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className={styles.test}>
                            {data.map(invoice => (
                                <TableRow
                                    key={invoice.number}
                                    className="text-center">
                                    <TableCell
                                        className="font-medium cursor-pointer"
                                        onClick={() =>
                                            modalStateChanged(true)
                                        }>
                                        {invoice.number}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {invoice.ups}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.shots_1}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.shots_2}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.shots_2}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.shots_2}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.correction}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <ResultTableActions />
        </div>
    );
};
