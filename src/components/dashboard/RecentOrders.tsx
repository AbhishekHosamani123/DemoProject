"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
    orderId: string;
    orderDate: number; // Excel date format or timestamp
    customerName: string;
    state: string;
    city: string;
    category: string;
    subCategory: string;
    amount: number;
    profit: number;
    quantity: number;
}

interface RecentOrdersProps {
    orders: Order[];
}

// Convert Excel date serial to JS Date
const excelDateToJSDate = (serial: number) => {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toLocaleDateString();
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredOrders = orders.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Card className="bg-card/60 backdrop-blur-sm border-primary/20 shadow-lg shadow-black/20 mt-6">
            <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <CardTitle className="text-xl font-semibold text-primary">Recent Orders</CardTitle>
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search orders..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Profit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentOrders.length > 0 ? (
                                currentOrders.map((order) => (
                                    <TableRow key={order.orderId}>
                                        <TableCell className="font-medium">{order.orderId}</TableCell>
                                        <TableCell>{excelDateToJSDate(order.orderDate)}</TableCell>
                                        <TableCell>{order.customerName}</TableCell>
                                        <TableCell>{order.city}, {order.state}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{order.category}</span>
                                                <span className="text-xs text-muted-foreground">{order.subCategory}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">₹{order.amount.toLocaleString()}</TableCell>
                                        <TableCell className={cn("text-right font-medium", order.profit >= 0 ? "text-green-500" : "text-red-500")}>
                                            ₹{order.profit.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center h-24">
                                        No orders found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
