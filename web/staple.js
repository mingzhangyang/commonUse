/**
 * Created by yangm11 on 9/5/2018.
 */
'use strict';

function staple(value, elemId, attr) {
  document.getElementById(elemId)[attr] = value;
}

if (typeof module !== 'undefined' && module.parent) {
  // Node environment, required as module
} else if (typeof window === 'object') {
  // Browser environment
} else {
  // Node environment, run directly
  // test code go here
}