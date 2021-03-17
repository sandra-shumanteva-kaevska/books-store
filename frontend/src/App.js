import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import { ThemeProvider } from '@material-ui/core/styles'
import Loader from 'react-loader-spinner'

import background from './assets/background.jpg'
import { myTheme } from './theme/myTheme'
import { makeStyles } from '@material-ui/core/styles'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Books } from './pages/Books'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: `100vh`,
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    container: {
        display: "flex",
        flexGrow: '1',
        flexDirection: "column",
        padding: '10px',
        justifyContent: 'center'
    }
}))
export const App = () => {
    const classes = useStyles()
    const [loader, setLoader] = useState(false)

    return (
        <ThemeProvider theme={myTheme}>asdfasdfasdf
            <Router>
                <Box className={classes.root}>
                    <Navbar />
                    {loader && <Loader
                        type='Puff'
                        color="red"
                        height={400}
                        width={400}
                    />}
                </Box>
                <Switch>
                    <Route path='/' exact>
                        <Home />

                    </Route>

                    <Route path='/books' exact>
                        <Books showLoader={setLoader} />

                    </Route>

                    <Route path='/books/:id' exact>

                    </Route>

                    <Route path='/books/:id/order' exact>

                    </Route>
                    <Route path='/order/:id' exact>

                    </Route>

                </Switch>
            </Router>
        </ThemeProvider>
    )
}