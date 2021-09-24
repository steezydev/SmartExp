import emojiStrip from 'emoji-strip'

export const isEmojisOnly = (string: string) => emojiStrip(string).length === 0;

export const fancyCount2 = (str: string) => {
  const joiner = "\u{200D}";
  const split = str.split(joiner);
  let count = 0;

  for(const s of split){
    //removing the variation selectors
    const num = Array.from(s.split(/[\ufe00-\ufe0f]/).join("")).length;
    count += num;
  }

  //assuming the joiners are used appropriately
  return count / split.length;
}
