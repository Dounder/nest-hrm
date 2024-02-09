import { registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

registerEnumType(Role, { name: 'UserRole', description: 'Roles of the user' });
