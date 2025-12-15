import React, { useState } from 'react';
import { BookOpen, Clock, GraduationCap, Layers, Printer, Sparkles } from 'lucide-react';
import { generateLessonPlan } from '@eva-ecosystem-nx/feature';

export default function LessonArchitect() {
    const [formData, setFormData] = useState({
        topic: '',
        subject: 'Mathematics',
        level: 'JSS1',
        duration: '40 mins'
    });
    const [loading, setLoading] = useState(false);
    const [lessonPlan, setLessonPlan] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const plan = await generateLessonPlan(
                formData.topic,
                formData.subject,
                formData.level,
                formData.duration
            );
            setLessonPlan(plan);
        } catch (error) {
            console.error("Failed to generate lesson plan", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Eva Lesson Architect</h1>
                    <p className="mt-1 text-sm text-gray-500">Generate structured lesson plans instantly with AI.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                            <Layers className="w-5 h-5 mr-2 text-indigo-500" />
                            Lesson Details
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subject</label>
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                >
                                    <option>Mathematics</option>
                                    <option>English Language</option>
                                    <option>Basic Science</option>
                                    <option>Social Studies</option>
                                    <option>Physics</option>
                                    <option>Chemistry</option>
                                    <option>Biology</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Class Level</label>
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                >
                                    <option>JSS1</option>
                                    <option>JSS2</option>
                                    <option>JSS3</option>
                                    <option>SS1</option>
                                    <option>SS2</option>
                                    <option>SS3</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Topic</label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    placeholder="e.g. Pythagoras Theorem"
                                    value={formData.topic}
                                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Duration</label>
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                >
                                    <option>40 mins</option>
                                    <option>60 mins</option>
                                    <option>80 mins (Double Period)</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Sparkles className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="-ml-1 mr-2 h-4 w-4" />
                                        Generate Plan
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Result Display */}
                <div className="lg:col-span-2">
                    {lessonPlan ? (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-indigo-900">{lessonPlan.topic}</h2>
                                    <div className="flex gap-4 mt-1 text-sm text-indigo-700">
                                        <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1" /> {lessonPlan.subject}</span>
                                        <span className="flex items-center"><GraduationCap className="w-4 h-4 mr-1" /> {lessonPlan.level}</span>
                                        <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {lessonPlan.duration}</span>
                                    </div>
                                </div>
                                <button className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full" title="Print">
                                    <Printer className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <section>
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Learning Objectives</h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                                        {lessonPlan.objectives.map((obj, i) => (
                                            <li key={i}>{obj}</li>
                                        ))}
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Materials Needed</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {lessonPlan.materials.map((mat, i) => (
                                            <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {mat}
                                            </span>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Introduction</h3>
                                    <p className="text-gray-700 leading-relaxed">{lessonPlan.introduction}</p>
                                </section>

                                <section>
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Main Activity</h3>
                                    <p className="text-gray-700 leading-relaxed">{lessonPlan.mainActivity}</p>
                                </section>

                                <section>
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Assessment</h3>
                                    <p className="text-gray-700 leading-relaxed">{lessonPlan.assessment}</p>
                                </section>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white shadow rounded-lg p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                            <div className="p-4 bg-indigo-50 rounded-full mb-4">
                                <BookOpen className="w-12 h-12 text-indigo-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No Lesson Plan Generated</h3>
                            <p className="mt-2 text-gray-500 max-w-sm">
                                Fill out the form on the left and click "Generate Plan" to create a custom lesson plan for your class.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
