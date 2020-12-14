export function getTimeFromDateTimeList(l: Array<string>) {
  let temp: string[] = []
  l.forEach((it) => {
    const s = it.split(";");
    temp.push(s[1]);
  })
  return temp;
}