import {invoke} from '@withease/factories';
import {createModal} from 'shared/utils/factories/modal-factory.ts';

const createScriptModal = invoke(createModal, {initialValue: false});

export const {$isModalVisible, modalClosed, modalChanged, modalOpened} =
    createScriptModal;
