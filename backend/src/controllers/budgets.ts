import express, { Request, Response } from 'express'
import { _mBudgetsCollection, _mExpensesCollection, _mFamiliesCollection } from '../index'
import mongodb, { ObjectId } from 'mongodb'

export const getBudgets = (req: Request, res: Response) => {

}

export const getBudgetById = async (req: Request, res: Response) => {
    const result = await _mBudgetsCollection.findOne({ _id: new ObjectId(req.params.id) })
    console.log('getbudgetsbyid', result)
    res.send(result)
}

export const getBudgetsByFamilyName = async (req: Request, res: Response) => {
    // TODO: need to get array of budgets from family 
    // TODO: get all budgets and return 
    const family = await _mFamiliesCollection.findOne({ familyName: req.params.familyName })
    const budgetIds = family.budgets.map((id: any) => new ObjectId(id))
    console.log('budgetIds', budgetIds)
    const budgets = await _mBudgetsCollection.find({ _id: { $in: budgetIds } }).toArray()
    // const budgets = await family.budgets.map(async (id: any) => await _mBudgetsCollection.findOne({ _id: new ObjectId(id) }))
    
    console.log(budgets)
    res.send(budgets)
}

// TODO: figure out how to keep track of current month and update budget
// -> add field: currentMonth
// -> whenever user signs on budget is updated or when user adds expense
export const createBudget = async (req: Request, res: Response) => {
    console.log(req.query)
    const budgetAmt = Number(req.query.budgetAmount)
    const data = { _id: new ObjectId(), category: req.query.category, timeframe: req.query.timeframe, budgetAmount: budgetAmt, currentSpend: 0, expenses: [] }
    const result = await _mBudgetsCollection.insertOne(data)

    // Update family budgets 
    const filter = { familyName: req.query.familyName }
    const options = { upsert: true }
    const updateData = { $push: {
        budgets: data._id
    }}
    const familyUpdate = await _mFamiliesCollection.updateOne(filter, updateData, options)
    // console.log('create budget', result)
    res.send(data)
}

export const editBudgetById = (req: Request, res: Response) => {
    
}

export const deleteBudgetById = (req: Request, res: Response) => {
    
}



