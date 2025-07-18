import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Star, Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShelfItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  tags: string[];
  priority?: 'low' | 'medium' | 'high';
  status?: 'wishlist' | 'in-progress' | 'completed';
  image?: string;
  url?: string;
  addedDate: Date;
}

interface ShelfCardProps {
  item: ShelfItem;
  onEdit?: (item: ShelfItem) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export function ShelfCard({ item, onEdit, onDelete, className }: ShelfCardProps) {
  const priorityColors = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-accent/20 text-accent-foreground',
    high: 'bg-destructive/20 text-destructive-foreground'
  };

  const statusIcons = {
    wishlist: Clock,
    'in-progress': Star,
    completed: Star
  };

  const StatusIcon = item.status ? statusIcons[item.status] : Clock;

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:shadow-hover hover:-translate-y-1 hover:scale-[1.02]",
      "bg-gradient-card shadow-card border-border/50",
      className
    )}>
      {item.image && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight text-foreground group-hover:text-primary transition-colors">
            {item.title}
          </CardTitle>
          {item.url && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
        {item.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant="secondary" className="text-xs">
            {item.category}
          </Badge>
          {item.priority && (
            <Badge 
              variant="outline" 
              className={cn("text-xs", priorityColors[item.priority])}
            >
              <StatusIcon className="w-3 h-3 mr-1" />
              {item.status || 'wishlist'}
            </Badge>
          )}
        </div>

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs bg-shelf-muted/50 hover:bg-shelf-warm/20 transition-colors cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="outline" className="text-xs opacity-60">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {item.addedDate.toLocaleDateString('el-GR')}
          </span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
              onClick={() => onEdit?.(item)}
            >
              Edit
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs text-destructive hover:text-destructive"
              onClick={() => onDelete?.(item.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}