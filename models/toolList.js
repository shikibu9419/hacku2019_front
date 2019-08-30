const base = {
  lat: 0,
  lng: 0
}

const building = {
  ...base,
  type: 'building',
  points: []
}

const buildingBasic = {
  ...base,
  type: 'building_basic',
  width: 100,
  height: 100,
}

const direction = {
  ...base,
  type: 'direction',
  points: []
}

const text = {
  ...base,
  type: 'text',
  text: ''
}

// boxのみ画面固定
const box = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  type: 'box',
  contents: []
}

const pin = {
  ...base,
  type: 'pin',
  contents: []
}

export default {
  building: building,
  building_basic: buildingBasic,
  direction: direction,
  pin: pin,
  text: text,
  box: box,
  pin: pin,
}
