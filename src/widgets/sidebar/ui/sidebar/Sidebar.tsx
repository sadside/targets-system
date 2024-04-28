import styles from './Sidebar.module.scss';
import {LinkButton} from 'widgets/sidebar/ui/linkButton/LinkButton.tsx';
import HomeIcon from 'shared/assets/icons/sidebarIcons/homePage.svg?react';
import ScriptIcon from 'shared/assets/icons/sidebarIcons/scriptIcon.svg?react';
import MapIcon from 'shared/assets/icons/sidebarIcons/mapIcon.svg?react';
import GroupIcon from 'shared/assets/icons/sidebarIcons/groupIcon.svg?react';
import ResultIcon from 'shared/assets/icons/sidebarIcons/resultIcon.svg?react';
import {ReactElement} from 'react';
import ToggleIcon from 'shared/assets/icons/sidebarIcons/sidebarToggle.svg?react';

import {
    $isSidebarOpened,
    sidebarToggleButtonClicked,
} from 'widgets/sidebar/model/sidebar.init.ts';
import {AnimatePresence, motion} from 'framer-motion';
import {useUnit} from 'effector-react';
import classNames from 'classnames/bind';

type LinkRenderType = {
    path: string;
    text: string;
    renderIcon: ({fill}: {fill: string}) => ReactElement<{fill: string}>;
};

const links: LinkRenderType[] = [
    {
        path: '/',
        text: 'Основной экран',
        renderIcon: ({fill}: {fill: string}) => <HomeIcon fill={fill} />,
    },
    {
        path: '/script',
        text: 'Сценарий',
        renderIcon: ({fill}: {fill: string}) => <ScriptIcon fill={fill} />,
    },
    {
        path: '/maps',
        text: 'Карты',
        renderIcon: ({fill}: {fill: string}) => <MapIcon fill={fill} />,
    },
    {
        path: '/groups',
        text: 'Группы',
        renderIcon: ({fill}: {fill: string}) => <GroupIcon fill={fill} />,
    },
    {
        path: '/result',
        text: 'Результат',
        renderIcon: ({fill}: {fill: string}) => <ResultIcon fill={fill} />,
    },
];

const cx = classNames.bind(styles);

export const Sidebar = () => {
    const isSidebarOpened = useUnit($isSidebarOpened);

    const classNameWrapper = cx({
        wrapper: true,
        opened: isSidebarOpened,
        closed: !isSidebarOpened,
    });

    const toggleButtonAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.3,
            },
        },
        show: {
            width: 52.88,
            opacity: 1,
            transition: {
                duration: 0.3,
            },
        },
    };

    const toggleTitleAnimation = {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.3,
            },
        },
        show: {
            opacity: 1,
            transition: {
                duration: 0.3,
            },
        },
    };

    return (
        <motion.div
            className={classNameWrapper}
            animate={{width: isSidebarOpened ? '259px' : '92px'}}
            transition={{
                duration: 0.3,
            }}>
            {isSidebarOpened ? (
                <motion.h2
                    className={styles.title}
                    variants={toggleTitleAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden">
                    Контроллер Мишеней
                </motion.h2>
            ) : (
                <motion.h2
                    className={styles.title}
                    variants={toggleTitleAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden">
                    КМ
                </motion.h2>
            )}
            <hr className="mb-6" />
            <AnimatePresence>
                <motion.div
                    className={`${styles.toggleButton} bg-green`}
                    onClick={() => sidebarToggleButtonClicked()}
                    initial={{
                        padding: 12,
                    }}
                    animate={{
                        padding: '12px 24px',
                    }}>
                    <AnimatePresence>
                        {isSidebarOpened && (
                            <motion.div
                                className={styles.link}
                                variants={toggleButtonAnimation}
                                initial="hidden"
                                animate="show"
                                exit="hidden">
                                Закрыть
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <ToggleIcon
                        rotate={90}
                        className={styles.toggleButtonIcon}
                    />
                </motion.div>
            </AnimatePresence>
            <hr className="mb-6" />
            <div className={styles.sidebarLinks}>
                {links.map(({path, text, renderIcon}) => (
                    <LinkButton
                        to={path}
                        text={text}
                        Icon={renderIcon}
                        key={path}
                    />
                ))}
            </div>
        </motion.div>
    );
};
