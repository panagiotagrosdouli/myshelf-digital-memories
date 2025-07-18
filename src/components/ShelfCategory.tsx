import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Tv, Coffee, Music, Heart, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShelfCategoryProps {
  title: string;
  description: string;
  icon: keyof typeof categoryIcons;
  itemCount: number;
  onClick?: () => void;
  className?: string;
}

const categoryIcons = {
  books: BookOpen,
  series: Tv,
  restaurants: Coffee,
  music: Music,
  wishlist: Heart,
  products: Package,
} as const;

export function ShelfCategory({ 
  title, 
  description, 
  icon, 
  itemCount, 
  onClick,
  className 
}: ShelfCategoryProps) {
  const Icon = categoryIcons[icon];

  return (
    <Card className={cn(
      "group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1",
      "bg-gradient-card shadow-card border-border/50",
      "hover:bg-gradient-warm/10",
      className
    )} onClick={onClick}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-shelf-cozy">
            {itemCount}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="opacity-0 group-hover:opacity-100 transition-opacity shadow-button"
          >
            <Plus className="h-4 w-4 mr-1" />
            Προσθήκη
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}