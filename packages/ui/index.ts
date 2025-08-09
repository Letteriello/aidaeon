// Core UI Components
export * from "./src/components/button";
export * from "./src/components/card";
export * from "./src/components/layout";

// Explicit exports for Container and Section
export { Container } from "./src/components/layout";
export { Section } from "./src/components/layout";

// Input Components
export {
  Input,
  PasswordInput,
  SearchInput,
  Textarea,
  InputGroup,
  FileInput,
  inputVariants,
  textareaVariants
} from "./src/components/input";
export type {
  InputProps,
  PasswordInputProps,
  SearchInputProps,
  TextareaProps,
  InputGroupProps,
  FileInputProps
} from "./src/components/input";

// Avatar Components
export {
  Avatar,
  StatusAvatar,
  NotificationAvatar,
  AvatarGroup,
  EditableAvatar,
  InitialsAvatar,
  LoadingAvatar,
  avatarVariants,
  avatarImageVariants,
  avatarFallbackVariants,
} from "./src/components/avatar";
export type {
  AvatarProps,
  StatusAvatarProps,
  NotificationAvatarProps,
  AvatarGroupProps,
  EditableAvatarProps,
  InitialsAvatarProps,
  LoadingAvatarProps,
} from "./src/components/avatar";

// Badge Components
export {
  Badge,
  CountBadge,
  StatusBadge,
  DotBadge,
  AnimatedBadge,
  BadgeGroup,
  TooltipBadge,
  badgeVariants,
} from "./src/components/badge";
export type {
  BadgeProps,
  CountBadgeProps,
  StatusBadgeProps,
  DotBadgeProps,
  AnimatedBadgeProps,
  BadgeGroupProps,
  TooltipBadgeProps,
} from "./src/components/badge";

// Dropdown Menu Components
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemWithIcon,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuWithHeader,
  ControlledDropdownMenu,
  useDropdownMenu,
  dropdownMenuContentVariants,
} from "./src/components/dropdown-menu";
export type {
  DropdownMenuContentProps,
  DropdownMenuWithHeaderProps,
  DropdownMenuItemWithIconProps,
  ControlledDropdownMenuProps,
} from "./src/components/dropdown-menu";

// Loading Components
export {
  Loading,
  LoadingPage,
  LoadingButton,
  loadingVariants,
} from "./src/components/loading";
export type {
  LoadingProps,
  LoadingPageProps,
  LoadingButtonProps,
} from "./src/components/loading";

// Modal Components
export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ConfirmModal,
  useModal,
} from "./src/components/modal";
export type {
  ModalContentProps,
  ConfirmModalProps,
} from "./src/components/modal";

// Tabs Components
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  LazyTabs,
  DraggableTabs,
  useTabs,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
} from "./src/components/tabs";
export type {
  TabsProps,
  LazyTabsProps,
  DraggableTabsProps,
} from "./src/components/tabs";

// Theme Provider Components
export {
  ThemeProvider,
  useTheme,
  useCustomTheme,
  themes,
} from "./src/components/theme-provider";
export type {
  CustomTheme,
} from "./src/components/theme-provider";

// Tooltip Components
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  IconTooltip,
  ButtonTooltip,
  HoverTooltip,
  ControlledTooltip,
  useTooltip,
  tooltipVariants,
} from "./src/components/tooltip";
export type {
  TooltipProps,
  IconTooltipProps,
  ButtonTooltipProps,
  HoverTooltipProps,
  ControlledTooltipProps,
} from "./src/components/tooltip";

// MagicUI Components
export * from "./src/components/magic/animated-beam";
export type { AnimatedBeamProps } from "./src/components/magic/animated-beam";

// Re-export commonly used types
export type { ButtonProps } from "./src/components/button";

// Utils
export * from "./src/lib/utils";

// Styles
// export * from "./src/styles/globals.css";