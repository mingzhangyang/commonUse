function createInput(obj, prop, fullPath = '', opt = {}, prefix = '') {
  let inp = document.createElement('input');
  inp.setAttribute('type', opt.type ? opt.type : 'text');
  inp.setAttribute('id', `${prefix}-${fullPath}`);
  inp.classList.add(`${prefix}-${fullPath}`, 'setting-panel-item-prop-value');
  if (opt.attributes && Object.prototype.toString.call(opt.attributes) === '[object Object]') {
    let attrs = Object.keys(opt.attributes);
    for (let attr of attrs) {
      inp.setAttribute(attr, opt.attributes[attr]);
    }
  }
  inp.value = `${obj[prop]}`;
  console.log(inp.value);
  return inp;
}

function createForm(obj, prop, fullPath, opt = {}, prefix = '') {
  let fm = document.createElement('form');
  fm.setAttribute('id', `${prefix}-${fullPath}`);
  fm.classList.add(`${prefix}-${fullPath}`, 'setting-panel-item-form');
  for (let v of opt.values) {
    let row = fm.appendChild(document.createElement('div'));
    let inp = row.appendChild(document.createElement('input'));
    inp.setAttribute('id', `${prefix}-${fullPath}-${v}`);
    inp.setAttribute('type', 'radio');
    inp.setAttribute('name', `${prefix}-${fullPath}-${prop}`);
    inp.addEventListener('change', () => {
      obj[prop] = inp.value;
    });
    inp.value = v;
    if (v === obj[prop]) {
      inp.checked = true;
    }
    let label = row.appendChild(document.createElement('label'));
    label.setAttribute('for', `${prefix}-${fullPath}-${v}`);
    label.innerText = v;
  }
  return fm;
}

function create(obj, fp = '', opts = {}, prefix = '') {
  let elem = document.createElement('div');
  try {
    elem.classList.add('setting-panel-block');
  } catch (err) {
    console.error(err.message);
    return null;
  }
  let props = Object.keys(obj);
  for (let prop of props) {
    let res = elem.appendChild(document.createElement('div'));
    let head = res.appendChild(document.createElement('label'));
    head.innerText = prop;
    let body;
    let fullPath = fp === '' ? `${prop}` : `${fp}-${prop}`;
    switch (Object.prototype.toString.call(obj[prop])) {
      case '[object String]':
        head.classList.add('setting-panel-item-prop-name');
        if (!opts[fullPath]
          || opts[fullPath].tag === undefined
          || opts[fullPath].tag === 'input') {
          body = res.appendChild(createInput(obj, prop, fullPath, opts[fullPath], prefix));
          body.addEventListener('change', () => {
            obj[prop] = body.value;
          });
          head.setAttribute('for', body.getAttribute('id'));
        } else if (opts[fullPath].tag === 'form') {
          body = res.appendChild(createForm(obj, prop, fullPath, opts[fullPath], prefix));
        } else {
          console.error(`${opts[prop].tag} not supported`);
        }
        break;
      case '[object Number]':
        head.classList.add('setting-panel-item-prop-name');
        if (!opts[fullPath]
          || opts[fullPath].tag === undefined
          || opts[fullPath].tag === 'input') {
          body = res.appendChild(createInput(obj, prop, fullPath, opts[fullPath], prefix));
          body.addEventListener('change', () => {
            obj[prop] = +res.value;
          });
        } else if (opts[absolutePath].tag === 'form') {
          body = res.appendChild(createForm(obj, prop, fullPath, opts[fullPath], prefix));
        } else {
          console.error(`${opts[prop].tag} not supported`);
        }
        break;
      case '[object Object]':
        head.classList.add('setting-panel-item-tab-header');
        res.appendChild(create(obj[prop], fullPath, opts, prefix));
        break;
      case '[object Boolean]':
        head.classList.add('setting-panel-item-prop-name');
        body = res.appendChild(document.createElement('label'));
        body.classList.add('setting-panel-item-on-off');
        if (obj[prop]) {
          body.classList.add('on');
        }
        body.addEventListener('click', () => {
          body.classList.toggle('on');
          obj[prop] = !obj[prop];
        });
        break;
      default:
        console.error(`unsupported type of ${prop}: ${Object.prototype.toString.call(prop)}`);
    }
  }
  return elem;
}

export default class SettingPanel {
  constructor(settingObject = {}, DescriptionObject = {}) {
    this.data = settingObject;
    this.schema = DescriptionObject;
  }

  generate() {
    return create(this.data, '', this.schema, 'setting-panel');
  }
}
