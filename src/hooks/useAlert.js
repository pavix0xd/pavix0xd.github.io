import { useState } from 'react';

const useAlert = () => {
    const [alert, setAlert] = useState({ show: false, text: '', type: 'danger' });

    const showAlert = ({ text, type = 'danger' }) => {
        setAlert({ show: true, text, type });
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideAlert();
        }, 5000);
    };

    const hideAlert = () => setAlert({ show: false, text: '', type: 'danger' });

    return { alert, showAlert, hideAlert };
};

export default useAlert;