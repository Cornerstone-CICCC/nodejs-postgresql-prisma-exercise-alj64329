import { PrismaClient, Product } from "../generated/prisma/client";

const prisma = new PrismaClient()

//Fetch all users
const fetchAll = async()=>{
    return await prisma.product.findMany()
}

//create user
const create = async( data:Omit<Product, 'id'>)=>{
    return await prisma.product.create({data})
}

//fetch by id
const fetchById = async(id:number)=>{
    return await prisma.product.findUnique({
        where:{id} 
    })
}

const editById = async(id:number, data:Partial<Product>)=>{
    return await prisma.product.update({
        where:{id},
        data
    })
}

//delete

const deleteById = async(id:number)=>{
    return await prisma.product.delete({
        where:{id}
    })
}

export default{
    fetchAll,
    create,
    fetchById,
    editById,
    deleteById
}