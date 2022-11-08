import { bufio } from "https://deno.land/x/deno_nrepl_client@1.0.5/deps.ts";
const { readLines } = bufio;

const text = await Deno.open('./users.txt');
const users = {};
let indexObject = 0;
const requiredKeys = ['usr', 'eme', 'psw', 'age', 'loc', 'fll'];

for await (const line of readLines(text)) {
  if (!line) {
    indexObject++;
    continue;
  }
  if (line) {
    users[indexObject] = users[indexObject] ?? {};
    const values = line.split(" ");
    for (const item of values) {
      const [key, value] = item.split(":");
      if (requiredKeys.includes(key)) {
        users[indexObject] = { ...users[indexObject], [key]: value };
      }
    }
  }
}
let complete = 0;
let lastvalid = null;
for (const user of Object.values(users)) {
  const checkAllKeys = requiredKeys.every(key => !!Object.getOwnPropertyDescriptor(user, key));
  if (checkAllKeys) {
    lastvalid = user.usr;
    complete++;
  }
}
console.log({ complete, lastvalid });