import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import {
    ICalendar,
    IEvent,
    getCalendarEndpoint,
    getEventsEndpoint,
} from "./backend";
import { useParams } from "react-router-dom";

import { CalendarsView } from "./CalendarsView";
import { CalendarHeader } from "./CalendarHeader";
import { Calendar, ICalendarCell, IEventWithCalendar } from "./Calendar";
import EventFormDialog from "./EventFormDialog";
import { getToday } from "./dateFunctions";
import { IEditingEvent } from "./backend";

interface ICalendarScreenState {
    calendars: ICalendar[];
    calendarsSelected: boolean[];
    events: IEvent[];
    editingEvent: IEditingEvent | null;
}

type ICalendarScreenAction =
    | {
          type: "load";
          payload: {
              events: IEvent[];
              calendars: ICalendar[];
          };
      }
    | {
          type: "edit";
          payload: IEvent;
      }
    | {
          type: "new";
          payload: string;
      }
    | {
          type: "closeDialog";
      };

function reducer(state: ICalendarScreenState, action: ICalendarScreenAction) {
    switch (action.type) {
        case "load":
            return {
                ...state,
                events: action.payload.events,
                calendars: action.payload.calendars,
                calendarsSelected: action.payload.calendars.map(() => true),
            };
        case "edit":
            return {
                ...state,
                editingEvent: action.payload,
            };
        case "new":
            return {
                ...state,
                editingEvent: {
                    date: action.payload,
                    desc: "",
                    calendarId: state.calendars[0].id,
                },
            };
        case "closeDialog":
            return {
                ...state,
                editingEvent: null,
            };
        default:
            return state;
    }
}

export function CalendarScreen() {
    const { month } = useParams<{ month: string }>();

    //valor inicial zerado, como no useState:
    const x = useReducer(reducer, {
        calendars: [],
        calendarsSelected: [],
        events: [],
        editingEvent: null,
    });

    const [events, setEvents] = useState<IEvent[]>([]);
    const [calendars, setCalendars] = useState<ICalendar[]>([]);
    const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([]);
    const [editingEvent, setEditingEvent] = useState<IEditingEvent | null>(
        null
    );

    const weeks = useMemo(() => {
        return generateCalendar(
            month + "-01",
            events,
            calendars,
            calendarsSelected
        );
    }, [month, events, calendars, calendarsSelected]);

    const firstDate = weeks[0][0].date;
    const lastDate = weeks[weeks.length - 1][6].date;

    useEffect(() => {
        // getEventsEndpoint(firstDate, lastDate).then((events) =>
        //     setEvents(events)
        // );
        Promise.all([
            getEventsEndpoint(firstDate, lastDate),
            getCalendarEndpoint(),
        ]).then(([events, calendars]) => {
            setCalendarsSelected(calendars.map(() => true));
            setCalendars(calendars);
            setEvents(events);
        });
    }, [firstDate, lastDate]);

    function refreshEvents() {
        getEventsEndpoint(firstDate, lastDate).then(setEvents);
    }
    const toggleCalendar = useCallback(
        //useCallback é tipo um useMemo, mas para funções. Daria para fazer com useMemo também
        (i: number) => {
            const newValue = [...calendarsSelected];
            newValue[i] = !newValue[i];
            setCalendarsSelected(newValue);
        },
        [calendarsSelected]
    );

    function openNewEvent(date: string) {
        setEditingEvent({
            date: date,
            desc: "",
            calendarId: calendars[0].id,
        });
    }

    return (
        <Box
            display={"flex"}
            sx={{
                height: "100%",
                alignItems: "stretch",
            }}
        >
            <Box
                sx={{
                    width: "16em",
                    borderRight: "1px solid rgb(224,224,224)",
                    padding: " 8px 16px",
                }}
            >
                <h2>Agenda</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openNewEvent(getToday())}
                >
                    Novo Evento
                </Button>
                <CalendarsView
                    calendars={calendars}
                    toggleCalendar={toggleCalendar}
                    calendarsSelected={calendarsSelected}
                />
            </Box>
            <Box flex="1" display={"flex"} flexDirection={"column"}>
                <CalendarHeader month={month} />
                <Calendar
                    weeks={weeks}
                    onClickDay={openNewEvent}
                    onClickEvent={setEditingEvent}
                />
                <EventFormDialog
                    event={editingEvent}
                    onCancel={() => setEditingEvent(null)}
                    onSave={() => {
                        setEditingEvent(null);
                        refreshEvents();
                    }}
                    calendars={calendars}
                />
            </Box>
        </Box>
    );
}

function generateCalendar(
    date: string,
    allEvents: IEvent[],
    calendars: ICalendar[],
    calendarsSelected: boolean[]
): ICalendarCell[][] {
    const weeks: ICalendarCell[][] = [];
    const jsDate = new Date(date + "T12:00:00"); //data que a função getToday retornará
    const currentMonth = jsDate.getMonth();

    const currentDay = new Date(jsDate.valueOf()); //vai ser o dia 1 do mês em questão
    currentDay.setDate(1); //dia 1 do mês em questão
    const dayOfWeek = currentDay.getDay(); //vou usar para chegar na data que deve constar na posição 0 da minha semana -> domingo
    currentDay.setDate(1 - dayOfWeek); //cheguei no domingo da semana do dia 1 do mês em questão

    do {
        const week: ICalendarCell[] = [];
        for (let i = 0; i < 7; i++) {
            const monthStr = (currentDay.getMonth() + 1)
                .toString()
                .padStart(2, "0");
            const dayStr = currentDay.getDate().toString().padStart(2, "0");
            const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`;

            const events: IEventWithCalendar[] = [];
            for (const event of allEvents) {
                if (event.date === isoDate) {
                    const calIndex = calendars.findIndex(
                        (cal) => cal.id === event.calendarId
                    );
                    if (calendarsSelected[calIndex]) {
                        events.push({
                            ...event,
                            calendar: calendars[calIndex],
                        });
                    }
                }
            }
            week.push({
                dayOfMonth: dayStr,
                date: isoDate,
                events,
            });
            currentDay.setDate(currentDay.getDate() + 1);
        }
        weeks.push(week);
    } while (currentDay.getMonth() === currentMonth);

    return weeks;
}
