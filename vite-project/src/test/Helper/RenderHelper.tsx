import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';


export const appRenderer = (component: JSX.Element) => {
    if (typeof (window) === "undefined") {
        throw new Error("This function should be called on browser or jsdom")
    }
    return render(
            <ThemeProvider theme={createTheme({})}>
                    <BrowserRouter>
                        {component}
                    </BrowserRouter>
            </ThemeProvider>
    )
}