import {
  NgModule
} from '@angular/core';
import {
  IconLoader,
  IconSettings,
  IconUser,
  IconSearch,
  IconEdit2,
  IconTrash2,
  IconX,
  IconHash,
  IconPower,
  IconCornerDownRight,
  IconArrowDown,
  IconArrowRight,
  IconPlus,
  IconArrowLeft,
  IconLayers,
  IconCreditCard,
  IconUserCheck,
  IconUserPlus,
  IconShield,
  IconCheckSquare,
  IconSquare,
  IconAward,
  IconBarChart2,
  IconFilter,
  IconZap,
  IconZapOff,
  IconXSquare
} from 'angular-feather';

const icons = [
  IconLoader,
  IconSettings,
  IconUser,
  IconSearch,
  IconEdit2,
  IconTrash2,
  IconX,
  IconHash,
  IconPower,
  IconCornerDownRight,
  IconArrowDown,
  IconArrowRight,
  IconPlus,
  IconArrowLeft,
  IconLayers,
  IconCreditCard,
  IconUserCheck,
  IconUserPlus,
  IconShield,
  IconCheckSquare,
  IconSquare,
  IconAward,
  IconBarChart2,
  IconFilter,
  IconZap,
  IconZapOff,
  IconXSquare
];

@NgModule({
  imports: icons,
  exports: icons
})
export class IconModule {}
