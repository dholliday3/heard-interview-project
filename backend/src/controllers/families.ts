import express, { Request, Response } from 'express'
import { _mFamiliesCollection, _mUsersCollection } from '../index'
import mongodb, { ObjectId } from 'mongodb'
import { createNoSubstitutionTemplateLiteral } from 'typescript'


export const getFamilies = (req: Request, res: Response) => {

}

export const getFamilyByEmail = async (req: Request, res: Response) => {
    // get user -> family id from user 
    console.log('req', req.params)
    const user = await _mUsersCollection.findOne({ email: req.params.email});
    console.log('user', user)
    const id = new ObjectId(user.familyId)
    const family = await _mFamiliesCollection.findOne({ _id: id })
    console.log('getFamilyByEmail', family)
    res.send(family)
}

export const getFamilyByName = async (req: Request, res: Response) => {
    const result = await _mFamiliesCollection.findOne({ familyName: req.params.name })
    console.log('getFaimlyByName', result)
    res.send(result)
}

export const createFamily = (req: Request, res: Response) => {

}

export const editFamily = (req: Request, res: Response) => {

}

export const deleteFamily = (req: Request, res: Response) => {

}

