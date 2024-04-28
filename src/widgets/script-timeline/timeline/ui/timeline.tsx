import {
    groupItemsToRows,
    ItemDefinition,
    Relevance,
    RowDefinition,
} from 'dnd-timeline';
import {useTimelineContext} from 'dnd-timeline';
import {Dispatch, SetStateAction, useMemo} from 'react';
import {Item} from 'widgets/script-timeline/item/ui/Item.tsx';
import {Row} from 'widgets/script-timeline/row/ui/row.tsx';
import {SidebarItem} from 'widgets/script-timeline/sidebar-item/ui/sidebar-item.tsx';
import {SubRow} from 'widgets/script-timeline/sub-row/ui/sub-row.tsx';
import {RulerItem} from 'widgets/script-timeline/ruler-item/ui/ruler-item.tsx';
import {useUnit} from 'effector-react/effector-react.umd';
import {
    $activeInterval,
    $timeframe,
} from 'widgets/script-timeline/model/script-timeline.ts';
import {ControlPanel} from 'widgets/script-timeline/control-panel/control-panel.tsx';

interface TimelineProps {
    rows: RowDefinition[];
    items: ItemDefinition[];
    rulerItems: ItemDefinition[];
    setTimeframe: Dispatch<SetStateAction<Relevance>>;
    setItems: Dispatch<SetStateAction<ItemDefinition[]>>;
}

export const Timeline = (props: TimelineProps) => {
    const {setTimelineRef, style, timeframe} = useTimelineContext();

    const groupedSubrows = useMemo(
        () => groupItemsToRows(props.items, timeframe),
        [props.items, timeframe]
    );

    const value = useUnit($activeInterval);
    const timeframeState = useUnit($timeframe);

    return (
        <div ref={setTimelineRef} style={style}>
            <Row
                id={'line'}
                sidebar={<SidebarItem ruler={true}>{value}</SidebarItem>}
                ruler={true}>
                <SubRow key={`line-items`} ruler={true}>
                    {props?.rulerItems?.map((item, index) => (
                        <RulerItem
                            id={item.id}
                            key={item.id}
                            relevance={item.relevance}
                            index={index}>
                            |
                        </RulerItem>
                    ))}
                </SubRow>
            </Row>
            {props.rows.map(row => (
                <Row
                    id={row.id}
                    key={row.id}
                    sidebar={<SidebarItem>{row.id}</SidebarItem>}>
                    <SubRow
                        key={`${row.id}}`}
                        setItems={props.setItems}
                        items={groupedSubrows[row.id]}
                        id={row.id}>
                        {groupedSubrows[row.id]?.map(item => (
                            <Item
                                id={item.id}
                                key={item.id}
                                relevance={item.relevance}>
                                {`Item ${item.id}`}
                            </Item>
                        ))}
                    </SubRow>
                </Row>
            ))}
            <div className="h-5 ml-[208px] mb-4 flex justify-between">
                <div>
                    {`${timeframeState.start.getHours()}:${timeframeState.start.getMinutes()}:${timeframeState.start.getSeconds()}`}
                </div>
                <div>
                    {`${timeframeState.end.getHours()}:${timeframeState.end.getMinutes()}:${timeframeState.end.getSeconds()}`}
                </div>
            </div>
            <ControlPanel setTimeframe={props.setTimeframe} />
        </div>
    );
};
