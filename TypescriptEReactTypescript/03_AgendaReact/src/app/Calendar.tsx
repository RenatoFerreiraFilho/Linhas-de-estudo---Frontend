import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import { ICalendar, IEvent } from "./backend";
import React from "react";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
interface ICalendarProps {
    weeks: ICalendarCell[][];
    onClickDay: (date: string) => void;
    onClickEvent: (event: IEvent) => void;
}
export function Calendar(props: ICalendarProps) {
    const { weeks } = props;
    function handleClick(evt: React.MouseEvent, date: string) {
        if (evt.target === evt.currentTarget) {
            props.onClickDay(date);
        } else {
        }
        console.log("Handle");
    }
    return (
        <TableContainer style={{ flex: 1 }} component={"div"}>
            <Table
                sx={{
                    borderTop: "1px solid rgb(224,224,224)",
                    minHeight: "100%",
                    tableLayout: "fixed",
                    minWidth: 650,
                    "& td ~ td, & th ~ th": {
                        borderLeft: "1px solid rgb(224,224,224)",
                    },
                    "& td": {
                        verticalAlign: "top",
                        overflowX: "hidden",
                        padding: "8px 4px",
                    },
                }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        {DAYS_OF_WEEK.map((day) => (
                            <TableCell align="center" key={day}>
                                {day}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weeks.map((week, i) => (
                        <TableRow key={i}>
                            {week.map((cell) => (
                                <TableCell
                                    align="center"
                                    key={cell.date}
                                    onClick={(mouseEvt) =>
                                        handleClick(mouseEvt, cell.date)
                                    }
                                >
                                    <Box
                                        sx={{
                                            fontWeight: 500,
                                            marginBottom: "4px",
                                        }}
                                    >
                                        {cell.dayOfMonth}
                                    </Box>
                                    {cell.events.map((event) => {
                                        const color = event.calendar.color;
                                        return (
                                            <Button
                                                key={event.id}
                                                onClick={() =>
                                                    props.onClickEvent(event)
                                                }
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    background: "none",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    textAlign: "left",
                                                    whiteSpace: "nowrap",
                                                    margin: "4px 0px",
                                                }}
                                            >
                                                {event.time && (
                                                    <>
                                                        <Icon
                                                            style={{
                                                                color,
                                                            }}
                                                            fontSize="inherit"
                                                        >
                                                            watch_later
                                                        </Icon>
                                                        <Box
                                                            component={"span"}
                                                            margin={"0px 4 px"}
                                                        >
                                                            {event.time}
                                                        </Box>
                                                    </>
                                                )}
                                                {event.time ? (
                                                    <span>{event.desc}</span>
                                                ) : (
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                color,
                                                            color: "white",
                                                            padding: "2px 4px",
                                                            borderRadius: "4px",
                                                        }}
                                                    >
                                                        {event.desc}
                                                    </div>
                                                )}
                                            </Button>
                                        );
                                    })}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export type IEventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalendarCell {
    date: string;
    dayOfMonth: string;
    events: IEventWithCalendar[];
}
