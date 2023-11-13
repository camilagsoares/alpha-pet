import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const OutletAppContext = createContext();

export const OutletAppProvider = ({ children }) => {
  const [data, setData] = useState([{ id: 1, usuario: 'John Doe' }]);

  return <OutletAppContext.Provider value={{ data, setData }}>{children}</OutletAppContext.Provider>;
};

OutletAppProvider.propTypes = { children: PropTypes.element };
