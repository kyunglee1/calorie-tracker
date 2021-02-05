import { useState, useEffect } from 'react';

const useLocalStorage = () => {
  const [panes, setPanes] = useState([]);

  useEffect(() => {
    const storedPanes = localStorage.getItem('panes');
    if (storedPanes) {
      setPanes(JSON.parse(storedPanes));
    }
  }, []);

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
