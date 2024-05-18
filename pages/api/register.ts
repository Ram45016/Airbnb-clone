import bcrypt from 'bcrypt';
import prisma from '../../app/libs/prismadb';
import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
    req: NextApiRequest,res: NextApiResponse
){
    const { name, email, hashedpassword } = req.body;
    
      if (!name || !email || !hashedpassword) {
        return res.status(400).json({ error: 'Name, email, and hashedpassword are required' });
      }
    
      try {
          const hashedPassword = await bcrypt.hash(hashedpassword, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
              }
        });
        return res.status(201).json(user);
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Poda lusu' });
      }
}