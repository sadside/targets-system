import type {RowDefinition} from 'dnd-timeline';
import {useRow} from 'dnd-timeline';
import React from 'react';
import {twMerge} from 'tailwind-merge';

interface RowProps extends RowDefinition {
    children: React.ReactNode;
    sidebar: React.ReactNode;
    ruler?: boolean;
}

export const Row = (props: RowProps) => {
    const {
        setNodeRef,
        setSidebarRef,
        rowWrapperStyle,
        rowStyle,
        rowSidebarStyle,
    } = useRow({id: props.id});

    return (
        <div
            style={{...rowWrapperStyle}}
            className={twMerge(!props.ruler && 'mb-3')}>
            <div ref={setSidebarRef} style={rowSidebarStyle}>
                {props.sidebar}
            </div>
            <div ref={setNodeRef} style={{...rowStyle}} className="rounded-r">
                {props.children}
            </div>
        </div>
    );
};
