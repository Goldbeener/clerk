import { createRouter, createWebHashHistory } from 'vue-router';

import  DailyReview  from '/@/components/main-area/DailyReview.vue';
import  SparkNote  from '/@/components/main-area/SparkNote.vue';
import  WeeklyReview  from '/@/components/main-area/WeeklyReview.vue';
import  EventLine  from '/@/components/main-area/EventLine.vue';
import UserSetting  from '/@/components/main-area/UserSetting.vue';

const routes = [
  {
    path: '/', component: SparkNote,
  },
  {
    path: '/daily-review', component: DailyReview,
  },
  {
    path: '/weekly-review', component: WeeklyReview,
  },
  {
    path: '/event-line', component: EventLine,
  },
  {
    path: '/user-setting', component: UserSetting,
  },
];

const router = createRouter({ 
  routes,
  history: createWebHashHistory(),
});

export default router;