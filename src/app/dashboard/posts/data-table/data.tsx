import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "draft",
    label: "Draft",
    icon: StopwatchIcon,
  },
  {
    value: "published",
    label: "Published",
    icon: CheckCircledIcon,
  },
  {
    value: "archived",
    label: "Archived",
    icon: CrossCircledIcon,
  },
];
