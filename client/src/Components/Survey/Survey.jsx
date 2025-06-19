import React from "react";

function Survey(){

    const [satisfaction, setSatisfaction] = React.useState("");
    const [remarks, setRemarks] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Here you can handle the form submission, e.g., send to API
    };

    // Allow editing after submission
    const handleEdit = () => {
        setSubmitted(false);
    };

    // State for edit mode (admin editing questions/labels)
    const [editMode, setEditMode] = React.useState(false);

    // Editable questions/labels
    const [surveyTitle, setSurveyTitle] = React.useState("Customer Satisfaction Survey");
    const [surveyDesc, setSurveyDesc] = React.useState("Help us improve by taking this short survey. We value your feedback.");
    const [satisfactionQuestion, setSatisfactionQuestion] = React.useState("How satisfied are you with the service you received?");
    const [satisfactionOptions, setSatisfactionOptions] = React.useState([
        "Highly satisfied",
        "Moderately satisfied",
        "Satisfied",
        "Barely Satisfied",
        "Not Satisfied"
    ]);
    const [remarksLabel, setRemarksLabel] = React.useState("Remarks");

    // For editing satisfaction options
    const handleOptionChange = (idx, value) => {
        const newOptions = [...satisfactionOptions];
        newOptions[idx] = value;
        setSatisfactionOptions(newOptions);
    };

    const handleAddOption = () => {
        setSatisfactionOptions([...satisfactionOptions, ""]);
    };

    const handleRemoveOption = (idx) => {
        if (satisfactionOptions.length > 1) {
            setSatisfactionOptions(satisfactionOptions.filter((_, i) => i !== idx));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-2 md:py-10">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden"
                style={{ marginTop: "40px" }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 text-center rounded-t-2xl">
                    <h2 className="text-2xl font-extrabold mb-2">{surveyTitle}</h2>
                    <p className="text-base opacity-90">{surveyDesc}</p>
                </div>

                {/* Satisfaction Section */}
                <div className="p-6">
                    <p className="text-gray-800 font-medium mb-4">{satisfactionQuestion}</p>
                    <div className="flex flex-col gap-3">
                        {satisfactionOptions.map((option) => (
                            <label
                                key={option}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
                                    satisfaction === option
                                        ? "bg-blue-100 border-2 border-blue-700"
                                        : "hover:bg-blue-50"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="satisfaction"
                                    value={option}
                                    checked={satisfaction === option}
                                    onChange={() => setSatisfaction(option)}
                                    className="accent-blue-700"
                                    required
                                    disabled={submitted}
                                />
                                <span className="text-gray-900">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Remarks Section */}
                <div className="px-6 pb-2">
                    <label className="block text-gray-800 font-medium mb-2">{remarksLabel}</label>
                    <textarea
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                        rows="4"
                        placeholder="Write your feedback here..."
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        required
                        disabled={submitted}
                    />
                </div>

                {/* Submit/Edit Buttons */}
                <div className="px-6 pb-6 flex flex-col gap-2">
                    {!submitted ? (
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white py-3 rounded-lg font-semibold text-lg shadow hover:from-blue-800 hover:to-blue-600 transition"
                        >
                            Submit
                        </button>
                    ) : (
                        <>
                            <div className="mt-4 text-green-700 text-center font-medium">
                                Thank you for your feedback!
                            </div>
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="w-full mt-4 bg-gray-200 text-blue-900 py-2 rounded-lg font-semibold text-base shadow hover:bg-gray-300 transition"
                            >
                                Edit Response
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Survey;