// Copyright 2023 Glowstik Inc. All rights reserved!
import {createTheme} from '@mui/material/styles'

const muiStyles = createTheme({
    components: {
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    position: 'absolute',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'linear-gradient(180deg, #fff, rgba(255, 255, 255, .66) 20%, rgba(255, 255, 255, .66) 80%, #fff)',
                    backdropFilter: 'blur(6px)',
                }
            }
        }
    }
})

export default muiStyles