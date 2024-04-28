import {Target} from 'entities/target';

interface TargetItemProps extends Target {}

export const TargetItem = ({name}: TargetItemProps) => {
    return <div>{name}</div>;
};
