import LoaderIcon from 'shared/assets/loaders/loader.svg?react';

interface Props {
    className?: string;
}

export const Loader = ({ className }: Props) => {
    return <LoaderIcon className={className} />;
};
