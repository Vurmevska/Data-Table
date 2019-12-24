import React from 'react';

export const Button =({onClick, children,className=''} ) =>  
   <button
    onClick={onClick}    
    type='button'
    className={className}
   
    >
             
    {children}
    </button>
    
    

