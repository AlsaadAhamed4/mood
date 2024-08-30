import { PrismaClient } from "@prisma/client";

// here there is lot of way to do it as of now i am following with below approach , we can use prisma drivers to do it also

const globalForPrisma = globalThis as unknown as {   // this is like a global variables has unique type script type been used make as unknown and then et etc
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({   // this is log in dev mood to see 
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma