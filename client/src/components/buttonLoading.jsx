import { Button, CircularProgress } from "@mui/material";


export default function ButtonLoading({text, disabled, onClick, loading}) {
    return (
        <Button onClick={onClick} color="primary" variant="contained" disabled={disabled}>
            {loading ? <CircularProgress size={24} /> : text}
        </Button>
    )
}
