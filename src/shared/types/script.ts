export interface Timeline {
    id: number;
    start: number;
    end: number;
}

export interface Script {
    id: number;
    name: string;
    timelines?: Timeline[];
}
