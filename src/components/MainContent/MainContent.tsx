// components/MainContent.tsx
import React, { useState, useEffect, useRef } from 'react';

// Define the props type for the Modal component
interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const MainContent: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState('');

  // Effect to handle focus state on LinkedIn input field
  useEffect(() => {
    const inputField = document.querySelector('LinkedIn input selector'); // Adjust selector as needed
    if (inputField) {
      const handleFocus = () => setIsFocused(true);
      const handleBlur = () => setIsFocused(false);
      
      inputField.addEventListener('focus', handleFocus);
      inputField.addEventListener('blur', handleBlur);

      // Clean up event listeners on component unmount
      return () => {
        inputField.removeEventListener('focus', handleFocus);
        inputField.removeEventListener('blur', handleBlur);
      };
    }
  }, []);

  // Function to generate a response
  const handleGenerate = () => {
    setResponse("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.");
    setShowModal(true);
  };

  // Function to insert response into the LinkedIn input field
  const handleInsert = () => {
    const inputField = document.querySelector('LinkedIn input selector') as HTMLInputElement; // Adjust selector
    if (inputField) {
      inputField.value = response; // Set the input field's value to the generated response
      setShowModal(false); // Close the modal after inserting the response
    }
  };
  
  // Function to close the modal
  const closeModal = () => setShowModal(false);

  // Modal component to display the generated response
  const Modal: React.FC<ModalProps> = ({ showModal, closeModal }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          closeModal();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [closeModal]);

    return showModal ? (
      <div className="fixed inset-0 flex items-center justify-center">
        <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-bold mb-2">Generated Response</h3>
          <p>{response}</p>
          <div className='flex justify-end'>
            <button className="bg-white text-black px-4 py-2 rounded mt-4 mr-7" onClick={closeModal}>Cancel</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleInsert}>Insert</button>
          </div>
        </div>
      </div>
    ) : null;
  };

  return (
    <main className="flex-grow p-4">
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-xl font-bold mb-4">LinkedIn Response Generator</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleGenerate}>Generate Response</button>
      </div>
      <Modal showModal={showModal} closeModal={closeModal} />
    </main>
  );
};

export default MainContent;
