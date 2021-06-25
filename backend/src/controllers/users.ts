import express, { Request, Response } from 'express'
import { _mUsersCollection } from '../index'
import { User } from '../models/User'
import mongodb, { ObjectId } from 'mongodb'

export const getUsers = async (req: Request, res: Response) => {
    const query = { name: { $gt: 0 } }
    const options = {
        sort: { name: 1}, 
        // projection: {} // include/exclude fields
    }
    const result = await _mUsersCollection.find({}).limit(10).toArray()
    res.send(result)
}

export const getUserByEmail = async (req: Request, res: Response) => {
    console.log('req params', req.params)
    const result = await _mUsersCollection.findOne({ email: req.params.email})
    console.log('getUserByEmail', result)
    res.send(result)
}

export const createUser = async (req: Request, res: Response) => {
    const data = { name: req.query.name ? req.query.name : 'No Name', 
        email: req.query.email, pw: req.query.pw, 
        role: req.query.role ? req.query.role : 'parent', 
        family: new ObjectId() }; //TODO: handle logic for family id
    const result = await _mUsersCollection.insertOne(data)
    console.log('createUser', result)
    res.send(result)
}

export const editUser = (req: Request, res: Response) => {
    
}

export const deleteUser = (req: Request, res: Response) => {
    
}