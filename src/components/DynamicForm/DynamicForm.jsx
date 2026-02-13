import React, { useState } from 'react';

export const DynamicForm = ({ schema }) => {
  // Initialize form state dynamically
  const initialState = schema.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">

        {schema.map((field, idx) => (
          <div key={idx} className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">{field.label}</label>

            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="px-3 py-2 border rounded"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option, optIdx) => (
                  <option key={optIdx} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="px-3 py-2 border rounded"
                required
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-medium mb-2">Form Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
