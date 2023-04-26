import React, { useState, useEffect } from 'react'
import DataController from '../controllers/DataController';

export default function Home() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await DataController.getdata();
      console.log(response.data)
      setResponse(response.data['users'][0].id);
    };
    fetchData();
  }, []);
  
  return (
  <>
 Home page {response}
  </>
  )
}
