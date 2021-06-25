import express, { Request, Response } from 'express'
import { _mUsersCollection } from '../index'
import { User } from '../models/User'

export const getUsers = async (req: Request, res: Response) => {
    const query = { name: { $gt: 0 } }
    const options = {
        sort: { name: 1}, 
        // projection: {} // include/exclude fields
    }
    const result = await _mUsersCollection.find({}).limit(10).toArray()
    res.send(result)
}

export const getUserByEmail = (req: Request, res: Response) => {
    
}

export const createUser = (req: Request, res: Response) => {
    
}

export const editUser = (req: Request, res: Response) => {
    
}

export const deleteUser = (req: Request, res: Response) => {
    
}