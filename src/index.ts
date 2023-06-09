import http from 'http';
import url from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 14563;

const add = (a: number, b: number) => a + b;
const rest = (a: number, b: number) => a - b;
const division = (a: number, b: number) => a / b;
const multiplication = (a: number, b: number) => a * b;

const server = http.createServer((req, res) => {
  const urlName = url.parse(req.url!);
  const queryParams = urlName.query;
  const queryParamsValues = new URLSearchParams(queryParams!);
  const number1 = parseFloat(queryParamsValues.get('a')!);
  const number2 = parseFloat(queryParamsValues.get('b')!);

  res.write(`<p>${number1} + ${number2} = ${add(number1, number2)}</p>`);
  res.write(`<p>${number1} - ${number2} = ${rest(number1, number2)}</p>`);
  res.write(`<p>${number1} / ${number2} = ${division(number1, number2)}</p>`);
  res.write(
    `<p>${number1} * ${number2} = ${multiplication(number1, number2)}</p>`
  );

  res.end();

  if (urlName.toString() !== '/calculator') {
    server.emit('error', new Error('Path not found'));
    res.write(`<h1>Error 404</h1><h2>Path not found</h2>`);
  }
});

server.listen(PORT);

server.on('error', (error) => {
  console.log(error.message);
});
