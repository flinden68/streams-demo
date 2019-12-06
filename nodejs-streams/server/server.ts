import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import {ApiRoutes} from "./routes/api-routes";
import {TodoConsumer} from "./consumer/todo.consumer";
import {TodoProcessor} from "./processor/todo.processor";
const cors = require('cors')

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.get('/', homeController.index);

app.use('/api', ApiRoutes);

// @ts-ignore
let consumer = new TodoConsumer();
consumer.consume();

let processor = new TodoProcessor();
processor.process();

app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'),
        app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

module.exports = app;

