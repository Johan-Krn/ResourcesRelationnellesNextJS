"use client"
import React, { useState } from "react";

const Accordion = ({ questions }) => {
    const [activeQuestion, setActiveQuestion] = useState(null);

    const handleQuestionClick = (index) => {
        setActiveQuestion(index === activeQuestion ? null : index);
    };

    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden">
            {questions.map((question, index) => (
                <div
                    key={question.id}
                    className={`border-none border-gray-200 ${
                        index === activeQuestion ? "bg-gray-100" : ""
                    }`}
                >
                    <div
                        className="p-4 cursor-pointer"
                        onClick={() => handleQuestionClick(index)}
                    >
                        <h3 className="text-lg font-medium text-gray-900">{question.title}</h3>
                    </div>
                    {index === activeQuestion && (
                        <div className="p-4">
                            <p className="text-gray-700">{question.content}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
