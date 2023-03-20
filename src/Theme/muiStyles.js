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
                    backgroundImage: 'linear-gradient(180deg, #fff, rgba(255, 255, 255, 0.5) 10%, rgba(255, 255, 255, 0.6) 20%, rgba(255, 255, 255, 0.66) 33%, rgba(255, 255, 255, 0.66) 67%, rgba(255, 255, 255, 0.6) 80%, rgba(255, 255, 255, 0.5) 90%, #fff)',
                    backdropFilter: 'blur(6px)',
                    // backgroundBlendMode: 'normal',
                    backgroundColor: 'transparent'
                }
            }
        }
    }
})

export default muiStyles