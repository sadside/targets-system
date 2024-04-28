import {Link} from '@tanstack/react-router';
import styles from './LinkButton.module.scss';
import {ElementType} from 'react';
import classNames from 'classnames/bind';
import {useUnit} from 'effector-react/effector-react.umd';
import {$isSidebarOpened} from 'widgets/sidebar/model/sidebar.init.ts';
import {AnimatePresence, motion} from 'framer-motion';

interface Props {
    to: string;
    text: string;
    Icon: ElementType;
}

const cx = classNames.bind(styles);

const toggleButtonAnimation = {
    hidden: {
        width: 0,
        opacity: 0,
        transition: {
            duration: 0.3,
        },
    },
    show: {
        width: 16,
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
};

export const LinkButton = ({to, text, Icon, ...props}: Props) => {
    const isVisible = useUnit($isSidebarOpened);

    return (
        <Link to={to} {...props}>
            {({isActive}: {isActive: boolean}) => {
                return (
                    <AnimatePresence>
                        <motion.div
                            className={cx({
                                wrapper: true,
                                active: isActive,
                                closed: !isVisible,
                            })}
                            transition={{
                                duration: 0.3,
                            }}>
                            <motion.div
                                className={styles.contentWrapper}
                                initial={{opacity: 0, scale: 0.5}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{
                                    duration: 0.3,
                                }}>
                                <Icon className={styles.toggleButtonIcon} />
                                <AnimatePresence>
                                    {isVisible && (
                                        <motion.div
                                            variants={toggleButtonAnimation}
                                            initial="hidden"
                                            exit="hidden"
                                            animate="show"></motion.div>
                                    )}
                                </AnimatePresence>
                                <AnimatePresence>
                                    {isVisible && (
                                        <motion.div
                                            className={styles.link}
                                            variants={toggleButtonAnimation}
                                            initial="hidden"
                                            exit="hidden"
                                            animate="show"
                                            style={{overflow: 'hidden'}}>
                                            {text}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                );
            }}
        </Link>
    );
};
