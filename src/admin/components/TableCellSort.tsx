import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText, SortDirection, TableCell,
    TableSortLabel,
    Tooltip
} from "@material-ui/core";
import React from "react";
import {UnfoldMore} from "@material-ui/icons";
// import {SortBy} from "aws-sdk/clients/sagemaker";


interface CardCategoryProps {
    keyCell: string,
    labelCell: string,
    tooltip?: string,
    sortDirection?: SortDirection,
    sortBy?: string,
    createSortHandler: any
}

export default function TableCellSort(props: CardCategoryProps) {
    const {keyCell, labelCell, tooltip, sortBy, sortDirection, createSortHandler} = props;
    return <TableCell align="center" sortDirection={sortDirection}>
        {tooltip ?
            <Tooltip title={tooltip} placement={"top"} arrow={true}>
                <TableSortLabel
                    active={true}
                    direction={sortDirection ? sortDirection : 'asc'}
                    onClick={() => createSortHandler(keyCell)}
                    IconComponent={sortBy != keyCell ? UnfoldMore : undefined}
                >
                    {labelCell}
                </TableSortLabel>
            </Tooltip> :
            <TableSortLabel
                active={true}
                direction={sortDirection ? sortDirection : 'asc'}
                onClick={() => createSortHandler(keyCell)}
                IconComponent={sortBy != keyCell ? UnfoldMore : undefined}
            >
                {labelCell}
            </TableSortLabel>}
    </TableCell>
}