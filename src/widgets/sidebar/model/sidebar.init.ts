import {createEvent, createStore} from 'effector';
// import {persist} from 'effector-storage/local';

export const sidebarToggleButtonClicked = createEvent<void>();
export const $isSidebarOpened = createStore<boolean>(false);

// persist({store: $isSidebarOpened, key: 'sidebarIsOpened'});

$isSidebarOpened.on(sidebarToggleButtonClicked, state => !state);

$isSidebarOpened.watch(state => console.log(state));
