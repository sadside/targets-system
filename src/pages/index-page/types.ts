export enum TARGET_STATUSES {
    ONLINE_IN_PROGRESS = 0,
    ONLINE_IDLE = 1,
    OFFLINE_IN_PROGRESS = 2,
    OFFLINE_IDLE = 3,
}

export enum TARGET_POSITIONS {
    TOP,
    BOTTOM,
}

export type ItemWithGroup = {
    name: string | null;
    id: number;
    targets: TargetType[];
};

export type TargetType = {
    id: number;
    status: TARGET_STATUSES;
    charge: number;
    position: TARGET_POSITIONS;
};
