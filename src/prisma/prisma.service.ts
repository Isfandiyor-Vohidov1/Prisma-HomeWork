import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    findMany(arg0: { include: { products: boolean; }; }) {
        throw new Error('Method not implemented.');
    }
    async onModuleInit() {
        await this.$connect();
    }
}
