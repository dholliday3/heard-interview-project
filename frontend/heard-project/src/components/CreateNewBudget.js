import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export const CreateNewBudget = (props) => {
    const [timeframe, setTimeframe] = useState()
    const [category, setCategory] = useState() 
    const [amount, setAmount] = useState()

    const classes = useStyles()


    const { open, onClose, familyName } = props;
    const handleClose = () => {
        onClose()
    }

    const handleTimeFrameChange = (e) => {
        e.preventDefault()
        setTimeframe(e.target.value)
    }

    const handleCategoryChange = (e) => {
        e.preventDefault()
        setCategory(e.target.value)
    }

    const handleAmountChange = (e) => {
        e.preventDefault()
        setAmount(e.target.value)
    }

    const handleSubmitBudget = () => {
        const fetchNewBudget = async (data) => {
            const params = new URLSearchParams({
                category: data.category, 
                timeframe: data.timeframe, 
                budgetAmount: data.budgetAmount, 
                familyName: familyName
            })

            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `budgets/?` + params, {
                method: 'POST', 
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json()
        }
        fetchNewBudget({category: category, timeframe: timeframe, budgetAmount: amount, familyName: familyName })
        handleClose()
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Create New Budget</DialogTitle>

            <List>
                <ListItem>
                    <TextField id="outlined-basic" label="Budget Category" variant="outlined" value={category} onChange={handleCategoryChange} />
                </ListItem>

                <ListItem>
                    <TextField id="outlined-basic" label="Budget Amount" variant="outlined" value={amount} onChange={handleAmountChange} />
                </ListItem>

                <ListItem>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Timeframe</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={timeframe}
                            onChange={handleTimeFrameChange}
                            label="Age"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'weekly'}>Weekly</MenuItem>
                        <MenuItem value={'monthly'}>Monthly</MenuItem>
                    </Select>
                </FormControl>
                </ListItem>

                <ListItem>
                    <Button onClick={handleSubmitBudget} variant='contained' color='primary'>
                        Create New Budget
                        <AddIcon />
                    </Button>
                </ListItem>
            </List>
        </Dialog>
    )
}