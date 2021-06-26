import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import { Paper } from '@material-ui/core';
import { CreateNewBudget } from '../components/CreateNewBudget';

const useStyles = makeStyles(() => createStyles({
    root: {
        width: '100%',
        height: '100%', 
        paddingTop: '30px'
    }, 
    newBudget: {
        height: '100%',
        padding: '10px'
    }, 
    yourBudgets: {
        marginTop: '20px', 
        padding: '10px'
    },
    budgetItem: {
        display: 'flex', 
        flexDirection: 'row',
        width: '100%', 
        justifyContent: 'space-evenly'
    }
}))

const testUser = {
    email: 'danhollid@hello.com', 
    familyName: 'Holliday'
}
export const HomePage = () => {
    const classes = useStyles()

    const [openNewBudget, setOpenNewBudget] = useState(false)
    const [user, setUser] = useState()
    const [family, setFamily] = useState()
    const [budgets, setBudgets] = useState(0) 

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `users/${testUser.email}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const userResponse = await response.json()
            console.log('user', userResponse)
            setUser(userResponse)
        }
        const fetchFamily = async () => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `families/name/${testUser.familyName}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const familyResponse = await response.json()
            console.log('family', familyResponse)
            setFamily(familyResponse)
        }
        const fetchBudgets = async () => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `budgets/familyname/${testUser.familyName}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const budgetResponse = await response.json()
            console.log('budgets', budgetResponse)
            setBudgets(budgetResponse)
        }

        fetchUser().catch(e => {
            console.log('oops problemw wth fetch: ' + e.message)
        })
        fetchFamily().catch(e => {
            console.log('oops problemw wth fetch: ' + e.message)
        })
        fetchBudgets().catch(e => {
            console.log('oops problemw wth fetch: ' + e.message)
        })
    }, [])

    const handleNewBudget = () => {
        console.log('create new budget')
    }

    const handleClickOpen = () => {
        setOpenNewBudget(true)
    }

    const handleClose = () => {
        setOpenNewBudget(false)
    }

    return (
        <div className={classes.root}>
            <h1>{testUser.familyName} Expense Tracker</h1>


            <Paper className={classes.newBudget}>

                <h2>Create a New Budget</h2>
                <Button onClick={handleClickOpen} variant='contained' color='primary'>
                    Create New Budget
                    <AddIcon />
                </Button>

                <CreateNewBudget open={openNewBudget} onClose={handleClose} />
            </Paper>
   
            <Paper className={classes.yourBudgets}>
                <h2>Your Budgets</h2>
                <div className={classes.budgetItem}>
                    <h3>Category</h3>
                    <h3>Amount Spent</h3>
                    <h3>Budgeted Amount</h3>
                    <h3>Time Frame</h3>
                </div>
                {
                    budgets && budgets.map(b => {
                        return (
                            <div className={classes.budgetItem}>
                                <div>{b.category}</div>
                                <div>{b.currentSpend}</div>
                                <div>{b.budgetAmount}</div>
                                <div>{b.timeframe}</div>
                            </div>
                        )
                    })
                }
            </Paper>
        </div>
    )
}