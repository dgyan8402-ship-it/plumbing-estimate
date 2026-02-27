/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Calculator, Receipt, Package, DollarSign, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlumbingItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export default function App() {
  const [items, setItems] = useState<PlumbingItem[]>([
    { id: '1', name: 'Copper Pipe 15mm (3m)', quantity: 5, unitPrice: 12.50 },
    { id: '2', name: 'Elbow Joint 15mm', quantity: 10, unitPrice: 0.85 },
  ]);

  const addItem = () => {
    const newItem: PlumbingItem = {
      id: crypto.randomUUID(),
      name: '',
      quantity: 1,
      unitPrice: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof PlumbingItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const overallTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  }, [items]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900 font-sans p-4 md:p-8 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto print:max-w-none">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 text-white px-4 py-2 rounded-lg transform -skew-x-12 shadow-lg print:shadow-none print:transform-none">
              <h1 className="text-4xl font-black tracking-tighter italic">TEKOF</h1>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest">Plumbing Solutions</p>
              <p className="text-xs text-slate-400">Inventory Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50 transition-all shadow-sm print:hidden"
            >
              <Printer className="w-4 h-4" /> Print Quote
            </button>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 print:border-none print:shadow-none">
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Grand Total</span>
                <span className="text-2xl font-bold text-slate-900">
                  ${overallTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center print:hidden">
                <Receipt className="w-5 h-5 text-slate-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Table Card */}
        <div className="bg-white rounded-xl shadow-md border border-slate-300 overflow-hidden print:shadow-none print:border-slate-400">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border-hidden">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600 border border-slate-300">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" /> Item Name
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600 w-32 text-center border border-slate-300">
                    Qty
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600 w-40 border border-slate-300">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" /> Unit Price
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600 w-40 text-right border border-slate-300">
                    Total
                  </th>
                  <th className="px-6 py-4 w-16 border border-slate-300"></th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 border border-slate-200">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          placeholder="e.g. PVC Pipe 110mm"
                          className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-300 font-medium"
                        />
                      </td>
                      <td className="px-6 py-4 border border-slate-200">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-center focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 outline-none transition-all"
                        />
                      </td>
                      <td className="px-6 py-4 border border-slate-200">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className="w-full bg-slate-50 border border-slate-200 rounded pl-7 pr-3 py-1 focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 outline-none transition-all"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-slate-800 border border-slate-200 bg-slate-50/30">
                        ${(item.quantity * item.unitPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-right border border-slate-200">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Table Footer / Add Button */}
          <div className="p-6 bg-slate-100 border-t border-slate-300 flex justify-between items-center">
            <button
              onClick={addItem}
              className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">TEKOF Inventory</p>
              <p className="text-sm text-slate-400">
                {items.length} {items.length === 1 ? 'line item' : 'line items'}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile View Warning / Hint */}
        <p className="mt-6 text-center text-slate-400 text-xs">
          Tip: Use Tab to navigate quickly between fields.
        </p>
      </div>
    </div>
  );
}
