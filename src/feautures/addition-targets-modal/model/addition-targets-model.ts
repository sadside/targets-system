import {createModal} from 'shared/utils/factories/modal-factory.ts';
import {invoke} from '@withease/factories';

const additionTargetsModal = invoke(createModal, {initialValue: false});
export const {
    $isModalVisible: $isAdditionModalVisible,
    modalOpened: additionModalOpened,
    modalClosed: additionModalClosed,
    modalChanged: additionModalChanged,
} = additionTargetsModal;
