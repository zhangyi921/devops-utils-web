import { useEffect, useState } from 'react'

function Home() {

  const [reqData, setReqData] = useState(null);

  useEffect(() => {

    fetch("/reqData")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }
      ).then(data => {
        console.log('Data from server:', data);
        setReqData(data);
      }
      ).catch(error => {
        console.error('Error fetching data:', error);
      }
      );
  }, []);

  return <div >
    <p>Data from server:</p>
    {reqData ? (
      <pre>{JSON.stringify(reqData, null, 2)}</pre>
    ) : (
      <p>Loading...</p>
    )}
  </div>;
}

export default Home
