import {Sidebar} from 'widgets/sidebar';
import {Outlet} from '@tanstack/react-router';
import styles from './Layout.module.scss';

export const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <Sidebar />
            <div className={styles.outlet}>
                {/*<div className={styles.wrapperOutlet}>*/}
                    <Outlet />
                {/*</div>*/}
            </div>
        </div>
    );
};
