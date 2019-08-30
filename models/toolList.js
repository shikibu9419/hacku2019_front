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

const pin = {
  ...base,
  type: 'pin',
}

const text = {
  ...base,
  type: 'text',
}

const textBox = {
  ...base,
  type: 'text_box',
}

const comment = {
  ...base,
  type: 'comment',
  message: ''
}

export default {
  'building': building,
  'building_basic': buildingBasic,
  'direction': direction,
  'pin': pin,
  'text': text,
  'text_box': textBox,
  'comment': comment,
}
