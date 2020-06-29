function createInput(obj, prop, prefix="", opt={}) {
  let inp = document.createElement('input');
  inp.setAttribute('type', opt.type ? opt.type : 'text');
  inp.setAttribute('id', `${prefix}-${prop}`);
  inp.classList.add(`${prefix}-${prop}`, 'setting-panel-item-prop-value');
  if (opt.attributes && Object.prototype.toString.call(opt.attributes) === '[object Object]') {
    let attrs = Object.keys(opt.attributes);
    for (let attr of attrs) {
      inp.setAttribute(attr, opt.attributes[attr]);
    }
  }
  inp.value = `${obj[prop]}`;
  return inp;
}

function createForm(obj, prop, prefix="", opt={}) {
  let fm = document.createElement('form');
  fm.setAttribute('id', `${prefix}-${prop}`);
  fm.classList.add(`${prefix}-${prop}`, 'setting-panel-item-form');
  for (let v of opt.values) {
    let row = fm.appendChild(document.createElement('div'));
    let inp = row.appendChild(document.createElement('input'));
    inp.setAttribute('id', `${prefix}-${prop}-${value}`);
    inp.setAttribute('type', 'radio');
    inp.setAttribute('name', `${prefix}-${prop}`);
    inp.addEventListener('change', () => {
      obj[prop] = inp.value;
    });
    inp.value = v;
    let label = row.appendChild(document.createElement('label'));
    label.setAttribute('for', `${prefix}-${prop}-${value}`);
    label.innerText = v;
  }
  return fm;
}

function create(obj, prefix="", opts={}) {
  let elem = document.createElement('div');
  try {
    elem.classList.add(prefix, 'setting-panel-block');
  } catch (err) {
    console.error(err.message);
    return null;
  }
  let props = Object.keys(obj);
  for (let prop of props) {
    let res = document.createElement('div');
    let head = res.appendChild(document.createElement('label'));
    head.innerText = prop;
    let body;
    switch (Object.prototype.toString.call(prop)) {
      case '[object String]':
        head.classList.add("setting-panel-item-prop-name");
        if (!opts[prop] || opts[prop].tag === undefined || opts[prop].tag === 'input') {
          body = createInput(obj, prop, prefix, opts[`${prefix}-${prop}`]);
          body.addEventListener('change', () => {
            obj[prop] = body.value;
          });
          head.setAttribute('for', body.getAttribute('id'));
        } else if (opts[prop].tag === 'form') {
          body = createForm(obj, prop, prefix,  opts[`${prefix}-${prop}`]);
        } else {
          console.error(`${opts[prop].tag} not supported`);
        }
        
        break;
      case '[object Number]':
        head.classList.add("setting-panel-item-prop-name");
        if (!opts[prop] || opts[prop].tag === undefined || opts[prop].tag === 'input') {
          body = createInput(obj, prop, prefix, opts[`${prefix}-${prop}`]);
          body.addEventListener('change', () => {
            obj[prop] = +res.value;
          });
        } else if (opts[prop].tag === 'form') {
          body = createForm(obj, prop, prefix,  opts[`${prefix}-${prop}`]);
        } else {
          console.error(`${opts[prop].tag} not supported`);
        }
        break;
      case '[object Object]':
        head.classList.add("setting-panel-item-tab-header");
        body = create(obj[prop], `${prefix}-${prop}`, opts);
        break;
      case '[object Boolean]':
        head.classList.add("setting-panel-item-prop-name");
        body = res.appendChild(document.createElement('label'));
        body.classList.add("setting-panel-item-on-off);
        if (obj[prop]) {
          body.classList.add("on");
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
}

export default class SettingPanel {
  constructor(settingObject={}, DescriptionObject={}) {
    this.data = settingObject;
    this.schema = DescriptionObject;
  }
  generate() {
    let keys = Object.keys(this.schema);

  }
}
