<template>
  <div>
    <div class="pocket-contents-body-title pocket-margin">
      {{ route.name }}
    </div>

    <div class="pocket-tab-row-container pocket-margin">
      <div v-for="(item, index) in tabList" :key="index">
        <!-- {{ @click="activeTab = item.activeTab" }} -->
        <div
          class="pocket-tab"
          :class="{ active: activeTab === item.activeTab }"
          @click="changeTab(item.activeTab)"
        >
          {{ item.tab }}
        </div>
      </div>
    </div>

    <div v-for="(item, index) in tabList" :key="index">
      <div
        v-if="activeTab === item.activeTab"
        class="result-container"
        :class="{
          'tab-contents-1': activeTab === 1,
          'tab-contents-2': activeTab === 2,
          'tab-contents-3': activeTab === 3
        }"
      >
        <component :is="item.component" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onBeforeUpdate, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CorporateBasket from '@/views/corporate/CorporateBasket.vue';
import CorporatePurchase from '@/views/corporate/CorporatePurchase.vue';
import CorporateBookMark from '@/views/corporate/CorporateBookMark.vue';
import RealEstateBasket from '@/views/realEstate/RealEstateBasket.vue';
import RealEstatePurchase from '@/views/realEstate/RealEstatePurchase.vue';
import RealEstateBookMark from '@/views/realEstate/RealEstateBookMark.vue';

const tabList: any = ref([{}]);
const activeTab = ref(1);
const route = useRoute();
const router = useRouter();

onBeforeMount(() => {
  activeTab.value = Number(route.query.activeTab ?? 1);
  initTab();
});

onBeforeUpdate(() => {
  activeTab.value = Number(route.query.activeTab ?? 1);
  initTab();
});

const changeTab = (tab: number) => {
  router.replace({
    path: route.path,
    query: { activeTab: tab }
  });
};

const initTab = () => {
  const path = route.path.split('/')[2];
  switch (path) {
    case 'CorporateManagement':
      tabList.value = [
        {
          tab: '장바구니',
          activeTab: 1,
          component: shallowRef(CorporateBasket)
        },
        {
          tab: '발급등기',
          activeTab: 2,
          component: shallowRef(CorporatePurchase)
        },
        {
          tab: '즐겨찾는 법인',
          activeTab: 3,
          component: shallowRef(CorporateBookMark)
        }
      ];
      break;
    case 'RealEstateManagement':
      tabList.value = [
        {
          tab: '장바구니',
          activeTab: 1,
          component: shallowRef(RealEstateBasket)
        },
        {
          tab: '발급등기',
          activeTab: 2,
          component: shallowRef(RealEstatePurchase)
        },
        {
          tab: '즐겨찾는 부동산',
          activeTab: 3,
          component: shallowRef(RealEstateBookMark)
        }
      ];
      break;
  }
};
</script>

<style lang="scss" scoped>
.result-container-search.date {
  .pocket-input-row:last-child {
    margin-top: 5px;
  }
}

.pocket-tab {
  height: 36px;
}

.pocket-margin {
  margin-bottom: 20px;
}
</style>
