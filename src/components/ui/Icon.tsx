import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Boxes,
  Brush,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  CreditCard,
  Crown,
  Eye,
  Feather,
  Flower2,
  Gem,
  GraduationCap,
  Guitar,
  Heart,
  Layers,
  Leaf,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Package,
  Palette,
  Phone,
  Plus,
  Quote,
  Scissors,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Star,
  Sun,
  Tag,
  Trash2,
  Truck,
  UserRound,
  Users,
  Wand2,
  Wind,
  X,
  Droplets,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/data/types";
import { cn } from "@/lib/utils";

const iconMap: Record<IconName, LucideIcon> = {
  sparkles: Sparkles,
  leaf: Leaf,
  droplet: Droplets,
  flower: Flower2,
  scissors: Scissors,
  brush: Brush,
  eye: Eye,
  palette: Palette,
  graduation: GraduationCap,
  guitar: Guitar,
  heart: Heart,
  shield: ShieldCheck,
  calendar: CalendarCheck,
  user: UserRound,
  compass: Compass,
  package: Package,
  card: CreditCard,
  boxes: Boxes,
  chart: BarChart3,
  check: Check,
  clock: Clock,
  message: MessageCircle,
  wand: Wand2,
  gem: Gem,
  wind: Wind,
  sun: Sun,
  feather: Feather,
  book: BookOpen,
  users: Users,
  lock: LockKeyhole,
  crown: Crown,
  layers: Layers,
  sprout: Sprout,
  truck: Truck,
  tag: Tag,
  "shopping-bag": ShoppingBag,
};

export const uiIcons = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  checkCircle: CheckCircle2,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  loader: Loader2,
  mail: Mail,
  mapPin: MapPin,
  menu: Menu,
  minus: Minus,
  phone: Phone,
  plus: Plus,
  quote: Quote,
  search: Search,
  shoppingCart: ShoppingCart,
  sliders: SlidersHorizontal,
  star: Star,
  trash: Trash2,
  close: X,
  message: MessageCircle,
};

interface IconProps {
  icon: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ icon, className, size = 20, strokeWidth = 1.6 }: IconProps) {
  const Component = iconMap[icon];
  return (
    <Component
      className={cn("shrink-0", className)}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  );
}
