import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ICalendar, createEventEndPoint, IEditingEvent } from "./backend";

interface IEventFormDialogProps {
    event: IEditingEvent | null;
    calendars: ICalendar[];
    onCancel: () => void; //vai ser uma função que não retorna nada
    onSave: () => void; //vai ser uma função que não retorna nada
}

interface IValidationErrors {
    [field: string]: string; //existe uma chave do tipo string com um valor tipo string
}

export default function EventFormDialog(props: IEventFormDialogProps) {
    const [event, setEvent] = React.useState<IEditingEvent | null>(props.event);
    const [errors, setErrors] = React.useState<IValidationErrors>({});

    const inputDate = React.useRef<HTMLInputElement | null>();
    const inputDesc = React.useRef<HTMLInputElement | null>();

    React.useEffect(() => {
        setEvent(props.event);
        setErrors({});
    }, [props.event]);

    function validate(): boolean {
        if (event) {
            const currentErrors: IValidationErrors = {};
            if (!event.date) {
                currentErrors["date"] = "A data deve ser preenchida";
                inputDate.current?.focus();
            }
            if (!event.desc) {
                currentErrors["desc"] = "A descrição deve ser preenchida";
                inputDesc.current?.focus();
            }
            setErrors(currentErrors);
            return Object.keys(currentErrors).length === 0;
        }
        return false;
    }

    return (
        <React.Fragment>
            <Dialog
                open={!!event}
                onClose={props.onCancel}
                PaperProps={{
                    component: "form",
                    onSubmit: (evt: React.FormEvent<HTMLFormElement>) => {
                        evt.preventDefault();
                        if (event) {
                            if (validate()) {
                                createEventEndPoint(event).then(props.onSave);
                            }
                        }
                        // console.log(event);
                    },
                }}
            >
                <DialogTitle>Criar Evento</DialogTitle>
                <DialogContent>
                    {event && (
                        <>
                            <TextField
                                inputRef={inputDate}
                                type="date"
                                margin="normal"
                                label="Data"
                                fullWidth
                                value={event.date}
                                onChange={(evt) =>
                                    setEvent({
                                        ...event,
                                        date: evt.target.value,
                                    })
                                }
                                error={!!errors.date}
                                helperText={errors.date}
                            />
                            <TextField
                                inputRef={inputDesc}
                                autoFocus
                                type="text"
                                margin="normal"
                                label="Descrição"
                                fullWidth
                                value={event.desc}
                                onChange={(evt) =>
                                    setEvent({
                                        ...event,
                                        desc: evt.target.value,
                                    })
                                }
                                error={!!errors.desc}
                                helperText={errors.desc}
                            />
                            <TextField
                                type="time"
                                margin="normal"
                                label="Hora"
                                fullWidth
                                value={event.time ?? ""} //material ui nao pode ser undefined
                                onChange={(evt) =>
                                    setEvent({
                                        ...event,
                                        time: evt.target.value,
                                    })
                                }
                            />
                            <FormControl fullWidth>
                                <InputLabel id="select-calendar">
                                    Agenda
                                </InputLabel>
                                <Select
                                    labelId="select-calendar"
                                    value={event.calendarId}
                                    onChange={(evt) =>
                                        setEvent({
                                            ...event,
                                            calendarId: evt.target
                                                .value as number,
                                        })
                                    }
                                >
                                    {props.calendars.map((calendar) => (
                                        <MenuItem
                                            key={calendar.id}
                                            value={calendar.id}
                                        >
                                            {calendar.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={() => props.onCancel()}>
                        Cancelar
                    </Button>
                    <Button type="submit" color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
