'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ParsedData = Record<string, string>[];

interface DataContextType {
    data: ParsedData;
    setData: (data: ParsedData) => void;
    headers: string[];
    setHeaders: (headers: string[]) => void;
    rawCsv: string;
    setRawCsv: (csv: string) => void;
    fileName: string;
    setFileName: (name: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<ParsedData>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [rawCsv, setRawCsv] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");

    return (
        <DataContext.Provider value={{
            data, setData,
            headers, setHeaders,
            rawCsv, setRawCsv,
            fileName, setFileName
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
