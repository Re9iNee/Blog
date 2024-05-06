import {
  ArchiveIcon,
  CheckCircledIcon,
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
    icon: ArchiveIcon,
  },
];
