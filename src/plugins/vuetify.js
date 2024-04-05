import { createVuetify } from "vuetify";

import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

export default createVuetify({
    directives,
    components,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
      },
});