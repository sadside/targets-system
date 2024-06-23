import { TARGET_STATUSES } from 'pages/index-page/types.ts';

export enum TARGET_TYPE {
    Little = 'Маленькая',
    Middle = 'Стандартная',
    Large = 'Большая',
}

export enum Music {
    None = 'Без звук',
    Short = 'Короткий звук',
    Full = 'Стандартный звук ',
}

export enum ShotSensorType {
    SENSOR1,
    SENSOR2,
    SENSOR3,
}

export type TargetData = {
    image?: boolean;
    type: TARGET_TYPE;
    name: string;
    color?: string;
    pos: 'UP' | 'DOWN';
    state: TARGET_STATES;
};

export enum TARGET_STATES {
    NO_CONNECT = 'NO_CONNECT',
    NO_ACTIVE = 'NO_ACTIVE',
    ACTIVE = 'ACTIVE',
    KILLED = 'KILLED',
    SHOTED = 'SHOTED',
}

export interface Target {
    id: number;
    groupId: number;
    name: string;
    image: string;
    groupName: string;
    shotToDie: number;
    navi: boolean;
    posX: number;
    posY: number;
    type: TARGET_TYPE;
    music: Music;
    fire: boolean;
    pointer: boolean;
    moveSensor: boolean;
    shotSensorType: ShotSensorType;
    valueSensor: number;
    status: TARGET_STATUSES;
    batteryLevel: number;
    position: 'UP' | 'DOWN';
    goAfterDestroy: boolean;
    heater: boolean;
    state: TARGET_STATES;
}
