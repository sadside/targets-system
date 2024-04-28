import Target24 from 'shared/assets/targets/24.svg?react';
interface TargetImageProps {
    type: string;
    width?: number;
    height?: number;
}

export const TargetImage = ({
    type,
    width = 38,
    height = 40,
}: TargetImageProps) => {
    if (type === '24') {
        return <Target24 width={width} height={height} />;
    }
};
