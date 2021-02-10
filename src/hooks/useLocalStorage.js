import { useState, useEffect } from 'react';

const useLocalStorage = () => {
  const [panes, setPanes] = useState([]);

  // On mount, load calorie-log entries from localStorage onto panes
  useEffect(() => {
    const storedPanes = localStorage.getItem('panes');
    if (storedPanes) {
      setPanes(JSON.parse(storedPanes));
    }
  }, []);

  // Store calorie-log entries to localStorage before page reload
  useEffect(() => {
    const saveLog = () => {
      localStorage.setItem('panes', JSON.stringify(panes));
    };
    window.addEventListener('beforeunload', saveLog);

    return () => window.removeEventListener('beforeunload', saveLog);
  });

  return [panes, setPanes];
};

export default useLocalStorage;
