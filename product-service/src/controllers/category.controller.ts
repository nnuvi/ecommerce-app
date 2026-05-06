import { Request, Response } from 'express';
import { Prisma } from '../../generated/prisma/client.js';
import { prisma } from '../lib/prisma.js';

export const createCategory = async (req: Request, res: Response) => {
    console.log('Here: req.body', req.body)
     
    const data: Prisma.CategoryCreateInput = req.body;

    const category = await prisma.category.create({ data });
    res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Prisma.CategoryUpdateInput = req.body;
  console.log('Here: id ', id)
  console.log('Here: body', data)

  const category = await prisma.category.update({
    where: { id: Number(id)},
    data,
  });

  return res.status(200).json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await prisma.category.delete({
    where: { id: Number(id)},
  });

  return res.status(200).json(category);
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  return res.status(200).json(categories);
};