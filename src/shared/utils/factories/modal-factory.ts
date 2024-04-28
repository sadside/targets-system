import {createFactory} from '@withease/factories';
import {createEvent, createStore, sample} from 'effector';

export const createModal = createFactory(
    ({initialValue}: {initialValue: boolean}) => {
        const $isModalVisible = createStore(initialValue);

        const modalClosed = createEvent();
        const modalOpened = createEvent();
        const modalChanged = createEvent<boolean>();

        sample({
            clock: modalOpened,
            fn: () => true,
            target: $isModalVisible,
        });

        sample({
            clock: modalClosed,
            fn: () => false,
            target: $isModalVisible,
        });

        sample({
            clock: modalChanged,
            target: $isModalVisible,
        });

        return {
            $isModalVisible,
            modalClosed,
            modalChanged,
            modalOpened,
        };
    }
);
