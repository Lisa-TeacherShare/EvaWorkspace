import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, X, Loader } from 'lucide-react';
import { parseCommand } from '@eva-ecosystem-nx/feature';

export default function CommandBar({ isOpen, onClose }) {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && input.trim()) {
            setLoading(true);
            setResult(null);
            try {
                const action = await parseCommand(input);
                setResult(action);
            } catch (error) {
                setResult({ response: 'Error processing command.' });
            } finally {
                setLoading(false);
            }
        }
        if (e.key === 'Escape') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
            <div className="flex items-start justify-center min-h-screen pt-20 px-4">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>

                {/* Modal */}
                <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl ring-1 ring-black/5 overflow-hidden transform transition-all">

                    {/* Input Area */}
                    <div className="flex items-center px-4 py-4 border-b border-gray-100">
                        <Sparkles className="h-6 w-6 text-indigo-500 animate-pulse" />
                        <input
                            ref={inputRef}
                            type="text"
                            className="flex-1 mx-4 text-lg text-gray-900 placeholder-gray-400 border-0 focus:ring-0 focus:outline-none"
                            placeholder="Ask Eva to do something... (e.g., 'Generate warning letter')"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="flex items-center gap-2">
                            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">ESC</kbd>
                            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                                <X className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="bg-gray-50 min-h-[100px] max-h-[60vh] overflow-y-auto p-4">
                        {loading ? (
                            <div className="flex items-center justify-center py-8 text-gray-500">
                                <Loader className="h-6 w-6 animate-spin mr-3" />
                                <span>Eva is thinking...</span>
                            </div>
                        ) : result ? (
                            <div className="prose prose-indigo max-w-none">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                                    AI Response
                                </h3>
                                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm whitespace-pre-wrap font-mono text-sm">
                                    {result.response}
                                </div>
                                <div className="mt-4 flex justify-end gap-2">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(result.response);
                                            onClose();
                                        }}
                                        className="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                    >
                                        Copy & Close
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                <p>Try commands like:</p>
                                <ul className="mt-2 space-y-1 text-sm">
                                    <li>"Generate a warning letter to debtors"</li>
                                    <li>"Create a 10-question Physics test"</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
