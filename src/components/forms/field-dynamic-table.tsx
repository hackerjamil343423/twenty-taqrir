"use client";

import { useState } from "react";

interface DynamicTableProps {
  label?: string;
  error?: string;
  columns: { key: string; label: string; type?: "text" | "number" | "date" }[];
  rows: Record<string, string>[];
  onChange: (rows: Record<string, string>[]) => void;
  required?: boolean;
}

export const DynamicTable = ({
  label,
  error,
  columns,
  rows,
  onChange,
  required,
}: DynamicTableProps) => {
  const [rowData, setRowData] = useState<Record<string, string>[]>(
    rows.length > 0 ? rows : [Object.fromEntries(columns.map((c) => [c.key, ""]))]
  );

  const updateRow = (index: number, key: string, value: string) => {
    const updated = [...rowData];
    updated[index] = { ...updated[index], [key]: value };
    setRowData(updated);
    onChange(updated);
  };

  const addRow = () => {
    setRowData([...rowData, Object.fromEntries(columns.map((c) => [c.key, ""]))]);
    onChange([...rowData, Object.fromEntries(columns.map((c) => [c.key, ""]))]);
  };

  const removeRow = (index: number) => {
    if (rowData.length > 1) {
      const updated = rowData.filter((_, i) => i !== index);
      setRowData(updated);
      onChange(updated);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-midnight-ink">
          {label}
          {required && <span className="text-highlight-orange mr-1">*</span>}
        </label>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-right text-xs font-medium text-gunmetal-gray bg-faded-stone border-b border-soft-concrete"
                >
                  {col.label}
                </th>
              ))}
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-soft-concrete">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2">
                    <input
                      type={col.type || "text"}
                      value={row[col.key] || ""}
                      onChange={(e) => updateRow(rowIndex, col.key, e.target.value)}
                      className="w-full px-3 py-2 bg-canvas-white border border-soft-concrete rounded-[12px] text-sm text-midnight-ink focus:outline-none focus:border-highlight-orange"
                    />
                  </td>
                ))}
                <td className="px-2">
                  <button
                    type="button"
                    onClick={() => removeRow(rowIndex)}
                    className="w-8 h-8 flex items-center justify-center text-gunmetal-gray hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                    disabled={rowData.length === 1}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={addRow}
        className="mt-3 px-4 py-2 text-sm text-highlight-orange border border-highlight-orange/30 rounded-[160px] hover:bg-highlight-orange/10 transition-colors"
      >
        + إضافة صف
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
