import React, { createContext, useContext, ReactNode, useState } from 'react';
//this context is used to put all hecked tasks in one array of objects
interface Task {
  id: number;
   checked:boolean
}

interface CheckedContextType {
  allChecked: Task[];
  addObject: (newObject: Task) => void;
  removeObject: (objectId: number) => void;
}

const CheckedContext = createContext<CheckedContextType | undefined>(undefined);

export const CheckedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allChecked, setAllChecked] = useState<Task[]>([]);

  const addObject = (newObject: Task) => {
    setAllChecked([...allChecked, newObject]);
  };

  const removeObject = (objectId: number) => {   
    const updatedArray = allChecked.filter((obj) =>{
        
      return  obj.id !== objectId
    });
      
    setAllChecked(updatedArray);
  };

  return (
    <CheckedContext.Provider value={{ allChecked, addObject, removeObject ,setAllChecked}}>
      {children}
    </CheckedContext.Provider>
  );
};

export const useObjectArray = () => {
  const context = useContext(CheckedContext);
  if (context === undefined) {
    throw new Error('useObjectArray must be used within an CheckedProvider');
  }
  return context;
};
