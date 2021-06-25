import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => createStyles({
    root: {
        width: '100%',
        height: '100%'
    }
}))
export const HomePage = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <h1>Heard Interview Project</h1>
        </div>
    )
}