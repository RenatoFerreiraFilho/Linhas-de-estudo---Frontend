import { Box, Button, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";
import { IUser, signInEndpoint } from "./backend";

interface ILoginScreenProps {
    onSignIn: (user: IUser) => void;
}

export function LoginScreen(props: ILoginScreenProps) {
    const [email, setEmail] = useState("danilo@email.com");
    const [password, setPassword] = useState("1234");
    const [error, setError] = useState("");

    function signIn(evt: React.FormEvent) {
        evt.preventDefault();
        signInEndpoint(email, password).then(
            (user) => {
                props.onSignIn(user);
            },
            (e) => {
                setError("E-mail ou senha incorretos");
            }
        );
    }
    return (
        <Container maxWidth="sm">
            <h1>Agenda React</h1>
            <p>
                Digite e-mail e senha para entrar no sistema. Para testar, use o
                email
                <kbd>danilo@email.com</kbd> e a senha <kbd>1234</kbd>
            </p>
            <form onSubmit={signIn}>
                <TextField
                    margin="normal"
                    label="E-mail"
                    fullWidth
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                />
                <TextField
                    margin="normal"
                    label="Senha"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                />
                {error && (
                    <div
                        style={{
                            backgroundColor: "rgb(253, 236, 234)",
                            borderRadius: "4px",
                            padding: "16px",
                            margin: "16px 0",
                        }}
                    >
                        {error}
                    </div>
                )}
                <Box textAlign={"right"} marginTop={"16px"}>
                    <Button type="submit" variant="contained" color="primary">
                        Entrar
                    </Button>
                </Box>
            </form>
        </Container>
    );
}
