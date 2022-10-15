import { styl } from "./../src/styl";

function log(objs) {
  const texts: any[] = [];
  const styles: any[] = [];
  Object.keys(objs).forEach(key => {
    texts.push(key);
    styles.push(objs[key]);
  });
  console.log.apply(console, ["%c" + texts.join("%c"), styl.object(styles)]);
}

// console.log(
log({
  lol: {
    color: "black",
  },
  "deine mum": {
    color: "blue",
  },
});
// );
