/**
 * Created by yangm11 on 4/7/2017.
 */
'use strict';

/*
* This function is for extracting HTML elements from a string.
*
* It takes three parameters:
*   1. the raw string, e.g. a web page source
*   2. the start tag, e.g. <table>
*   3. the end tag, e.g. </table>
*
* If the element of interest is found, an array of identified string will
* be returned.
* If no elements of interest is found, the function returns 0.
* If element in element detected and the outer element is missing of an end
* tag, the candidate string will be returned.
*
* Definitely, this function can be used in other circumstance to detect specific
* pattern of a given string.
*/
function elementFinder(str, startTag, endTag) {
  str = str.toLowerCase();
  if (str.indexOf(startTag) === -1) {
    console.log('No startTag detected in the string!');
    return 0;
  }

  if (str.indexOf(endTag) === -1) {
    console.log('startTag detected, but no endTag found!');
    return 0;
  }

  let sm = {
    left: 0,
    right: 0,
    started: false,
    content: ''
  };

  let i = 0;
  let result = [];

  while (i < str.length) {
    if (!sm.started) {
      if (str.slice(i, i + startTag.length) === startTag) {
        sm.left += 1;
        sm.started = true;
        sm.content += startTag;
        i += startTag.length;
        continue;
      }
      i += + 1;
    } else {
      if (str.slice(i, i + startTag.length) === startTag) {
        sm.left += 1;
        sm.content += startTag;
        i += + startTag.length;
        continue;
      }
      if (str.slice(i, i + endTag.length) === endTag) {
        sm.left -= 1;
        sm.right += 1;
        sm.content += endTag;
        if (sm.left === 0) {
          result.push(sm.content);
          sm.started = false;
          sm.content = '';
        }
        i += + endTag.length;
        continue;
      }
      sm.content += str[i];
      i += 1;
    }
  }
  if (result[0]) {
    if (sm.right > result.length) {
      console.log('Element in Element detected.');
      console.log('There are %s element(s) detected, but %s endTags found.', result.length, sm.right);
      console.log('If necessary, you can run the function against the' +
        ' identified substrings.');
    }
    return result;
  }

  if (sm.left) {
    console.log('Element in Element caught! And the outer element does not' +
      ' have a closing tag!');
    return sm.content;
  }
  console.log(result);
  console.log(sm);
}

var text = '<table><tr>\n<td>\n<p>this is a paragraph</p>\n<p>this is' +
  ' another paragraph</p>\n</td>\n<td>this cell contains a table:\n  <table>\n<tr>\n<td>a</td>\n<td>b</td>\n</tr>\n<tr>\n<td>c</td>\n<td>d</td>\n</tr>\n</table>\n</td>\n</tr>\n<tr>\n<td>this cell contains a' +
  ' list\n<ul>\n<li>apples</li>\n<li>bananas</li>\n<li>pineapples</li>\n</ul>\n</td>\n<td>hello</td>\n</tr>\n</table>';

console.log(elementFinder(text, '<table>', '</table>'));
console.log(elementFinder(text, '<li>', '</li>'));