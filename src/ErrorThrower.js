import React from 'react';

ErrorThrower = ({hasError}) => {
    if (hasError) {
      throw new Error(); 
    } return null
    }

    export default ErrorThrower;