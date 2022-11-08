const resp = await fetch("https://codember.dev/users.txt");
const text = await resp.text();

const users = {};
let indexObject = 0;
const requiredKeys = ['usr', 'eme', 'psw', 'age', 'loc', 'fll'];

for (const line of text.split('\n')) {
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