<template>
  <div>
    <LayoutPopup
      :title="props.content.title ? props.content.title : ''"
      @close="closePopup"
    >
      <div>
        <div id="map"></div>
      </div>
    </LayoutPopup>
    <component
      v-for="(popup, index) in activePopups"
      :is="popup.component"
      :content="popup.content"
      :key="index"
      @close="childClose(index)"
      @cancel="cancelPopup(index)"
      @confirm="confirmPopup(index)"
    />
  </div>
</template>

<script setup lang="ts">
//카카오 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

import { onMounted, ref, shallowRef } from 'vue';
import AlertPopup from '@/components/popup/AlertPopup.vue';
import LayoutPopup from '@/components/popup/PopupLayout.vue';
import { POST_FAIL } from '@/util/message';
const currentPopup = ref('');
const activePopups = ref<PopupItem[]>([]);
interface PopupItem {
  component: any;
  content: any;
}

interface Props {
  title?: string;
  id?: any; // Props를 통해 가져온 값으로 여기서는 필터링된 주소를 받는다.
}
const props = defineProps<{ content: Props }>();
const emit = defineEmits<{ (e: 'close'): void }>();
const closePopup = () => {
  emit('close');
};
const id: any = props.content.id ? props.content.id : 0;

onMounted(() => {
  const mapContainer = document.getElementById('map');
  const mapOption = {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
  };

  const map = new window.kakao.maps.Map(mapContainer, mapOption);
  const geocoder = new window.kakao.maps.services.Geocoder();

  geocoder.addressSearch(id, (result: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      // 좌표를 받아서 마커를 생성하고, 지도의 중심을 이동시킨다.
      const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
      // 마커 생성
      new window.kakao.maps.Marker({
        map: map,
        position: coords
      });
      // 지도 중심 이동
      map.setCenter(coords);
    } else {
      showPopup('POST_FAIL');
    }
  });
});

const showPopup = (popName: string) => {
  currentPopup.value = popName;
  switch (popName) {
    case 'POST_FAIL':
      activePopups.value.push({
        component: shallowRef(AlertPopup),
        content: POST_FAIL
      });
      break;
  }
};

const childClose = (index: number) => {
  activePopups.value.splice(index, 1);
};

const cancelPopup = (index: number) => {
  activePopups.value.splice(index, 1);
};

const confirmPopup = (index: number) => {
  activePopups.value.splice(index, 1);
  switch (currentPopup.value) {
    case 'POST_FAIL':
      closePopup();
      break;
  }
  currentPopup.value = '';
};
</script>

<style lang="scss" scoped>
// TODO: 모바일 반응형 포함 필요
#map {
  width: 350px;
  height: 350px;
}
</style>
