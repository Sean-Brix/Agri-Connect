import React from 'react';

function Survey() {
    const [satisfaction, setSatisfaction] = React.useState('');
    const [remarks, setRemarks] = React.useState('');
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
    const [surveyTitle, setSurveyTitle] = React.useState(
        'Customer Satisfaction Survey'
    );
    const [surveyDesc, setSurveyDesc] = React.useState(
        'Help us improve by taking this short survey. We value your feedback.'
    );
    const [satisfactionQuestion, setSatisfactionQuestion] = React.useState(
        'How satisfied are you with the service you received?'
    );
    const [satisfactionOptions, setSatisfactionOptions] = React.useState([
        'Highly satisfied',
        'Moderately satisfied',
        'Satisfied',
        'Barely Satisfied',
        'Not Satisfied',
    ]);
    const [remarksLabel, setRemarksLabel] = React.useState('Remarks');

    // For editing satisfaction options
    const handleOptionChange = (idx, value) => {
        const newOptions = [...satisfactionOptions];
        newOptions[idx] = value;
        setSatisfactionOptions(newOptions);
    };

    const handleAddOption = () => {
        setSatisfactionOptions([...satisfactionOptions, '']);
    };

    const handleRemoveOption = (idx) => {
        if (satisfactionOptions.length > 1) {
            setSatisfactionOptions(
                satisfactionOptions.filter((_, i) => i !== idx)
            );
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-8 px-4 flex items-center justify-center z-50">
            <div className="w-full max-w-md max-h-screen overflow-auto">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden border border-blue-100"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white p-6 text-center rounded-t-2xl">
                        <h2 className="text-2xl font-bold mb-2 tracking-tight drop-shadow">
                            {surveyTitle}
                        </h2>
                        <p className="text-base opacity-90">{surveyDesc}</p>
                    </div>

                    {/* Satisfaction Section */}
                    <div className="p-6 pb-4">
                        <p className="text-gray-900 font-semibold mb-3 text-base">
                            {satisfactionQuestion}
                        </p>
                        <div className="flex flex-col gap-3">
                            {satisfactionOptions.map((option) => (
                                <label
                                    key={option}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer border transition-all duration-200 ${
                                        satisfaction === option
                                            ? 'bg-blue-50 border-blue-700 ring-2 ring-blue-400'
                                            : 'bg-white border-gray-200 hover:bg-blue-50'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="satisfaction"
                                        value={option}
                                        checked={satisfaction === option}
                                        onChange={() => setSatisfaction(option)}
                                        className="accent-blue-700 w-4 h-4"
                                        required
                                        disabled={submitted}
                                    />
                                    <span className="text-gray-900 text-sm">
                                        {option}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Remarks Section */}
                    <div className="px-6 pb-4">
                        <label className="block text-gray-900 font-semibold mb-2 text-base">
                            {remarksLabel}
                        </label>
                        <textarea
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition text-gray-800 bg-white/80 text-sm"
                            rows="3"
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
                                className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white py-2 rounded-lg font-semibold text-base shadow-md hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
                            >
                                Submit
                            </button>
                        ) : (
                            <>
                                <div className="mt-1 text-green-700 text-center font-semibold text-sm">
                                    Thank you for your feedback!
                                </div>
                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="w-full mt-1 bg-gray-100 text-blue-900 py-2 rounded-lg font-semibold text-sm shadow hover:bg-gray-200 transition-all duration-200"
                                >
                                    Edit Response
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Survey;
