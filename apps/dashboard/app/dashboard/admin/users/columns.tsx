// columns.tsx

import { ColumnDef } from '@tanstack/react-table';

export type User = {
    email: string;
    name: string;
    avatar: string;
    role: string;
};

export const columns: ColumnDef<User>[] = [
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'role', header: 'Role' },
];
