const colors = require('colors/safe');

import {database} from '../database';

database.remove({}, { multi: true })
    .then(removeCount => {
        if (removeCount) {
            console.log(colors.green(`Done. ${removeCount} entries were removed.`));
        } else {
            console.log(colors.yellow(`There's no data to remove. Database is empty.`));
        }
    })
    .catch(error => {
        console.log(colors.red('Can\'t remove data from the Database. Printing error.'));
        console.log(error);
    });
