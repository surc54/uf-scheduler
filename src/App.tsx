import React from 'react';
import {Button} from '@material-ui/core';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-full justify-center">
      <h1 className="font-bold text-3xl">
        UF Scheduler
      </h1>

      <div className="bg-gray-200 p-4 mt-4 rounded-xl">
        This web app is under development.
      </div>
      <Button className="mt-2" href="https://www.hadithya.com/scheduler" target="_blank">
        Go to version 1
      </Button>
    </div>
  );
}

export default App;
