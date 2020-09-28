export function  graberSpace(bullet, width, guide, lastOp) {
  /*
    The best way to do this is recursively, changing a single
    character at once and checking length as we go. That is because
    these spaces don't have specific pixel widths associated with
    them. Instead their widths are dynamic - based on font style,
    size and the other characters around them. So while it sucks
    that we need to use synchronous logic, atleast it only happens
    when the user toggles the spacing on.

    The whitespace unicode available for use with an OPR:
    2006:approx-2px(smallest), 2009:approx-1px(small),
    2004:approx+2px(big), 2007:approx+4px(biggest)
  */

  const promote = (ranks) => {
    let newRanks = ranks;
    // promote left to right
    let indexOfMinValue = ranks.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 4);
    newRanks[indexOfMinValue]++;
    // Don't promote past max rank
    if (newRanks[indexOfMinValue] > 4) {
      newRanks[indexOfMinValue] = 4;
    }
    return(newRanks);
  };

  const demote = (ranks) => {
    let newRanks = ranks;
    // demote right to left
    let indexOfMaxValue = ranks.reduce((iMax, x, i, arr) => x >= arr[iMax] ? i : iMax, 0);
    newRanks[indexOfMaxValue]--;
    // Don't demote below min rank
    if (newRanks[indexOfMaxValue] < 0) {
      newRanks[indexOfMaxValue] = 0;
    }
    return(newRanks);
  };

  const isWhiteSpace = (element) => {
    switch(element) {
    case "\u2004": return true;
    case "\u2006": return true;
    case "\u2007": return true;
    case "\u2009": return true;
    case " ": return true;
    default: return false;
    }
  };

  const rank = ['\u2006', '\u2009', ' ', '\u2004', '\u2007'];

  let spaces = [];
  let ranks = [];
  let bulletArray = bullet.split('');
  
  //Find all the white space character indexes
  let position = bulletArray.findIndex(isWhiteSpace);
  while (position !== -1) {
    spaces.push(position);
    ranks.push(rank.findIndex(elem => elem === bulletArray[position]));
    let subArrayPosition = bulletArray.slice(position + 1).findIndex(isWhiteSpace);
    if (subArrayPosition !== -1) {
      position = subArrayPosition + position + 1;
    } else {
      position = subArrayPosition;
    }
  }

  let Op = null;
  if (width > guide-1) {
    ranks = demote(ranks);
    Op = 'demote';
  } else if (width < guide-1) {
    if (!lastOp || lastOp === 'promote'){
      ranks = promote(ranks);
      Op = 'promote';
    } else {
      Op = null;
    }
  }

  spaces.forEach((position, index) => {
    bulletArray[position] = rank[ranks[index]];
  });

  let newBullet = bulletArray.join('');
  let finished = (newBullet === bullet);

  return [newBullet, finished, Op];
}
