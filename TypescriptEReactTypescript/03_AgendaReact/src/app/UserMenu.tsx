import { Box, IconButton } from "@mui/material";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext } from "react";
import { authContext } from "./authContext";

export function UserMenu() {
    const { user, signOut } = useContext(authContext);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <IconButton
                aria-label="Perfil"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <Avatar>
                    <Icon>person</Icon>
                </Avatar>
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Box
                    padding={"16px"}
                    textAlign={"center"}
                    borderBottom={"1px solid rgb(224,224,224)"}
                >
                    <Box display={"flex"} justifyContent={"center"}>
                        <Avatar>
                            <Icon>person</Icon>
                        </Avatar>
                    </Box>
                    <div>{user.name}</div>
                    <small>{user.email}</small>
                </Box>
                <MenuItem onClick={signOut}>Sair</MenuItem>
            </Menu>
        </div>
    );
}
