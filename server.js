import {app} from './';


export const PORT = 5000;

export const server =
    app.listen(PORT, () => console.log(`>>>>> Server started and listening on port ${PORT} <<<<<`));
