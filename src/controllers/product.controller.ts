import { Request, Response } from "express";
import { Product } from "../generated/prisma/client";
import productModel from "../models/product.model";

const getAllProducts = async(req:Request, res:Response)=>{
    try{
        const products = await productModel.fetchAll()
        res.status(200).json(products)
    }catch(err){
        console.error(err)
        res.status(500).json({message:"Server error"})
    }
}

const addProduct = async(req:Request<{}, Omit<Product,'id'>>, res:Response)=>{
    try {
        const {productName, price} = req.body

        const user = await productModel.create({
            productName,
            price
        })

        res.status(201).json(user)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
}

const getProductById = async(req:Request<{id:string}>, res:Response)=>{
    const id = Number(req.params.id)
    try {
        const product = await productModel.fetchById(id)

        res.status(201).json(product)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
}

const updateProductById = async(req:Request<{id:string}, Partial<Product>>, res:Response)=>{
    const {productName, price} = req.body
    const id = Number(req.params.id)
    try {
        const updatedProduct = await productModel.editById(id, {
            productName,
            price
        })
        res.status(201).json(updatedProduct)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server Error"})
    }
}

const deleteProductById = async(req:Request<{id:string}>, res:Response)=>{
    const id = Number(req.params.id)

    try {
        const product = await productModel.deleteById(id)
        if(!product){
            res.status(404).json({message:"User not found"})
            return
        }
        res.status(200).json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server error"})    
    }
}
export default{
    getAllProducts,
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById
}
