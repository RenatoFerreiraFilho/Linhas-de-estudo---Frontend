import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { ICalendar } from "./backend";
import React from "react";

interface ICalendarsViewProps {
    calendars: ICalendar[];
    toggleCalendar: (i: number) => void;
    calendarsSelected: boolean[];
}
export const CalendarsView = React.memo(function (props: ICalendarsViewProps) {
    console.log("Render CalendarsView");
    const { calendars, calendarsSelected, toggleCalendar } = props;
    return (
        <Box marginTop={"64px"}>
            <h3>Agendas</h3>
            {calendars.map((calendar, i) => (
                <div key={calendar.id}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={calendarsSelected[i]}
                                onChange={() => toggleCalendar(i)}
                                style={{ color: calendar.color }}
                            />
                        }
                        label={calendar.name}
                    />
                </div>
            ))}
        </Box>
    );
});
