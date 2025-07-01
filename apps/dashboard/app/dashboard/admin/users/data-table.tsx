// apps/dashboard/app/dashboard/admin/users/data-table.tsx
'use client';

import { useState } from 'react';
import {
    useReactTable,
    ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    SortingState,
    flexRender,
} from '@tanstack/react-table';

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface DataTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
}

export function DataTable<T>({ columns, data }: DataTableProps<T>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pageSize, setPageSize] = useState<number>(10);

    const table = useReactTable<T>({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageIndex: 0, pageSize } },
    });

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(hg => (
                        <TableRow key={hg.id}>
                            {hg.headers.map(header => (
                                <TableHead
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="cursor-pointer select-none"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No data.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    <Button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                        {'<<'}
                    </Button>
                    <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        {'<'}
                    </Button>
                </div>

                <span>
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>
                </span>

                <div className="flex gap-2">
                    <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        {'>'}
                    </Button>
                    <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                        {'>>'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
