import building from './tools/building'
import building_basic from './tools/building_basic'
import direction from './tools/direction'
import text from './tools/text'
import pin from './tools/pin'
import box from './tools/box'

const models = {
  building: building,
  building_basic: building_basic,
  direction: direction,
  text: text,
  box: box,
  pin: pin,
}

export default (type) => {
  return JSON.parse(JSON.stringify(models[type]))
}
