// import { createContext, useContext, useState } from 'react';
// import { LanguageContext } from '../../Context/LanguageContext';

// // Create context
// const LanguageContext = createContext();

// // Create a provider component
// export const LanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState('en'); // default language is 'en'

//   const changeLanguage = lang => {
//     setLanguage(lang);
//   };

//   return (
//     <LanguageContext.Provider value={{ language, changeLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// // Custom hook to use the language context
// export const useLanguage = () => {
//   return useContext(LanguageContext);
// };
