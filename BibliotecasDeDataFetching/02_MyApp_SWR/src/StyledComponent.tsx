import React, { useState } from "react";
import styled, { ThemeProvider, css, keyframes } from "styled-components";

const StyledHeader = styled.h1`
    color: ${(props) => props.theme.main};
    font-size: 42px;
`;
//posso usar styled("p") ou styled.p
const StyledData = styled.p`
    color: ${(props) => props.theme.secondary};
    font-size: 24px;
    font-weight: 700;
`;
type TStyledButtonProps = {
    variant?: "success" | "failed";
};

// const RotateKeyFrame = keyframes`
//     from {
//         transform: rotate(0deg)
//     }
//     to {
//         transform: rotate(360deg)
//     }
// `;

const themeBlue = {
    main: "blue",
    secondary: "#8d8dff",
};
const themeRed = {
    main: "red",
    secondary: "#ff4343",
};

const StyledButton = styled.button<TStyledButtonProps>`
    background-color: transparent;
    border-radius: 8px;
    border: 2px solid;
    padding: 8px 16px;

    &:hover {
        cursor: pointer;
        background-color: lightgray;
    }

    ${(props) => {
        if (props.variant === "success") {
            return css`
                border-color: green;
                color: green;
            `;
        }
        if (props.variant === "failed") {
            return css`
                border-color: red;
                color: red;
            `;
        }
    }};
`;
// //a seguir vou criar uma extensao de um styled já criado:
// const StyledSuccessButton = styled(StyledButton)`
//     border-color: green;
//     color: green;
// `;
// const StyledFailedButton = styled(StyledButton)`
//     border-color: red;
//     color: red;
// `;

function StyledComponent() {
    const [currentTheme, setCurrentTheme] = useState(themeBlue);
    return (
        <div className="App">
            <ThemeProvider theme={currentTheme}>
                <StyledHeader>Renato Ferreira</StyledHeader>
                <div>
                    <StyledButton
                        onClick={() =>
                            setCurrentTheme(
                                currentTheme === themeBlue
                                    ? themeRed
                                    : themeBlue
                            )
                        }
                    >
                        Toggle Theme
                    </StyledButton>
                </div>
                <StyledData>renato@teste.com</StyledData>
                <StyledData>41 9882233333</StyledData>
                <StyledData>Brasileiro</StyledData>

                <StyledButton variant="success">Adicionar</StyledButton>
                <StyledButton variant="failed" style={{ marginLeft: "8px" }}>
                    Remover
                </StyledButton>
                <StyledButton style={{ marginLeft: "8px" }}>
                    Detalhes
                </StyledButton>
            </ThemeProvider>
        </div>
    );
}

export default StyledComponent;
