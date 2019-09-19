import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faAngleLeft,
  faPlusCircle,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlus, faAngleLeft, faPlusCircle, faPen);
library.add(faTwitter, faFacebookSquare);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
