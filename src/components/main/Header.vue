<template>
  <header class="pocket-header">
    <router-link to="/pocket/Main">
      <div class="logo-box">
        <img src="@/assets/images/pocket-logo-w-new.png" alt="로고" />
      </div>
    </router-link>
    <ul class="gnb-ul" :class="{ active: hideSideBar }">
      <li class="m-my-info">
        <myPagePop :closeMyPage="toggleMyPage" ref="mobileMypageRef" />
      </li>
      <li
        v-for="(menuItem, index) in menuItems"
        class="gnb-li"
        :class="{ active: isActiveItem(menuItem) }"
        :key="index"
      >
        <div class="gnb-li-box" @click="toggleActiveItem(menuItem)">
          <span class="gnb-li-title" v-if="menuItem.subMenuItems">
            <span>{{ menuItem.title }}</span>
          </span>
          <span class="gnb-li-title" v-else>
            <router-link :to="menuItem.url">
              <span>{{ menuItem.title }}</span>
            </router-link>
          </span>
        </div>
        <ul
          v-if="menuItem.subMenuItems"
          class="gnb-sub-ul"
          :class="{ open: menuItem.open }"
        >
          <li
            v-for="(subMenuItem, index) in menuItem.subMenuItems"
            class="gnb-sub-li"
            :class="{ active: isActiveSubItem(subMenuItem) }"
            @click="toggleActiveSubItem(subMenuItem)"
            :key="index"
          >
            <router-link :to="subMenuItem.url" @click="closeSidebar">
              <span>{{ subMenuItem.title }}</span>
            </router-link>
          </li>
        </ul>
      </li>
      <li class="gnb-li copyright">ⓒ bizbee. All rights reserved.</li>
    </ul>
    <div class="user-menu">
      <div class="user-info" @click="toggleMyPage(), getPoint()">
        {{ userTypeCheck(userType) }}
        <span class="user-name">
          {{ userStore.getUser.name }}
          <img src="@/assets/images/user-arrow.svg" alt="화살표" />
        </span>
      </div>
      <myPagePop
        ref="mypageRef"
        class="pc-my-page"
        v-show="hideMyPagePop"
        :hideMyPagePop="hideMyPagePop"
        :closeMyPage="toggleMyPage"
      />
    </div>
    <div
      class="gnb-btn"
      @click="toggleSidebar(), getPoint()"
      :class="{ active: hideSideBar }"
    >
      <span class="gnb-btn-line"></span>
      <span class="gnb-btn-line"></span>
      <span class="gnb-btn-line"></span>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user.store';
import myPagePop from '@/components/popup/MyPage.vue';
import menuData from '@/assets/menu/menu-pocket.json';
import { onClickOutside } from '@vueuse/core';
const mobileMypageRef = ref();
const mypageRef = ref();

onClickOutside(mypageRef, () => {
  hideMyPagePop.value = false;
});

const menuItems = ref<MenuItem[]>([...menuData.menuItems]);
const activeItem = ref<MenuItem | null>(null);
const activeSubItem = ref<SubMenuItem | null>(null);
const hideMyPagePop = ref(false);
const hideSideBar = ref(false);
const userStore = useUserStore();
const userType = ref(userStore.getUser.userType);

interface MenuItem {
  title: string;
  url?: string;
  subMenuItems?: SubMenuItem[];
  open?: boolean;
}

interface SubMenuItem {
  title: string;
  url?: string;
  open?: boolean;
  parent?: string;
}

const toggleSidebar = () => {
  hideSideBar.value = !hideSideBar.value;
};

const closeSidebar = () => {
  hideSideBar.value = false;
};
const toggleMyPage = () => {
  hideMyPagePop.value = !hideMyPagePop.value;
  hideSideBar.value = false;
};
const getPoint = () => {
  mobileMypageRef.value.getTotPoints();
  mypageRef.value.getTotPoints();
};

const USER_TYPE = {
  PERSONAL: '1',
  COMPANY_PIC: '2',
  COMPANY_USER: '3'
};

const userTypeCheck = (userType: any) => {
  if (userType === USER_TYPE.PERSONAL) {
    return '개인회원';
  } else if (userType === USER_TYPE.COMPANY_PIC) {
    return '사업자(담당자)';
  } else if (userType === USER_TYPE.COMPANY_USER) {
    return '사업자(이용자)';
  } else {
    return '회원';
  }
};

function toggleActiveItem(item: MenuItem) {
  activeItem.value = item;
  // 클릭한 영역 이외의 항목의 "active" 클래스 제거
  menuItems.value.forEach((menuItem) => {
    if (menuItem !== item) {
      menuItem.open = false;
    }
  });
}

function isActiveItem(item: MenuItem) {
  return activeItem.value === item;
}

function toggleActiveSubItem(item: SubMenuItem) {
  activeSubItem.value = item;
  // 클릭한 영역 이외의 항목의 "active" 클래스 제거

  menuItems.value.forEach((menuSubItem) => {
    if (menuSubItem !== item) {
      menuSubItem.open = false;
    }
  });
}

function isActiveSubItem(item: SubMenuItem) {
  return activeSubItem.value === item;
}
</script>

<style lang="scss" scoped>
//TODO: '등기데이터' 정식 이미지 변경 시 해당 부분 삭제 또는 수정 필요
.logo-box img {
  width: 157px;
}

.pocket-header {
  transition: 0.3s ease;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 60px;
  padding: 0 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1f2935;
  color: #fff;

  .gnb-ul {
    display: flex;
    gap: 80px;
    height: 100%;
    align-items: center;

    .gnb-li {
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      height: 100%;

      &.copyright {
        display: none;
      }

      &-box {
        height: 100%;
        display: flex;
        align-items: center;

        span {
          display: flex;
          align-items: center;
          height: 100%;
        }
      }

      :hover {
        .gnb-li-title {
          color: #2961ff;
        }
      }

      &:hover {
        .gnb-sub-ul {
          display: flex;
        }
      }
    }

    .gnb-sub-ul {
      // display: none;
      position: absolute;
      background-color: #fff;
      border: 1px solid #e0e0e0;
      padding: 25px 20px;
      white-space: nowrap;
      top: calc(100% - 3px);
      left: 50%;
      transform: translateX(-50%);
      border-radius: 4px;
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.04);
      min-width: 156px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      display: none;

      .gnb-sub-li {
        &:hover {
          span {
            color: #2961ff;
            text-decoration: underline;
            text-underline-offset: 3px;
          }
        }

        a {
          width: 100%;
          display: block;
        }
      }

      * {
        font-size: 16px;
        color: #4a4a52;
      }
    }

    &.active {
      display: flex;
    }

    .m-my-info {
      display: none;
    }

    .pc-my-page {
      display: flex;
    }
  }

  .gnb-btn {
    display: flex;
    width: 24px;
    height: 24px;
    cursor: pointer;
    overflow: hidden;
    display: none;

    span {
      width: 20px;
      height: 2px;
      border-radius: 2px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transition: 0.4s ease;
      transform: translate(-50%, -50%);

      &:first-child {
        top: calc(50% - 7px);
      }

      &:last-child {
        top: calc(50% + 7px);
      }
    }

    &.active {
      span {
        &:nth-child(2) {
          left: 150%;
        }

        &:first-child {
          top: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        }

        &:last-child {
          top: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
  }

  .user-menu {
    display: flex;
    align-items: center;
    gap: 15px;
    transition: 0.3s ease;

    .user-point-box {
      display: flex;
      align-items: center;
      gap: 3px;
      background-color: #e9efff;
      color: #000;
      padding: 0 10px;
      height: 32px;
      border-radius: 22px;
      font-size: 14px;

      .user-point {
        font-size: 14px;
        font-weight: 700;
        text-decoration: underline;
        text-underline-offset: 3px;
        margin-left: 4px;

        &-text {
          font-size: 14px;
          color: #000;
        }
      }
    }

    .user-info {
      font-size: 14px;
      font-weight: 500;
      display: flex;
      gap: 7px;
      cursor: pointer;

      .user-name {
        display: flex;
        font-size: 14px;
        font-weight: 700;
        gap: 3px;
      }
    }
  }
}

@media (max-width: 1440px) {
  .pocket-header {
    padding: 0 30px;
    color: #fff;

    .gnb-ul {
      gap: 60px;
    }
  }
}

@media (max-width: 1024px) {
  .pocket-header {
    height: 50px;
    padding: 0 20px;

    .gnb {
      &-ul {
        left: 0;
        position: fixed;
        top: 50px;
        z-index: 10;
        background-color: #f8f9fb;
        width: 100%;
        height: 100%;
        align-items: flex-start;
        gap: 0;
        display: none;
        height: calc(100vh - 50px);
        overflow: auto;

        .gnb-li {
          background-color: #fff;
          padding: 0 20px;
          height: auto;
          width: 100%;

          &.copyright {
            display: flex;
            color: #73777a;
            font-weight: 400;
            font-size: 12px;
            justify-content: center;
            background-color: #f8f9fb;
            padding-top: 15px;
            padding-bottom: 15px;
            cursor: default;
          }

          &:nth-last-child(2) {
            padding-bottom: 20px;

            .gnb-li-box {
              border-bottom: 1px solid #e0e0e0;
            }
          }

          &:hover {
            .gnb-sub-ul {
              display: none;
            }
          }

          &.active {
            .gnb-sub-ul {
              display: flex;
            }

            .gnb-li-box {
              &::after {
                transform: rotate(0deg);
              }
            }
          }
        }

        .gnb-li-box {
          padding-bottom: 10px;
          padding-top: 20px;
          height: auto;
          line-height: 24px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;

          &::after {
            transition: 0.4s ease;
            display: block;
            width: 24px;
            height: 24px;
            content: '';
            transform: rotate(180deg);
            background-image: url(../../assets/images/menu-li-arrow.svg);
          }

          span {
            font-size: 14px;
          }
        }

        * {
          color: #000;
        }

        flex-direction: column;

        .gnb-sub-ul {
          border-top: 1px solid #e0e0e0;
          position: relative;
          border: none;
          padding: 10px;
          top: 0;
          left: 0;
          transform: translateX(0);
          border-radius: 0;
          box-shadow: none;
          min-width: auto;
          // display: flex;
          gap: 10px;

          * {
            font-size: 14px;
            color: #000;
            font-weight: 400;
          }
        }

        .m-my-info {
          display: flex;
          width: 100%;
          margin-bottom: 15px;

          .my-page-box {
            position: relative;
            top: auto;
            left: auto;
            transform: translate(0, 0);
            padding: 10px 20px;
            width: 100%;
            height: auto;

            :deep(.btn-box) {
              .round-btn {
                max-width: 100%;
              }
            }
          }
        }
      }

      &-btn {
        display: flex;
      }
    }
  }

  .user-menu {
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    padding: 0 20px;
    background-color: #fff;
    height: 55px;
    flex-direction: row-reverse;
    justify-content: space-between;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid #e0e0e0;

    * {
      color: #1f2935;
    }
  }

  .pc-my-page {
    display: none;
  }

  //TODO: '등기데이터' 정식 이미지 변경 시 해당 부분 삭제 또는 수정 필요
  .logo-box img {
    width: 100px;
  }
}

@media (max-width: 768px) {
  .pocket-header .user-menu .user-point-box .user-point-text {
    display: none;
  }
}
</style>
