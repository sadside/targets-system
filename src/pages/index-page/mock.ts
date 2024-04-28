import {
    ItemWithGroup,
    TARGET_POSITIONS,
    TARGET_STATUSES,
} from 'pages/index-page/types.ts';

export const targets: ItemWithGroup[] = [
    {
        id: 123,
        name: 'Танки',
        targets: [
            {
                id: 0,
                status: TARGET_STATUSES.ONLINE_IN_PROGRESS,
                charge: 45,
                position: TARGET_POSITIONS.TOP,
            },
            {
                id: 1,
                status: TARGET_STATUSES.ONLINE_IDLE,
                charge: 95,
                position: TARGET_POSITIONS.TOP,
            },
            {
                id: 2,
                status: TARGET_STATUSES.OFFLINE_IN_PROGRESS,
                charge: 56,
                position: TARGET_POSITIONS.TOP,
            },
            {
                id: 3,
                status: TARGET_STATUSES.OFFLINE_IDLE,
                charge: 100,
                position: TARGET_POSITIONS.TOP,
            },
        ],
    },
    {
        id: 444,
        name: null,
        targets: [
            {
                id: 5,
                status: TARGET_STATUSES.ONLINE_IN_PROGRESS,
                charge: 77,
                position: TARGET_POSITIONS.TOP,
            },
            {
                id: 6,
                status: TARGET_STATUSES.ONLINE_IDLE,
                charge: 34,
                position: TARGET_POSITIONS.TOP,
            },
            {
                id: 7,
                status: TARGET_STATUSES.OFFLINE_IN_PROGRESS,
                charge: 61,
                position: TARGET_POSITIONS.TOP,
            },
            {
                id: 8,
                status: TARGET_STATUSES.OFFLINE_IDLE,
                charge: 11,
                position: TARGET_POSITIONS.TOP,
            },
        ],
    },
    {
        id: 123,
        name: 'Танки',
        targets: [
            {
                id: 0,
                status: TARGET_STATUSES.ONLINE_IN_PROGRESS,
                charge: 45,
                position: TARGET_POSITIONS.TOP,
            },
            {
                id: 1,
                status: TARGET_STATUSES.ONLINE_IDLE,
                charge: 95,
                position: TARGET_POSITIONS.TOP,
            },
            {
                id: 2,
                status: TARGET_STATUSES.OFFLINE_IN_PROGRESS,
                charge: 56,
                position: TARGET_POSITIONS.TOP,
            },
            {
                id: 2,
                status: TARGET_STATUSES.OFFLINE_IDLE,
                charge: 100,
                position: TARGET_POSITIONS.TOP,
            },
        ],
    },

    {
        id: 444,
        name: null,
        targets: [
            {
                id: 5,
                status: TARGET_STATUSES.ONLINE_IN_PROGRESS,
                charge: 77,
                position: TARGET_POSITIONS.BOTTOM,
            },
            {
                id: 6,
                status: TARGET_STATUSES.ONLINE_IDLE,
                charge: 34,
                position: TARGET_POSITIONS.BOTTOM,
            },
            {
                id: 7,
                status: TARGET_STATUSES.OFFLINE_IN_PROGRESS,
                charge: 61,
                position: TARGET_POSITIONS.TOP,
            },
            {
                id: 8,
                status: TARGET_STATUSES.OFFLINE_IDLE,
                charge: 11,
                position: TARGET_POSITIONS.TOP,
            },
        ],
    },
];
